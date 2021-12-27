<template>
  <div>
    <Header title="Category">
      <template #button>
        <div>
          <v-btn dark elevation="0" @click="deleteItem"
            >Delete</v-btn
          >

          <!-- <v-btn dark elevation="0">Add New</v-btn> -->
          <v-btn elevation="0" dark
            @click="openModalAdd"
            >Add New</v-btn
          >
        </div>
      </template>
    </Header>
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
        <template v-slot:[`item.action`]="{ item }">
          <v-btn
            elevation="0"
            class="blue--text"
            icon
            @click="openModalEdit(item)"
            >Edit</v-btn
          >
        </template>
      </v-data-table>
    </template>
    <DialogAddCategory
      :dialog.sync="dialogUpdate"
      title="Edit"
      :id="modelEditId"
      @fetchData="fetchData"
    />

    <DialogAddCategory
      :dialog.sync="dialogCreate"
      title="New Category"
      dark
      @fetchData="fetchData"
    />

    <DialogDelete :dialog.sync="dialogDelete"
      :selected="selected"
      urlDelete="/group/delete"
      icon @fetchData="fetchData" />
  </div>
</template>

<script>
import Util from "@/util";
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
        { text: 'Title', align: 'start', value: 'title'},
        { text: '', value: 'action', sortable: false },
      ]
    }
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.firstPage = false;
        this.fetchData();
      },
    },
  },
  methods: {
    fetchData() {
      console.log(this.options);
      const queryString = Util.serializeObj(this.options);
      this.loading = true
      this.$axios.get('/group?' + queryString + "&firstPage=" + this.firstPage)
      .then(res => {
        this.totalRecords = res.data.data.groups.meta.total
        this.records = res.data.data.groups.data

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
      console.log(this.selected);
      if(this.selected.length > 0) {
        this.dialogDelete = true
      }
    }
  },
})
</script>

<style></style>
