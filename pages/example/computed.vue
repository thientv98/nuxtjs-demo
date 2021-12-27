<template>
  <div>
    <div style="max-width: 500px">
      <v-text-field
        hide-details
        outlined
        placeholder="FirstName"
        v-model="firstName"
        class="mt-3"
      >
      </v-text-field>

      <v-text-field
        hide-details
        outlined
        placeholder="LastName"
        v-model="lastName"
        class="mt-3"
      >
      </v-text-field>
      <div class="mt-3">Full name: {{fullName}}</div>
      <div class="mt-3">Full name with filter: {{fullName | capitalize | anotherFilter}}</div>

      <v-text-field
        hide-details
        outlined
        placeholder="Search"
        v-model="search"
        class="mt-3"
      >
      </v-text-field>

      <ul>
        <li v-for="item in searchUser" :key="item.id">
          {{item.name}}
        </li>
      </ul>

      <DialogTest :dialog.sync="dialogTest" @submitConfirm="submitConfirm"/>

      <v-text-field
        hide-details
        outlined
        placeholder="Email"
        v-model="form.email"
        class="mt-3"
      >
      </v-text-field>

      <v-text-field
        hide-details
        outlined
        placeholder="Password"
        v-model="form.password"
        class="mt-3"
      >
      </v-text-field>
    </div>

    <div class="mt-3">
      <v-btn outlined @click="dialogTest = true">Show dialog</v-btn>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: 'thien',
      lastName: 'van',
      form: {},
      dialogTest: false,
      search: '',
      users: [
        {
          id: 1,
          name: 'Thien',
        },
        {
          id: 2,
          name: 'Thanh',
        },
        {
          id: 3,
          name: 'Tuan',
        },
        {
          id: 4,
          name: 'Be',
        },
      ]
    }
  },
  computed: {
    fullName() {
      // console.log('computed full name');
      return this.firstName + ' ' + this.lastName
    },
    searchUser() {
      return this.users.filter(item => item.name.toLowerCase().indexOf(this.search) > -1)
    }
  },
  watch: {
    firstName: function (val) {
      console.log('firstName', val);
    },
    lastName: {
      immediate: true,
      handler (val){
        console.log('lastName', val);
      }
    },
    'form.email': function (val) {
      console.log('form.email', val);
    },
    form:  function (val) {
      console.log('form no deep', val);
    },
    form:  {
      deep: true,
      handler (val){
        console.log('form width deep true', val);
      }
    },
  },
  filters: {
    capitalize(value) {
      if (!value) return ''
      return value
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    },
    anotherFilter(val) {
      // console.log('another filter', val);
      return val
    }
  },
  methods: {
    submitConfirm(title) {
      // console.log('submit confirm', title);
      this.dialogTest = false
    }
  },
}
</script>
