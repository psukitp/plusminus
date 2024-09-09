import { Col, InputNumber, Modal, Select } from "antd"
import { IRecordModal } from "./types"
import { openNotificationWarning } from "../../lib/notification"
import { DefaultOptionType } from "antd/es/select"

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
                showSearch
                notFoundContent={<div>{`${categories?.length ? 'Упс :( Ничего такого у тебя нет' : 'Сначала нужно создать хотя бы одну категорию!'}`}</div>}
                allowClear
                disabled={categoriesLoading}
                style={{ maxWidth: '300px', width: '100%' }}
                placeholder='Категория'
                filterOption={(input, option) => ((option?.children as Omit<DefaultOptionType, "children">)?.props?.children ?? '')
                    .toString()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
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