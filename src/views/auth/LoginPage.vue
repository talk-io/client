<template>
  <ACard class="w-96">
    <template #title>
      <h1 class="text-xl font-logo font-semibold">talkio.</h1>
      <h2 class="text-3xl font-medium">Sign In</h2>
      <span class="text-header-description">
        We're excited to have you back!
      </span>
    </template>
    <form class="flex flex-col gap-5 w-full">
      <FormItem
        v-model="record.email"
        :disabled="loading"
        :errors="v$.email.$errors"
        label="Email"
        type="email"
      />
      <FormItem
        v-model="record.password"
        :disabled="loading"
        :errors="v$.password.$errors"
        htmlType="password"
        label="Password"
      >
        <template #additional>
          <RouterLink
            class="text-sm text-header-secondary underline"
            to="/auth/forgot-password"
          >
            Forgot your password?
          </RouterLink>
        </template>
      </FormItem>
      <div class="flex gap-2">
        <AButton
          :disabled="loading"
          class="w-2/6 bg-card py-2 rounded-md hover:brightness-125 transition-all"
          @click.prevent="$router.push({ name: 'signup' })"
        >
          Register
        </AButton>
        <AButton
          :disabled="loading"
          class="w-4/6 bg-card py-2 rounded-md hover:brightness-125 transition-all"
          htmlType="submit"
          type="primary"
          @click.prevent="login"
        >
          Login
        </AButton>
      </div>
    </form>
  </ACard>
</template>

<script lang="ts" setup>
import type { ValidationArgs } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import AButton from "@/components/ui/AButton.vue";
import ACard from "@/components/ui/ACard.vue";
import { computed, reactive } from "vue";
import FormItem from "@/components/ui/FormItem.vue";
import { Auth } from "@/constants/apiRoutes";
import { useForm } from "@/composables/useForm";
import { useAuthStore } from "@/stores/auth";
import type { LoginResponse } from "@/types/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();

const {
  record,
  v$,
  loading,

  submitForm,
} = useForm({
  rules: computed<ValidationArgs>(() => ({
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  })),
  url: Auth.login,
  model: reactive({
    email: "asdf@asdf.com",
    password: "a1B@asdf",
  }),
});

const router = useRouter();

const login = async () => {
  try {
    const response = await submitForm<Partial<LoginResponse>>();
    if (!response) return;

    await authStore.init(response.token);
    await router.push({ name: "me" });

    // return authStore.setLoading(false);
  } catch (e) {
    console.log(e);
  }
};
</script>
