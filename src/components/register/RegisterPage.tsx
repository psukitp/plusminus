import { Button, Flex, Input } from "antd"
import './RegisterPage.less'
import { useState } from "react"
import { RegisterFormData } from "./types"
import { useAuth } from "../../hooks/use-auth/useAuth"

const initialForm: RegisterFormData = {
    login: '',
    password: '',
    email: '',
    name: '',
    phone: '',
    secondName: ''
}

export const RegisterPage = () => {
    const [form, setForm] = useState<RegisterFormData>({ ...initialForm })
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const { onRegister } = useAuth()
    return (
        <div className="container">
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
                    placeholder="Номер телефона"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))} />
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
                {
                    form.password !== passwordRepeat && <p style={{ color: 'red' }}>Пароли не совпадают</p>
                }
                <Flex
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
                    <Button>
                        Войти
                    </Button>
                </Flex>
            </div>
        </div >
    )
}