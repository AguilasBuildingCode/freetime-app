import { forwardRef } from "react";
import Input from "../ui/Input";

export const UsernameInputValidate = {
    required: 'El nombre de usuario es requerido',
    minLength: {
        value: 3,
        message: 'Mínimo 3 caracteres'
    },
    maxLength: {
        value: 20,
        message: 'Máximo 20 caracteres'
    }
}

const UsernameInput = forwardRef<HTMLInputElement, {
    errors: {
        username?: {
            message?: string
        }
    },
}>(
    ({ errors: { username }, ...props }, ref) => {
        return <Input
            ref={ref}
            key='username'
            id='username'
            label='Nombre de usuario'
            error={username?.message}
            {...props}
        />
    }
);

UsernameInput.displayName = 'UsernameInput';

export default UsernameInput