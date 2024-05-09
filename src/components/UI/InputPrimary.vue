<script setup lang="ts">
import { defineProps } from "vue"
defineProps<{
  modelValue: string
  type: string
  name: string
  label: string
}>()
const emit = defineEmits<{
  (event: "update:modelValue", payload: string): void
}>()

function updateValue(value: string) {
  emit("update:modelValue", value)
}
</script>

<template>
  <input :type="type" :name="name" :value="modelValue" @input="updateValue(($event.target as HTMLInputElement).value)" :placeholder="label" />
</template>

<style lang="scss" scoped></style>
