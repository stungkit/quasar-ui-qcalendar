<template>
  <div class="subcontent">
    <navigation-bar @today="onToday" @prev="onPrev" @next="onNext" />

    <div style="display: flex; justify-content: center">
      <div style="display: flex; flex-direction: column; width: 100%">
        <div style="display: flex; justify-content: center; width: 100%; padding: 6px">
          <div style="margin: 10px">
            <ul class="list">
              <li
                v-for="item in dragItems"
                :key="item.id"
                class="button list-item"
                draggable="true"
                @dragstart="
                  /// @ts-expect-error ignore
                  onDragStart($event, item)
                "
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div
            style="
              display: flex;
              justify-content: center;
              max-width: 800px;
              width: 100%;
              height: 400px;
            "
          >
            <q-calendar-day
              ref="calendar"
              v-model="selectedDate"
              view="week"
              :drag-enter-func="onDragEnter"
              :drag-over-func="onDragOver"
              :drag-leave-func="onDragLeave"
              :drop-func="onDrop"
              :weekday-class="onWeekdayClass"
              :interval-class="onIntervalClass"
              :interval-start="8"
              :interval-count="9"
              :interval-height="100"
              :weekdays="[1, 2, 3, 4, 5]"
              hoverable
              animated
              bordered
              @change="onChange"
              @moved="onMoved"
              @click-date="onClickDate"
              @click-time="onClickTime"
              @click-interval="onClickInterval"
              @click-head-intervals="onClickHeadIntervals"
              @click-head-day="onClickHeadDay"
            >
              <template #head-date="{ scope }">
                <div
                  v-if="
                    scope &&
                    scope.timestamp &&
                    allDayEventsMap[scope.timestamp.date] &&
                    allDayEventsMap[scope.timestamp.date]!.length > 0 &&
                    printScope(scope)
                  "
                  style="
                    display: flex;
                    justify-content: space-evenly;
                    flex-wrap: wrap;
                    align-items: center;
                    font-weight: 400;
                    font-size: 12px;
                    height: auto;
                  "
                >
                  <template
                    v-for="event in allDayEventsMap[scope.timestamp.date]"
                    :key="event.time"
                  >
                    <div>
                      {{ event.name }}
                    </div>
                  </template>
                </div>
              </template>

              <template #day-interval="{ scope }">
                <div
                  v-if="hasEvents(scope.timestamp) && printScope(scope)"
                  style="
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    font-size: 10px;
                  "
                >
                  <template v-for="event in getEvents(scope.timestamp)" :key="event.time">
                    <div
                      style="border: 1px solid pink; border-radius: 2px; padding: 2px; margin: 1px"
                    >
                      {{ event.name.charAt(0) }}: {{ event.time }}
                    </div>
                  </template>
                </div>
              </template>
            </q-calendar-day>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QCalendarDay, today, Timestamp } from '@quasar/quasar-ui-qcalendar'
import '@quasar/quasar-ui-qcalendar/index.css'
import { ref, computed } from 'vue'
import NavigationBar from 'components/NavigationBar.vue'


interface Event {
  id: number
  type?: number
  name: string
  date?: string
  time?: string
  allDay?: boolean
}

const calendar = ref<QCalendarDay>()

const selectedDate = ref(today())
const dragItems = ref<Event[]>([
  {
    id: 1,
    name: 'Appointment',
  },
  {
    id: 2,
    name: 'Reminder',
  },
  {
    id: 3,
    name: 'Task',
  },
])
const defaultEvent = {
  id: 0,
  type: 0,
  name: '',
  date: '',
  time: '',
  allDay: false,
}
const events = ref<Event[]>([])

// convert the events into a map of lists keyed by date
const eventsMap = computed<Record<string, Event[]>>(() => {
  const map: Record<string, Event[]> = {}
  events.value.forEach(
    (event) =>
      event.allDay !== true && event.date && (map[event.date] = map[event.date] || []).push(event),
  )
  return map
})

const allDayEventsMap = computed<Record<string, any[]>>(() => {
  const map: Record<string, Event[]> = {}
  if (events.value.length > 0) {
    events.value.forEach(
      (event) =>
        event.allDay === true &&
        event.date &&
        (map[event.date] = map[event.date] || []).push(event),
    )
  }
  return map
})

interface CustomDragEvent extends Event {
  dataTransfer: DataTransfer
  preventDefault: () => void
}

interface DragItem {
  id: number
  name: string
}

function onDragStart(event: CustomDragEvent, item: DragItem) {
  console.log('onDragStart called')
  event.dataTransfer.dropEffect = 'copy'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('ID', item.id.toString())
}

function onDragEnter(e: CustomDragEvent /*, type, scope*/) {
  console.log('onDragEnter')
  e.preventDefault()
  return true
}

function onDragOver(e: CustomDragEvent /*, type, scope*/) {
  console.log('onDragOver')
  e.preventDefault()
  return true
}

function onDragLeave(/*e, type, scope*/) {
  console.log('onDragLeave')
  return false
}

interface DropScope {
  timestamp: Timestamp
}

interface DropEvent extends CustomDragEvent {
  dataTransfer: DataTransfer
}

interface DropScope {
  timestamp: Timestamp
}

function onDrop(e: DropEvent, type: string, scope: DropScope): boolean {
  console.log('onDrop', type, scope)
  const itemID = parseInt(e.dataTransfer.getData('ID'), 10)
  const event: Event = { ...defaultEvent }
  event.id = events.value.length + 1
  const item = dragItems.value.filter((item) => item.id === itemID)
  if (item[0]) {
    event.type = item[0].id
    event.name = item[0].name
  }
  event.date = scope.timestamp.date
  if (type === 'interval') {
    event.time = scope.timestamp.time
  } else {
    // head-day
    event.allDay = true
  }
  events.value.push(event)
  return false
}

function getEvents(timestamp: Timestamp) {
  const times: Event[] | undefined = eventsMap.value[timestamp.date]
  if (times) {
    return times.filter((item) => item.time === timestamp.time)
  }
  return []
}

function hasEvents(timestamp: Timestamp) {
  return getEvents(timestamp).length > 0
}

/// @ts-expect-error ignore
function onIntervalClass({ scope }) {
  return {
    droppable: scope.droppable === true,
  }
}

/// @ts-expect-error ignore
function onWeekdayClass({ scope }) {
  return {
    droppable: scope.droppable === true,
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
// this method is used only to print the scope to dev tools
/// @ts-expect-error ignore
function printScope(scope) {
  console.log('scope:', scope)
  return true
}
</script>

<style lang="scss">
.droppable {
  box-shadow: inset 0 0 0 1px rgba(0, 140, 200, 0.8);
}
</style>
