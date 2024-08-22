import dayjs from "dayjs"
import { useCallback, useMemo, useState } from "react"
import { ExpensesRecord } from "./types"
import { ModalRecordInfo } from "@shared/ui/record-modal/RecordModal"
import { NewRecord } from "@shared/ui/record-modal/types"
import { Space } from "antd"
import { Button } from "@shared/ui"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { ExpensesPage } from "./ExpensesPage"
import { initialModal } from "./utils"
import { useExpenses } from "@features/expense/model"
import { useExpensesCategories } from "@features/category/model"

const ExpensesPageDataContainer = () => {
    const [
        [records, columns, recordsLoading],
        [summarizedRecords, summarizedColumns, summarizedRecordsLoading],
        {
            createNewExpense,
            getExpenses,
            getExpensesByCategories,
            deleteExpense,
            editExpense
        }] = useExpenses()

    const [currentDate, setCurrentDate] = useState<string>(dayjs().format('YYYY-MM-DD'))
    const [viewModal, setViewModal] = useState<boolean>(false)
    const [categories, , categoriesLoading] = useExpensesCategories()
    const [modalInfo, setModalInfo] = useState<ModalRecordInfo>({ ...initialModal })
    const [mode, setMode] = useState<"create" | "edit">("create")

    const summaryExpensesPerDay = useMemo(() => {
        return records.reduce((sum, obj) => sum + obj.amount, 0)
    }, [records])

    const onEditExpense = useCallback((record: ExpensesRecord) => {
        setMode("edit")
        setModalInfo({
            amount: record.amount,
            categoryId: record.categoryId,
            id: record.id
        })

        setViewModal(true)
    }, [setModalInfo, setViewModal])

    const queriesOnCreate = async (data: NewRecord) => createNewExpense({ ...data, date: dayjs(currentDate).format('YYYY-MM-DD') } as any)

    const columnsToRender = useMemo(() => columns
        .map(c => c.key === 'actions'
            ? {
                ...c,
                render: (_: any, record: ExpensesRecord) => <Space size="middle">
                    <Button
                        margin={false}
                        type="text"
                        onClick={() => onEditExpense(record)}>
                        <EditOutlined />
                    </Button>
                    <Button
                        margin={false}
                        type="text"
                        onClick={() => deleteExpense({ id: record.id, amount: record.amount, categoryId: record.categoryId })}>
                        <DeleteOutlined />
                    </Button>
                </Space >
            }
            : c
        ), [columns, onEditExpense, deleteExpense])

    return <ExpensesPage
        categories={categories}
        categoriesLoading={categoriesLoading}
        columns={columnsToRender}
        currentDate={currentDate}
        modalInfo={modalInfo}
        mode={mode}
        records={records}
        summarizedColumns={summarizedColumns}
        summarizedRecords={summarizedRecords}
        summarizedRecordsLoading={summarizedRecordsLoading}
        viewModal={viewModal}
        recordsLoading={recordsLoading}
        summaryExpenses={summaryExpensesPerDay}

        editExpense={editExpense}
        getExpenses={getExpenses}
        getExpensesByCategories={getExpensesByCategories}
        queriesOnCreate={queriesOnCreate}
        setCurrentDate={setCurrentDate}
        setModalInfo={setModalInfo}
        setMode={setMode}
        setViewModal={setViewModal}

    />
}

export default ExpensesPageDataContainer