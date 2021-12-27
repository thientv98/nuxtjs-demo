<template>
  <v-list class="list-message">
    <v-list-item class="d-flex align-start pb-4">
      <Avatar size="38" :src="message.avatar_url" />
      <div class="pl-3">
        <div class="d-flex align-center pb-2">
          <div class="fs-12 fw-bold pr-2">{{ message.name }},</div>
          <div class="fs-10">
            {{
              message.messages && message.messages.length > 0
                ? formatDateToday(message.messages[0].created_at)
                : ''
            }}
          </div>
        </div>
        <div
          v-for="(item, i) in message.messages"
          :key="i"
          :id="'message-' + item.id"
        >
          <v-card elevation="0" v-if="item.type === 'MESSAGE' || item.type === 'CONTACT_PHONE'" class="content">
            <span v-html="item.content"></span>
          </v-card>
          <v-card v-else elevation="0" class="content-media">
            <span v-if="item.type === 'FILE'" class="content">
              <a :href="item.file.file_url" target="_blank">{{
                item.file.file_name
              }}</a>
            </span>
            <img
              :src="item.file.file_url"
              alt=""
              v-if="item.type === 'IMAGE'"
            />
            <video
              width="400"
              height="240"
              controls
              v-if="item.type === 'VIDEO'"
            >
              <source :src="item.file.file_url" />
            </video>
            <audio controls v-if="item.type === 'VOICE'">
              <source :src="item.file.file_url">
            </audio>
            <span v-if="item.type === 'CONTACT_APP'" class="content">{{
                item.business_card
                  ? (item.business_card.first_name || '') +
                    ' ' +
                    (item.business_card.last_name || '')
                  : ''
              }}
            </span>
          </v-card>
        </div>
      </div>
    </v-list-item>
  </v-list>
</template>

<script>
import Util from '@/util'

export default {
  props: {
    message: {
      type: Object,
    },
  },
  data() {
    return {
      messages: [
        {
          user: 'Boo',
          time: '9:18 PM',
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
          messages: [
            {
              content:
                'Lorem Ipsum has been the industrys standard dummy text ever since',
            },
            {
              content:
                'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
            },
            {
              content: 'Lorem Ipsum is simply dummy text of the ',
            },
          ],
        },
      ],
    }
  },
  methods: {
    formatDateToday(time) {
      return Util.formatDateToday(time)
    },
  },
}
</script>

<style lang="scss" scoped>
.list-message {
  width: 460px !important;
  @media all and (max-width: 767px) {
    width: 320px !important;
  }
  .v-list-item {
    .content {
      padding: 10px;
      display: inline-flex;
      background-color: #efefef !important;
      margin-bottom: 4px !important;
      border-radius: 16px !important;
    }
    span {
      font-size: 11px !important;
    }
  }
}
.content-media {
  span {
    word-break: break-all;
    white-space: pre-line;
  }
  img {
    max-width: 400px;
    height: 240px;
  }
}
</style>
