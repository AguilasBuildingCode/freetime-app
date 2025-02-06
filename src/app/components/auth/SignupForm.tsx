// components/auth/RegisterForm.tsx
'use client';

import Button from '../ui/Button';
import { NameInputValidate } from '../inputs/NameInput';
import EmailInput, { EmailInputValidate } from '../inputs/EmailInput';
import PasswordInput, { PasswordInputValidate } from '../inputs/PasswordInput';
import ConfirmPasswordInput, { ConfirmPasswordInputValidate } from '../inputs/ConfirmPassowdInput';
import Input from '../ui/Input';
import { isEmpty, isNotUndefined } from '@/utils/validatios';
import { SignupFormData } from '@/app/types/SignupType';
import Forms from '@/app/interfaces/FormsInterface';
import ErrorLabel from '../ui/ErrorLabel';
import NameInput from '../inputs/NameInput';

const SingupForm = ({
    name,
    email,
    password,
    confirmPassword,
    terms,
    error,
    errors,
    register,
    isSubmitting,
}: SignupFormData & Forms<SignupFormData>) => {

    function disabledBtn(): boolean {
        return isEmpty(name)
            || isNotUndefined(errors.name)
            || isEmpty(email)
            || isNotUndefined(errors.email)
            || isEmpty(password)
            || isNotUndefined(errors.password)
            || isEmpty(confirmPassword)
            || isNotUndefined(errors.confirmPassword)
            || !terms;
    }

    return (
        <>
            <NameInput errors={errors} {...register('name', NameInputValidate)} />
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
                <ErrorLabel error={errors.terms.message} />
            )}

            <ErrorLabel error={error} />

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
        </>
    );
};

export default SingupForm;