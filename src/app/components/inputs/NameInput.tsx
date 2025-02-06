import { forwardRef } from "react";
import Input from "../ui/Input";

export const NameInputValidate = {
    required: 'El nombre es requerido',
    minLength: {
        value: 3,
        message: 'Mínimo 3 caracteres'
    },
    maxLength: {
        value: 20,
        message: 'Máximo 20 caracteres'
    }
}

const NameInput = forwardRef<HTMLInputElement, {
    errors: {
        name?: {
            message?: string
        }
    },
}>(
    ({ errors: { name }, ...props }, ref) => {
        return <Input
            ref={ref}
            key='name'
            id='name'
            label='Nombre'
            error={name?.message}
            {...props}
        />
    }
);

NameInput.displayName = 'NameInput';

export default NameInput