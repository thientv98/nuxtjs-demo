<template>
  <v-list-item-group v-model="settings" multiple active-class="">
    <v-list-item>
      <v-list-item-action>
        <v-checkbox v-model="selected"></v-checkbox>
      </v-list-item-action>
      <v-col class="card" @click="openRoom">
        <Avatar :size="40" :src="item.thumbnail_url" />
        <div class="d-flex flex-column pl-3">
          <div class="d-flex align-center justify-space-between">
            <p>
              {{ item.title }}
              <span>{{ item.users.length }}</span>
            </p>
            <div class="time">
              {{ formatDateRoom(item.last_message_time) }}
            </div>
          </div>
          <div class="d-flex justify-space-between">
            <div
              class="content pt-1"
              v-text="item.last_message ? item.last_message.content : ''"
            ></div>
            <div class="unread" v-if="item.unix_time">
              {{ item.total_unread > 99 ? '99+' : item.total_unread }}
            </div>
          </div>
        </div>
      </v-col>
    </v-list-item>
  </v-list-item-group>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Util from '@/util'

export default defineComponent({
  props: {
    item: {
      type: Object,
    },
    selectedRoom: {
      type: Array,
    }
  },
  data() {
    return {
      settings: [],
      selected: false,
    }
  },
  watch: {
    selected: function (val) {
      this.$emit('updateSelected', this.item, val)
    },
  },
  mounted() {
    let find = this.selectedRoom.find(room => room.id == this.item.id)
    if(find) {
      this.selected = true
    }
  },
  methods: {
    formatDateRoom(time) {
      return Util.formatDateToday(time)
    },
    openRoom() {
      this.$emit('openRoom', this.item)
    },
  },
})
</script>

<style lang="scss" scoped>
.v-list-item {
  padding: 0 !important;
  margin-bottom: 8px !important;
  .time {
    text-align: right;
    font-size: 9px !important;
    color: #707070 !important;
    padding-bottom: 0px !important;
    display: flex;
    justify-items: flex-end !important;
    white-space: nowrap;
  }
  .unread {
    display: flex;
    justify-content: center !important;
    align-items: center !important;
    height: 24px;
    width: 24px;
    background-color: #e08345 !important;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    border-radius: 50%;
  }
  .content {
    width: 180px;
    font-size: 12px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  &__action:first-child {
    margin-right: 10px !important;
  }
  p {
    font-weight: 700;
    font-size: 13px;
    margin-bottom: 0px !important;
    min-width: 120px !important;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    span {
      color: #d1d1d1 !important;
      font-weight: 500 !important;
    }
  }
  &__subtitle {
    overflow: hidden !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 1 !important;
    -webkit-box-orient: vertical !important;
  }
  .card {
    display: flex !important;
    align-items: center !important;
    border: 1px solid var(--cl-bd) !important;
    border-radius: 8px !important;
    padding: 8px !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  &--link::before {
    background-color: #fff !important;
  }
}
</style>
