<script setup lang="ts">
import type { IDataUser, IAddress } from '~/types/types'

const props = defineProps<{
  openInfo: boolean
  user?: IDataUser
}>()

const emits = defineEmits(['update:loadOpenInfo'])

const closeInfo = () => {
  emits('update:loadOpenInfo', false)
}
</script>

<template>
  <v-dialog v-model="props.openInfo" width="auto" persistent>
    <v-card max-width="400" :title="props.user?.email" class="fondo text-white">
      <v-card-text>
        <p class="my-2">Id:{{ props.user?.id }}</p>
        <p class="my-2">Name:{{ props.user?.name }}</p>
        <p class="my-2">Phone:{{ props.user?.phone }}</p>
        <ul class="my-2">
          <template
            v-for="(key, item, index) in props.user?.address"
            :key="index"
          >
            <p v-if="!item.includes('geo')">
              {{ `${item.toUpperCase()}: ${props.user?.address[item]}` }}
            </p>
          </template>
        </ul>
      </v-card-text>
      <template v-slot:actions>
        <TheButton
          title="Cerrar"
          classes="bg-primary mx-auto"
          @click="closeInfo"
        />
      </template>
    </v-card>
  </v-dialog>
</template>
