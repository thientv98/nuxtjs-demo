<template>
  <div>
    <v-list-item>
      <v-sheet class="box-date">
        <div class="box-date__month">
          {{ formatDate(item.start_at, 'MMM') }}
        </div>
        <div class="box-date__date">
          {{ formatDate(item.start_at, 'D') }}
        </div>
      </v-sheet>
      <v-list-item-content>
        <div class="pl-3 d-flex">
          <div>
            <div
              v-text="item.title"
              class="fw-bold fs-12 mb-1 line-clamp-1"
            ></div>
            <div class="fs-16 mb-1 fw-bold orange--text py-0">
              {{ getTimeRange(item.start_at, item.end_at) }}
            </div>
            <span v-html="item.content" class="task__content"></span>
          </div>
        </div>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import Util from '@/util'

export default defineComponent({
  props: {
    item: Object,
  },
  methods: {
    formatDate(date, format) {
      if (date) {
        if (format === 'D') {
          const nth = Util.getNth(dayjs(date).format('D'))
          return dayjs(date).format(format) + nth
        } else {
          return dayjs(date).format(format)
        }
      }
      return ''
    },
    getTimeRange(start, end) {
      return Util.getTimeRange(start, end)
    },
  },
})
</script>

<style lang="scss" scoped>
.v-list-item {
  border: 1px solid var(--cl-bd) !important;
  border-radius: 10px !important;
  margin-bottom: 12px !important;
  height: 80px !important;
  padding-left: 10px !important;
}
.task__content {
  display: flex;
  overflow: hidden;
  display: -webkit-box;
  font-size: 12px;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  line-height: 18px;
  color: rgb(104, 104, 104);
}
.box-date {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #fff3eb !important;

  &__month {
    display: flex;
    justify-content: center;
    text-transform: uppercase !important;
    font-size: 9px;
  }

  &__date {
    display: flex;
    justify-content: center;
    font-size: 18px;
    font-weight: 500;
  }
}
</style>
