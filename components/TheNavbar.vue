<script setup lang="ts">
const user: Ref<string | null> = ref('')
const drawer: Ref<boolean> = ref(true)
const cookie = useCookie('user')

const userName = computed(() => cookie.value)

const getLogout = () => {
  const cookie = useCookie('user')
  cookie.value = null
  return navigateTo('/login')
}

const listOptions = [
  {
    title: 'Mi Perfil',
    event: ''
  },
  {
    title: 'Logout',
    event: getLogout
  }
]
</script>

<template>
  <v-app-bar color="#1e2022" prominent class="px-5">
    <v-app-bar-nav-icon
      class="hidden-lg-and-up"
      variant="text"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>
      <!-- Se puede utilizar también NuxtImg -->
      <img
        src="/images/logo.svg"
        alt="Logo Daptee"
        class="h-25 w-25 hidden-sm-and-down"
      />
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <LazyTheSearch class="w-100 mr-5 hidden-sm-and-down" />

    <v-menu transition="scale-transition">
      <template v-slot:activator="{ props }">
        <TheButton
          :title="userName || 'Loading...'"
          v-bind="props"
          classes="btn-show mx-auto"
        />
      </template>

      <v-list class="menu">
        <v-list-item
          v-for="(item, i) in listOptions"
          :key="i"
          class="lista-menu"
        >
          <v-list-item-title @click="item.event">
            {{ item.title }}</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" app prominent class="side-bar">
    <v-list>
      <NuxtLink to="/productos" class="links">
        <v-list-item prepend-icon="mdi-folder" title="Productos"></v-list-item>
      </NuxtLink>
      <NuxtLink to="/usuarios" class="links">
        <v-list-item
          prepend-icon="mdi-account-multiple"
          title="Usuarios"
        ></v-list-item>
      </NuxtLink>
      <div class="px-2">
        <LazyTheSearch class="w-100 mt-5 hidden-lg-and-up" />
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
:deep(.router-link-active) {
  color: #765cf3 !important;
}
.side-bar {
  background-color: #1e2022;
  border-right: 1px solid #3bcdbd;
}
.links {
  color: white;
  text-decoration: none;
}
.menu {
  margin-top: 5px;
  width: 120px;
}

.lista-menu:hover {
  background-color: #3bcdbd;
  color: black;
  cursor: pointer;
}
</style>
