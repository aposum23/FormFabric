type InputType = 'text' | 'email' | 'password' | 'select' | 'checkbox';

export interface ISchema {
    type: InputType,
    label: string,
    model: string,
    required: boolean,
    minLength?: number,
    options?: string[],
};