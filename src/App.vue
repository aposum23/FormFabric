<script setup lang="ts">
import { useFormStore } from "@/stores/FormStore.ts";
import {onBeforeMount, onMounted, toRefs} from "vue";
import FormFabric from "@/modules/FormFabric";

const formStore = useFormStore();
const { formFields, formData, validationMessages } = toRefs(formStore);
const { getFields,
  deleteFormData,
  clearFormData,
  getFormData,
  saveFormData } = formStore;

onMounted(() => {
  getFields();
  getFormData();
})
</script>

<template>
  <header class="header">
    <h1>Form fabric example</h1>
  </header>
  <div class="content-container">
    <div class="chapter-header">
      <h2>Форма - пример</h2>
    </div>
    <Divider />
    <div class="chapter-content">
      <FormFabric
          :schema="formFields"
          :validation-messages="validationMessages"
          v-model="formData"
      >
        <template #buttons>
          <Button label="Сохранить" @click="saveFormData"/>
          <Button label="Отменить" outlined @click="clearFormData"/>
          <Button label="Удалить" outlined @click="deleteFormData"/>
        </template>
      </FormFabric>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chapter {
  &-header {
    & h2 {
      margin: 0;
    }
  }
  &-content {
    display: flex;
    justify-content: center;
  }
}
</style>
