<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
const user = useState('user', () => ref<string | null>(null))

onMounted(() => {
  if (process.client) {
    user.value = localStorage.getItem('user')
  }
})
</script>

<template>
  <div v-if="user"></div>
</template>
