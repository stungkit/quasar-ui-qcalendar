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
      <div style="display: flex; max-width: 800px; width: 100%; height: 400px">
        <q-calendar-scheduler
          ref="calendar"
          v-model="selectedDate"
          v-model:model-resources="resources"
          view="week"
          :hoverable="hoverable"
          :focusable="focusable"
          :focus-type="focusType"
          animated
          bordered
          style="max-width: 800px; width: 100%"
          @change="onChange"
          @moved="onMoved"
          @click-date="onClickDate"
          @click-day-resource="onClickDayResource"
          @click-resource="onClickResource"
          @click-head-resources="onClickHeadResources"
          @click-head-day="onClickHeadDay"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QCalendarScheduler, today, Timestamp } from '@quasar/quasar-ui-qcalendar'
import '@quasar/quasar-ui-qcalendar/index.css'

import { ref, reactive, watch } from 'vue'
import NavigationBar from 'components/NavigationBar.vue'


const calendar = ref<QCalendarScheduler>(),
  selectedDate = ref(today()),
  hoverable = ref(true),
  focusable = ref(true),
  focusType = ref([]),
  options = ref(['day', 'weekday', 'date', 'resource']),
  resources = reactive([
    { id: 1, label: 'John' },
    { id: 2, label: 'Mary' },
    { id: 3, label: 'Susan' },
    { id: 4, label: 'Olivia' },
    { id: 5, label: 'Board Room' },
    { id: 6, label: 'Room-1' },
    { id: 7, label: 'Room-2' },
  ])

watch(hoverable, (val) => {
  console.log(`hoverable: ${val}`)
})
watch(focusable, (val) => {
  console.log(`focusable: ${val}`)
})

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
function onClickDayResource(data: Timestamp) {
  console.log('onClickDayResource', data)
}
function onClickResource(data: Timestamp) {
  console.log('onClickResource', data)
}
function onClickHeadResources(data: Timestamp) {
  console.log('onClickHeadResources', data)
}
function onClickHeadDay(data: Timestamp) {
  console.log('onClickHeadDay', data)
}
</script>
