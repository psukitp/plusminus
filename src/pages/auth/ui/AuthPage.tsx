import { Flex } from 'antd'
import { useState } from 'react'
import { AuthFormData } from '@entities/user'
import { useAuth } from '@entities/user'
import { Link } from 'react-router-dom'
import { initialForm } from './utils'
import { AuthContainer, AuthInput } from './AuthPage-styled'
import { Button } from '@shared/ui'
import Logo from '@shared/lib/svgs/logo.svg'

const AuthPage = () => {
  const [form, setForm] = useState<AuthFormData>({ ...initialForm })
  const { onAuth } = useAuth()
  return (
    <AuthContainer>
      <div>
        <div className="logo">
          <Logo />
        </div>
        <div>
          <AuthInput
            placeholder="Логин"
            type="login"
            value={form.login}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, login: e.target.value }))
            }
          />
          <AuthInput
            placeholder="Пароль"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <Flex align="center" justify="center" gap={15}>
            <Button type="primary" onClick={() => onAuth(form)}>
              Войти
            </Button>
            <Button>
              <Link to="/register">Зарегистрироваться</Link>
            </Button>
          </Flex>
        </div>
      </div>
    </AuthContainer>
  )
}

export default AuthPage
