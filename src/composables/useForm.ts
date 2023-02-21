import type { ValidationArgs } from "@vuelidate/core";
import { useVuelidate } from "@vuelidate/core";
import type { ComputedRef } from "vue";
import { ref } from "vue";
import { service } from "@/utils/service";

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
  const errors = ref<{ [x: string]: string }>({});
  const v$ = useVuelidate(rules, record, { $externalResults: errors.value });

  const submitForm = async <T>() => {
    try {
      loading.value = true;

      const isFormValid = await v$.value.$validate();
      if (!isFormValid) return false;

      const res = await service.post<never, T>(url, record.value);
      return res;
    } catch (e) {
      errors.value = e as { [x: string]: string };
      Object.entries(errors.value).forEach(([key, value]) => {
        v$.value[key].$errors.push({ $message: value });
      });
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
