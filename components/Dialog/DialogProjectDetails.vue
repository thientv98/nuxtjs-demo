<template>
  <v-dialog
    v-model="modalDialog"
    width="600"
    transition="dialog-top-transition"
    hide-overlay
  >
    <v-card>
      <v-card-text>
        <h3 class="d-flex justify-center pt-6">{{form.client}}</h3>
        <div class="pt-4">
          <div class="fw-bold">Client</div>
          <v-text-field
            placeholder="Type the title of the notification here"
            class="pt-0"
            v-model="form.client"
          >
          </v-text-field>
          <div class="fw-bold">Timeline</div>
          <!-- <v-text-field
            value="Tuesday, September 28th - Tuesday, September 28th"
            placeholder=""
            class="pt-0"
          >
          </v-text-field> -->
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="dateRange"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateRangeText"
                readonly
                dense
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dateRange"
              no-title
              scrollable
              range
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="menu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(dateRange)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>


          <div class="fw-bold">Category</div>
          <v-select v-model="form.group_id"
            :items="groups"
            item-text="title"
            item-value="id"
            :error-messages="errors.group_id ? errors.group_id[0] : ''"
            placeholder="Type group here" class="pt-0">
          </v-select>

          <div class="fw-bold">Status</div>
          <v-select v-model="form.status"
            :items="status"
            item-text="title"
            item-value="id"
            :error-messages="errors.status ? errors.status[0] : ''"
            placeholder="Type group here" class="pt-0">
          </v-select>

          <div class="fw-bold">Project Description</div>
          <v-textarea
            name="input-7-1"
            placeholder="Type the contents of project description here"
            v-model="form.description"
            :error-messages="errors.description ? errors.description[0] : ''"
          ></v-textarea>
          <div class="">
            <span class="fw-bold pr-3">Upload Files</span>
            <!-- <v-btn x-small rounded color="primary" elevation="0">File</v-btn> -->
            <!-- <v-btn x-small rounded color="primary" elevation="0">File</v-btn> -->
            <v-file-input dense multiple :hide-input="false" prepend-icon=""
              @change="handleFileUpload"
              v-model="files"
              placeholder="Upload document" ref="fileDocument">File</v-file-input>

            <template v-for="item in documents">
              <div :key="item.id" class="documents my-1">
                <a :href="item.path_url" target="_blank">{{item.file_name}}</a>
                <!-- <div class="close" @click="removeFile(item)">x</div> -->
                <v-btn icon @click="removeFile(item)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
            </template>
          </div>
        </div>
        <div class="pt-6 d-flex justify-center pt-10">
          <v-btn
            width="120"
            elevation="0"
            dark
            rounded
            class="mr-1"
            @click="modalDialog = false"
            >Close</v-btn
          >
          <v-btn
            width="120"
            elevation="0"
            color="primary"
            rounded
            class="ml-1"
            @click="submitForm"
            >Confirm</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
    <LoadingOverlay :overlay="loading" />
  </v-dialog>
</template>

<script>
import Util from "@/util";
import dayjs from "dayjs";

export default {
  props: {
    dialog: Boolean,
    id: String,
  },
  data() {
    return {
      form: {},
      documents: [],
      loading: false,
      groups: [],
      dateRange: [],
      menu: false,
      files: null,
      status: [
        { id: 'waiting', title: 'Waiting' },
        { id: 'approved', title: 'Approved' },
        { id: 'denied', title: 'Denied' },
        { id: 'closed', title: 'Closed' },
      ]
    }
  },
  computed: {
    modalDialog: {
      get: function () {
        return this.dialog
      },
      set: function (newValue) {
        this.$emit('update:dialog', newValue)
      }
    },
    dateRangeText () {
      if(this.dateRange.length === 2) {
        const nth1 = Util.getNth(dayjs(this.dateRange[0]).format('D'))
        const nth2 = Util.getNth(dayjs(this.dateRange[1]).format('D'))

        return dayjs(this.dateRange[0]).format('dddd, MMMM D') + nth1 + ' - ' + dayjs(this.dateRange[1]).format('dddd, MMMM D') + nth2
      }
      return ''
    },
  },
  watch: {
    dialog:  function (val) {
      this.form = {}
      this.dateRange = []
      this.files = null
      this.documents = []
      if(this.id && val) {
        this.fetchData()
      }
    },
  },
  mounted() {
    this.fetchCategory()
  },
  methods: {
    fetchCategory() {
      this.$axios.get('/group/all')
      .then(res => {
        this.groups = res.data.data.groups
      })
    },
    fetchData() {
      this.$axios.get(`/deal/show/${this.id}`)
      .then(res => {
        this.loading = false
        this.form = res.data.data.deal
        this.documents = this.form.document
        if(this.form.start_time && this.form.end_time) {
          this.dateRange = [
            dayjs(this.form.start_time).format('YYYY-MM-DD'),
            dayjs(this.form.end_time).format('YYYY-MM-DD')
          ]
        }
      })
    },
    submitForm() {
      if(this.dateRange.length > 0) {
        this.form.start_time = this.dateRange[0]
        this.form.end_time = this.dateRange[1]
      }
      this.form.documents = this.documents.map(doc => doc.id)
      this.loading = true
      this.$axios.post(`/deal/update/${this.id}`, this.form)
      .then(res => {
        this.loading = false
        this.modalDialog = false
        this.$emit('fetchData')
      })
      .catch(err => {
        console.log(err);
        this.loading = false
      })
    },
    handleFileUpload(event) {
      if(this.files && this.files.length > 0) {
        let formData = new FormData();
        this.files.map(file => {
          formData.append('path[]', file);
        })
        this.$axios.post(
          '/deal-document/create',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        .then(res => {
          this.documents = [... this.documents, ...res.data.data.documents]
          setTimeout(() => {
            this.files = null
          }, 200)
        })
      }
    },
    removeFile(document) {
      this.documents = this.documents.filter(item => item.id !== document.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .documents {
    display: flex;
    justify-content: space-between;
    .close {
      cursor: pointer;
    }
  }
</style>
