<script setup lang="ts">
import type { IDataUser } from '~/types/types'

import TheModalUser from './components/TheModalUser.vue'
import TheUserCard from './components/TheUserCard.vue'
import { useShowMoreInfo } from '~/composables/useShowMore'

definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

useHead({
  title: 'Daptee-Usuarios'
})

const openInfo = ref<boolean>(false)
const loading = ref<boolean>(false)
const userSelected = ref<IDataUser | undefined>()
const backupData = ref<IDataUser[] | undefined>()
const searchState = useState<string>('search')
const listUsers = ref<IDataUser[] | undefined>()
const pending = ref<boolean>(true)
const errorAsync = ref<string | undefined>()

const initComponent = async () => {
  try {
    const data = await $fetch<IDataUser[]>(
      'https://jsonplaceholder.typicode.com/users'
    )
    listUsers.value = data
    pending.value = false
  } catch (Error) {
    if (Error) {
      errorAsync.value = JSON.stringify(Error)
    }
  }
}

//Open Modal
const showMore = (id: number) => {
  if (listUsers.value) {
    const useShowMore = useShowMoreInfo('usuario')
    const { openInfoS, dataSelectedS } = useShowMore.viewShowMore({
      id,
      data: listUsers.value,
      dataSelected: userSelected.value,
      openInfo: openInfo.value
    })
    if (openInfoS) {
      openInfo.value = openInfoS
    }
    if (dataSelectedS && 'name' in dataSelectedS) {
      userSelected.value = dataSelectedS
    }
  }
}

const deleteItem = (id: number) => {
  if (listUsers.value) {
    listUsers.value = listUsers.value?.filter((el) => el.id !== id)
    backupData.value = listUsers.value
  }
}

// Filter adapter
watch(
  () => searchState.value,
  (value) => {
    loading.value = true
    if (value.length) {
      if (backupData.value) {
        listUsers.value = backupData.value?.filter((el) =>
          el.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        )
      }
    } else {
      if (backupData.value) {
        listUsers.value = backupData.value
      }
    }
    loading.value = false
  }
)

onMounted(async () => {
  await initComponent()
  if (listUsers.value) backupData.value = listUsers.value
})
</script>

<template>
  <div v-if="pending">
    <TheSpinnerComponents />
  </div>
  <div v-else-if="listUsers">
    <div v-if="!loading">
      <v-container>
        <v-row>
          <v-col
            v-for="(item, index) in listUsers"
            :key="index"
            cols="12"
            sm="6"
            lg="3"
          >
            <TheUserCard
              :title="item.name"
              :id="item.id"
              class="bg-teal"
              @listenerShowMore="showMore"
              @listenerDelete="deleteItem"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <TheModalUser
      v-model:loadOpenInfo="openInfo"
      :openInfo="openInfo"
      :user="userSelected"
    />
  </div>
  <div v-else-if="errorAsync" color="red">Error: {{ errorAsync }}</div>
</template>
