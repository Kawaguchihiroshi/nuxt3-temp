<script setup lang="ts">
import { ref, unref } from "vue"

const props = defineProps(["modelValue", "label"])
const emits = defineEmits(["update:modelValue"])
const rules = {
  required: (value) => !!value || value === 0 || "必須項目です",
  dateformat: (value) => {
    return dateRule.test(value) || pattern + "形式で入力してください"
  },
}
const pattern = "yyyymmdd"
const dateRule = /^[0-9]{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/
const maxlength = 8
const toDateFormat = (v) => {
  if (!dateRule.test(v)) {
    return v
  }
  return v.substring(0, 4) + "/" + v.substring(4, 6) + "/" + v.substring(6, 8)
}

const isEdit = ref(false)
const editValue = ref(unref(props.modelValue))
const dispValue = ref(unref(props.modelValue))

function toHalfNumString(str) {
  if (typeof str === "string" || str instanceof String) {
    // 全角英数字を半角に変換
    str = str.replace(/[０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    })
  }
  return str
}

function format() {
  editValue.value = toHalfNumString(editValue.value)
  dispValue.value = toDateFormat(editValue.value)
  emits("update:modelValue", editValue.value)
  if (dateRule.test(editValue.value)) isEdit.value = false
}

// init
format()
</script>

<!-- <template>
  <v-date-picker
    v-model="carendaer"
    title="日付の選択"
    ok-text="設定"
    cancel-text="取り消し"
    @update:model-value="updateDate()"
  />
  <p>
    Date in ISO format: <strong>{{ carendaer }}</strong>
  </p>
</template> -->

<template>
  <template v-if="isEdit">
    <v-text-field
      class="bg-purple-lighten-5"
      :autofocus="isEdit"
      :label="label + '_edit'"
      :model-value="editValue"
      @update:model-value="editValue = $event"
      :rules="[rules.required, rules.dateformat]"
      @blur="format()"
      :maxlength="maxlength"
    />
  </template>
  <template v-else>
    <v-text-field
      class="bg-purple-lighten-5"
      :label="label + '_display'"
      :model-value="dispValue"
      @focus="isEdit = true"
    />
  </template>
  <div class="bg-blue-lighten-5">props : {{ $props }}</div>
  <div class="bg-blue-lighten-5">isEdit : {{ isEdit }}</div>
  <div class="bg-blue-lighten-5">editValue : {{ editValue }}</div>
  <div class="bg-blue-lighten-5">dispValue : {{ dispValue }}</div>
</template>
