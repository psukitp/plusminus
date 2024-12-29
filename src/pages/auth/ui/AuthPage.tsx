import { useState } from 'react'
import { AuthFormData } from '@entities/user'
import { useAuth } from '@entities/user'
import { Link } from 'react-router-dom'
import { initialForm } from './utils'
import { Input, Button } from '@shared/ui/components'

const AuthPageComponent = ({ className }: { className?: string }) => {
  const [form, setForm] = useState<AuthFormData>({ ...initialForm })
  const { onAuth } = useAuth()
  return (
    <div className={className}>
      <div className="form">
        <div className="welcome">Добро пожаловать!</div>
        <div className="label">Логин или почта</div>
        <Input
          type="login"
          value={form.login}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, login: e.target.value }))
          }
        />
        <div className="label">Пароль</div>
        <Input
          type="password"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <div className="reset">
          <Link to="/reset">Не помню пароль</Link>
        </div>
        <Button type="primary" textAlign="center" onClick={() => onAuth(form)}>
          Войти
        </Button>
        <div className="register">
          <Link to="/register">
            Нет аккаунта? <span>Зарегистрируйся!</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AuthPageComponent
