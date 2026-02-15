import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { useLogin } from '@/api/generated/endpoints/authentication/authentication'
import { useAuthStore } from '@/stores/auth-store'
import type { ErrorType } from '@/api/axios-instance'
import type { GlobalErrorCodeResponse } from '@/api/generated/model'

const loginSchema = z.object({
  email: z.string().email('Bitte gueltige E-Mail-Adresse eingeben'),
  password: z.string().min(1, 'Passwort wird benoetigt'),
})

type LoginFormErrors = Partial<Record<keyof z.infer<typeof loginSchema>, string>>

const ERROR_MESSAGES: Record<string, string> = {
  BAD_CREDENTIALS: 'E-Mail oder Passwort ist falsch.',
  ACCOUNT_DISABLED: 'Dieses Konto ist deaktiviert.',
}

export function useLoginForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<LoginFormErrors>({})
  const [serverError, setServerError] = useState<string | null>(null)

  const loginMutation = useLogin({
    mutation: {
      onSuccess: (data) => {
        if (data.accessToken && data.refreshToken && data.user) {
          useAuthStore.getState().login(
            data.accessToken,
            data.refreshToken,
            {
              id: data.user.id!,
              email: data.user.email!,
              firstName: data.user.firstName!,
              lastName: data.user.lastName!,
              role: data.user.role as 'ADMIN' | 'PROJECTMANAGER' | 'EMPLOYER',
            },
          )
          navigate({ to: '/' })
        }
      },
      onError: (error: ErrorType<GlobalErrorCodeResponse>) => {
        const errorCode = error.response?.data?.errorCode
        const message =
          errorCode && ERROR_MESSAGES[errorCode]
            ? ERROR_MESSAGES[errorCode]
            : 'Anmeldung fehlgeschlagen. Bitte versuche es erneut.'
        setServerError(message)
      },
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setServerError(null)

    const result = loginSchema.safeParse({ email, password })

    if (!result.success) {
      const fieldErrors: LoginFormErrors = {}
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof LoginFormErrors
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message
        }
      })
      setErrors(fieldErrors)
      return
    }

    loginMutation.mutate({ data: { email, password } })
  }

  return {
    email,
    password,
    errors,
    serverError,
    isLoading: loginMutation.isPending,
    onEmailChange: setEmail,
    onPasswordChange: setPassword,
    onSubmit: handleSubmit,
  }
}
