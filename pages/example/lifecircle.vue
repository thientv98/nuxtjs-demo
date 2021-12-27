<template>
  <div>
    <div style="max-width: 500px" id="test">
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

      <div>
        {{firstName}} {{lastName}}
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: 'thien',
      lastName: 'van',
    }
  },
  beforeCreate() {
    console.log('Ta là nhất', this.$route);
  },
  created() {
    console.log('created', this.firstName, document.getElementById('test'));
    console.log(process.env.baseURL);
  },
  beforeMount() {
    console.log('beforeMount');
  },
  mounted() {
    console.log('mounted', document.getElementById('test'));
  },
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  updated() {
    console.log('updated');
  },
  beforeDestroy() {
    console.log('beforeDestroy');
  },
  destroyed() {
    console.log('destroyed');
  }
}
</script>
