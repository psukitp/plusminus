import { Col, InputNumber, Modal, Select, notification } from "antd"
import { IRecordModal } from "./types"
import { Key } from "react"

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
            if (recordInfo.amount && recordInfo.categoryId) {
                mode === "create" && onCreate && onCreate(recordInfo)
                mode === "edit" && onEdit && onEdit({ ...recordInfo, id: recordInfo.id })

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
                value={recordInfo.categoryId}
                onChange={(value) => onChangeRecordInfo(prev => ({ ...prev, categoryId: value }))}>
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
                value={recordInfo.amount}
                onChange={(value) => onChangeRecordInfo(prev => ({ ...prev, amount: value }))} />
        </Col>
    </Modal>
}