<script setup lang="ts">
const loading: Ref<boolean> = ref(true)
const logged = useState('logged')
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 900)
})
</script>
<template>
  <v-layout v-if="!loading">
    <v-main>
      <NuxtPage />
    </v-main>
  </v-layout>
  <v-layout v-else>
    <v-main>
      <div v-show="false">
        <NuxtPage />
      </div>
      <ThePrincipalSpinner color="#3bcdbd" />
    </v-main>
  </v-layout>
</template>
