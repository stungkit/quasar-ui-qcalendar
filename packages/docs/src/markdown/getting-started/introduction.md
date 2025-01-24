---
title: What is QCalendar
desc: Everything You Need for a Complete Calendar Solution
keys: All about QCalendar
---

::: warning
Please note that the codepen links, in the documentation examples, do not work at this time.

And, if you're looking to help out, check out our [Call to action](/other/contributing/call-to-action) in the **Contributing** section.
:::

> If you are looking for a **Migration Guide** from v3 to v4, go [here](/other/migration-guide).

## Everything You Need for a Complete Calendar Solution

**QCalendar** allows for viewing of **day** (1-6 days), **week**, **monthly**, **scheduler**, **agenda**, **resource** and **task** views. Painstaking care has been given to make almost every aspect of QCalendar configurable and/or modifiable in some way and control given to the developer.

QCalendar is a less-opinionated calendar component, as it does not keep track of things like events and reminders. This is in the hands of the developer, but QCalendar makes it easy via events, slots and methods (see examples how to accomplish these endeavors).

The guiding philosophy has been to empower the developer and allow them to do what needs to be done without being overly opinionated.

QCalendar is actually an accumulation of several other dedicated components and exported methods:

1. QCalendar (wrapper)
1. QCalendarDay
1. QCalendarMonth
1. QCalendarAgenda
1. QCalendarResource
1. QCalendarScheduler
1. QCalendarTask
1. Timestamp (dedicated code for creating calendars)

## Features

1. Show month, week, work-week, day, contiguous days (ex: 3 days at a time)
2. Scheduler view (optional hierarchical trees)
3. Resource view (optional hierarchical trees)
4. Agenda view (with optional Planner modes)
5. Task view (timesheets, Gantt charts)
6. Month view mini-mode (picker)
7. Month view multi-day selection (toggle and range)
8. Month view multi-month/multi-day range selection when combining two or more calendars
9. Optional drag and drop support (including mobile)
10. Automatic localization / internationalization
11. Responsive flex grid layout
12. No external dependencies (momentjs, jQuery, etc) other than Vue
13. User events support (date, day, interval, time, resource, etc)
14. Define any day as beginning of week
15. Show only certain days of the week (good for work week days)
16. Disable days or weekdays
17. Workweek number support
18. Day-of-the-year support
19. Easy to theme using CSS vars and Theme Builder
20. Easy to customize with Vue slots
21. Support for Dark mode
22. Rich support of date functions that are also exported for making your own calendars
23. Toggled date, range and interval selection

## QCalendar is not…

- An event management system. However, QCalendar supports everything you need to create an event/reminder/task management system using slots.
- An interactive navigation provider (next, previous, today). However, you can easily do this in devland with QCalendar’s methods (see examples).
- Only the Gregorian calendar is supported (at this time).
