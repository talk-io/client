<template>
  <ACard>
    <template #title>
      <h1 class="text-xl font-logo font-semibold">talkio.</h1>
      <h2 class="text-3xl font-medium">Sign Up</h2>
      <span class="text-header-description">Let's get you on board!</span>
    </template>
    <form class="grid grid-cols-2 gap-5 w-full">
      <FormItem
        v-model="record.email"
        :disabled="loading"
        :errors="v$.email.$errors"
        htmlType="email"
        label="Email"
      />
      <FormItem
        v-model="record.username"
        :disabled="loading"
        :errors="v$.username.$errors"
        label="Username"
      />
      <FormItem
        v-model="record.password"
        :disabled="loading"
        :errors="v$.password.$errors"
        htmlType="password"
        label="Password"
      />
      <FormItem
        v-model="record.confirmPassword"
        :disabled="loading"
        :errors="v$.confirmPassword.$errors"
        htmlType="password"
        label="Confirm Password"
      />
      <div class="flex col-span-2 gap-2">
        <AButton
          :disabled="loading"
          class="w-2/6 bg-card py-2 rounded-md hover:brightness-125 transition-all"
          @click.prevent="$router.push({name: 'login'})"
        >
          Login
        </AButton>
        <AButton
          :disabled="loading"
          class="w-4/6 bg-card py-2 rounded-md hover:brightness-125 transition-all"
          htmlType="submit"
          type="primary"
          @click.prevent="signup"
        >
          Sign Up
        </AButton>
      </div>
    </form>
  </ACard>
</template>

<script lang="ts" setup>
import type { ValidationArgs } from "@vuelidate/core";
import { required, email, sameAs, minLength, helpers, not } from "@vuelidate/validators";
import { computed, reactive } from "vue";
import ACard from "@/components/ui/ACard.vue";
import FormItem from "@/components/ui/FormItem.vue";
import AButton from "@/components/ui/AButton.vue";
import { useAuthStore } from "@/stores/auth";
import { useForm } from "@/composables/useForm";
import { Auth } from "@/constants/apiRoutes";
import { useRouter } from "vue-router";
import type { LoginResponse } from "@/types/auth";

// Regex for password validation
// (Minimum eight characters, at least one letter,
//                            one special and one number):
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const authStore = useAuthStore();

const model = reactive({
  email: "asdf@asdf.com",
  username: "mightykiller",
  password: "a1B@asdf",
  confirmPassword: "a1B@asdf"
});

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
      email
    },
    username: {
      required,
      minLength: minLength(4),
      notEmail: helpers.withMessage("Username cannot be an email", not(email))
    },
    password: {
      required,
      minLength: minLength(8),
      passwordRegex: helpers.withMessage(
        "The password must contain at least 8 characters, " +
        "one uppercase letter, one lowercase letter, " +
        "one number and one special character",
        (value: string) => !!value.match(passwordRegex)?.length
      )
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs(model.password)
    }
  })),
  url: Auth.signup,
  model
});

const router = useRouter();

const signup = async () => {
  const response = await submitForm<Partial<LoginResponse>>();
  if (!response) return;

  authStore.setToken(response.token as string);
  delete response.token;
  authStore.setUser(response);
  return router.push({ name: "me" });
};

</script>