import { NewRecord } from "@shared/ui/record-modal/types"
import { ModalRecordInfo } from "@shared/ui/record-modal/RecordModal"
import dayjs from "dayjs"
import { useCallback, useMemo, useState } from "react"
import { IncomesRecord } from "./types"
import { Button } from "@shared/ui"
import { Space } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { IncomesPage } from "./IncomesPage"
import { initialModal } from "./utils"
import { useIncomes } from "@features/income/model"
import { useIncomesCategories } from "@features/category/model"

const IncomesPageDataContainer = () => {
    const [
        [records, columns, recordsLoading],
        [summarizedRecords, summarizedColumns, summarizedRecordsLoading],
        {
            createNewIncomes,
            getIncomes,
            getIncomesByCategories,
            deleteIncome,
            editIncome
        }] = useIncomes()
    const [categories, , categoriesLoading] = useIncomesCategories()
    const [currentDate, setCurrentDate] = useState<string>(dayjs().format('YYYY-MM-DD'))
    const [viewModal, setViewModal] = useState<boolean>(false)
    const [mode, setMode] = useState<"create" | "edit">("create")

    const [modalInfo, setModalInfo] = useState<ModalRecordInfo>({ ...initialModal })

    const queriesOnCreate = async (data: NewRecord) => createNewIncomes({ ...data, date: dayjs(currentDate).format('YYYY-MM-DD') } as any)

    const onEditIncome = useCallback((record: IncomesRecord) => {
        setMode("edit")
        setModalInfo({
            amount: record.amount,
            categoryId: record.categoryId,
            id: record.id
        })

        setViewModal(true)
    }, [setModalInfo, setViewModal])

    const columnsToRender = useMemo(() => columns
        .map(c => c.key === 'actions'
            ? {
                ...c,
                render: (_: any, record: IncomesRecord) => <Space size="middle">
                    <Button
                        margin={false}
                        type="text"
                        onClick={() => onEditIncome(record)}>
                        <EditOutlined />
                    </Button>
                    <Button
                        margin={false}
                        type="text"
                        onClick={() => deleteIncome({ id: record.id, amount: record.amount, categoryId: record.categoryId })}>
                        <DeleteOutlined />
                    </Button>
                </Space >
            }
            : c
        ), [columns, onEditIncome, deleteIncome])

    return <IncomesPage
        categories={categories}
        categoriesLoading={categoriesLoading}
        columns={columnsToRender}
        currentDate={currentDate}
        modalInfo={modalInfo}
        mode={mode}
        records={records}
        recordsLoading={recordsLoading}
        summarizedColumns={summarizedColumns}
        summarizedRecords={summarizedRecords}
        summarizedRecordsLoading={summarizedRecordsLoading}
        viewModal={viewModal}

        editIncome={editIncome}
        getIncomes={getIncomes}
        getIncomesByCategories={getIncomesByCategories}
        queriesOnCreate={queriesOnCreate}
        setCurrentDate={setCurrentDate}
        setModalInfo={setModalInfo}
        setMode={setMode}
        setViewModal={setViewModal}
    />
}

export default IncomesPageDataContainer