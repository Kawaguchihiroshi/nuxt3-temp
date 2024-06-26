<script setup lang="ts">
import { mergeProps } from "vue"

const theme = useTheme()
const drawer = useState("drawer")
const route = useRoute()
const breadcrumbs = computed(() => {
  return route!.matched
    .filter(
      (item) =>
        item.meta && item.meta.title && !(item.meta?.breadcrumb === "hidden"),
    )
    .map((r) => ({
      title: r.meta.title!,
      disabled:
        r.meta?.breadcrumb === "disabled" || r.path === route.path || false,
      to: r.path,
    }))
})
const isDark = useDark({
  onChanged(dark: boolean) {
    theme.global.name.value = dark ? "dark" : "light"
  },
})
const toggleDark = useToggle<true, false | null>(isDark)
const { loggedIn, clear, user } = useUserSession()
</script>

<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon @click="drawer = !drawer" />
    <v-breadcrumbs :items="breadcrumbs" />
    <v-spacer />
    <div id="app-bar" />
    <client-only>
      <div>
        <v-switch
          :model-value="isDark"
          color=""
          hide-details
          density="compact"
          inset
          false-icon="mdi-white-balance-sunny"
          true-icon="mdi-weather-night"
          style="opacity: 0.8"
          @update:model-value="toggleDark"
        />
      </div>
    </client-only>
    <v-menu location="bottom">
      <template #activator="{ props: menu }">
        <v-tooltip location="bottom">
          <template #activator="{ props: tooltip }">
            <v-btn icon large v-bind="mergeProps(menu, tooltip)" class="ml-1">
              <v-icon v-if="!loggedIn" icon="mdi-account-circle" size="36" />
              <v-avatar v-else color="primary" size="36">
                <v-img :src="`https://github.com/${user!.login}.png`" />
              </v-avatar>
            </v-btn>
          </template>
          <span>{{ loggedIn ? user!.login : "User" }}</span>
        </v-tooltip>
      </template>
      <v-list>
        <v-list-item
          v-if="!loggedIn"
          title="Login"
          prepend-icon="mdi-github"
          href="/api/auth/github"
        />
        <v-list-item
          v-else
          title="Logout"
          prepend-icon="mdi-logout"
          @click="clear"
        />
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
