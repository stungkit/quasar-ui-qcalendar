<template>
  <div class="subcontent">
    <navigation-bar @today="onToday" @prev="onPrev" @next="onNext" />

    <div style="display: flex; justify-content: center">
      <q-select
        v-model="locale"
        label="Choose a locale"
        outlined
        dense
        map-options
        emit-value
        options-dense
        :options="locales"
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
          :locale="locale"
          animated
          bordered
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

import { ref, reactive } from 'vue'
import NavigationBar from 'components/NavigationBar.vue'


const calendar = ref<QCalendarScheduler>(),
  selectedDate = ref(today()),
  locale = ref('en-US'),
  locales = reactive([
    { value: 'ar', label: 'العربية' },
    { value: 'bg', label: 'български език' },
    { value: 'ca', label: 'Català' },
    { value: 'cs', label: 'Čeština' },
    { value: 'da', label: 'Dansk' },
    { value: 'de', label: 'Deutsch' },
    { value: 'en-GB', label: 'English (UK)' },
    { value: 'en-US', label: 'English (US)' },
    { value: 'eo', label: 'Esperanto' },
    { value: 'es', label: 'Español' },
    { value: 'et', label: 'Estonian' },
    { value: 'fa-IR', label: 'فارسی' },
    { value: 'fi', label: 'Suomi' },
    { value: 'fr', label: 'Français' },
    { value: 'gn', label: "Avañe'ẽ" },
    { value: 'he', label: 'עברית' },
    { value: 'hr', label: 'Hrvatski jezik' },
    { value: 'hu', label: 'Magyar' },
    { value: 'id', label: 'Bahasa Indonesia' },
    { value: 'it', label: 'Italiano' },
    { value: 'ja', label: '日本語 (にほんご)' },
    { value: 'km', label: 'ខ្មែរ' },
    { value: 'ko-KR', label: '한국어' },
    { value: 'lu', label: 'Kiluba' },
    { value: 'lv', label: 'Latviešu valoda' },
    { value: 'ml', label: 'മലയാളം' },
    { value: 'ms', label: 'Bahasa Melayu' },
    { value: 'nb-NO', label: 'Norsk' },
    { value: 'nl', label: 'Nederlands' },
    { value: 'pl', label: 'Polski' },
    { value: 'pt-BR', label: 'Português (BR)' },
    { value: 'pt', label: 'Português' },
    { value: 'ro', label: 'Română' },
    { value: 'ru', label: 'русский' },
    { value: 'sk', label: 'Slovenčina' },
    { value: 'sl', label: 'Slovenski Jezik' },
    { value: 'sr', label: 'српски језик' },
    { value: 'sv', label: 'Svenska' },
    { value: 'ta', label: 'தமிழ்' },
    { value: 'th', label: 'ไทย' },
    { value: 'tr', label: 'Türkçe' },
    { value: 'uk', label: 'Українська' },
    { value: 'vi', label: 'Tiếng Việt' },
    { value: 'zh-HANS', label: '中文(简体)' },
    { value: 'zh-HANT', label: '中文(繁體)' },
  ]),
  resources = reactive([
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
// function onResourceExpanded(data: Timestamp) {
//   console.log('onResourceExpanded', data)
// }
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
