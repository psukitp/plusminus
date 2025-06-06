import { useState } from 'react'
import { RegisterFormData } from '@entities/user'
import { useAuth } from '@entities/user'
import { Link } from 'react-router-dom'
import { Input, Switch } from '@shared/ui'
import { Button } from 'antd'

const initialForm: RegisterFormData = {
  login: '',
  password: '',
  email: '',
  name: '',
  baseCategories: true,
  secondName: '',
}

const RegisterPageComponent = ({ className }: { className?: string }) => {
  const [form, setForm] = useState<RegisterFormData>({ ...initialForm })
  const [passwordRepeat, setPasswordRepeat] = useState<string>('')
  const { onRegister } = useAuth()
  return (
    <div className={className}>
      <div className="form">
        <div className="welcome">Регистрация</div>
        <div className="label">Имя</div>
        <Input
          placeholder="Иван"
          type="name"
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <div className="label">Фамилия</div>
        <Input
          placeholder="Иванов"
          type="secondName"
          value={form.secondName}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, secondName: e.target.value }))
          }
        />
        <div className="label">Логин</div>
        <Input
          placeholder="username"
          type="login"
          value={form.login}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, login: e.target.value }))
          }
        />
        <div className="label">Email</div>
        <Input
          placeholder="username@gmail.com"
          type="email"
          value={form.email}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <div className="label">Пароль</div>
        <Input
          placeholder="••••••••••"
          type="password"
          value={form.password}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <div className="label">Повторите пароль</div>
        <Input
          placeholder="••••••••••"
          type="password"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
        />

        <div className="switch">
          <Switch
            checked={form.baseCategories}
            onChange={(baseCategories) =>
              setForm((prev) => ({ ...prev, baseCategories }))
            }
          />
          <div>Базовые категории</div>
        </div>

        {form.password !== passwordRepeat && (
          <p className="not-equal">Пароли не совпадают</p>
        )}
        <Button
          type="primary"
          className="registerBtn"
          onClick={() => onRegister(form)}
        >
          Зарегистрироваться
        </Button>
        <div className="entry">
          <Link to="/auth">
            Уже есть аккаунт? <span>Войти!</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPageComponent
