<template>
  <div class="subcontent">
    <navigation-bar @today="onToday" @prev="onPrev" @next="onNext" />

    <div style="display: flex; justify-content: center; align-items: center; flex-wrap: nowrap">
      <div style="display: flex; max-width: 280px; width: 100%">
        <q-calendar-month
          ref="calendar"
          v-model="selectedDate"
          animated
          bordered
          mini-mode
          dark
          @change="onChange"
          @moved="onMoved"
          @click-date="onClickDate"
          @click-day="onClickDay"
          @click-workweek="onClickWorkweek"
          @click-head-workweek="onClickHeadWorkweek"
          @click-head-day="onClickHeadDay"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QCalendarMonth, today, Timestamp } from '@quasar/quasar-ui-qcalendar'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.scss'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.scss'
import '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.scss'

import { ref } from 'vue'
import NavigationBar from 'components/NavigationBar.vue'
import { type QCalendarMonth as IQCalendarMonth } from '@quasar/quasar-ui-qcalendar/dist/types'

const calendar = ref<IQCalendarMonth>()
const selectedDate = ref(today())

function onToday() {
  if (calendar.value) {
    calendar.value.moveToToday()
  }
}
function onPrev() {
  if (calendar.value) {
    calendar.value.prev()
  }
}
function onNext() {
  if (calendar.value) {
    calendar.value.next()
  }
}
function onMoved(data: Timestamp) {
  console.log('onMoved', data)
}
function onChange(data: { start: Timestamp; end: Timestamp; days: Timestamp[] }) {
  console.log('onChange', data)
}
function onClickDate(data: Timestamp) {
  console.log('onClickDate', data)
}
function onClickDay(data: Timestamp) {
  console.log('onClickDay', data)
}
function onClickWorkweek(data: Timestamp) {
  console.log('onClickWorkweek', data)
}
function onClickHeadDay(data: Timestamp) {
  console.log('onClickHeadDay', data)
}
function onClickHeadWorkweek(data: Timestamp) {
  console.log('onClickHeadWorkweek', data)
}
</script>
