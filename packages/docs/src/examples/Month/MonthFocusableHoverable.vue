<template>
  <div class="subcontent">
    <navigation-bar @today="onToday" @prev="onPrev" @next="onNext" />

    <div style="display: flex; justify-content: center; align-items: center">
      <q-checkbox v-model="hoverable" label="Hoverable" />

      <q-checkbox v-model="focusable" label="Focusable" />

      <q-select
        v-model="focusType"
        label="Focus Type"
        outlined
        dense
        multiple
        map-options
        emit-value
        options-dense
        :options="options"
        class="button"
        style="min-width: 180px"
      />
    </div>

    <div class="row justify-center">
      <div style="display: flex; max-width: 800px; width: 100%">
        <q-calendar-month
          ref="calendar"
          v-model="selectedDate"
          :hoverable="hoverable"
          :focusable="focusable"
          :focus-type="focusType"
          :day-min-height="40"
          animated
          bordered
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
import '@quasar/quasar-ui-qcalendar/index.css'

import { ref, watch } from 'vue'
import NavigationBar from 'components/NavigationBar.vue'


const calendar = ref<QCalendarMonth>(),
  selectedDate = ref(today()),
  hoverable = ref(true),
  focusable = ref(true),
  focusType = ref([]),
  options = ref(['day', 'weekday', 'date'])

watch(hoverable, (val) => {
  console.log(`hoverable: ${val}`)
})
watch(focusable, (val) => {
  console.log(`focusable: ${val}`)
})
// watch(focusTypeSelection, (val) => {
//   const index = focusType.value.indexOf(val)
// if (index > -1) {
//   focusType.value.splice(index, 1)
// } else {
//   focusType.value.push(val)
// }
// console.log('focusType', focusType.value)
// })

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
