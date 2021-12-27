<template>
  <v-dialog
    v-model="dialog"
    width="500"
    transition="dialog-top-transition"
    hide-overlay
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark v-bind="attrs" v-on="on">Add New</v-btn>
    </template>
    <v-card elevation="0">
      <v-card-text>
        <h3 class="fw-bold d-flex justify-center pt-6">Write Notification</h3>
        <div>
          <div class="pt-4">
            <div class="fw-bold">Title</div>
            <v-text-field
              v-model="form.title"
              :error-messages="errors.title ? errors.title[0] : ''"
              placeholder="Type the title of the notification here"
              class="pt-0"
            >
            </v-text-field>
            <div class="fw-bold">Contents</div>
            <v-textarea
              v-model="form.content"
              :error-messages="errors.content ? errors.content[0] : ''"
              placeholder="Type the contents of the notification here"
              class="pt-0"
            >
            </v-textarea>
          </div>

          <span class="fw-bold">Category</span>
          <v-select v-model="form.group_id"
            :items="groups"
            item-text="title"
            item-value="id"
            :error-messages="errors.group_id ? errors.group_id[0] : ''"
            placeholder="Select group here" class="pt-0">
          </v-select>

          <span class="fw-bold">Users</span>
          <v-select v-model="form.users"
            :items="userFilter"
            item-text="name"
            item-value="id"
            multiple
            :error-messages="errors.users ? errors.users[0] : ''"
            placeholder="Select user here" class="pt-0">
          </v-select>

          <span class="fw-bold">Image</span>
          <v-file-input
            v-model="form.image"
            :error-messages="errors.image ? errors.image[0] : ''"
            accept="image/*"
            placeholder="Upload image here"
            prepend-icon=''
            class="pt-0"
          ></v-file-input>
        </div>

        <div class="pt-10 d-flex justify-center">
          <v-btn
            width="120"
            elevation="0"
            dark
            rounded
            class="mr-1"
            @click="dialog = false"
            >Close</v-btn
          >
          <v-btn
            width="120"
            elevation="0"
            color="primary"
            rounded
            class="ml-1"
            @click="createNotification"
            >Save</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
    <LoadingOverlay :overlay="loading" />
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      form: {},
      groups: [],
      users: [],
      loading: false,
    }
  },
  mounted() {
    this.fetchCategory()
    this.fetchUsers()
  },
  computed: {
    userFilter() {
      return this.users.filter(item => this.form.group_id === item.group_id)
    }
  },
  watch: {
    dialog: function (val) {
      if(val) {
        this.form = {}
      }
    },
    'form.group_id': function (val) {
      this.form.users = []
    }
  },
  methods: {
    createNotification() {
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

      this.$axios.post('/notification/create', formData, {
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
          this.$emit('fetchData')
        }
      }).catch(err => {
        this.loading = false
      })
    },
    fetchCategory() {
      this.$axios.get('/group/all')
      .then(res => {
        this.groups = res.data.data.groups
      })
    },
    fetchUsers() {
      this.$axios.get('/user/all')
      .then(res => {
        this.users = res.data.data.users
      })
    }
  }
}
</script>

<style></style>
