import { useAuth } from '@entities/user'
import { Input } from 'antd'
import { useState } from 'react'
import { PasswordInput } from './ResetPassword-styled'
import { Button } from '@shared/ui'

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
      <div className='title'>
        Восстановление пароля
      </div>
      <Input
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
          maxLength={4}
          className="input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      )}
      {!enterCode && enterPassword && (
        <>
          <PasswordInput
            value={password}
            autoComplete={'none'}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordInput
            value={passwordRepeat}
            autoComplete={'none'}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
        </>
      )}
      <Button onClick={okHandler} type='primary'>Отправить</Button>
    </div>
  )
}
