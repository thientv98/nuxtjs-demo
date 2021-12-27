<template>
  <v-row class="fill-height calender-container">
    <v-col>
      <v-sheet height="64" class="px-0">
        <v-toolbar flat class="">
          <v-toolbar-title v-if="$refs.calendar">
            <h6>
              {{ $refs.calendar.title }}
            </h6>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- Visable on Large screen  -->
          <div class="d-none d-sm-flex">
            <v-btn-toggle color="primary" class="btn-group">
              <v-btn
                color="white"
                :class="type === 'month' ? 'v-btn--active' : ''"
                class="rounded-left"
                @click="type = 'month'"
              >
                Month</v-btn
              >
              <v-btn
                color="white"
                :class="type === 'week' ? 'v-btn--active' : ''"
                class=""
                @click="type = 'week'"
                >Week</v-btn
              >
              <v-btn
                color="white"
                :class="type === 'day' ? 'v-btn--active' : ''"
                class=""
                @click="type = 'day'"
                >Day</v-btn
              >
              <v-btn
                color="white"
                :class="type === '4day' ? 'v-btn--active' : ''"
                class="rounded-right"
                @click="type = '4day'"
                >List</v-btn
              >
            </v-btn-toggle>
          </div>
          <v-spacer></v-spacer>
          <div class="d-flex">
            <v-btn-toggle class="btn-group-chevron">
              <v-btn
                fab
                icon
                small
                color="white"
                class="rounded-left"
                @click="prev"
              >
                <v-icon small> mdi-chevron-left </v-icon>
              </v-btn>
              <v-btn
                fab
                text
                small
                color="white"
                class="rounded-right"
                @click="next"
              >
                <v-icon small> mdi-chevron-right </v-icon>
              </v-btn>
            </v-btn-toggle>
            <div class="pl-2">
              <v-btn
                elevation="0"
                color="white"
                outlined
                class="black--text"
                @click="setToday"
                >Today</v-btn
              >
            </div>
          </div>
        </v-toolbar>
      </v-sheet>
      <div class="d-flex d-sm-none justify-center pb-4">
        <v-btn-toggle color="primary" class="btn-group">
          <v-btn
            color="white"
            active-class="primary"
            class="rounded-left"
            @click="type = 'month'"
          >
            Month</v-btn
          >
          <v-btn
            color="white"
            active-class="primary"
            class=""
            @click="type = 'week'"
            >Week</v-btn
          >
          <v-btn
            color="white"
            active-class="primary"
            class=""
            @click="type = 'day'"
            >Day</v-btn
          >
          <v-btn
            color="white"
            active-class="primary"
            class="rounded-right"
            @click="type = '4day'"
            >List</v-btn
          >
        </v-btn-toggle>
      </div>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <!-- <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn> -->
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <!-- <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn> -->
            </v-toolbar>
            <v-card-text>
              <div>
                {{selectedEvent.content}}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    tasks: {
      type: Array,
    }
  },
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      'blue',
      'indigo',
      'deep-purple',
      'cyan',
      'green',
      'orange',
      'grey darken-1',
    ],
    names: ['Birthday', 'Conference', 'Party'],
  }),
  watch: {
    tasks:  function (val) {
      let events = []
      this.tasks.map(item => {
        events.push({
          name: item.title,
          start: new Date(item.start_at),
          end: new Date(item.end_at),
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: true,
          content: item.content,
          start_at: item.start_at,
          end_at: item.end_at
        })
      })

      this.events = events
    },
  },
  mounted() {
    this.$refs.calendar.checkChange()
  },
  methods: {
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        )
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange({ start, end }) {
      this.$emit('updateFilter', start.date, end.date)
      // const events = []

      // const min = new Date(`${start.date}T00:00:00`)
      // const max = new Date(`${end.date}T23:59:59`)
      // const days = (max.getTime() - min.getTime()) / 86400000
      // const eventCount = this.rnd(days, days + 20)

      // for (let i = 0; i < eventCount; i++) {
      //   const allDay = this.rnd(0, 3) === 0
      //   const firstTimestamp = this.rnd(min.getTime(), max.getTime())
      //   const first = new Date(firstTimestamp - (firstTimestamp % 900000))
      //   const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
      //   const second = new Date(first.getTime() + secondTimestamp)

      //   events.push({
      //     name: this.names[this.rnd(0, this.names.length - 1)],
      //     start: first,
      //     end: second,
      //     color: this.colors[this.rnd(0, this.colors.length - 1)],
      //     timed: !allDay,
      //   })
      // }
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },
})
</script>

<style lang="scss" scoped>
.calender-container {
  .theme--light.v-calendar-weekly {
    background-color: #ffffff;
    border-top: #edf2f7 1px solid;
    border-left: #edf2f7 1px solid;
    border-radius: 10px !important;
    &.v-calendar-weekly__day .v-past {
      border-right: #edf2f7 1px solid !important;
      border-bottom: #edf2f7 1px solid !important;
    }
  }
  .theme--light.v-calendar-weekly .v-calendar-weekly__day {
    border-right: #edf2f7 1px solid !important;
    border-bottom: #edf2f7 1px solid !important;
    color: #000000;
  }
  .v-calendar-weekly__week {
    border: 1px solid #ffffff !important;
  }
  .btn-group {
    border-radius: 10px !important;
    .v-btn {
      border-radius: 0px !important;
      width: 80px !important;
      height: 36px !important;
    }
    .rounded-left {
      border-top-left-radius: 10px !important;
      border-bottom-left-radius: 10px !important;
    }
    .rounded-right {
      border-top-right-radius: 10px !important;
      border-bottom-right-radius: 10px !important;
    }
    .v-btn--active {
      background-color: #1d40aa !important;
      color: #ffffff !important;
    }
  }
  .btn-group-chevron {
    border: 0px solid !important;
    .v-btn {
      border-radius: 0px !important;
      height: 36px !important;
    }
    .rounded-left {
      border-top-left-radius: 10px !important;
      border-bottom-left-radius: 10px !important;
    }
    .rounded-right {
      border-top-right-radius: 10px !important;
      border-bottom-right-radius: 10px !important;
    }
  }
  .theme--light.v-btn-toggle:not(.v-btn-toggle--group) .v-btn.v-btn {
    border-color: #edf2f7 !important;
  }
  .v-btn {
    border-color: #edf2f7 !important;
    color: #999 !important;
  }
}
</style>
