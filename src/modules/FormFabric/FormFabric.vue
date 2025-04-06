<script setup lang="ts">
import './assets/formStyles.scss';
import type {ISchema} from "./types";
import {
  InputText,
  Checkbox,
  Select
} from "primevue";

const props = defineProps<{
  schema: ISchema[] | undefined
}>();

const modelValue = defineModel<{[K:string]: string | boolean}>();

const updateModelValue = (value: string | boolean, model: string): void => {
  if (modelValue.value)
    modelValue.value[model] = value;
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
            :model-value="modelValue ? modelValue[field.model] as string : ''"
            @update:model-value="(value: string) => updateModelValue(value, field.model)"
        />
      </div>
      <div class="form-field" v-if="field.type === 'select'">
        <div class="form-field__label">
          {{field.label}}
        </div>
        <Select
            class="form-field__input"
            :options="field.options"
            :model-value="modelValue ? modelValue[field.model] as string : ''"
            @update:model-value="(value: string) => updateModelValue(value, field.model)"
        />
      </div>
      <div class="form-field" v-if="field.type === 'checkbox'">
        <div class="form-field__label">
          {{field.label}}
        </div>
        <div class="form-field__input">
          <Checkbox
              binary
              :model-value="modelValue ? modelValue[field.model] as boolean : false"
              @update:model-value="(value: boolean) => updateModelValue(value, field.model)"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
</style>