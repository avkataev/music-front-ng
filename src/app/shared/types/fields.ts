export interface FormField<T> {
  label: string;
  value: keyof T;
  type: FormFieldType;
  placeholder: string;
}

export enum FormFieldType {
  TEXT = 'text',
  NUMBER = 'number',
  PASSWORD = 'password',
  TEXTAREA = 'textarea'
}
