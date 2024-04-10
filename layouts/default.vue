<script setup lang="ts">
const loading: Ref<boolean> = ref(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 900)
})
</script>

<template>
  <v-layout v-if="!loading">
    <TheNavbar />
    <v-main>
      <NuxtPage />
    </v-main>
  </v-layout>
  <v-layout v-else>
    <v-main>
      <div v-show="false">
        <NuxtPage />
      </div>
      <LazyThePrincipalSpinner />
    </v-main>
  </v-layout>
</template>
