<template>
  <div>
    <Header title="Notification">
      <template #button>
        <div>
          <v-btn
            elevation="0"
            :disabled="selected < 1"
            class="black white--text"
            @click="deleteItem"> Delete </v-btn>
          <DialogNewNotification @fetchData="fetchData" />
        </div>
      </template>
    </Header>
    <div class="d-flex pb-6">
      <v-btn
        elevation="0"
        height="38px"
        class="mr-3"
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
          class="mr-3"
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
    <template>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="records"
        :single-select="false"
        item-key="id"
        show-select
        :hide-default-footer="false"
        :options.sync="options"
        :server-items-length="totalRecords"
        :loading="loading"
        class="elevation-0"
        @click="dialogDetail = true"
      >

        <template v-slot:[`item.content`]="{ item }">
          <div class="content-overflow">
            {{ item.content }}
          </div>
        </template>

        <template v-slot:[`item.group`]="{ item }">
          {{ item.group ? item.group.title : '' }}
        </template>

        <template v-slot:[`item.created_at`]="{ item }">
          {{formatDate(item.created_at, 'YYYY-MM-DD HH:mm A') }}
        </template>

        <template v-slot:[`item.image_url`]="{ item }">
          <img :src="item.image_url" alt="" v-if="item.image_url" style="max-width: 60px">
        </template>

        <template v-slot:[`item.action`]="{ item }">
          <v-btn elevation="0" icon @click="openModalDetail(item)"
            ><i class="ic ic--more"></i
          ></v-btn>
        </template>

      </v-data-table>
    </template>

    <DialogNotificationDetails :dialog.sync="dialogDetail" :item="modelDetail" />

    <DialogDelete
      :dialog.sync="dialogDelete"
      :selected="selected"
      title="Do you want delete selected item?"
      urlDelete="/notification/delete"
      icon
      @fetchData="fetchData"
    />

  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import DialogNewNotification from '@/components/Dialog/DialogNewNotification.vue'
import Util from '@/util'
import dayjs from 'dayjs'

export default defineComponent({
  components: { DialogNewNotification },
  data() {
    return {
      dialogCreate: false,
      dialogDelete: false,
      dialogDetail: false,
      totalRecords: 0,
      records: [],
      loading: false,
      options: {
        groupBy: [],
        groupDesc: [],
        itemsPerPage: 10,
        multiSort: false,
        mustSort: false,
        page: 1,
        sortBy: [],
        sortDesc: [],
      },
      firstPage: true,
      modelDetail: {},
      selected: [],
      filter: {
        group_id: '',
      },
      headers: [
        {
          text: 'Title',
          align: 'start',
          sortable: false,
          value: 'title',
        },
        {
          text: 'Contents',
          align: 'start',
          sortable: false,
          value: 'content',
          width: '30%',
        },
        {
          text: 'Category',
          align: 'start',
          sortable: false,
          value: 'group',
        },
        {
          text: 'Date/Time',
          align: 'start',
          sortable: false,
          value: 'created_at',
        },
        {
          text: 'Upload Files',
          align: 'center',
          sortable: false,
          value: 'image_url',
        },
        {
          text: '',
          align: 'center',
          sortable: false,
          value: 'action',
        },
      ],
      groups: [],
    }
  },
  mounted() {
    this.fetchGroups()
    this.fetchData()
  },
  watch: {
    options: {
      handler() {
        this.firstPage = false
        this.fetchData()
      },
    },
    'filter.group_id': function (val) {
      this.fetchData()
    },
  },
  methods: {
    fetchData() {
      const queryString = Util.serializeObj({ ...this.options, ...this.filter })
      this.loading = true
      this.$axios.get('/notification?' + queryString + '&firstPage=' + this.firstPage)
      .then((res) => {
        this.totalRecords = res.data.data.notifications.meta.total
        this.records = res.data.data.notifications.data
        this.loading = false
      })
    },
    fetchGroups() {
      this.$axios.get('/group/all').then((res) => {
        this.groups = res.data.data.groups
      })
    },
    openModalDetail(item) {
      this.modelDetail = item
      this.dialogDetail = true
    },
    formatDate(date, format) {
      return dayjs(date).format(format)
    },
    deleteItem() {
      if (this.selected.length > 0) {
        this.dialogDelete = true
      }
    },
  }
})
</script>

<style>
.content-overflow {
  overflow: hidden;
  display: -webkit-box;
  font-size: 12px;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
