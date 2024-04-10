<script setup lang="ts">
import type { IDataProduct } from '~/types/types'

const props = defineProps<{
  openInfo: boolean
  product?: IDataProduct
}>()

const emits = defineEmits(['update:loadOpenInfo'])

const closeInfo = () => {
  emits('update:loadOpenInfo', false)
}
</script>

<template>
  <v-dialog v-model="props.openInfo" width="auto" persistent elevation="8">
    <v-card
      max-width="100%"
      :title="props.product?.title"
      class="fondo text-white"
    >
      <v-card-text>
        <p class="my-2">Album id:{{ props.product?.albumId }}</p>
        <p class="my-2">Id:{{ props.product?.id }}</p>
        <v-img
          :src="props.product?.url"
          lazy-src="/images/image-producto.png"
          cover
          class="hight"
        >
          <template v-slot:placeholder>
            <v-row align="center" class="fill-height ma-0" justify="center">
              <v-progress-circular
                color="white"
                indeterminate
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-card-text>
      <template v-slot:actions>
        <TheButton
          title="Cerrar"
          classes="btn-show mx-auto"
          @click="closeInfo"
        />
      </template>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.hight {
  height: 200px;
}
</style>
