<template>
  <div class="subcontent">
    <div class="line">
      This example uses the <code class="example-token">use-navigation</code> property along with
      the <code class="example-token">focusable</code> and
      <code class="example-token">focus-type</code> properties.<br />
      If the calendar has focus you can use the <kbd>&larr;</kbd> and <kbd>&rarr;</kbd> keys on your
      keyboard for navigation.<br />
      On the intervals, you can use <kbd>Tab</kbd> and <kbd>Shift</kbd>+<kbd>Tab</kbd> for
      navigation.
    </div>

    <navigation-bar @today="onToday" @prev="onPrev" @next="onNext" />

    <div class="row justify-center">
      <div style="display: flex; max-width: 800px; width: 100%; height: 400px">
        <q-calendar-day
          ref="calendar"
          v-model="selectedDate"
          view="month"
          use-navigation
          hoverable
          focusable
          :focus-type="['interval', 'weekday']"
          animated
          bordered
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
import { QCalendarDay, today, Timestamp } from '@quasar/quasar-ui-qcalendar/src'
import '@quasar/quasar-ui-qcalendar/dist/index.css'
import { ref } from 'vue'
import NavigationBar from 'components/NavigationBar.vue'
import { type QCalendarDay as IQCalendarDay } from '@quasar/quasar-ui-qcalendar/dist/types'

const calendar = ref<IQCalendarDay>(),
  selectedDate = ref(today())

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
function onChange(data: { start: string; end: string; days: Timestamp[] }) {
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
