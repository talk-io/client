import type { ValidationArgs } from "@vuelidate/core";
import { useVuelidate } from "@vuelidate/core";
import type { ComputedRef } from "vue";
import { ref } from "vue";
import { service } from "@/utils/service";
import { AxiosError } from "axios";

export const useForm = <T>({
  rules,
  model,
  url,
}: {
  rules: ComputedRef<ValidationArgs>;
  model?: T;
  url: string;
}) => {
  const loading = ref(false);
  const record = ref(model ?? {});
  const v$ = useVuelidate(rules, record);
  const errors = ref();

  const submitForm = async <T>() => {
    try {
      loading.value = true;

      const isFormValid = await v$.value.$validate();
      if (!isFormValid) return false;

      const res = await service.post<never, T>(url, record.value);
      return res;
    } catch (e) {
      if (e instanceof AxiosError) errors.value = e.response?.data;
    } finally {
      loading.value = false;
    }
  };

  return {
    v$,
    loading,
    record,
    errors,

    submitForm,
  };
};