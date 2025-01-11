import { useAuth } from '@entities/user'
import { useState } from 'react'
import { Button, Input } from '@shared/ui'

export const ResetPasswordComponent = ({
  className,
}: {
  className?: string
}) => {
  const [mail, setMail] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordRepeat, setPasswordRepeat] = useState<string>('')
  const [enterCode, setEnterCode] = useState<boolean>(false)
  const [enterPassword, setEnterPassword] = useState<boolean>(false)
  const { getResetCode, applyCode, setPassword: setNewPassword } = useAuth()

  const okHandler = () => {
    if (!enterCode && !enterPassword) {
      getResetCode(mail).then((res) => {
        setEnterCode(res)
      })
    } else if (!enterPassword) {
      applyCode(code).then((res) => {
        if (res) {
          setEnterCode(false)
          setEnterPassword(true)
        }
      })
    } else {
      if (password === passwordRepeat) setNewPassword(password)
    }
  }

  return (
    <div className={className}>
      <div className="title">Восстановление пароля</div>
      <Input
        type="email"
        className="input"
        placeholder="Почта"
        disabled={enterCode || enterPassword}
        value={mail}
        onChange={(e) => setMail(e.target.value)}
      />
      {enterCode && !enterPassword && (
        <Input
          placeholder="Код восстановления"
          type="number"
          className="input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      )}
      {!enterCode && enterPassword && (
        <>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
        </>
      )}
      <Button onClick={okHandler} type="primary">
        Отправить
      </Button>
    </div>
  )
}
