import { Flex } from 'antd'
import { useState } from 'react'
import { AuthFormData } from '@entities/user'
import { useAuth } from '@entities/user'
import { Link } from 'react-router-dom'
import { initialForm } from './utils'
import { AuthContainer, AuthInput, PasswordInput } from './AuthPage-styled'
import { Button } from '@shared/ui'

const AuthPage = () => {
  const [form, setForm] = useState<AuthFormData>({ ...initialForm })
  const { onAuth } = useAuth()
  return (
    <AuthContainer>
      <div>
        <Flex align="center" justify="center" className='title'>
          Вход
        </Flex>
        <AuthInput
          placeholder="Логин или почта"
          type="login"
          value={form.login}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, login: e.target.value }))
          }
        />
        <PasswordInput
          placeholder="Пароль"
          type="password"
          value={form.password}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <Flex align="center" justify="center">
          <Button type="primary" onClick={() => onAuth(form)}>
            Войти
          </Button>
        </Flex>
        <Flex align="center" justify="space-between">
          <Link to="/register" className="link">
            Нет аккаунта? Зарегистрируйся!
          </Link>
          <Link to="/reset" className="link">
            Не помню пароль
          </Link>
        </Flex>
      </div>
    </AuthContainer>
  )
}

export default AuthPage
