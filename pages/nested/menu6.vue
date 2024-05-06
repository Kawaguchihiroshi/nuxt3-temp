<script lang="ts" setup>
definePageMeta({
  title: "エクセル",
  icon: "mdi-animation",
})
import * as Excel from "exceljs"

async function fileSelected(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files

  if (files && files[0]) {
    const arrayBuffer = await files[0].arrayBuffer()
    const workbook = new Excel.Workbook()
    await workbook.xlsx.load(arrayBuffer)

    workbook.worksheets.forEach((worksheet: any) => {
      // console.log(worksheet._rows)
      worksheet._rows.forEach((row: any) => {
        // console.log(row._cells)
        row._cells.forEach((cell: any) => {
          console.log(cell._value.model)
        })
      })
      // console.log(worksheet.name)
      // console.log(worksheet.getCell("B4").value)
      // console.log(worksheet.getCell("B8").value)
    })
  }
}

const fileInput = ref()
</script>

<template>
  <input ref="fileInput" type="file" @change="fileSelected" />
</template>
