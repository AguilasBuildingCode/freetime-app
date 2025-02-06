// src/app/components/auth/LoginForm.tsx

import Button from '@/app/components/ui/Button';
import { isEmpty, isNotUndefined } from '@/utils/validatios';
import Link from 'next/link';
import EmailInput, { EmailInputValidate } from '../inputs/EmailInput';
import PasswordInput, { PasswordInputSoftValidate } from '../inputs/PasswordInput';
import Input from '../ui/Input';
import { LoginFormData } from '@/app/types/LoginType';
import ErrorLabel from '../ui/ErrorLabel';
import Forms from '@/app/interfaces/FormsInterface';



const LoginForm = ({ email, password, errors, register, error, isSubmitting }: LoginFormData & Forms<LoginFormData>) => {

    const disabledBtn = (): boolean => {
        if (!password) {
            return true
        }
        return isNotUndefined(errors.email) || isEmpty(email) || isNotUndefined(errors.password) || isEmpty(password) || password.length < 8
    }

    return (
        <>
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

            <ErrorLabel error={error} />

            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={disabledBtn()} isLoading={isSubmitting}>
                Iniciar sesión
            </Button>
        </>
    );
};

export default LoginForm;