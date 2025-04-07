import {defineStore} from "pinia";
import {ref} from "vue";
import {
    deleteFormDataRequest,
    getFormDataRequest,
    getFormFields,
    postFormDataRequest
} from "@/api/form.ts";
import type {ISchema} from "@/modules/FormFabric/types";
import {useValidation} from "@/modules/FormFabric/composables/validation.ts";

export const useFormStore = defineStore('form', () => {
    const formFields = ref<ISchema[]>();
    const formData = ref<{[K:string]: string | boolean}>({});

    let validationMessages = ref<{[K:string]: string}>({});
    const { validateField } = useValidation(formData, validationMessages);

    const getFields = (): void => {
        getFormFields().then(({fields}: {fields: ISchema[]}): void => {
            formFields.value = fields
        }).catch((e): void => {
            console.error('Error occurred in "getFormField" request:', e);
        });
    }

    const clearFormData = (): void => {
        for (const field of formFields.value)
        formData.value = {}
    }

    const saveFormData = async (): Promise<void> => {
        if (formFields.value) {
            for (const field of formFields.value) {
                validateField(field);
            }
            console.log(validationMessages.value);
            if (Object.entries(validationMessages.value).length === 0)
                await postFormDataRequest(formData.value);
        }
    }

    const deleteFormData = async (): Promise<void> => {
        formData.value = {};
        await deleteFormDataRequest();
    }

    const getFormData = (): void => {
        getFormDataRequest().then((response) => {
            formData.value = response
        })
    }

    return {
        formFields,
        formData,
        validationMessages,
        getFields,
        clearFormData,
        saveFormData,
        deleteFormData,
        getFormData
    }
})