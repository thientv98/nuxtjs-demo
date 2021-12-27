<template>
  <div>
    <Header title="Activity History">
    </Header>
    <template>
      <v-data-table
        :headers="headers"
        :items="records"
        item-key="id"
        :hide-default-footer="false"
        :options.sync="options"
        :server-items-length="totalRecords"
        :loading="loading"
        class="elevation-0"
      >
        <template v-slot:[`item.action`]="{ item }">
          <div style="text-transform: capitalize;">
            {{item.action}}
          </div>
        </template>

        <template v-slot:[`item.type`]="{ item }">
          <div style="text-transform: capitalize;">
            {{item.type}}
          </div>
        </template>

        <template v-slot:[`item.user`]="{ item }">
          {{item.user ? item.user.name : ''}}
        </template>

        <template v-slot:[`item.target`]="{ item }">
          {{showTargetData(item)}}
        </template>

        <template v-slot:[`item.new_content`]="{ item }">
          {{showNewContent(item)}}
        </template>

        <template v-slot:[`item.created_at`]="{ item }">
          {{formatDate(item.created_at, 'YYYY-MM-DD HH:mm A')}}
        </template>

      </v-data-table>
    </template>
  </div>
</template>

<script>
import Util from "@/util"
import dayjs from 'dayjs'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  data() {
    return {
      dialogCreate: false,
      dialogUpdate: false,
      dialogDelete: false,
      totalRecords: 0,
      records: [],
      loading: false,
      options: {},
      firstPage: true,
      modelEditId: '',

      selected: [],
      headers: [
        { text: 'User', align: 'start', value: 'user', sortable: false},
        { text: 'Action', align: 'start', value: 'action'},
        { text: 'Type', align: 'start', value: 'type'},
        { text: 'Target', value: 'target', sortable: false },
        { text: 'Content', value: 'new_content', sortable: false },
        { text: 'Created At', value: 'created_at', sortable: true },
      ]
    }
  },
  mounted() {
    this.fetchData()
  },
   watch: {
    options: {
      handler() {
        this.firstPage = false;
        this.fetchData();
      },
    },
  },
  methods: {
    fetchData() {
      const queryString = Util.serializeObj(this.options);
      this.loading = true
      this.$axios.get('/log?' + queryString + "&firstPage=" + this.firstPage)
      .then(res => {
        this.totalRecords = res.data.data.logs.meta.total
        this.records = res.data.data.logs.data

        this.loading = false
      })
    },
    showTargetData(item) {
      if(item.type === 'room_user' && item.action == 'add') {
        return item.target_data['user']?.name + ' to room ' + item.target_data['room'].title
      }
      if(item.type === 'room_user' && item.action == 'remove') {
        return item.target_data['user']?.name + ' from room ' + item.target_data['room'].title
      }

      if('room' in item.target_data) {
        return item.target_data['room']?.title
      }

      if('deal' in item.target_data) {
        return item.target_data['deal']?.client
      }

      if('task' in item.target_data) {
        return item.target_data['task']?.title
      }

      if('group' in item.target_data) {
        return item.target_data['group']?.title
      }

      if('rooms' in item.target_data) {
        let str = ''

        item.target_data['rooms'].map((room, index) => {
          if(index < 3) {
            if(index != 0) {
              str += ', '
            }
            str += room.title
          }
        })

        if(item.target_data['rooms'].length > 3) {
          str += ',...'
        }

        return str
      }

      if('user' in item.target_data) {
        return item.target_data['user']?.name
      }

      return ''
    },
    showNewContent(item) {
      if(item.type == 'message') {
        return item.new_content_data ? item.new_content_data.content : ''
      }
      return ''
    },
    formatDate(date, format) {
      return dayjs(date).format(format)
    }
  },
})
</script>

<style></style>
