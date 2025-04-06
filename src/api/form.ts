import type {ISchema} from "@/modules/FormFabric/types";

export const getFormFields = async (): Promise<{fields: ISchema[]}> => {
    return {
        fields: [
            { type: "text", label: "Имя", model: "name", required: true },

            { type: "email", label: "Email", model: "email", required: true },

            { type: "password", label: "Пароль", model: "password", required: true, minLength: 6 },

            { type: "select", label: "Роль", model: "role", options: ["Админ", "Пользователь"], required: true },

            { type: "checkbox", label: "Согласен с условиями", model: "terms", required: true }
        ]
    }
}