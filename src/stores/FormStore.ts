import {defineStore} from "pinia";
import {ref} from "vue";
import {getFormFields} from "@/api/form.ts";
import type {ISchema} from "@/modules/FormFabric/types";

export const useFormStore = defineStore('form', () => {
    const formFields = ref<ISchema[]>();
    const formData = ref<{[K:string]: string | boolean}>({});

    const getFields = (): void => {
        getFormFields().then(({fields}: {fields: ISchema[]}): void => {
            formFields.value = fields
        }).catch((e): void => {
            console.error('Error occurred in "getFormField" request:', e);
        });
    }

    return {
        formFields,
        formData,
        getFields
    }
})