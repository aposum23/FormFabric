import type {ISchema} from "@/modules/FormFabric/types";

export const getFormFields = async (): Promise<{fields: ISchema[]}> => {
    return {
        fields: [
            { type: "text", label: "Имя", model: "name", required: true },

            { type: "email", label: "Email", model: "email", required: true, pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', patternExample: 'aaa@aaa.aa' },

            { type: "text", label: "Телефон", model: "phone", required: true, pattern: '^8\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}$', patternExample: '8(800)555-35-35'},

            { type: "password", label: "Пароль", model: "password", required: true, minLength: 6 },

            { type: "select", label: "Роль", model: "role", options: ["Админ", "Пользователь"], required: true },

            { type: "checkbox", label: "Согласен с условиями", model: "terms", required: true },
        ]
    }
}

export const postFormDataRequest = async (data: {[K:string]: string | boolean}): Promise<void> => {
    window.localStorage.setItem('formData', JSON.stringify(data));
}

export const getFormDataRequest = async (): Promise<{[K:string]: string | boolean}> => {
    return JSON.parse(window.localStorage.getItem('formData') || '')
}

export const deleteFormDataRequest = async (): Promise<void> => {
    window.localStorage.removeItem('formData');
}