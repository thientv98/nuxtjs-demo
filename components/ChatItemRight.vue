<template>
  <div class="d-flex justify-end">
    <v-list class="list-message">
      <v-list-item class="d-flex align-start pb-4">
        <div class="w-100">
          <div class="pb-2 fs-10 d-flex justify-end">
            {{ message.name }},
            {{
              message.messages && message.messages.length > 0
                ? formatDateToday(message.messages[0].created_at)
                : ''
            }}
          </div>
          <div
            v-for="(item, i) in message.messages"
            :key="i"
            class="d-flex justify-end"
            :id="'message-' + item.id"
          >
            <div class="content">
              <span v-if="item.type === 'MESSAGE' || item.type === 'CONTACT_PHONE'" v-html="item.content"></span>
              <span v-if="item.type === 'FILE' && item.file">
                <a :href="item.file.file_url" target="_blank">{{
                  item.file.file_name
                }}</a>
              </span>
              <img
                :src="item.file.file_url"
                alt=""
                v-if="item.type === 'IMAGE' && item.file"
              />
              <video
                width="320"
                height="240"
                controls
                v-if="item.type === 'VIDEO' && item.file"
              >
                <source :src="item.file.file_url" />
              </video>
              <audio controls v-if="item.type === 'VOICE' && item.file">
                <source :src="item.file.file_url">
              </audio>
              <span v-if="item.type === 'CONTACT_APP'">{{
                  item.business_card
                    ? (item.business_card.first_name || '') +
                      ' ' +
                      (item.business_card.last_name || '')
                    : ''
                }}
              </span>
            </div>
          </div>
        </div>
      </v-list-item>
    </v-list>
  </div>
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
                'Lorem Ipsum has been the industrys standard dummy text ever since the asdsd',
            },
            {
              content:
                'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
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
      padding: 8px;
      display: inline-flex;
      background-color: #fff4d1 !important;
      margin-bottom: 4px !important;
      border-radius: 16px;
    }
    span {
      font-size: 11px !important;
    }
  }
}
.content {
  span {
    word-break: break-all;
    white-space: pre-line;
  }
  img {
    max-width: 200px;
  }
}
</style>
