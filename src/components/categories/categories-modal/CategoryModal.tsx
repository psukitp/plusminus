import { openNotificationWarning } from "@common/notification/notification"
import { Category } from "@common/types"
import { Col, ColorPicker, Input, Modal } from "antd"
import { Key, useEffect, useState } from "react"

export type ModalInfo = {
    id: Key
    title: string
    color: string
    name: string
}

interface IAddNewCategoryModalProps {
    open: boolean
    modalInfo: ModalInfo
    mode: "create" | "edit"
    onCancel: () => void
    onCreate: (newRecord: NewCategory) => void
    onEdit: (record: Partial<Category>) => void
}

type NewCategory = Partial<Pick<Category, "color" | "name">>
export const CategoryModal = ({
    open,
    modalInfo,
    mode,

    onCancel,
    onCreate,
    onEdit }: IAddNewCategoryModalProps) => {
    const [newRecord, setNewRecordData] = useState<NewCategory>({ color: undefined, name: undefined })

    useEffect(() => {
        setNewRecordData({
            color: modalInfo.color,
            name: modalInfo.name
        })
    }, [modalInfo])

    return <Modal
        destroyOnClose
        okText='Сохранить'
        cancelText='Отмена'
        title={modalInfo.title}
        centered
        open={open}
        onCancel={onCancel}
        onOk={() => {
            if (newRecord.color && newRecord.name) {
                mode === "create" && onCreate && onCreate(newRecord)
                mode === "edit" && onEdit && onEdit({
                    ...newRecord,
                    id: modalInfo.id
                })
                onCancel()
            }
            else
                openNotificationWarning("Не все данные заполнены")
        }}>
        <Col style={{ marginBottom: '15px' }}>
            <Input
                style={{ maxWidth: '300px', width: '100%' }}
                placeholder='Название'
                value={newRecord.name}
                onChange={(e) => setNewRecordData(prev => ({ ...prev, name: e.target.value }))}
            />
        </Col>
        <Col>
            <ColorPicker
                value={newRecord.color}
                onChange={(val) => setNewRecordData(prev => ({ ...prev, color: val.toRgbString() }))} />
        </Col>
    </Modal>
}