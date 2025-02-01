import { forwardRef } from "react";
import Input from "../ui/Input";

export const ConfirmPasswordInputValidate = (password: string) => {
    return {
        required: 'Confirma tu contraseña',
        validate: (value: string | boolean) => value === password || 'Las contraseñas no coinciden'
    }
};

const ConfirmPasswordInput = forwardRef<HTMLInputElement, {
    errors: {
        confirmPassword?: {
            message?: string
        }
    },
}>(
    ({ errors: { confirmPassword }, ...props }, ref) => {
        return <Input
            key='confirmPassword'
            id='confirmPassword'
            type='password'
            label='Confirmar contraseña'
            error={confirmPassword?.message}
            {...props}
            ref={ref}
        />
    }
);

ConfirmPasswordInput.displayName = 'ConfirmPasswordInput';

export default ConfirmPasswordInput