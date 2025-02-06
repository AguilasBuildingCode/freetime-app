// app/register/page.tsx
'use client'

import Logo from '@/app/components/ui/Logo';
import SingupForm from '@/app/components/auth/SignupForm';
import SocialAuth from '@/app/components/auth/SocialAuth';
import { useForm } from 'react-hook-form';
import { SignupFormData } from '@/app/types/SignupType';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [error, setError] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<SignupFormData>({
    defaultValues: {
      terms: false
    }
  });

  const onSubmit = async (data: SignupFormData) => {
    await new Promise<void>(async resolve => {
      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        if (!res.ok) {
          throw new Error(`Error WS: ${res.status} ${res.statusText}`)
        }

        router.push('/login')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      }
      resolve()
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Logo size="lg" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crea tu cuenta en FreeTime
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Inicia sesión aquí
            </a>
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <SingupForm
              username={watch('username')}
              email={watch('email')}
              password={watch('password')}
              confirmPassword={watch('confirmPassword')}
              terms={watch('terms')}
              error={error}
              isSubmitting={isSubmitting}
              errors={errors}
              register={register}
            />
          </form>
          <SocialAuth />
        </div>
      </div>
    </div>
  );
}