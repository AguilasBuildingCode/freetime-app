// app/login/page.tsx
import Logo from '@/app/components/ui/Logo';
import LoginForm from '@/app/components/auth/LoginForm';
import SocialAuth from '@/app/components/auth/SocialAuth';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Logo size="lg" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Inicia sesión en tu cuenta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Regístrate gratis
            </a>
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <LoginForm />
          <SocialAuth />
        </div>
      </div>
    </div>
  );
}