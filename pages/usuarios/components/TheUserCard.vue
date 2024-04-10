<script setup lang="ts">
const props = defineProps<{
  title: string
  id: number
}>()
const emits = defineEmits(['listenerShowMore', 'listenerDelete'])

const listBtn = [
  {
    title: 'Ver mas',
    classes: 'btn-white rounded-sm w-100',
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
    emits('listenerShowMore', props.id)
  } else {
    emits('listenerDelete', props.id)
  }
}
</script>

<template>
  <v-list>
    <v-list-group>
      <template v-slot:activator="{ props }">
        <v-list-item
          v-bind="props"
          prepend-icon="mdi-account-circle"
          append-icon="mdi-dots-vertical"
          :title="title"
        >
        </v-list-item>
      </template>
      <v-list-item v-for="(item, index) in listBtn" :key="index" class="w-100">
        <TheButton
          :title="item.title"
          :classes="item.classes"
          :preIcon="item.preIcon"
          @click="() => handleClick(item.title)"
        />
      </v-list-item>
    </v-list-group>
  </v-list>
</template>
