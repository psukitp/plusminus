import { Flex, Space, Switch, Tooltip } from 'antd'
import { useState } from 'react'
import { RegisterFormData } from '@entities/user'
import { useAuth } from '@entities/user'
import { Button } from '@shared/ui'
import { Link } from 'react-router-dom'
import { TooltipText } from './TooltipText'
import {
  PasswordInput,
  RegisterContainer,
  RegisterInput,
} from './RegisterPage-styled'

const initialForm: RegisterFormData = {
  login: '',
  password: '',
  email: '',
  name: '',
  baseCategories: true,
  secondName: '',
}

const RegisterPage = () => {
  const [form, setForm] = useState<RegisterFormData>({ ...initialForm })
  const [passwordRepeat, setPasswordRepeat] = useState<string>('')
  const { onRegister } = useAuth()
  return (
    <RegisterContainer>
      <Flex align="center" justify="center" className="title">
        Регистрация
      </Flex>
      <RegisterInput
        placeholder="Имя"
        type="name"
        value={form.name}
        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
      />
      <RegisterInput
        placeholder="Фамилия"
        type="secondName"
        value={form.secondName}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, secondName: e.target.value }))
        }
      />
      <RegisterInput
        placeholder="Логин"
        type="login"
        value={form.login}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, login: e.target.value }))
        }
      />
      <RegisterInput
        placeholder="email"
        type="email"
        value={form.email}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, email: e.target.value }))
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
      <PasswordInput
        placeholder="Повторите пароль"
        type="password"
        value={passwordRepeat}
        onChange={(e) => setPasswordRepeat(e.target.value)}
      />
      <Space>
        <Switch
          checked={form.baseCategories}
          onChange={(baseCategories) =>
            setForm((prev) => ({ ...prev, baseCategories }))
          }
        />
        <Tooltip title={<TooltipText />}>Базовые категории</Tooltip>
      </Space>
      {form.password !== passwordRepeat && (
        <p style={{ color: 'red' }}>Пароли не совпадают</p>
      )}
      <Flex
        style={{
          marginTop: form.password !== passwordRepeat ? '0' : '19px',
        }}
        align="center"
        justify="center"
      >
        <Button
          type="primary"
          onClick={() => onRegister(form)}
          disabled={form.password !== passwordRepeat}
        >
          Зарегистрироваться
        </Button>
      </Flex>
      <Flex align="center" justify="center">
        <Link to="/auth" className="link">
          У меня уже есть аккаунт
        </Link>
      </Flex>
    </RegisterContainer>
  )
}

export default RegisterPage
