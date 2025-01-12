<template>
  <router-view />
</template>

<script setup lang="ts">
import { useDark } from 'src/.q-press/composables/dark'
const { initDark } = useDark()
initDark()
</script>
