<script setup lang="ts">
const name = ref("")
const count = useCounterStore()
function sayHi() {
  Notify.success(`Hi, ${name.value}!`)
}
function warning() {
  Notify.warning(`How dare you refuse me, ${name.value}.`)
}
definePageMeta({
  icon: "mdi-home",
  title: "ホーム",
  drawerIndex: 0,
})
</script>

<template>
  <div class="wrapper">
    <v-icon icon="custom:vitify-nuxt" size="3em" color="primary" class="mb-4" />
    <p>Opinionated Starter Template</p>
    <v-responsive max-width="300" class="mx-auto">
      <v-text-field
        v-model="name"
        color="primary"
        placeholder="Hello World"
        label="What's your name?"
        class="mx-auto mt-8"
      />
    </v-responsive>
    <v-row justify="center">
      「見られたくない」ページはミドルウェアでこのページにリダイレクトさせています。
    </v-row>
    <v-row justify="center">
      count；{{ count.count }} userId；{{ count.userId }} count；{{
        count.userToken
      }}
    </v-row>
    <v-row justify="center">
      <v-btn :disabled="!name" class="mr-2" color="primary" @click="sayHi">
        認証する
      </v-btn>
      <v-btn :disabled="!name" @click="warning">キャンセル</v-btn>
    </v-row>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  top: calc(50vh - 330px);
  text-align: center;
}
</style>
