<template>
  <div class="flex flex-col gap-1 w-full">
    <span
        class="text-sm font-semibold text-label uppercase"
        :class="{
          'text-red-500': errors?.length
        }"
    >
      {{ label }}
    </span>
    <input
        v-bind="$attrs"
        :value="modelValue"
        :class="{
        'border-red-500': errors?.length,
      }"
        :type="htmlType"
        :name="name"
        class="border-[1px] border-card rounded-md p-2 bg-input w-full focus:outline-0"
        @input="$emit('update:modelValue', $event.target.value)"
    />
    <div class="flex justify-between">
      <div v-auto-animate>
        <span v-if="errors?.[0]" class="text-red-500 text-sm">{{ errors[0].$message }}</span>
      </div>
      <slot name="additional"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {ErrorObject} from "@vuelidate/core";

defineProps<{
  label: string;
  modelValue: string | null;
  errors?: ErrorObject[];
  htmlType?: string;
  name?: string;
}>();

</script>