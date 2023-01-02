<template>
    <ACard class="w-96">
      <template #title>
        <h1 class="text-xl font-logo font-semibold">talkio.</h1>
        <h2 class="text-3xl font-medium">Sign Up</h2>
        <span class="text-header-description">Let's get you on board!</span>
      </template>
      <form class="flex flex-col gap-5 w-full">
        <FormItem
            v-model="model.email"
            type="email"
            label="Email"
            :errors="v$.email.$errors"
        />
        <FormItem
            v-model="model.username"
            label="Username"
            :errors="v$.username.$errors"
        />
        <FormItem
            v-model="model.password"
            label="Password"
            type="password"
            :errors="v$.password.$errors"
        />
        <FormItem
            v-model="model.confirmPassword"
            label="Confirm Password"
            type="password"
            :errors="v$.confirmPassword.$errors"
        />
        <AButton
            type="submit"
            class="w-full bg-card py-2 rounded-md hover:brightness-125 transition-all"
            @click.prevent="signup"
        >
          Signup
        </AButton>
      </form>
    </ACard>
</template>

<script setup lang="ts">
import {useVuelidate} from "@vuelidate/core";
import type {ValidationArgs} from "@vuelidate/core";
import {required, email, sameAs, minLength, helpers, not} from "@vuelidate/validators";
import {computed, reactive} from "vue";
import ACard from "@/components/ui/ACard.vue";
import FormItem from "@/components/ui/FormItem.vue";
import AButton from "@/components/ui/AButton.vue";

const signup = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
};
const model = reactive({
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
});
// Regex for password validation (Minimum eight characters, at least one letter, one special and one number):
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const rules = computed<ValidationArgs>(() => ({
  email: {
    required,
    email,
  },
  username: {
    required,
    minLength: minLength(4),
    notEmail: helpers.withMessage("Username cannot be an email", not(email)),
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
    sameAsPassword: sameAs(model.password),
  },
}))

const v$ = useVuelidate(rules, model);
</script>