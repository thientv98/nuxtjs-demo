<template>
  <div>
    <div class="tabs">
      <v-btn
        elevation="0"
        height="38px"
        class="mr-3 mb-3"
        :class="filter.group_id === '' ? 'v-btn--primary' : 'v-btn--outlined'"
        :outlined="filter.group_id !== ''"
        @click="filter.group_id = ''"
      >
        All
      </v-btn>
      <template v-for="item in groups">
        <v-btn
          elevation="0"
          :key="item.id"
          height="38px"
          class="mr-3 mb-3"
          :class="
            filter.group_id === item.id ? 'v-btn--primary' : 'v-btn--outlined'
          "
          :outlined="filter.group_id !== item.id"
          @click="filter.group_id = item.id"
        >
          {{ item.title }}
        </v-btn>
      </template>
    </div>
    <v-col cols="12" md="4" lg="12" class="px-0 pt-5 pb-3">
      <v-text-field
        prepend-inner-icon="ic ic--search mt-0"
        hide-details
        outlined
        placeholder="Search by Name, Group, Message"
        v-model="search"
      >
      </v-text-field>
    </v-col>
    <div class="message-container" id="room-list" @scroll="onRoomScroll">
      <template v-for="item in rooms.data">
        <MessageItem
          :key="item.id"
          :item="item"
          :selectedRoom="selectedRoom"
          @openRoom="openRoom"
          @updateSelected="updateSelected"
        />
      </template>
    </div>

    <div class="d-flex justify-end pt-6">
      <!-- <v-btn dark elevation="0" @click="isSendMessage = true"
          >Send Message to All</v-btn
        > -->
      <DialogSendAllMessage :selectedRoom="selectedRoom" :filter="filter" />

      <v-btn
        :dark="selectedRoom.length !== 0"
        elevation="0"
        class="ml-2"
        :disabled="selectedRoom.length === 0"
        @click="showDeleteDialog"
      >
        Delete</v-btn
      >
    </div>

    <DialogDelete
      :dialog.sync="dialogDelete"
      :selected="selectedRoom"
      title="Do you want to delete the selected rooms?"
      urlDelete="/room/delete"
      icon
      @fetchData="$emit('fetchRooms')"
    />
  </div>
</template>

<script>
import DialogSendAllMessage from './Dialog/DialogSendAllMessage.vue'
import _ from 'lodash'

export default {
  props: {
    groups: {
      type: Array,
    },
    rooms: {
      type: Object,
    },
    filter: {
      type: Object,
    },
  },
  components: { DialogSendAllMessage },
  data() {
    return {
      isSendMessage: false,
      value: '',
      selectedRoom: [],
      lastScrollRoom: 0,
      search: '',
      dialogDelete: false,
    }
  },
  watch: {
    search: _.debounce(function (newVal) {
      this.filter.search = newVal
    }, 300),
  },
  methods: {
    openRoom(room) {
      this.$emit('openRoom', room)
    },
    onRoomScroll() {
      const element = document.getElementById('room-list')
      if (element) {
        // check scroll to bottom of div
        if (
          element.scrollHeight - element.scrollTop === element.clientHeight &&
          this.lastScrollRoom < element.scrollTop
        ) {
          if (this.filter.page < this.rooms.meta.last_page) {
            this.filter.page += 1
            this.$emit('fetchRooms', true)
          }
        }
        this.lastScrollRoom = element.scrollTop
      }
    },
    updateSelected(room, val) {
      if (val) {
        let find = this.selectedRoom.find(item => room.id == item.id)
        if(!find) {
          this.selectedRoom.push(room)
        }
      } else {
        this.selectedRoom = this.selectedRoom.filter(
          (item) => item.id !== room.id
        )
      }
    },
    showDeleteDialog() {
      this.dialogDelete = true
    },
  },
}
</script>
<style lang="scss" scoped>
.message-container {
  overflow-y: auto !important;
  height: 62vh !important;
}
</style>
