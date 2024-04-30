import { Col, InputNumber, Modal, Select } from "antd"
import { IAddNewModal, NewRecord } from "./types"
import { useState } from "react"

//TODO унести все стили в лесс файлик
export const AddNewModal = ({
    open,
    onCancel,
    onOk }: IAddNewModal) => {
    const [newRecord, setNewRecordata] = useState<NewRecord>({ categoryId: null, amount: null })

    return <Modal
        okText='Сохранить'
        cancelText='Отмена'
        title='Новый расход'
        centered
        open={open}
        onCancel={onCancel}
        onOk={() => {
            if (newRecord.amount && newRecord.categoryId)
                onOk && onOk(newRecord)
            //TODO сделать нотификацию
            else console.log("Чего-то не хватает")
        }}>
        <Col style={{ marginBottom: '15px' }}>
            <Select
                style={{ maxWidth: '300px', width: '100%' }}
                placeholder='Категория'
                value={newRecord.categoryId}
                onChange={(value) => setNewRecordata(prev => ({ ...prev, categoryId: value }))}>

                {/* TODO получать список категорий и маппить */}
                <Select.Option key={1}>
                    Категория 1
                </Select.Option>
                <Select.Option key={2}>
                    Категория 2
                </Select.Option>
            </Select>
        </Col>
        <Col>
            <InputNumber
                style={{ maxWidth: '300px', width: '100%' }}
                placeholder='Сумма'
                value={newRecord.amount}
                onChange={(value) => setNewRecordata(prev => ({ ...prev, amount: value }))} />
        </Col>
    </Modal>
}