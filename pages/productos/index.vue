<script setup lang="ts">
import type { IDataProduct } from '~/types/types.ts'

import { useShowMoreInfo } from '~/composables/useShowMore'
import TheProductCard from './components/TheProductCard.vue'
import TheModalProduct from './components/TheModalProduct.vue'

definePageMeta({
  layout: 'default',
  middleware: 'auth'
})
useHead({
  title: 'Daptee-Productos'
})

const openInfo = ref<boolean>(false)
const productSelected = ref<IDataProduct | undefined>()
const backupData = ref<IDataProduct[] | undefined>()
const searchState = useState<string>('search')
const listProducts = ref<IDataProduct[] | undefined>()
const pending = ref<boolean>(true)
const errorAsync = ref<string | undefined>()

/**
 * Se inicializa el componente
 */
const initComponent = async () => {
  try {
    const data = await $fetch<IDataProduct[]>(
      'https://jsonplaceholder.typicode.com/albums/1/photos'
    )
    listProducts.value = data
    pending.value = false
  } catch (Error) {
    if (Error) {
      errorAsync.value = JSON.stringify(Error)
    }
  }
}

const showMore = (id: number) => {
  if (listProducts.value) {
    const useShowMore = useShowMoreInfo('producto')
    const { openInfoS, dataSelectedS } = useShowMore.viewShowMore({
      id,
      data: listProducts.value,
      dataSelected: productSelected.value,
      openInfo: openInfo.value
    })
    if (openInfoS) {
      openInfo.value = openInfoS
    }
    if (dataSelectedS && 'albumId' in dataSelectedS) {
      productSelected.value = dataSelectedS
    }
  }
}

const deleteItem = (id: number) => {
  if (listProducts.value) {
    // Se recorre 2 veces, debido a que una aún mantiene el state del buscador y la otra es la que en el caso
    // que el buscador cambie, se mantenga el borrado ya realizado
    listProducts.value = listProducts.value?.filter((el) => el.id !== id)
    backupData.value = backupData.value?.filter((el) => el.id !== id)
  }
}

watch(
  () => searchState.value,
  (value) => {
    if (value.length) {
      if (backupData.value) {
        listProducts.value = backupData.value?.filter((el) =>
          el.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        )
      }
    } else {
      if (backupData.value) {
        listProducts.value = backupData.value
      }
    }
  }
)

onMounted(async () => {
  await initComponent()
  // Se demora demasiado en reenderizar
  // Por ende decidí recortar el muestreo
  // TODO::Paginado????
  if (listProducts.value)
    backupData.value = listProducts.value.filter((el) => el.id < 10)
})
</script>

<template>
  <div v-if="pending">
    <TheSpinnerComponents />
  </div>
  <div v-else-if="listProducts">
    <div>
      <v-container>
        <v-row>
          <v-col
            v-for="(item, index) in listProducts"
            :key="index"
            cols="12"
            sm="6"
            lg="3"
          >
            <TheProductCard
              v-if="item.id < 10"
              :albumId="item.albumId"
              :title="item.title"
              :id="item.id"
              :url="item.url"
              :thumbnailUrl="item.thumbnailUrl"
              @listenerShowMore="showMore"
              @listenerDelete="deleteItem"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <TheModalProduct
      v-model:loadOpenInfo="openInfo"
      :openInfo="openInfo"
      :product="productSelected"
    />
  </div>
  <div v-else-if="errorAsync" color="red">Error: {{ errorAsync }}</div>
</template>
