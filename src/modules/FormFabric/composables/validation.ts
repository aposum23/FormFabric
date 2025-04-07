import type {ISchema} from "../types";
import type {ModelRef, Ref} from "vue";

export function useValidation (modelValue: ModelRef<{[K:string]: string | boolean} | undefined>, validationMessages: Ref<{[K:string]: string}>) {
    const fillValidationWorker = new Worker(
        new URL('../webWorkers/fillValidation.ts', import.meta.url),
        {type: "module", name: 'fillValidation'}
    );
    const lengthValidationWorker = new Worker(
        new URL('../webWorkers/lengthValidation.ts', import.meta.url),
        {type: "module", name: 'lengthValidation'}
    );
    const patternValidationWorker = new Worker(
        new URL('../webWorkers/patternValidation.ts', import.meta.url),
        {type: "module", name: 'patternValidation'}
    );

    const clearValidationMessage = (model: string): void => {
        if (validationMessages.value[model])
            delete validationMessages.value[model]
    }

    const validateField = (field: ISchema): boolean => {
        let isFilled = false;
        let isValidLength = false;
        let isValidPattern = false;

        field.required && fillValidationWorker.postMessage({modelValue: modelValue.value[field.model]});
        field?.minLength && lengthValidationWorker.postMessage({modelValue: modelValue.value[field.model], minLength: field.minLength});
        field?.pattern && patternValidationWorker.postMessage({modelValue: modelValue.value[field.model], pattern: field.pattern});

        fillValidationWorker.onmessage = ({data}: {data: boolean}): void => {
            isFilled = data;
            isFilled && (validationMessages.value[field.model] = 'Поле должно быть заполнено');
        };
        lengthValidationWorker.onmessage = ({data}: {data: boolean}): void => {
            isValidLength = data;
            isValidLength && (validationMessages.value[field.model] = `Минимальная длина ${field.minLength}`);
        };
        patternValidationWorker.onmessage = ({data}: {data: boolean}): void => {
            isValidPattern = data;
            isValidPattern && (validationMessages.value[field.model] = `Строка не соответствует: ${field.patternExample}`);
        };

        const isInvalid = isFilled || isValidLength || isValidPattern;

        // Если у нас все валидно и при этом когда-то было не валидным, нужно удалить сообщение об этом
        if (!isInvalid)
            clearValidationMessage(field.model)

        return isInvalid; // Возвращаем значение того что валидно наше поле или нет
    }

    return {
        clearValidationMessage,
        validateField
    }
}