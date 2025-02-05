// components/auth/RegisterForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import UsernameInput, { UsernameInputValidate } from '../inputs/UsernameInput';
import EmailInput, { EmailInputValidate } from '../inputs/EmailInput';
import PasswordInput, { PasswordInputValidate } from '../inputs/PasswordInput';
import ConfirmPasswordInput, { ConfirmPasswordInputValidate } from '../inputs/ConfirmPassowdInput';
import Input from '../ui/Input';
import { isEmpty, isNotUndefined } from '@/utils/validatios';

type FormData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
};

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<FormData>({
        defaultValues: {
            terms: false
        }
    });

    const username = watch('username');
    const email = watch('email');
    const password = watch('password');
    const confirmPassword = watch('confirmPassword');
    const terms = watch('terms');

    const onSubmit = async (data: FormData) => {
        // Lógica de registro
        console.log(data);
        await new Promise(resolve => setTimeout(resolve, 2000));
    };

    function disabledBtn(): boolean {
        return isEmpty(username)
            || isNotUndefined(errors.username)
            || isEmpty(email)
            || isNotUndefined(errors.email)
            || isEmpty(password)
            || isNotUndefined(errors.password)
            || isEmpty(confirmPassword)
            || isNotUndefined(errors.confirmPassword)
            || !terms;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <UsernameInput errors={errors} {...register('username', UsernameInputValidate)} />
            <EmailInput errors={errors} {...register('email', EmailInputValidate)} />
            <PasswordInput errors={errors} {...register('password', PasswordInputValidate)} />
            <ConfirmPasswordInput errors={errors} {...register('confirmPassword', ConfirmPasswordInputValidate(password))} />

            <div className="flex items-center">
                <Input
                    id="terms"
                    type="checkbox"
                    {...register('terms', {
                        required: 'Debes aceptar los términos y condiciones'
                    })} />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                    Acepto los{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                        Términos de servicio
                    </a>{' '}
                    y la{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                        Política de privacidad
                    </a>
                </label>
            </div>
            {errors.terms && (
                <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>
            )}

            <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={disabledBtn()}
                isLoading={isSubmitting}
            >
                Registrarse
            </Button>
        </form>
    );
};

export default RegisterForm;