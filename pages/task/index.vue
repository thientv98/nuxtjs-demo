<template>
  <div>
    <Header :title="title">
      <!-- <template #button>
        <v-btn dark elevation="0">New Task</v-btn>
      </template> -->
    </Header>
    <template v-if="$route.query.user_id">
      <div class="d-flex align-center pb-5">
        <Avatar :src="userDetail.avatar_url" />
        <div class="pl-2">
          <div class="fs-14 fw-bold">{{ userDetail.name }}</div>
          <div class="fs-10">
            {{ userDetail.email }}
          </div>
        </div>
      </div>
    </template>
    <template>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="records"
        item-key="id"
        :hide-default-footer="false"
        :options.sync="options"
        :server-items-length="totalRecords"
        :loading="loading"
        class="elevation-0"
      >
        <template v-slot:[`item.timeline`]="{ item }">
          {{ formatTimeLine(item) }}
        </template>
        <!-- <template v-slot:[`item.progress`]="{ item }">
          <v-chip
            small
            :class="item.is_done === 0 ? 'btn-light pb-1' : 'btn-danger pb-1'"
          >
            {{ item.is_done === 0 ? 'Pending' : 'Done' }}
          </v-chip>
        </template> -->
      </v-data-table>
    </template>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import Util from '@/util'
export default defineComponent({
  data: () => {
    return {
      totalRecords: 0,
      records: [],
      userDetail: {},
      loading: false,
      options: {},
      selected: [],
      firstPage: true,
      headers: [
        {
          text: 'Title',
          align: 'start',
          sortable: true,
          value: 'title',
        },
        {
          text: 'Content',
          align: 'start',
          sortable: true,
          value: 'content',
        },
        {
          text: 'Timeline',
          align: 'start',
          sortable: true,
          value: 'timeline',
        }
      ],
      title: "Task list",
      roomDetail: {}
    }
  },

  mounted() {
    this.fetchTaskList()
    if(this.$route.query.user_id) {
      this.fetchUserDetail()
    }

    if(this.$route.query.room_id) {
      this.fetchRoom()
    }
  },
  watch: {
    options: {
      handler() {
        this.firstPage = false
        this.fetchTaskList()
      },
    },
  },

  methods: {
    fetchUserDetail() {
      let id = this.$route.query.user_id
      this.$axios.get(`/user/show/${id}`).then((res) => {
        this.userDetail = res.data.data.user
        this.title = "Task list of user " + this.userDetail.name
      })
    },
    fetchRoom() {
      let id = this.$route.query.room_id
      this.$axios.get(`/room/show/${id}`).then((res) => {
        this.roomDetail = res.data.data.room
        this.title = "Task list of room " + this.roomDetail.title
      })
    },
    fetchTaskList() {
      const queryString = Util.serializeObj(this.option)
      this.loading = true
      let url = `/task?`
      if (this.$route.query.user_id) {
        url += `&user_created=${this.$route.query.user_id}`
      }
      if (this.$route.query.room_id) {
        url += `&room_id=${this.$route.query.room_id}`
      }
      this.$axios
        .get(url + queryString + '&firstPage=' + this.firstPage)
        .then((res) => {
          this.totalRecords = res.data.data.tasks.meta.total
          this.records = res.data.data.tasks.data
          this.loading = false
        })
    },
    formatTimeLine(item) {
      if (item.start_at && item.end_at) {
        const nth1 = Util.getNth(dayjs(item.start_at).format('D'))
        const nth2 = Util.getNth(dayjs(item.end_at).format('D'))

        return (
          dayjs(item.start_at).format('dddd, MMMM D') +
          nth1 +
          ' - ' +
          dayjs(item.end_at).format('dddd, MMMM D') +
          nth2
        )
      }
      return ''
    },
  },
})
</script>

<style></style>
