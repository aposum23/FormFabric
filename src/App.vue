<script setup lang="ts">
import {useFormStore} from "@/stores/FormStore.ts";
import {onMounted} from "vue";
import FormFabric from "@/modules/FormFabric/FormFabric.vue";

const {getFields, formFields, formData} = useFormStore();

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
    <FormFabric :schema="formFields" v-model="formData" />
  </div>
</template>

<style lang="scss" scoped>
.chapter-header {
  & h2 {
    margin: 0;
  }
}
</style>
