import { useLoginForm } from '../hooks/use-login-form'
import { LoginForm } from './login-form'

export function LoginPage() {
  const loginForm = useLoginForm()

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-white p-4 md:bg-gray-100">
      <div className="relative flex w-full max-w-5xl overflow-hidden bg-white md:min-h-[680px] md:rounded-2xl md:shadow-lg">
        
        <div className="relative hidden w-2/5 md:block">
          <img
            src="/login-bg.png"
            alt="Team collaboration"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute top-8 left-8">
            <h2 className="text-xl font-bold text-white">Skill Matcher</h2>
          </div>

          <div className="absolute right-8 bottom-8 left-8">
            <blockquote className="text-xl font-semibold leading-snug text-white">
              &ldquo;Die perfekte Loesung, um die richtigen Talente fuer unsere
              Projekte zu finden.&rdquo;
            </blockquote>
            <div className="mt-4">
              <p className="font-semibold text-white">Max Mustermann</p>
              <p className="text-sm text-white/80">
                Leiter Digitale Transformation
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center px-6 py-12 md:w-3/5 md:px-12">
          <LoginForm {...loginForm} />
        </div>
      </div>
    </div>
  )
}
