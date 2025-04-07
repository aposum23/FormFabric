<script setup lang="ts">
import './assets/formStyles.scss';

import {
  InputText,
  Checkbox,
  Select
} from "primevue";

import {ref, toRefs} from "vue";
import type {ISchema} from "./types";
import {useValidation} from "@/modules/FormFabric/composables/validation.ts";


const props = defineProps<{
  schema: ISchema[] | undefined,
  validationMessages: {[K:string]: string}
}>();

// Управление модел валью ----------------------
const modelValue = defineModel<{[K:string]: string | boolean}>();

const updateModelValue = (value: string | boolean, model: string): void => {
  if (modelValue.value)
    modelValue.value[model] = value;
}

// Блок валидации формы ------------------------
const { validationMessages } = toRefs(props);

const {clearValidationMessage, validateField} = useValidation(modelValue, validationMessages);

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
    <div class="control-container">
      <slot name="buttons">
      </slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>