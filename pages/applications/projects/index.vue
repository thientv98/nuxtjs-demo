<template>
  <div>
    <Header title="Projects">
      <template #button>
        <v-btn dark elevation="0" @click="deleteItem">Delete</v-btn>
      </template>
    </Header>
    <div class="search-container">
      <v-col cols="12" sm="12" md="4" lg="3" class="px-0">
        <v-text-field
          prepend-inner-icon="ic ic--search mt-0"
          hide-details
          outlined
          placeholder="Search by Name, Email"
          v-model="filter.search"
        >
        </v-text-field>
      </v-col>
      <div class="tabs">
        <v-btn elevation="0" height="38px" class="mr-3"
          :class="filter.group_id === '' ? 'v-btn--primary' : 'v-btn--outlined'"
          :outlined="filter.group_id !== ''"
          @click="filter.group_id = ''">
          All
        </v-btn>
        <template v-for="item in groups">
          <v-btn elevation="0" :key="item.id" height="38px" class="mr-3"
            :class="filter.group_id === item.id ? 'v-btn--primary' : 'v-btn--outlined'"
            :outlined="filter.group_id !== item.id"
            @click="filter.group_id = item.id">
            {{item.title}}
          </v-btn>
        </template>
      </div>
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
        <template v-slot:[`item.category`]="{ item }">
          {{ item.group ? item.group.title : '' }}
        </template>

        <template v-slot:[`item.status`]="{ item }">
          <div style="text-transform: capitalize;">
            {{ item.status }}
          </div>
        </template>

        <template v-slot:[`item.action_status`]="{ item }">
          <template v-if="item.status === 'waiting'">
            <div class="d-flex">
              <v-btn elevation="0" icon @click="changeStatus(item, 'approved')">
                <v-icon>mdi-check</v-icon>
              </v-btn>
              <v-btn elevation="0" icon @click="changeStatus(item, 'denied')">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </div>
          </template>
        </template>

        <template v-slot:[`item.timeline`]="{ item }">
          {{ formatTimeLine(item) }}
        </template>

        <template v-slot:[`item.action`]="{ item }">
          <v-btn elevation="0" icon @click="openModalEdit(item)"
            ><i class="ic ic--more"></i
          ></v-btn>
        </template>
      </v-data-table>
    </template>
    <DialogProjectDetails
      :dialog.sync="dialogUpdate"
      :id="modelEditId"
      @fetchData="fetchData" />

    <DialogDelete :dialog.sync="dialogDelete"
      :selected="selected"
      title="Remove Project"
      urlDelete="/deal/delete"
      icon @fetchData="fetchData" />

    <v-dialog
      v-model="dialogNote"
      width="600"
      transition="dialog-top-transition"
      hide-overlay
    >
      <v-card>
        <v-card-text>
          <h3 class="d-flex justify-center pt-6">Deny project</h3>
          <div class="pt-4">
            <div class="fw-bold">Note</div>
            <v-textarea
              placeholder="Type the note here"
              class="pt-0"
              v-model="denyItem.note"
            >
            </v-textarea>
          </div>
          <div class="pt-6 d-flex justify-center pt-10">
            <v-btn
              width="120"
              elevation="0"
              dark
              rounded
              class="mr-1"
              @click="dialogNote = false"
              >Close</v-btn
            >
            <v-btn
              width="120"
              elevation="0"
              color="primary"
              rounded
              class="ml-1"
              @click="submitDenyForm"
              >Confirm</v-btn
            >
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Util from "@/util";
import dayjs from 'dayjs';

export default defineComponent({
  data() {
    return {
      dialogCreate: false,
      dialogUpdate: false,
      dialogDelete: false,
      dialogNote: false,
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
        sortDesc: []
      },
      firstPage: true,
      modelEditId: '',
      selected: [],
      filter: {
        search: '',
        group_id: ''
      },
      headers: [
        {
          text: 'Member name',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        {
          text: 'Client',
          align: 'start',
          sortable: true,
          value: 'client',
        },
        {
          text: 'Timeline',
          align: 'start',
          sortable: false,
          value: 'timeline',
        },
        {
          text: 'Category',
          align: 'start',
          sortable: false,
          value: 'category',
        },
        {
          text: 'Status',
          align: 'start',
          sortable: false,
          value: 'status',
        },
        {
          text: '',
          align: 'start',
          sortable: false,
          value: 'action_status',
        },

        { text: '', value: 'action', sortable: false },
      ],
      groups: [],
      denyItem: {},
    }
  },
  mounted() {
    this.fetchGroups()
    this.fetchData()
  },
  watch: {
    options: {
      handler() {
        this.firstPage = false;
        this.fetchData();
      },
    },
    'filter.search': function (val) {
      this.fetchData()
    },
    'filter.group_id': function (val) {
      this.fetchData()
    },
  },
  methods: {
    fetchData() {
      const queryString = Util.serializeObj({ ...this.options, ...this.filter});
      this.loading = true
      this.$axios.get('/deal?' + queryString + "&firstPage=" + this.firstPage)
      .then(res => {
        this.totalRecords = res.data.data.deals.meta.total
        this.records = res.data.data.deals.data

        this.loading = false
      })
    },
    openModalAdd() {
      this.dialogCreate = true
    },
    openModalEdit(item) {
      this.modelEditId = item.id
      this.dialogUpdate = true
    },
    deleteItem() {
      if(this.selected.length > 0) {
        this.dialogDelete = true
      }
    },
    fetchGroups() {
      this.$axios.get('/group/all')
      .then(res => {
        this.groups = res.data.data.groups
      })
    },
    formatTimeLine(item) {
      if(item.start_time && item.end_time) {
        const nth1 = Util.getNth(dayjs(item.start_time).format('D'))
        const nth2 = Util.getNth(dayjs(item.end_time).format('D'))

        return dayjs(item.start_time).format('dddd, MMMM D') + nth1 + ' - ' + dayjs(item.end_time).format('dddd, MMMM D') + nth2
      }
      return ''
    },
    changeStatus(item, status) {
      if(status === 'approved') {
        this.updateItem(item, status)
      } else {
        this.denyItem = item
        this.dialogNote = true
      }
    },
    submitDenyForm() {
      this.updateItem(this.denyItem, 'denied')
      this.dialogNote = false
    },
    updateItem(item, status) {
      let data = {...item}
      delete data.start_time
      delete data.end_time
      data.status = status
      this.loading = true
      this.$axios.post(`/deal/update-status/${data.id}`, data)
      .then(res => {
        this.$notify({
          type: "success",
          title: res.data.message,
        });
        this.fetchData()
      })
    }
  },
})
</script>

<style></style>
