<template>
  <div style="margin-bottom: 50px">
    <div>
      Message: {{msg}}
    </div>
    <hr>
    <div v-if="showMsg" class="mt-3">
      v-if: {{msg}}
      ádasd
    </div>
    <div v-show="showMsg">
      v-show: {{msg}}
    </div>

    <div class="my-3">
      <v-btn outlined color="primary" @click="showMsg = !showMsg">
        Toggle Show
      </v-btn>
    </div>
    <hr>


    <div :class="{ 'active-id': classActive }" :style="{fontSize: fontSize + 'px'}" class="mt-3">
      Class - Style
    </div>
    <hr>

    <div class="mt-3">
      v-for
      <ul>
        <li v-for="(item, index) in 5" :key="index"> {{item}}</li>
      </ul>
    </div>

    <div>
      <v-list three-line>
        <template v-for="(item, index) in listItem">
          <v-subheader
            v-if="item.header"
            :key="item.header"
            v-text="item.header"
          ></v-subheader>

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="item.inset"
          ></v-divider>

          <v-list-item
            v-else
            :key="item.title"
          >
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
              <!-- <img :src="item.avatar" alt=""> -->
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{item.title}}</v-list-item-title>
              <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </div>

    <div>
      <ul>
        <!-- <template > -->
          <li v-for="(item, index) in listItem" :key="index">
            <template v-if="index != 0">
              {{item.title}} <br>
              {{item.subtitle}}
            </template>
          </li>
        <!-- </template> -->
      </ul>
    </div>

    <hr>
    <div class="mt-3">
      On click Count: {{count}}

      <div class="mt-3">
        <v-btn outlined color="primary" @click="count++">Plus</v-btn>
        <v-btn outlined color="primary" @click="count = 0">Reset</v-btn>
      </div>
    </div>

    <hr>

    <div class="mt-3">
      <div>Text: {{text}}</div>
      <input type="text" v-model="text" placeholder="Enter text">
    </div>

    <div class="mt-3" v-html="rawHtml"></div>

    <div class="mt-3" style="max-width: 500px">
      <v-text-field
        hide-details
        outlined
        placeholder="Name"
        v-model="form.name"
      >
      </v-text-field>

      <v-text-field
        hide-details
        outlined
        placeholder="Email"
        v-model="form.email"
        class="mt-3"
      >
      </v-text-field>

      <v-textarea
        hide-details
        outlined
        placeholder="Description"
        v-model="form.description"
        class="mt-3"
      >
      </v-textarea>

      <v-btn outlined color="primary" class="mt-3" @click="submitForm">Submit</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Xin chao",
      showMsg: true,
      classActive: true,
      fontSize: 25,
      listItem: [
        // { header: 'Today' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: '<b>Brunch this weekend?</b>',
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        // { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        // { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        // { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        // { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
      count: 0,
      text: '',
      rawHtml: "<b>Xin chao</b>",
      form: {},
      name: '',
      email: '',
      description: '',
    }
  },
  methods: {
    reset() {
      console.log('before',this.count)
      this.count = 0
      console.log('after',this.count)
    },
    submitForm() {
      console.log(this.form)
    }
  }
}
</script>
