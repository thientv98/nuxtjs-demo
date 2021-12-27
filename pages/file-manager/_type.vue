<template>
  <div id="file-manager">
    <Header :title="$route.params.type">
      <template #button>
        <div>
          <v-btn elevation="0"
            :disabled="selected < 1"
            class="black white--text" @click="openDownloads">
            Download
          </v-btn>
        </div>
      </template>
    </Header>
    <div class="search-container mb-3">
      <v-col cols="12" sm="12" md="4" lg="3" class="px-0">
        <v-text-field
          prepend-inner-icon="ic ic--search mt-0"
          hide-details
          outlined
          placeholder="Search file"
          v-model="search"
        >
        </v-text-field>
      </v-col>
      <div class="tabs">
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
    </div>
    <div class="search-container">
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <v-select
            v-model="room_id"
            :items="rooms"
            multiple
            outlined
            dense
            item-text="title"
            item-value="id"
            clearable
            placeholder="Select room to search"
          ></v-select>
        </v-col>
      </v-row>
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
      >
        <template v-slot:[`item.file_size`]="{ item }">
          {{item.file_size > 0 ? formatBytes(item.file_size) : 0}}
        </template>

      </v-data-table>
    </template>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Util from '@/util'
import dayjs from 'dayjs'
import _ from 'lodash'

export default defineComponent({
  data() {
    return {
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
        search: '',
        room_id: []
      },
      room_id: [],
      search: '',
      headers: [
        {
          text: 'File name',
          align: 'start',
          sortable: false,
          value: 'file_name',
        },
        { text: 'Size', value: 'file_size' },
      ],
      groups: [],
      interval: null,
      rooms: []
    }
  },
  beforeMount() {

  },
  mounted() {
    if(this.$route.query.room_id) {
      this.filter.room_id.push(this.$route.query.room_id)
      this.room_id = [this.$route.query.room_id]
    }
    this.fetchGroups()
    this.fetchData()
    this.fetchRoom()
  },
  watch: {
    options: {
      handler() {
        this.firstPage = false
        this.fetchData()
      },
    },
    search: _.debounce(function (newVal) {
      this.filter.search = newVal
    }, 300),
    room_id: _.debounce(function (newVal) {
      this.filter.room_id = newVal
    }, 300),
    'filter.group_id': function (val) {
      this.fetchData()
    },
    'filter.search': function (val) {
      this.fetchData()
    },
    'filter.room_id': function (val) {
      this.fetchData()
    },
  },
  methods: {
    fetchData() {
      const queryString = Util.serializeObj({ ...this.options, ...this.filter })
      this.loading = true
      this.$axios.get(`/file-manager?type=${this.$route.params.type}&` + queryString + '&firstPage=' + this.firstPage)
      .then((res) => {
        this.totalRecords = res.data.data.files.meta.total
        this.records = res.data.data.files.data
        this.loading = false
      })
    },
    fetchGroups() {
      this.$axios.get('/group/all').then((res) => {
        this.groups = res.data.data.groups
      })
    },
    fetchRoom() {
      this.$axios.get('/room?itemsPerPage=-1&status=approved')
      .then((res) => {
        this.rooms = res.data.data.rooms.data
      })
    },
    openDownloads() {
      this.interval = setInterval(this.download, 300);
    },
    download() {
      var url = this.selected.pop().file_url_download
      var a = document.createElement("a");
      a.setAttribute('href', url);
      a.setAttribute('download', null);
      a.setAttribute('target', '_blank');
      a.click();

      if (this.selected.length == 0) {
        clearInterval(this.interval);
      }
    },
    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes';

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
  }
})
</script>

<style lang="scss" scoped></style>
