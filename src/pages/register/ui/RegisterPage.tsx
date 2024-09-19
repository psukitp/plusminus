import { Flex, Space, Switch, Tooltip } from "antd"
import { useState } from "react"
import { RegisterFormData } from "@entities/user"
import { useAuth } from "entities/user/model"
import { Button } from "@shared/ui"
import { Link } from "react-router-dom"
import Logo from "@shared/lib/svgs/logo.svg"
import { TooltipText } from "./TooltipText"
import { RegisterContainer, RegisterInput } from "./RegisterPage-styled"

const initialForm: RegisterFormData = {
    login: '',
    password: '',
    email: '',
    name: '',
    baseCategories: true,
    secondName: ''
}

const RegisterPage = () => {
    const [form, setForm] = useState<RegisterFormData>({ ...initialForm })
    const [passwordRepeat, setPasswordRepeat] = useState<string>('')
    const { onRegister } = useAuth()
    return (
        <RegisterContainer>
            <div>
                <div className="logo">
                    <Logo />
                </div>
                <div>
                    <RegisterInput
                        placeholder="Имя"
                        type="name"
                        value={form.name}
                        onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))} />
                    <RegisterInput
                        placeholder="Фамилия"
                        type="secondName"
                        value={form.secondName}
                        onChange={(e) => setForm(prev => ({ ...prev, secondName: e.target.value }))} />
                    <RegisterInput
                        placeholder="Логин"
                        type="login"
                        value={form.login}
                        onChange={(e) => setForm(prev => ({ ...prev, login: e.target.value }))} />
                    <RegisterInput
                        placeholder="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))} />
                    <RegisterInput
                        placeholder="Пароль"
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))} />
                    <RegisterInput
                        placeholder="Повторите пароль"
                        type="password"
                        value={passwordRepeat}
                        onChange={(e) => setPasswordRepeat(e.target.value)} />
                    <Space>
                        <Switch
                            checked={form.baseCategories}
                            onChange={(baseCategories) => setForm(prev => ({ ...prev, baseCategories }))} />
                        <Tooltip
                            title={<TooltipText />}>
                            Базовые категории
                        </Tooltip>
                    </Space>
                    {
                        form.password !== passwordRepeat && <p style={{ color: 'red' }}>Пароли не совпадают</p>
                    }
                    <Flex
                        style={{ marginTop: form.password !== passwordRepeat ? "0" : "19px" }}
                        align="center"
                        justify="center"
                        gap={15}>
                        <Button
                            type="primary"
                            onClick={() => onRegister(form)}
                            disabled={form.password !== passwordRepeat}
                        >
                            Зарегистрироваться
                        </Button>
                        <Link to='/auth'>
                            <Button>
                                Войти
                            </Button>
                        </Link>
                    </Flex>
                </div>
            </div>
        </RegisterContainer >
    )
}

export default RegisterPage