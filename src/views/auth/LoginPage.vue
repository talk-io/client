<template>
  <ACard class="w-96">
    <template #title>
      <h1 class="text-xl font-logo font-semibold">talkio.</h1>
      <h2 class="text-3xl font-medium">Sign In</h2>
      <span class="text-header-description">We're excited to have you back!</span>
    </template>
    <form class="flex flex-col gap-5 w-full">
      <FormItem
          v-model="model.email"
          type="email"
          label="Email"
          :errors="v$.email.$errors"
      />
      <FormItem
          v-model="model.password"
          label="Password"
          type="password"
          :errors="v$.password.$errors"
      >
        <template #additional>
          <RouterLink class="text-sm text-header-secondary underline" to="/auth/forgot-password">
            Forgot your password?
          </RouterLink>
        </template>
      </FormItem>
      <AButton
          htmlType="submit"
          type="primary"
          class="w-full bg-card py-2 rounded-md hover:brightness-125 transition-all"
          @click.prevent="login"
      >
        Login
      </AButton>
    </form>
  </ACard>
</template>

<script setup lang="ts">
import {useVuelidate} from "@vuelidate/core";
import type {ValidationArgs} from "@vuelidate/core";
import {required, email,} from "@vuelidate/validators";
import AButton from "@/components/ui/AButton.vue";
import ACard from "@/components/ui/ACard.vue";
import {computed, reactive} from "vue";
import FormItem from "@/components/ui/FormItem.vue";

const login = async () => {
  const isFormCorrect = await v$.value.$validate();
  console.log(isFormCorrect);
  if (!isFormCorrect) return;
  alert("weeee")
};
const model = reactive({
  email: "",
  password: ""
});

const rules = computed<ValidationArgs>(() => ({
  email: {
    required,
    email,
  },
  password: {
    required
  }
}))

const v$ = useVuelidate(rules, model);
</script>