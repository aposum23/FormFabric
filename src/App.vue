<script setup lang="ts">
import { useFormStore } from "@/stores/FormStore.ts";
import {onBeforeMount, onMounted, toRefs} from "vue";
import FormFabric from "@/modules/FormFabric";

const formStore = useFormStore();
const { formFields, formData } = toRefs(formStore);
const { getFields } = formStore;

onMounted(() => {
  getFields();
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
      <FormFabric :schema="formFields" v-model="formData" />
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
