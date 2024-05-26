import { Col, InputNumber, Modal, Select } from "antd"
import { IAddNewModal, NewRecord } from "./types"
import { useState } from "react"
import { useExpensesCategories } from "../../../hooks/use-expenses-categories/useExpensesCategories"

//TODO унести все стили в лесс файлик
export const AddNewModal = ({
    open,
    title,
    categories,
    categoriesLoading,

    onCancel,
    onOk }: IAddNewModal) => {
    const [newRecord, setNewRecordata] = useState<NewRecord>({ categoryId: null, amount: null })

    return <Modal
        okText='Сохранить'
        cancelText='Отмена'
        title={title}
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
                disabled={categoriesLoading}
                style={{ maxWidth: '300px', width: '100%' }}
                placeholder='Категория'
                value={newRecord.categoryId}
                onChange={(value) => setNewRecordata(prev => ({ ...prev, categoryId: value }))}>
                {categories.map(c => (
                    <Select.Option key={c.id}>
                        <span style={{ color: c.color }}>{c.name}</span>
                    </Select.Option>))}
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