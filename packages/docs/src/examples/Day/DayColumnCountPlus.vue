<template>
  <div class="subcontent">
    <navigation-bar @today="onToday" @prev="onPrev" @next="onNext" />

    <div class="row justify-center">
      <span style="font-size: 18px; font-weight: 800">{{ selectedDate }}</span>
      <div style="display: flex; max-width: 800px; width: 100%; height: 400px">
        <q-calendar-day
          ref="calendar"
          v-model="selectedDate"
          view="day"
          :column-count="4"
          bordered
          animated
          @change="onChange"
          @moved="onMoved"
          @click-date="onClickDate"
          @click-time="onClickTime"
          @click-interval="onClickInterval"
          @click-head-intervals="onClickHeadIntervals"
          @click-head-day="onClickHeadDay"
        >
          <template #head-day="{ scope }">
            <div style="text-align: center; font-weight: 800">
              {{ persons[scope.columnIndex]?.name }}
            </div>
          </template>
        </q-calendar-day>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QCalendarDay, today, Timestamp } from '@quasar/quasar-ui-qcalendar'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.scss'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.scss'
import '@quasar/quasar-ui-qcalendar/src/QCalendarDay.scss'
import { type QCalendarDay as IQCalendarDay } from '@quasar/quasar-ui-qcalendar/dist/types'

const calendar = ref<IQCalendarDay>()

import { ref } from 'vue'
import NavigationBar from 'components/NavigationBar.vue'

const selectedDate = ref(today())
const persons = ref([
  { name: 'James Smith' },
  { name: 'John Williams' },
  { name: 'David Miller' },
  { name: 'Linda Brown' },
])

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
function onClickTime(data: Timestamp) {
  console.log('onClickTime', data)
}
function onClickInterval(data: Timestamp) {
  console.log('onClickInterval', data)
}
function onClickHeadIntervals(data: Timestamp) {
  console.log('onClickHeadIntervals', data)
}
function onClickHeadDay(data: Timestamp) {
  console.log('onClickHeadDay', data)
}
</script>
