<template>
  <ACard class="w-96">
    <template #title>
      <h1 class="text-xl font-logo font-semibold">talkio.</h1>
      <h2 class="text-3xl font-medium">Sign In</h2>
      <span class="text-header-description">We're excited to have you back!</span>
    </template>
    <form class="flex flex-col gap-5 w-full">
      <FormItem
          v-model="record.email"
          type="email"
          label="Email"
          :errors="v$.email.$errors"
          :disabled="loading"
      />
      <FormItem
          v-model="record.password"
          label="Password"
          htmlType="password"
          :errors="v$.password.$errors"
          :disabled="loading"
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
          :disabled="loading"
      >
        Login
      </AButton>
    </form>
  </ACard>
</template>

<script setup lang="ts">
import type {ValidationArgs} from "@vuelidate/core";
import {required, email,} from "@vuelidate/validators";
import AButton from "@/components/ui/AButton.vue";
import ACard from "@/components/ui/ACard.vue";
import {computed, reactive} from "vue";
import FormItem from "@/components/ui/FormItem.vue";
import {Auth} from "@/constants/apiRoutes";
import {useForm} from "@/composables/useForm";
import {useAuthStore} from "@/stores/auth";
import type {LoginResponse} from "@/types/auth";
import {useRouter} from "vue-router";

const authStore = useAuthStore()

const {
  record,
  v$,
  loading,
  errors,

  submitForm
} = useForm({
  rules: computed<ValidationArgs>(() => ({
    email: {
      required,
      email,
    },
    password: {
      required
    }
  })),
  url: Auth.login,
  model: reactive({
    email: "asdf@asdf.com",
    password: "a1B@asdf"
  })
})

const router = useRouter();

const login = async () => {
  const response = await submitForm<Partial<LoginResponse>>();
  if(!response) return;

  authStore.setToken(response.token as string);
  delete response.token
  authStore.setUser(response);
  return router.push({name: "app"})
};

</script>