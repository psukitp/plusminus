import { Button, Flex, Input } from "antd"
import './AuthPage.less'
import { useState } from "react"
import { AuthFormData } from "./types"
import { useAuth } from "../../hooks/use-auth/useAuth"
import { Link } from "react-router-dom"

const initialForm: AuthFormData = {
    login: '',
    password: ''
}

export const AuthPage = () => {
    const [form, setForm] = useState<AuthFormData>({ ...initialForm })
    const { onAuth } = useAuth()
    return (
        <div className="container">
            <div>
                <Input
                    className="auth-input"
                    placeholder="Логин"
                    type="login"
                    value={form.login}
                    onChange={(e) => setForm(prev => ({ ...prev, login: e.target.value }))} />
                <Input
                    className="auth-input"
                    placeholder="Пароль"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))} />
                <Flex
                    align="center"
                    justify="center"
                    gap={15}>
                    <Button
                        type="primary"
                        onClick={() => onAuth(form)}
                    >
                        Войти
                    </Button>
                    <Button>
                        <Link to='/register'>
                            Зарегистрироваться
                        </Link>
                    </Button>
                </Flex>
            </div>
        </div >
    )
}