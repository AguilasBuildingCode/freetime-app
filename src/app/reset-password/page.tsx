// src/app/reset-password/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form';
import { ResetPsswdFormData } from '../types/ResetPsswdType';
import ResetPsswdForm from '../components/auth/ResetPsswdForm';

const ResetPasswordPage = () => {
    const [error, setError] = useState('')
    const router = useRouter()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<ResetPsswdFormData>();

    const onSubmit = async (data: ResetPsswdFormData) => {
        await new Promise<void>(async resolve => {
            setError('')

            try {
                const res = await fetch('/api/reset-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })

                if (!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`)
                }

                router.push('/reset-password/success')
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error desconocido')
            }
            resolve()
        });
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Restablecer contraseña
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <ResetPsswdForm email={watch('email')} errors={errors} register={register} isSubmitting={isSubmitting} error={error} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordPage;