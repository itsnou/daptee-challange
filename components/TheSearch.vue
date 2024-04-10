<script setup lang="ts">
import { useDebounce } from '../composables/useDebounce'

const search: Ref<string> = ref('')
const loading: Ref<boolean> = ref(false)
const searchState = useState('search', () => search.value)
const route = useRoute()
const title = computed(() =>
  route.fullPath.includes('productos')
    ? 'Buscar por titulo...'
    : 'Buscar por nombre...'
)

const onClick = () => {
  loading.value = true
  setTimeout(() => {
    searchState.value = search.value
    loading.value = false
  }, 1000)
}

watch(
  () => route.fullPath,
  (value) => {
    if (value) {
      search.value = ''
    }
  }
)
</script>

<template>
  <v-card class="mx-auto" max-width="400">
    <v-text-field
      :loading="loading"
      append-inner-icon="mdi-magnify"
      density="compact"
      v-model="search"
      :label="title"
      variant="solo"
      hide-details
      single-line
      @update:modelValue="onClick"
    ></v-text-field>
  </v-card>
</template>
