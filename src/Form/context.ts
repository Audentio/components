import { createContext } from 'react';
import { FormContextType } from './types';

export const FormContext = createContext<FormContextType>({
    fields: {},
    registerField: () => {},
    getFormValue: () => {},
    getFieldValue: () => {},
    deleteField: () => {},
    onChange: () => {},
    clearForm: () => {},
    context: {},
});
