import { Col, InputNumber, Modal, Select, notification } from "antd"
import { IRecordModal, NewRecord } from "./types"
import { Key, useEffect, useState } from "react"

export type ModalRecordInfo = {
    id: Key | null
    categoryId: Key | null
    amount: number | null
}

export const RecordModal = ({
    open,
    title,
    categories,
    categoriesLoading,
    recordInfo,
    mode,

    onCancel,
    onCreate,
    onEdit }: IRecordModal) => {
    const [newRecord, setNewRecordata] = useState<NewRecord>({ categoryId: null, amount: null })

    useEffect(() => {
        setNewRecordata({
            amount: recordInfo.amount,
            categoryId: recordInfo.categoryId
        })
    }, [recordInfo])

    return <Modal
        destroyOnClose
        okText='Сохранить'
        cancelText='Отмена'
        title={title}
        centered
        open={open}
        onCancel={onCancel}
        onOk={() => {
            if (newRecord.amount && newRecord.categoryId) {
                mode === "create" && onCreate && onCreate(newRecord)
                mode === "edit" && onEdit && onEdit({ ...newRecord, id: recordInfo.id })

                onCancel()
            }
            else
                notification.warning({
                    message: "Не все данные заполнены",
                    placement: "topRight",
                    duration: 3
                })
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