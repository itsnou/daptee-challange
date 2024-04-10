<script setup lang="ts">
import type { ILogin } from '~/types/types'

import { useSessionStorage } from '@vueuse/core'
const cookie = useCookie('user')

definePageMeta({
  layout: 'login'
})

useHead({
  title: 'Daptee-Login'
})

const config = useRuntimeConfig()
const login = ref<ILogin>({
  user: '',
  password: ''
})
const withErrors = ref<boolean>(false)

const initLogin = async () => {
  if (login.value.user === config.public.userAvailable) {
    if (login.value.password === config.public.passAvailable) {
      cookie.value = login.value.user
      return await navigateTo('/usuarios')
    }
  }
  withErrors.value = true
}

onBeforeMount(() => {
  if (cookie.value) {
    navigateTo('/usuarios')
  }
})
</script>

<template>
  <div class="fondo-login">
    <v-row>
      <v-col
        class="d-flex flex-column align-center login align-self-center mb-16"
      >
        <img src="/images/logo.svg" class="h-50 w-50 py-none my-none" />
        <v-divider
          :thickness="5"
          class="rounded-lg border-opacity-100 bg-white mb-20 my-15 w-50 mx-auto text-white"
        ></v-divider>
        <v-sheet class="mx-auto" width="300">
          <v-form @submit.prevent="initLogin" class="fondo-login h-100">
            <v-text-field
              v-model="login.user"
              required
              variant="solo"
              single-line
              label="Usuario"
            ></v-text-field>

            <v-text-field
              v-model="login.password"
              label="Contraseña"
              variant="solo"
              type="password"
              single-line
              required
              :autocomplete="false"
            ></v-text-field>

            <TheButton
              classes="mt-2 btn-submit"
              type="submit"
              block
              title="Iniciar sesión"
            />
          </v-form>
        </v-sheet>
      </v-col>
      <v-col class="lateral h-100"></v-col>
    </v-row>
    <v-snackbar v-model="withErrors" :timeout="2000">
      No se pudo validar el ingreso, revisar los datos

      <template v-slot:actions>
        <v-btn color="red" variant="text" @click="withErrors = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<style scoped>
.btn-submit {
  background-color: #3bcdbd;
}

.lateral {
  background: url('/images/fondo-login.png');
}
.fondo-login {
  height: 100dvh;
  background-color: #1e2022;
  overflow: hidden;
}
:deep(.v-row) {
  height: 120dvh !important;
}

.division {
  border: 5px solid red;
}
</style>
