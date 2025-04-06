<script setup lang="ts">
import './assets/formStyles.scss';
import type {ISchema} from "./types";
import {
  InputText,
  Checkbox,
  Select
} from "primevue";
import {ref} from "vue";

const props = defineProps<{
  schema: ISchema[] | undefined
}>();

// Управление модел валью ----------------------
const modelValue = defineModel<{[K:string]: string | boolean}>();

const updateModelValue = (value: string | boolean, model: string): void => {
  if (modelValue.value)
    modelValue.value[model] = value;
}

// Блок валидации формы ------------------------
const validationMessages = ref<{[K:string]: string}>({});

const clearValidationMessage = (model: string): void => {
  if (validationMessages.value[model])
    delete validationMessages.value[model]
}

const validateField = (field: ISchema): boolean => {
  let isInvalid = false;
  if (field.required && modelValue.value) { // Провалидируем на то что значение заполнено (если это надо)
    isInvalid = modelValue.value[field.model] !== undefined && !modelValue.value[field.model]
    isInvalid && (validationMessages.value[field.model] = 'Поле должно быть заполнено');
  }
  // Теперь надо провалидировать длину поля если это необходимо и поле не пустое
  if (!isInvalid && field?.minLength && modelValue.value && typeof modelValue.value[field.model] === 'string') {
    const fieldValue = modelValue.value[field.model] as string;
    isInvalid = fieldValue.length <= field.minLength
    isInvalid && (validationMessages.value[field.model] = `Минимальная длина ${field.minLength}`)
  }
  // Здесь происходит валидация по паттерну того как должна выглядить строка (например валидация корректности почты)
  if(!isInvalid && field?.pattern && modelValue.value && typeof modelValue.value[field.model] === 'string') {
    const re = new RegExp(field.pattern);
    isInvalid = !re.test(modelValue.value[field.model] as string);
    isInvalid && (validationMessages.value[field.model] = `Строка не соответствует требуемой`)
  }

  // Если у нас все валидно и при этом когда-то было не валидным, нужно удалить сообщение об этом
  if (!isInvalid)
    clearValidationMessage(field.model)

  return isInvalid; // Возвращаем значение того что валидно наше поле или нет
}
</script>

<template>
  <div class="form-container" v-if="schema">
    <template v-for="field in schema">
      <div class="form-field" v-if="['text', 'email', 'password'].includes(field.type)">
        <div class="form-field__label">
          {{field.label}}
        </div>
        <InputText
            class="form-field__input"
            :type="field.type"
            :invalid="!!validationMessages[field.model]"
            :model-value="modelValue ? modelValue[field.model] as string : ''"
            @update:model-value="(value: string) => updateModelValue(value, field.model)"
            @focus="clearValidationMessage(field.model)"
            @focusout="validateField(field)"
        />
        <div class="form-field__message">
          {{validationMessages[field.model]}}
        </div>
      </div>
      <div class="form-field" v-if="field.type === 'select'">
        <div class="form-field__label">
          {{field.label}}
        </div>
        <Select
            class="form-field__input"
            showClear
            :options="field.options"
            :invalid="validateField(field)"
            :model-value="modelValue ? modelValue[field.model] as string : ''"
            @update:model-value="(value: string) => updateModelValue(value, field.model)"
            @focus="clearValidationMessage(field.model)"
        />
        <div class="form-field__message">
          {{validationMessages[field.model]}}
        </div>
      </div>
      <div class="form-field" v-if="field.type === 'checkbox'">
        <div class="form-field__label">
          {{field.label}}
        </div>
        <div class="form-field__input">
          <Checkbox
              binary
              :invalid="validateField(field)"
              :model-value="modelValue ? modelValue[field.model] as boolean : false"
              @update:model-value="(value: boolean) => updateModelValue(value, field.model)"
              @focus="clearValidationMessage(field.model)"
          />
          <div class="form-field__message">
            {{validationMessages[field.model]}}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
</style>