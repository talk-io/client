<template>
  <NuxtLayout name="auth">
    <Card class="w-96">
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
            <NuxtLink class="text-sm text-header-secondary underline" to="/auth/forgot-password">Forgot your password?
            </NuxtLink>
          </template>
        </FormItem>
        <button
            type="submit"
            class="w-full bg-card py-2 rounded-md hover:brightness-125 transition-all"
            @click.prevent="login"
        >
          Login
        </button>
      </form>
    </Card>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {useVuelidate, ValidationArgs} from "@vuelidate/core";
import {required, email,} from "@vuelidate/validators";

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

computed(() => {
  console.log(v$.value.$error);
})
</script>