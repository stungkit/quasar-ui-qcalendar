# QCalendar (Vue Plugin, UMD and Quasar App Extension)

![@quasar/quasar-ui-qcalendar](https://img.shields.io/npm/v/@quasar/quasar-ui-qcalendar?label=@quasar/quasar-ui-qcalendar)
![@quasar/quasar-app-extension-qcalendar](https://img.shields.io/npm/v/@quasar/quasar-app-extension-qcalendar?label=@quasar/quasar-app-extension-qcalendar)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/quasarframework/quasar-ui-qcalendar)]()
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/quasarframework/quasar-ui-qcalendar)]()
[![npm](https://img.shields.io/npm/dt/@quasar/quasar-app-extension-qcalendar)](https://www.npmjs.com/package/@quasar/quasar-app-extension-qcalendar)
![@quasar/quasar-app-extension-qcalendar](https://img.shields.io/npm/dm/@quasar/quasar-app-extension-qcalendar)
[![jsdelivr](https://data.jsdelivr.com/v1/package/npm/@quasar/quasar-ui-qcalendar/badge)](https://www.jsdelivr.com/package/npm/@quasar/quasar-ui-qcalendar)
<span class="badge-paypal"><a href="https://paypal.me/hawkeye64" title="Donate to this project using Paypal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" /></a></span>

[![Discord](https://img.shields.io/badge/discord-join%20server-738ADB?style=for-the-badge&logo=discord&logoColor=738ADB)](https://chat.quasar.dev)
[![X](https://img.shields.io/badge/follow-@jgalbraith64-1DA1F2?style=for-the-badge&logo=x&logoColor=1DA1F2)](https://twitter.com/jgalbraith64)

## Everything you need for a complete Calendar solution.

QCalendar allows for viewing of **day** (1-6 days), **week**, **monthly**, **scheduler**, **agenda**, **resource** and **task** views. Painstaking care has been given to make almost every aspect of QCalendar configurable and/or modifiable in some way and control given to the developer.

---

## Important Release Notes

v4.0.0

- Be sure to read the [documentation](https://qcalendar.netlify.app/)

---

[Live Demo](https://qcalendar.netlify.app/) - **live docs, demo and examples**

---

## Examples

**Month view with events**

![QCalendar example month view](https://raw.githubusercontent.com/quasarframework/quasar-ui-qcalendar/packages/docs/public/qcalendarmonth-event-slots.png)

**Planner example**

![QCalendar example agenda view - planner](https://raw.githubusercontent.com/quasarframework/quasar-ui-qcalendar/packages/docs/public/qcalendaragenda-planner.png)

**Monthly Mini-mode**

![QCalendar example mini-mode selection](https://raw.githubusercontent.com/quasarframework/quasar-ui-qcalendar/packages/docs/public/qcalendarmonth-minimode-range-selection.png)

**Multi-month selector (mini-mode)**

![QCalendar example multi-month selection](https://raw.githubusercontent.com/quasarframework/quasar-ui-qcalendar/packages/docs/public/qcalendar-month-view-mini-mode-multi-month-selection.png)

**Agenda view with custom content**

![QCalendar example agenda view](https://raw.githubusercontent.com/quasarframework/quasar-ui-qcalendar/packages/docs/public/qcalendar-agenda-view.png)

**Day view with events**

![QCalendar example day view - events](https://raw.githubusercontent.com/quasarframework/quasar-ui-qcalendar/packages/docs/public/qcalendar-day-view.png)

**Resource view with events**

![QCalendar example resource view - events](https://raw.githubusercontent.com/quasarframework/quasar-ui-qcalendar/packages/docs/public/qcalendar-resource-view.png)

**Scheduler view**

![QCalendar example scheduler view](https://raw.githubusercontent.com/quasarframework/quasar-ui-qcalendar/packages/docs/public/qcalendar-scheduler-view.png)

**Task view**

![QCalendar task view](https://raw.githubusercontent.com/quasarframework/quasar-ui-qcalendar/packages/docs/public/QCalendarTask.png)

Including support for locales, optional theming, 1st day Monday, 5-day work weeks, work week numbers, selected days, disabled days, day of year...

...and many more!

# Structure

This is a pnpm workspace mono-repo. You cannot use npm for building.

- [/ui](../ui) - standalone npm package (go here for more information)
- [/app-extension](../app-extension) - Quasar app extension
- [/docs](../docs) - sources for docs, demo and examples project
- [live demo](https://qcalendar.netlify.app/) - **live docs, demo and examples**

# Demo Workflow

If you fork or download this project, make sure you have the Quasar CLI globally installed:

```
$ npm i -g @quasar/cli
```

The workflow to build the demo, on a fresh project, is as follows (note: this project uses pnpm workspaces, so you **must** use pnpm):

```
$ pnpm install
$ cd packages/ui
$ pnpm build
$ cd ../docs
$ quasar dev
```

# Codepen

[UMD examples in Codepen collection](https://codepen.io/collection/qOBOEG)

# Donate

If you appreciate the work that went into this, please consider donating to [Quasar](https://donate.quasar.dev) or [Jeff](https://github.com/sponsors/hawkeye64).

# License

MIT (c) Jeff Galbraith <jeff@quasar.dev>
