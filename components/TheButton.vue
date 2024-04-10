<script setup lang="ts">
defineProps<{
  title: string
  classes: string
  preIcon?: string
  appIcon?: string
}>()
</script>

<template>
  <v-btn :class="classes" :prepend-icon="preIcon" :append-icon="appIcon">
    {{ title }}
  </v-btn>
</template>
