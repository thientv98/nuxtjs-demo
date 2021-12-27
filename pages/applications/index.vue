<template>
  <div>
    <Header title="New Member">
      <template #button>
        <v-btn dark elevation="0">Delete</v-btn>
      </template>
    </Header>
    <div class="search-container">
      <v-col cols="12" sm="12" md="4" lg="3" class="px-0">
        <v-text-field
          prepend-inner-icon="ic ic--search mt-0"
          hide-details
          outlined
          placeholder="Search by Name, Email"
        >
        </v-text-field>
      </v-col>
      <div class="tabs">
        <v-btn elevation="0" height="38px" class="v-btn--primary mr-3">
          BC
        </v-btn>
        <v-btn
          elevation="0"
          height="38px"
          outlined
          class="v-btn--outlined mr-3"
        >
          BIO</v-btn
        >
        <v-btn elevation="0" height="38px" outlined class="btn-outlined">
          RE</v-btn
        >
      </div>
    </div>
    <template>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="desserts"
        :single-select="singleSelect"
        item-key="name"
        show-select
        hide-default-footer
        class="elevation-0"
      >
        <template v-slot:item.action="{ item }">
          <DialogApplicantionsDetails :dialog="isDialogDetails" />
        </template>
      </v-data-table>
    </template>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  data() {
    return {
      isDialogDetails: false,
      singleSelect: true,
      selected: [],
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Category',
          align: 'start',
          sortable: false,
          value: 'category',
        },
        {
          text: 'Email',
          align: 'center',
          sortable: false,
          value: 'email',
        },
        {
          text: 'Phone Number',
          align: 'start',
          sortable: false,
          value: 'phoneNumber',
        },
        {
          text: 'Password',
          align: 'start',
          sortable: false,
          value: 'password',
        },

        { text: '', value: 'action', sortable: false },
      ],
      desserts: [
        {
          name: 'Boo youngji',
          category: 'BC',
          email: 'Young.boo@thecollectivec.com',
          phoneNumber: '+82.10.3097.2259',
          password: 'sdkjfojw1241',
        },
        {
          name: 'Boo youngji',
          category: 'BC',
          email: 'Young.boo@thecollectivec.com',
          phoneNumber: '+82.10.3097.2259',
          password: 'sdkjfojw1241',
        },
      ],
    }
  },
})
</script>

<style></style>
