<script setup lang="ts">
defineProps<{
  color?: string
}>()

const interval: Ref<NodeJS.Timeout | undefined> = ref()
const loadingTotal: Ref<number> = ref(0)

onBeforeMount(() => {
  interval.value = setInterval(() => {
    if (loadingTotal.value === 100) {
      return (loadingTotal.value = 0)
    }
    loadingTotal.value += 10
  }, 100)
})

onBeforeUnmount(() => {
  clearInterval(interval.value)
})
</script>

<template>
  <div class="spinner text-center d-flex align-center justify-center">
    <v-progress-circular
      :model-value="loadingTotal"
      :rotate="360"
      :size="100"
      :width="15"
      :color="$props.color ? $props.color : '#765cf3'"
    >
      <template v-slot:default> {{ loadingTotal }} % </template>
    </v-progress-circular>
  </div>
</template>
<style scoped>
.spinner {
  height: 100dvh;
}
</style>
