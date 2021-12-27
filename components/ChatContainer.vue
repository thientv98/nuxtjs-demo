<template>
  <v-card outlined>
    <div class="d-flex px-6 py-4 align-center header--body-chat">
      <Avatar size="52" :src="room.thumbnail_url" />
      <h2 class="pl-4">
        {{ room.title }}
        <span class="grey--text">
          {{ room.users ? room.users.length : '' }}
        </span>
      </h2>
    </div>
    <hr />
    <v-card-text class="body-chat" id="chat-scroll" @scroll="onChatScroll">
      <template v-for="(item, index) in listMessages">
        <div :key="index">
          <div class="d-flex justify-center my-1" v-if="item.type === 'date'">
            <v-chip small class="white--text grey lighten-2">{{
              formatDate(item.date, 'dddd, DD MMMM')
            }}</v-chip>
          </div>
          <div v-else>
            <div v-if="['IMPORTANT', 'MESSAGE_ADD_MEMBER', 'MESSAGE_KICK_MEMBER'].includes(item.type)" class="d-flex justify-center">
              <div class="my-3" v-if="item.type === 'IMPORTANT'">
                <div class="fs-12 fw-bold pr-2 text-center pb-1">
                  {{ item.user ? item.user.name : ''}}, <span class="fs-10">{{formatDateToday(item.created_at)}}</span>
                </div>
                <div class="message-important ma-auto" :id="`message-${item.id}`">
                  {{ item.content }}
                </div>
              </div>
              <div v-else>
                <div class="mx-auto mt-3" :id="`message-${item.id}`">
                  {{ item.content }}
                </div>
              </div>
            </div>
            <div v-else>
              <div v-if="$auth.user.id === item.id">
                <ChatItemRight :message="item" />
              </div>
              <div v-else>
                <ChatItem :message="item" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </v-card-text>
    <!-- <hr /> -->
    <!-- <div class="d-flex align-center">
      <v-text-field
        solo
        hide-details
        rounded
        flat
        placeholder="Type your message here"
      >
      </v-text-field>
      <div class="pr-4">
        <v-btn icon class="orange"> <i class="ic ic--send ml-1"></i></v-btn>
      </div>
    </div> -->
  </v-card>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import Util from '@/util'

export default defineComponent({
  props: {
    room: {
      type: Object,
    },
    messages: {
      type: Object,
    },
    chat: {
      type: Object,
    },
  },
  data() {
    return {
      lastScroll: 0,
    }
  },
  computed: {
    listMessages() {
      let data = []
      let lastUser = {}
      let messageUser = []
      let lastDate = ''
      let lastDateSeparate = ''
      if (this.messages.data.length > 0) {
        lastUser = this.messages.data[0].user
        lastDate = this.messages.data[0].created_at
        lastDateSeparate = this.messages.data[0].created_at
      }
      this.messages.data.map((message, index) => {
        if (
          lastUser.id !== message.user.id ||
          dayjs(lastDate).add(1, 'minutes') < dayjs(message.created_at) ||
          dayjs(lastDateSeparate).format('YYYY-MM-DD') != dayjs(message.created_at).format('YYYY-MM-DD') ||
          ['IMPORTANT', 'MESSAGE_ADD_MEMBER', 'MESSAGE_KICK_MEMBER'].includes(message.type)
        ) {
          if (messageUser.length > 0) {
            let tmp = { ...lastUser }
            tmp.messages = messageUser
            data.push(tmp)
          }

          if (
            dayjs(lastDateSeparate).format('YYYY-MM-DD') != dayjs(message.created_at).format('YYYY-MM-DD')
          ) {
            data.push({
              id: index,
              type: 'date',
              date: lastDateSeparate,
            })

            lastDateSeparate = message.created_at
          }

          messageUser = []
          lastUser = message.user
          lastDate = message.created_at
        }
        if (['IMPORTANT', 'MESSAGE_ADD_MEMBER', 'MESSAGE_KICK_MEMBER'].includes(message.type)) {
          data.push(message)
        } else {
          messageUser.push(message)
        }
      })

      if (this.messages.data.length > 0) {
        if (messageUser.length > 0) {
          let tmp = { ...lastUser }
          tmp.messages = messageUser
          data.push(tmp)
        }
      }
      return data
    },
  },
  methods: {
    scrollToBottom() {
      setTimeout(() => {
        const element = document.getElementById('chat-scroll')
        if (element) element.scrollTop = element.scrollHeight
      }, 150)
    },
    onChatScroll() {
      const element = document.getElementById('chat-scroll')
      if (element) {
        if (element.scrollTop === 0 && this.lastScroll > element.scrollTop) {
          if (this.messages.meta.current_page < this.messages.meta.last_page) {
            this.chat.page += 1
            this.$emit('fetchMessages', true)
          }
        }
        this.lastScroll = element.scrollTop
      }
    },
    formatDate(date, format) {
      return dayjs(date).format(format)
    },
    formatDateToday(time) {
      return Util.formatDateToday(time)
    },
  },
})
</script>
<style lang="scss" scoped>
.v-text-field > .v-input__control > .v-input__slot:before {
  border: 0px solid !important;
  border-style: none !important;
}
.v-btn {
  border-radius: 50% !important;
}
.v-text-field--solo {
  font-size: var(--fs12);
}
.body-chat {
  height: 71vh !important;
  overflow-y: auto !important;
  @media all and(max-width: 767px) {
    padding: 10px 0 !important;
  }
}
.header--body-chat {
  @media all and(max-width: 767px) {
    padding: 10px 10px !important;
  }
}
.message-important {
  color: red;
  font-size: var(--fs13);
  word-break: break-all;
  // white-space: pre-line;
  background-color: #efefef;
  border-radius: 16px;
  text-align: center;
  padding: 8px 10px;
  width: 80%;
  // display: flex;
  // justify-content: center;
}
</style>
