<template>
  <div class="spinner text-center d-flex align-center justify-center">
    <v-progress-circular
      :rotate="360"
      :size="100"
      :width="15"
      color="teal"
      indeterminate
    >
    </v-progress-circular>
  </div>
</template>
<style scoped>
.spinner {
  height: 100dvh;
}
</style>
