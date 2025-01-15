<template>
  <div class="subcontent">
    <navigation-bar @today="onToday" @prev="onPrev" @next="onNext" />

    <div class="row justify-center">
      <div style="display: flex; max-width: 800px; width: 100%; height: 200px">
        <q-calendar-agenda
          ref="calendar"
          v-model="selectedDate"
          view="day"
          :column-count="3"
          :left-column-options="leftColumnOptions"
          :right-column-options="rightColumnOptions"
          column-options-id="id"
          column-options-label="label"
          :day-min-height="200"
          bordered
          animated
          @change="onChange"
          @moved="onMoved"
          @click-date="onClickDate"
          @click-time="onClickTime"
          @click-interval="onClickInterval"
          @click-head-intervals="onClickHeadIntervals"
          @click-head-day="onClickHeadDay"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QCalendarAgenda, today } from '@quasar/quasar-ui-qcalendar/src'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.scss'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.scss'
import '@quasar/quasar-ui-qcalendar/src/QCalendarAgenda.scss'

import NavigationBar from 'components/NavigationBar.vue'
import { type QCalendarAgenda as IQCalendarAgenda } from '@quasar/quasar-ui-qcalendar/dist/types'

const selectedDate = ref(today())
const leftColumnOptions = ref([
  {
    id: 'overdue',
    label: 'Overdue',
  },
])
const rightColumnOptions = ref([
  {
    id: 'summary',
    label: 'Summary',
  },
])
const calendar = ref<IQCalendarAgenda>()

const onChange = (date: string) => {
  console.log('Date changed:', date)
}

const onMoved = (date: string) => {
  console.log('Date moved:', date)
}

const onClickDate = (date: string) => {
  console.log('Date clicked:', date)
}

const onClickTime = (time: string) => {
  console.log('Time clicked:', time)
}

const onClickInterval = (interval: string) => {
  console.log('Interval clicked:', interval)
}

const onClickHeadIntervals = (interval: string) => {
  console.log('Head intervals clicked:', interval)
}

const onClickHeadDay = (day: string) => {
  console.log('Head day clicked:', day)
}

const onToday = () => {
  if (calendar.value) {
    calendar.value.moveToToday()
  }
}

const onPrev = () => {
  if (calendar.value) {
    calendar.value.prev()
  }
}

const onNext = () => {
  if (calendar.value) {
    calendar.value.next()
  }
}
</script>
