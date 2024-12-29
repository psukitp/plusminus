import { useUser } from '@entities/user'
import { userSettingsQueries } from '@features/user-info/api'
import { openNotificationSuccess } from '@shared/lib'
import { Currency } from '@shared/lib'
import { getCurrencySymbol } from '@shared/utils'
import { Button, Flex, Modal, Radio } from 'antd'
import { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'

export const AddCurrencyModalComponent = ({
  open,
  className,
}: {
  open: boolean
  className?: string
}) => {
  const [currency, setCurrency] = useState<Currency>('rub')
  const setUserSettings = useUser((state) => state.setUserSettings)

  const commentText = useMemo(() => {
    switch (currency) {
      case 'rub':
        return 'А мне учет славянский дороже гамбургера забугорного 🍔'
      case 'dol':
        return 'А мы и не против гегемонии🗽'
      case 'eur':
        return 'Доне моне свито лиц деневех па де ле жю де ше шанель деневех па🗼'
    }
  }, [currency])

  const onOk = useCallback(async () => {
    const settings = await userSettingsQueries.updateSettings({ currency })
    if (settings) {
      openNotificationSuccess('Настройки успешно обновлены')
      setUserSettings(settings)
    }
  }, [currency])

  const footer = useMemo(() => {
    const okButton = (
      <Button onClick={onOk} type="primary">
        Сохранить
      </Button>
    )
    return [okButton]
  }, [onOk])

  return (
    <Modal
      open={open}
      closable={false}
      centered
      className={className}
      onOk={onOk}
      footer={footer}
    >
      <div className="no-currency">У тебя еще не указана валюта 😟 </div>
      <div className="fix"> Давай исправим это!</div>
      <div className="question">В какой валюте ты зарабатываешь и тратишь?</div>
      <Flex vertical gap="middle" align="center">
        <Radio.Group
          className="radio"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <Radio.Button value="rub">
            Рубли - {getCurrencySymbol('rub')}
          </Radio.Button>
          <Radio.Button value="eur">
            Евро - {getCurrencySymbol('eur')}
          </Radio.Button>
          <Radio.Button value="dol">
            Доллары - {getCurrencySymbol('dol')}
          </Radio.Button>
        </Radio.Group>
      </Flex>
      <div className="comment">{commentText}</div>
    </Modal>
  )
}

export const AddCurrencyModal = styled(AddCurrencyModalComponent)`
  .no-currency,
  .fix {
    font-size: 16px;
  }

  .no-currency,
  .fix,
  .question,
  .radio,
  .comment {
    padding: 8px 0;
    text-align: center;
  }

  .question {
    padding-bottom: 20px;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
  }
`
