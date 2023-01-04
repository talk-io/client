<template>
  <div class="flex flex-col gap-1 w-full">
    <span
      :class="{
          'text-red-500': errors?.length
        }"
      class="text-sm font-semibold text-label uppercase"
    >
      {{ label }}
    </span>
    <input
      :class="{
        'border-red-500': errors?.length,
      }"
      :name="name"
      :type="htmlType"
      :value="modelValue"
      class="border-[1px] border-card rounded-md p-2 bg-input w-full
        disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div class="flex justify-between">
      <div v-auto-animate>
        <span v-if="errors?.[0]" class="text-red-500 text-sm">{{ errors[0].$message }}</span>
      </div>
      <slot name="additional" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ErrorObject } from "@vuelidate/core";

defineProps<{
  label: string;
  modelValue: string | null;
  errors?: ErrorObject[];
  htmlType?: string;
  name?: string;
}>();

</script>