<script setup lang="ts">
import type { IDataProduct } from '~/types/types'

const props = defineProps<{
  albumId?: number
  title?: string
  id?: number
  url?: string
  thumbnailUrl?: string
}>()
const emits = defineEmits(['listenerShowMore', 'listenerDelete'])

const show: Ref<boolean> = ref(false)

const listBtn = [
  {
    title: 'Ver mas',
    classes: 'bg-white rounded-sm w-100',
    preIcon: 'mdi-eye-circle'
  },
  {
    title: 'Eliminar',
    classes: 'bg-red rounded-sm w-100',
    preIcon: 'mdi-delete-circle'
  }
]

const handleClick = (type: string) => {
  if (type.includes('Ver')) {
    show.value = false
    emits('listenerShowMore', props.id)
  } else {
    show.value = false
    emits('listenerDelete', props.id)
  }
}
</script>

<template>
  <v-card class="mx-auto my-5 expand text-white" max-width="344">
    <v-img
      :src="props?.url"
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

    <v-card-title> {{ props.title }} </v-card-title>

    <v-card-subtitle> {{ props.url }} </v-card-subtitle>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn append-icon="mdi-dots-vertical" @click="show = !show"></v-btn>
    </v-card-actions>
    <div>
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-list-item v-for="(item, index) in listBtn" :key="index">
            <TheButton
              :title="item.title"
              :classes="item.classes"
              :preIcon="item.preIcon"
              @click="() => handleClick(item.title)"
            />
          </v-list-item>
        </div>
      </v-expand-transition>
    </div>
  </v-card>
</template>

<style scoped>
.expand {
  background-color: #27292c !important;
}
.hight {
  height: 200px;
}
</style>
