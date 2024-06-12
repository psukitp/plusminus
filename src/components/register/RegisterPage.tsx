import { Flex, Input, Space, Switch, Tooltip } from "antd"
import './RegisterPage.less'
import { useState } from "react"
import { RegisterFormData } from "./types"
import { useAuth } from "@hooks"
import { Button } from "@components/common/buttons"
import { Link } from "react-router-dom"
import Logo from "@common/svgs/logo.svg"
import { TooltipText } from "./TooltipText"

const initialForm: RegisterFormData = {
    login: '',
    password: '',
    email: '',
    name: '',
    baseCategories: true,
    secondName: ''
}

export const RegisterPage = () => {
    const [form, setForm] = useState<RegisterFormData>({ ...initialForm })
    const [passwordRepeat, setPasswordRepeat] = useState<string>('')
    const { onRegister } = useAuth()
    return (
        <div className="reg-container">
            <div>
                <div className="logo">
                    <Logo />
                </div>
                <div>
                    <Input
                        className="reg-input"
                        placeholder="Имя"
                        type="name"
                        value={form.name}
                        onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))} />
                    <Input
                        className="reg-input"
                        placeholder="Фамилия"
                        type="secondName"
                        value={form.secondName}
                        onChange={(e) => setForm(prev => ({ ...prev, secondName: e.target.value }))} />
                    <Input
                        className="reg-input"
                        placeholder="Логин"
                        type="login"
                        value={form.login}
                        onChange={(e) => setForm(prev => ({ ...prev, login: e.target.value }))} />
                    <Input
                        className="reg-input"
                        placeholder="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))} />
                    <Input
                        className="reg-input"
                        placeholder="Пароль"
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))} />
                    <Input
                        className="reg-input"
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
        </div >
    )
}