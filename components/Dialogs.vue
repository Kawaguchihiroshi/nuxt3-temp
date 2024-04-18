<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true,
  },
})

const dialog = ref(false)
const togle = () => {
  dialog.value = !dialog.value
}
</script>
<template>
  <div class="text-center">
    <v-btn color="red lighten-2" :onclick="togle"> 削除 </v-btn>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2"> 警告 </v-card-title>

        <v-card-text>
          案件番号「{{ id }}」を削除します。<br />
          今後案件内容を確認できなくなります。<br />
          よろしいですか？
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="dialog = false">
            削除を実行する
          </v-btn>
          <v-btn color="primary" @click="dialog = false"> キャンセル </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
