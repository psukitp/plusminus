import { Col, InputNumber, Modal, Select, notification } from "antd"
import { IRecordModal } from "./types"
import { Key, useEffect } from "react"
import { openNotificationWarning } from "@common/notification/notification"

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
    onEdit,
    onChangeRecordInfo }: IRecordModal) => {

    return <Modal
        destroyOnClose
        okText='Сохранить'
        cancelText='Отмена'
        title={title}
        centered
        open={open}
        onCancel={onCancel}
        onOk={() => {
            if (recordInfo.amount && recordInfo.categoryId && recordInfo.amount > 0) {
                mode === "create" && onCreate && onCreate(recordInfo)
                mode === "edit" && onEdit && onEdit({ ...recordInfo, id: recordInfo.id })

                onCancel()
            }
            else if (recordInfo.amount != null && recordInfo.amount <= 0)
                openNotificationWarning("Сумма должна быть положительным числом")
            else
                openNotificationWarning("Не все данные заполнены")
        }}>
        <Col style={{ marginBottom: '15px' }}>
            <Select
                notFoundContent={<div>Сначала нужно создать хотя бы одну категорию!</div>}
                disabled={categoriesLoading}
                style={{ maxWidth: '300px', width: '100%' }}
                placeholder='Категория'
                value={recordInfo.categoryId?.toString()}
                onChange={(value) => onChangeRecordInfo(prev => ({ ...prev, categoryId: value }))}>
                {categories.map(c => (
                    <Select.Option key={c.id}>
                        <span style={{ color: c.color }}>{c.name}</span>
                    </Select.Option>))}
            </Select>
        </Col>
        <Col>
            <InputNumber
                max={1000000}
                min={1}
                style={{ maxWidth: '300px', width: '100%' }}
                placeholder='Сумма'
                value={recordInfo.amount}
                onChange={(value) => onChangeRecordInfo(prev => ({ ...prev, amount: value }))} />
        </Col>
    </Modal>
}