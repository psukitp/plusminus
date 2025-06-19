import { useUser } from '@entities/user'
import { userSettingsQueries } from '@features/user-info/api'
import { openNotificationSuccess } from '@shared/lib'
import { Currency } from '@shared/lib'
import { Modal, Segmented, SegmentedOption } from '@shared/ui'
import { getCurrencySymbol } from '@shared/utils'
import { Button } from 'antd'
import { useCallback, useState } from 'react'
import styled from 'styled-components'

const currencyOptions: SegmentedOption<Currency>[] = [
  {
    id: 'rub',
    label: `Рубли - ${getCurrencySymbol('rub')}`,
    value: 'rub',
  },
  {
    id: 'eur',
    label: `Евро - ${getCurrencySymbol('eur')}`,
    value: 'eur',
  },
  {
    id: 'dol',
    label: `Доллары - ${getCurrencySymbol('dol')}`,
    value: 'dol',
  },
]

export const AddCurrencyModalComponent = ({
  open,
  className,
}: {
  open: boolean
  className?: string
}) => {
  const [currency, setCurrency] = useState<Currency>('rub')
  const setUserSettings = useUser((state) => state.setUserSettings)

  const onOk = useCallback(async () => {
    const settings = await userSettingsQueries.updateSettings({ currency })
    if (settings) {
      openNotificationSuccess('Настройки успешно обновлены')
      setUserSettings(settings)
    }
  }, [currency])

  return (
    <Modal
      closable={false}
      open={open}
      className={className}
      onClose={() => {}}
    >
      <div className="no-currency">У тебя еще не указана валюта 😟 </div>
      <div className="fix"> Давай исправим это!</div>
      <div className="question">В какой валюте ты зарабатываешь и тратишь?</div>
      <div className="currencies-wrapper">
        <Segmented
          className="currencies"
          active={currency}
          options={currencyOptions}
          onClick={(opt) => setCurrency(opt.value as Currency)}
        />
      </div>
      <div className="footer">
        <Button onClick={onOk} type="primary">
          Сохранить
        </Button>
      </div>
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
    padding: ${({ theme: { gaps } }) => `${gaps.s}px`} 0;
    text-align: center;
  }

  .question {
    padding-bottom: ${({ theme: { gaps } }) => `${gaps.l}px`};
    font-weight: bold;
    font-size: 20px;
    text-align: center;
  }

  .footer {
    display: flex;
    justify-content: end;
    margin-top: 20px;
  }

  .currencies-wrapper {
    display: flex;
    justify-content: center;
  }

  .currencies {
    max-width: max-content;
  }
`
