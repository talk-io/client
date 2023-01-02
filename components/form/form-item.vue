<template>
  <div class="flex flex-col gap-1 w-full">
    <span
        class="text-sm font-semibold text-label uppercase text-gray-500"
        :class="{
          'text-red-500': errors?.length
        }"
    >
      {{ label }}
    </span>
    <input
        :value="modelValue"
        :placeholder="placeholder"
        :class="{
        'border-red-500': errors?.length,
      }"
        :type="type"
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
import {ErrorObject} from "@vuelidate/core";

const props = defineProps<{
  label: string;
  modelValue: string | null;
  placeholder?: string;
  errors?: ErrorObject[];
  type?: string;
  name?: string;
}>();

</script>