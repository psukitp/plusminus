import { useExpensesCategories, useIncomesCategories } from "@hooks"
import { useCallback, useMemo, useState } from "react"
import { ModalInfo } from "../categories-modal/CategoryModal"
import { Category } from "@common/types"
import { Space } from "antd"
import { Button } from "@components/common/buttons"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { CategoriesPage } from "./CategoriesPage"
import { initialModal } from "./utils"

export const CategoriesPageDataContainer = () => {
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

    return <CategoriesPage
        expColumns={expColumnsToRender}
        expLoading={expLoading}
        expRecords={expRecords}
        incColumns={incColumnsToRender}
        incLoading={incLoading}
        incRecords={incRecords}
        modalInfo={modalInfo}
        openModal={openModal}

        createExpenseCategory={createExpenseCategory}
        createIncomeCategory={createIncomeCategory}
        editExpenseCategory={editExpenseCategory}
        editIncomeCategory={editIncomeCategory}
        refreshExpenseCategories={refreshExpenseCategories}
        refreshIncomeCategories={refreshIncomeCategories}
        setModalInfo={setModalInfo}
        setOpenModal={setOpenModal}
    />
}