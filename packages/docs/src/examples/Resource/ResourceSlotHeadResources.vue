<template>
  <div class="subcontent">
    <navigation-bar @today="onToday" @prev="onPrev" @next="onNext" />

    <div class="row justify-center">
      <div style="display: flex; max-width: 800px; width: 100%; height: 400px">
        <q-calendar-resource
          ref="calendar"
          v-model="selectedDate"
          v-model:model-resources="resources"
          resource-key="id"
          resource-label="name"
          animated
          bordered
          @change="onChange"
          @moved="onMoved"
          @resource-expanded="onResourceExpanded"
          @click-date="onClickDate"
          @click-time="onClickTime"
          @click-resource="onClickResource"
          @click-head-resources="onClickHeadResources"
          @click-interval="onClickInterval"
        >
          <template #head-resources="{ scope }">
            <div class="my-resource-header">
              {{ showDate(scope) }}
            </div>
          </template>
        </q-calendar-resource>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QCalendarResource, today, Timestamp } from '@quasar/quasar-ui-qcalendar'
import '@quasar/quasar-ui-qcalendar/index.css'

import { ref, reactive } from 'vue'
import NavigationBar from 'components/NavigationBar.vue'


interface Resource {
  id: string
  name: string
  expanded?: boolean
  children?: Resource[]
}

const calendar = ref<QCalendarResource>(),
  selectedDate = ref(today()),
  locale = ref('en-US'),
  resources = reactive<Resource[]>([
    { id: '1', name: 'John' },
    {
      id: '2',
      name: 'Board Room',
      expanded: false,
      children: [
        { id: '2.1', name: 'Room-1' },
        {
          id: '2.2',
          name: 'Room-2',
          expanded: false,
          children: [
            { id: '2.2.1', name: 'Partition-A' },
            { id: '2.2.2', name: 'Partition-B' },
            { id: '2.2.3', name: 'Partition-C' },
          ],
        },
      ],
    },
    { id: '3', name: 'Mary' },
    { id: '4', name: 'Susan' },
    { id: '5', name: 'Olivia' },
  ])

function showDate(scope: Timestamp) {
  if (scope.date) {
    const date = new Date(scope.date)
    /// @ts-expect-error ignore for now
    return monthFormatter().format(date)
  }
  return ''
}

function monthFormatter() {
  try {
    return new Intl.DateTimeFormat(locale.value || undefined, {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    })
  } catch {
    //
  }
}

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
function onResourceExpanded(data: Timestamp) {
  console.log('onResourceExpanded', data)
}
function onClickDate(data: Timestamp) {
  console.log('onClickDate', data)
}
function onClickTime(data: Timestamp) {
  console.log('onClickTime', data)
}
function onClickResource(data: Timestamp) {
  console.log('onClickResource', data)
}
function onClickHeadResources(data: Timestamp) {
  console.log('onClickHeadResources', data)
}
function onClickInterval(data: Timestamp) {
  console.log('onClickInterval', data)
}
</script>

<style lang="scss" scoped>
.my-resource-header {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 14px;
  font-weight: 700;
}
</style>
