import { Col, Flex, Row, Space } from "antd"
import './CategoriesPage.less'
import { Table } from "@components/table"
import { useExpensesCategories } from "@hooks"
import { useIncomesCategories } from "@hooks"
import { CategoryModal, ModalInfo } from "../categories-modal/CategoryModal"
import { useCallback, useMemo, useState } from "react"
import { Category } from "@common/types"
import { DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons"
import { Button } from "@components/common/buttons"

const initialModal: ModalInfo = {
    id: -1,
    title: '',
    name: '',
    color: '',
}

export const CategoriesPage = () => {
    const [
        expRecords,
        expColumns,
        expLoading,
        {
            createNewCategory: createExpenseCategory,
            editCategory: editExpenseCategory,
            deleteCategory: deleteExpenseCategory,
            refreshData: refreshExpenseCategories
        }] = useExpensesCategories()
    const [
        incRecords,
        incColumns,
        incLoading,
        {
            createNewCategory: createIncomeCategory,
            editCategory: editIncomeCategory,
            deleteCategory: deleteIncomeCategory,
            refreshData: refreshIncomeCategories
        }] = useIncomesCategories()
    const [openModal, setOpenModal] = useState({ expense: false, income: false })
    const [modalInfo, setModalInfo] = useState<ModalInfo>({ ...initialModal })

    const onEdit = useCallback((category: Category, mode: "expense" | "income") => {
        setModalInfo({
            id: category.id,
            title: mode === "expense" ? 'Расходы' : "Доходы",
            color: category.color,
            name: category.name
        })

        mode === "expense"
            ? setOpenModal(prev => ({ ...prev, expense: true }))
            : setOpenModal(prev => ({ ...prev, income: true }))
    }, [setModalInfo, setOpenModal])

    const expColumnsToRender = useMemo(() => expColumns
        .map(c => c.key === 'actions'
            ? {
                ...c,
                render: (_: any, record: Category) => <Space size="middle">
                    <Button
                        margin={false}
                        type="text"
                        onClick={() => onEdit(record, "expense")}>
                        <EditOutlined />
                    </Button>
                    <Button
                        margin={false}
                        type="text"
                        onClick={() => deleteExpenseCategory(record.id)}>
                        <DeleteOutlined />
                    </Button>
                </Space >
            }
            : c)
        , [expColumns])

    const incColumnsToRender = useMemo(() => incColumns
        .map(c => c.key === 'actions'
            ? {
                ...c,
                render: (_: any, record: Category) => <Space size="middle">
                    <Button
                        margin={false}
                        type="text"
                        onClick={() => onEdit(record, "income")}>
                        <EditOutlined />
                    </Button>
                    <Button
                        margin={false}
                        type="text"
                        onClick={() => deleteIncomeCategory(record.id)}>
                        <DeleteOutlined />
                    </Button>
                </Space >
            }
            : c)
        , [incColumns])


    return <div className='categories'>
        <div className='title-text'>
            Категория
        </div>
        <Row>
            <Col span={12}>
                <Flex align="center">
                    <div className='subtitle-text'>
                        Расходы
                    </div>
                    <Button
                        style={{ marginRight: '10px' }}
                        type="text"
                        onClick={() => setOpenModal({ expense: true, income: false })}>
                        <PlusOutlined />
                    </Button>
                    <Button
                        type="text"
                        onClick={refreshExpenseCategories}>
                        <ReloadOutlined />
                    </Button>
                </Flex>
                <Table
                    rowKey="id"
                    loading={expLoading}
                    columns={expColumnsToRender}
                    records={expRecords} />
            </Col>
            <Col span={12}>
                <Flex align="center">
                    <div className='subtitle-text'>
                        Доходы
                    </div>
                    <Button
                        style={{ marginRight: '10px' }}
                        type="text"
                        onClick={() => setOpenModal({ expense: false, income: true })}>
                        <PlusOutlined />
                    </Button>
                    <Button
                        type="text"
                        onClick={refreshIncomeCategories}>
                        <ReloadOutlined />
                    </Button>
                </Flex>
                <Table
                    rowKey="id"
                    loading={incLoading}
                    columns={incColumnsToRender}
                    records={incRecords} />
            </Col>
        </Row>
        {(!!openModal.expense || !!openModal.income) && <CategoryModal
            onCancel={() => {
                setModalInfo({ ...initialModal })
                setOpenModal({ expense: false, income: false })
            }}
            mode={modalInfo.name === '' ? "create" : "edit"}
            onEdit={openModal.expense ? editExpenseCategory : editIncomeCategory}
            onCreate={openModal.expense ? createExpenseCategory : createIncomeCategory}
            open={openModal.expense || openModal.income}
            modalInfo={modalInfo} />
        }
    </div>
}