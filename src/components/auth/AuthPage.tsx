import { Flex } from "antd"
import { useState } from "react"
import { AuthFormData } from "./types"
import { useAuth } from "@hooks"
import { Link } from "react-router-dom"
import { Button } from "@components/common/buttons"
import Logo from "@common/svgs/logo.svg"
import { initialForm } from "./utils"
import { AuthContainer, AuthInput } from "./AuthPage-styled"

export const AuthPage = () => {
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
                        onChange={(e) => setForm(prev => ({ ...prev, login: e.target.value }))} />
                    <AuthInput
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
            </div>
        </AuthContainer >
    )
}