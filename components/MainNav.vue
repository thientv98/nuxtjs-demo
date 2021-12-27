<template>
  <div id="nav">
    <v-card
      dense
      elevation="0"
      class="d-flex d-lg-none justify-space-between align-center orange"
    >
      <v-app-bar-nav-icon
        class="d-flex white--text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-app-bar-title class="mx-auto">
        <NuxtLink to="/">
          <div class="d-flex justify-center">
            <i class="ic ic--logo"></i>
          </div>
        </NuxtLink>
      </v-app-bar-title>
      <ProfileMobile :userProfile="userProfile" />
    </v-card>

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      color="orange"
    >
      <NuxtLink to="/">
        <div class="logo">
          <i class="ic ic--logo"></i>
        </div>
      </NuxtLink>
      <v-list class="nav-bar">
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          active-class="orange--text"
          append-icon=""
          no-action
        >
          <template v-slot:activator>
            <NuxtLink :to="item.to" class="links">
              <v-list-item-content>
                <v-list-item-title
                  v-text="item.name"
                  class="py-1"
                ></v-list-item-title>
              </v-list-item-content>
            </NuxtLink>
          </template>
          <div :class="{ 'pb-2': item.childs }">
            <div
              v-for="child in item.childs"
              :key="child.name"
              class="pb-2 pl-7"
            >
              <NuxtLink :to="child.to">
                <p class="fs-12 mb-1 fw-500" v-text="child.name"></p>
              </NuxtLink>
            </div>
          </div>
        </v-list-group>
      </v-list>
      <Profile :userProfile="userProfile" />
    </v-navigation-drawer>
    <loading-overlay :overlay="loading" />
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'
import LoadingOverlay from './LoadingOverlay.vue'
export default defineComponent({
  components: { LoadingOverlay },
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      active: false,
      loading: false,
      userProfile: this.$store.getters.user,
      error: '',
      items: [
        {
          name: 'Dashboard',
          to: '/',
          active: true,
        },
        {
          name: 'File Manager',
          to: '/file-manager/images',
          active: false,
          childs: [
            { id: 2, name: 'Images', to: '/file-manager/images' },
            { id: 3, name: 'Videos', to: '/file-manager/videos' },
            { id: 4, name: 'Documents', to: '/file-manager/documents' },
          ],
        },
        {
          name: 'Calendar',
          to: '/calendar',
        },
        {
          name: 'Projects',
          to: '/applications/projects',
        },
        {
          name: 'Notification',
          to: '/notification',
        },
        {
          name: 'Category',
          to: '/category',
        },
        {
          name: 'Activity History',
          to: '/activity-history',
        },
        {
          name: 'Example',
          to: '/example',
        },
      ],

      miniVariant: false,
      right: true,
      rightDrawer: false,
    }
  },
  mounted() {
    // this.profile()
    this.setActive()
  },
  methods: {
    setActive() {
      let currUrl = this.$route.path
      if(currUrl[currUrl.length - 1] == '/') {
        currUrl = currUrl.substring(0, currUrl.length - 1)
      }
      this.items.map(menu => {
        if(menu.to === currUrl) {
          menu.active = true
        } else {
          menu.active = false
        }
        if(menu.childs) {
          menu.childs.map(child => {
            if(child.to === currUrl) {
              menu.active = true
            }
          })
        }
      })
    },
    async profile() {
      try {
        await this.$axios.get('/auth/me').then((res) => {
          this.userProfile = res.data.data.user
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
  setup() {
    const router = useRouter()
    const { $auth } = useContext()
    const state = reactive({
      active: false,
    })
    return {
      state,
    }
  },
})
</script>
<style lang="scss" scoped></style>
