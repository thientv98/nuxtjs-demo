<template>
  <v-dialog v-model="dialog" hide-overlay transition="dialog-top-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark elevation="0" v-bind="attrs" v-on="on"
        >Create New Room
      </v-btn>
    </template>
    <v-card>
      <v-card-text class="new-room">
        <h1 class="d-flex justify-center pb-6">Create New Room</h1>
        <div class="d-flex align-center">
          <div class="d-flex justify-start pr-4">
            <PhotoPicker :onChange="onChangePhoto" ref="picker"/>
          </div>
          <div>
            <v-text-field
              placeholder="Group name"
              :hide-details="!errors.title"
              class=""
              v-model="form.title"
              :error-messages="errors.title ? errors.title[0] : ''"
            ></v-text-field>
            <v-select
              :items="groups"
              item-text="title"
              item-value="id"
              label="Group category"
              append-icon="ic ic--chervon-down"
              persistent-hint
              single-line
              v-model="form.group_id"
              :error-messages="errors.group_id ? errors.group_id[0] : ''"
            ></v-select>
          </div>
        </div>

        <div class="d-flex">
          <v-text-field
            outlined
            prepend-inner-icon="ic ic--search"
            placeholder="Search member"
            class="rounded-full"
            hide-details
            v-model="search"
          ></v-text-field>
        </div>
        <div class="pt-6">
          <span class="fw-bold grey--text text--lighten-2">Member list</span>
          <div :class="{ 'list-container': userFilters.length > 8 }">
            <ItemMember v-for="item in userFilters" :key="item.id" :item="item" @changeActive="changeActive" :dialog="dialog" />
          </div>
          <div style="color:#dd2c00">
            {{errors.users ? errors.users[0] : '' }}
          </div>
        </div>
        <div class="d-flex justify-center pt-10">
          <v-btn
            color="primary"
            rounded
            elevation="0"
            class="px-6"
            @click="createRoom"
            >Save</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
    <LoadingOverlay :overlay="loading" />
  </v-dialog>
</template>

<script>
import { defineComponent, reactive } from '@nuxtjs/composition-api'

export default defineComponent({
  data() {
    return {
      dialog: false,
      selectMember: [],
      select: { state: 'Florida', abbr: 'FL' },
      items: [
        { state: 'Florida', abbr: 'FL' },
        { state: 'Georgia', abbr: 'GA' },
        { state: 'Nebraska', abbr: 'NE' },
        { state: 'California', abbr: 'CA' },
        { state: 'New York', abbr: 'NY' },
      ],
      members: [
        {
          name: '영지 부',
          email: 'Young.boo@thecollectiviec.com',
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
        },
        {
          name: '영지 부',
          email: 'Young.boo@thecollectiviec.com',
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
        },
        {
          name: '영지 부',
          email: 'Young.boo@thecollectiviec.com',
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
        },
        {
          name: '영지 부',
          email: 'Young.boo@thecollectiviec.com',
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
        },
        {
          name: '영지 부',
          email: 'Young.boo@thecollectiviec.com',
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
        },
        {
          name: '영지 부',
          email: 'Young.boo@thecollectiviec.com',
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
        },
        {
          name: '영지 부',
          email: 'Young.boo@thecollectiviec.com',
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
        },
        {
          name: '영지 부',
          email: 'Young.boo@thecollectiviec.com',
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
        },
        {
          name: '영지 부',
          email: 'Young.boo@thecollectiviec.com',
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
        },
        {
          name: '영지 부',
          email: 'Young.boo@thecollectiviec.com',
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
        },
      ],
      form: {
        users: []
      },
      users: [],
      groups: [],
      search: '',
      loading: false,
    }
  },
  watch: {
    dialog:  function (val) {
      this.form = {
        users: []
      }
      this.search = ''
      if(this.$refs.picker) {
        this.$refs.picker.resetFile()
      }
    },
  },
  computed: {
    userFilters() {
      return this.users.filter(item => item.name.toLowerCase().indexOf(this.search) > -1 ||
        item.email.toLowerCase().indexOf(this.search) > -1);
    }
  },
  mounted() {
    this.fetchGroups()
    this.fetchAllMembers()
  },
  methods: {
    createRoom() {
      let formData = new FormData();
      for (let key in this.form ) {
        if(key === 'users') {
          this.form.users.map(user => {
            formData.append('users[]', user);
          })
        } else {
          formData.append(key, this.form[key]);
        }
      }

      this.loading = true

      this.$axios.post('/room/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        this.loading = false
        if(res.data.code === 200) {
          this.dialog = false
          this.$notify({
            type: "success",
            title: res.data.message,
          });
          this.$emit('fetchRooms')
        }
      }).catch(err => {
        this.loading = false
      })
    },
    fetchGroups() {
      this.$axios.get('/group/all')
      .then(res => {
        this.groups = res.data.data.groups
      })
    },
    fetchAllMembers() {
      this.$axios.get('/user?status=active&itemsPerPage=-1&not_me=true')
      .then(res => {
        this.users = res.data.data.users.data
      })
    },
    onChangePhoto(file) {
      this.form.thumbnail = file
    },
    changeActive(id, check) {
      if(check) {
        this.form.users.push(id)
      } else {
        this.form.users = this.form.users.filter(item => item != id)
      }
    }
  },
})
</script>

<style lang="scss" scoped></style>
