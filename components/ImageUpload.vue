<script setup lang="ts">
const files = ref<File[]>([])

const drawImage = (src: string) => {
  const canvas = document.getElementById("main") as HTMLCanvasElement
  const ctx = canvas.getContext("2d")
  if (!ctx) return
  ctx.clearRect(0, 0, 640, 480)
  const image = new Image()
  image.src = src
  image.onload = () => {
    ctx.drawImage(image, 0, 0)
  }
}

const readFile = () => {
  if (files.value.length === 0) return
  const fileReader = new FileReader()
  fileReader.onload = () => {
    drawImage(fileReader.result as string)
  }
  fileReader.readAsDataURL(files.value[0])
}
</script>
<template>
  <v-file-input
    v-model="files"
    accept="image/*"
    label="画像ファイルを選択してください"
    @update:model-value="readFile"
  />
  <canvas id="main" width="640" height="480" />
</template>
