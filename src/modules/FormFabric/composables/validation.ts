import type {ISchema} from "../types";
import type {ModelRef, Ref} from "vue";

type ModelValueType = {[K:string]: string | boolean} | undefined

export function useValidation (modelValue: ModelRef<ModelValueType> | Ref<ModelValueType>, validationMessages: Ref<{[K:string]: string}>) {

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
            isInvalid && (validationMessages.value[field.model] = `Строка не соответствует: ${field.patternExample}`)
        }

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