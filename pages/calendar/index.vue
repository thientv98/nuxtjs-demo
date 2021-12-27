<template>
  <div>
    <Header title="Calendar" />
    <v-row>
      <v-col cols="12" lg="4">
        <v-btn elevation="0" height="38px" class="mr-3 mb-3"
          :class="filter.group_id === '' ? 'v-btn--primary' : 'v-btn--outlined'"
          :outlined="filter.group_id !== ''"
          @click="filter.group_id = ''">
          All
        </v-btn>
        <template v-for="item in groups">
          <v-btn elevation="0" :key="item.id" height="38px" class="mr-3 mb-3"
            :class="filter.group_id === item.id ? 'v-btn--primary' : 'v-btn--outlined'"
            :outlined="filter.group_id !== item.id"
            @click="filter.group_id = item.id">
            {{item.title}}
          </v-btn>
        </template>

        <template v-for="(item, i) in tasks">
          <CardTaskList :item="item" :key="i"/>
        </template>
      </v-col>
      <v-col cols="12" lg="8" class="pt-0">
        <CardCalendar :tasks="tasks" @updateFilter="updateFilter" />
      </v-col>
    </v-row>
    <LoadingOverlay :overlay="loading" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Util from "@/util"
import dayjs from 'dayjs'

export default defineComponent({
  data() {
    return {
      items: [
        {
          title: 'Thxcar',
          des: 'Thxcar meeting',
          timeout: '15 mins',
          date: 'OCT',
          month: '26th',
        },
        {
          title: 'Thxcar',
          des: 'Thxcar meeting',
          timeout: '15 mins',
          date: 'OCT',
          month: '26th',
        },
        {
          title: 'Thxcar',
          des: 'Thxcar meeting',
          timeout: '15 mins',
          date: 'OCT',
          month: '26th',
        },
        {
          title: 'Thxcar',
          des: 'Thxcar meeting',
          timeout: '15 mins',
          date: 'OCT',
          month: '26th',
        },
        {
          title: 'Thxcar',
          des: 'Thxcar meeting',
          timeout: '15 mins',
          date: 'OCT',
          month: '26th',
        },
      ],
      tasks: [],
      filter: {
        group_id: '',
        start_at: dayjs().startOf('month').format('YYYY-MM-DD'),
        end_at: dayjs().endOf('month').format('YYYY-MM-DD'),
      },
      groups: [],
      loading: false,
    }
  },
  mounted() {
    this.fetchTask()
    this.fetchCategory()
  },
  watch: {
    'filter.group_id': function (val) {
      this.fetchTask()
    },
    'filter.start_at': function (val) {
      this.fetchTask()
    },
    'filter.end_at': function (val) {
      this.fetchTask()
    }
  },
  methods: {
    fetchCategory() {
      this.$axios.get('/group/all')
      .then(res => {
        this.groups = res.data.data.groups
      })
    },
    fetchTask() {
      this.loading = true
      const queryString = Util.serializeObj({ ...this.options, ...this.filter});

      this.$axios.get('/task-calendar?'+queryString)
      .then(res => {
        this.tasks = res.data.data.tasks
        this.loading = false
      })
    },
    updateFilter(start, end) {
      let filter = { ...this.filter }
      filter.start_at = start
      filter.end_at = end
      this.filter = filter
    }
  }
})
</script>

<style></style>
