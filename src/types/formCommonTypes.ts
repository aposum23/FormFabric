export interface ISchema {
    type: string,
    label: string,
    model: string,
    required: boolean,
    minLength?: number,
    options?: string[],
}