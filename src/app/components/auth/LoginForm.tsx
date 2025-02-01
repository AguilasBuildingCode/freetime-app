'use client';

import { useForm } from 'react-hook-form';
import Button from '@/app/components/ui/Button';
import { isEmpty, isNotUndefined } from '@/utils/validatios';
import Link from 'next/link';
import EmailInput, { EmailInputValidate } from '../inputs/EmailInput';
import PasswordInput, { PasswordInputSoftValidate } from '../inputs/PasswordInput';
import Input from '../ui/Input';

type FormData = {
    email: string;
    password: string;
    rememberMe: boolean;
};

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<FormData>();

    const email = watch('email');
    const password = watch('password');

    const disabledBtn = (): boolean => {
        if (!password) {
            return true
        }
        return isNotUndefined(errors.email) || isEmpty(email) || isNotUndefined(errors.password) || isEmpty(password) || password.length < 8
    }

    const onSubmit = async (data: FormData) => {
        // Lógica de autenticación aquí
        console.log(data);
        await new Promise(resolve => setTimeout(resolve, 2000));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <EmailInput errors={errors} {...register('email', EmailInputValidate)} />
            <PasswordInput errors={errors} {...register('password', PasswordInputSoftValidate)} />

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Input
                        id="remember-me"
                        type="checkbox" 
                        {...register('rememberMe')}
                    />

                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Recordarme
                    </label>
                </div>

                <Link href="/reset-password" className="text-sm text-blue-600 hover:text-blue-500">¿Olvidaste tu contraseña?</Link>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={disabledBtn()} isLoading={isSubmitting}>
                Iniciar sesión
            </Button>
        </form>
    );
};

export default LoginForm;