import { Link } from '@tanstack/react-router'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface LoginFormProps {
  email: string
  password: string
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  errors: { email?: string; password?: string }
  serverError: string | null
  isLoading: boolean
}

export function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  errors,
  serverError,
  isLoading,
}: LoginFormProps) {
  return (
    <div className="w-full max-w-sm">
      <div className="mb-14 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Willkommen zurueck
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Melde dich an, um auf Skill Matcher zuzugreifen.
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-8">
        {serverError && (
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-sm text-muted-foreground">
            E-Mail
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@beispiel.de"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            aria-invalid={!!errors.email}
            autoComplete="email"
            autoFocus
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password" className="text-sm text-muted-foreground">
            Passwort
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Passwort eingeben"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            aria-invalid={!!errors.password}
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password}</p>
          )}
          <Link
            to="/password-reset"
            className="self-start text-sm text-primary hover:underline"
          >
            Passwort vergessen?
          </Link>
        </div>

        <Button
          type="submit"
          className="mt-4 w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Anmelden...' : 'Anmelden'}
        </Button>
      </form>
    </div>
  )
}
