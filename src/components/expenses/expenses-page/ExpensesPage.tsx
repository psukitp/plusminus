import { Table } from "@components/table"
import { Calendar, Col, Flex, Space } from "antd"
import { useExpenses } from "@hooks"
import { useCallback, useMemo, useState } from "react"
import dayjs from "dayjs"
import { RecordModal, NewRecord } from "@components/common/modal"

import './ExpensesPage.less'
import { useExpensesCategories } from "@hooks"
import { Button } from "@components/common/buttons"
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons"
import { genereateCalendarCfg } from "@common/utils"
import { ExpensesRecord } from "./types"
import { ModalRecordInfo } from "@components/common/modal/RecordModal"

const initialModal: ModalRecordInfo = {
    amount: null,
    categoryId: null,
    id: null
}

export const ExpensesPage = () => {
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

    const onEditExpense = useCallback((record: ExpensesRecord) => {
        setModalInfo({
            amount: record.amount,
            categoryId: record.categoryId,
            id: record.id
        })

        setViewModal(true)
    }, [setModalInfo, setViewModal])

    const queriesOnCreate = async (data: NewRecord) => {
        //TODO убрать any, щас пока что хочется функционально сделать
        await createNewExpense({ ...data, date: dayjs(currentDate).format('YYYY-MM-DD') } as any)
        //TODO только при изменении месяца и/или года
        await getExpensesByCategories(dayjs(currentDate).format('YYYY-MM-DD'))
    }

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

    return <div className='expenses'>
        <Flex align='center' className='title'>
            <div className='title-text'>
                Расходы
            </div>
        </Flex>
        <Flex justify="space-between">
            <Col>
                <Calendar
                    //TODO брать локаль из настроек
                    locale={genereateCalendarCfg("ru")}
                    fullscreen={false}
                    onChange={(value) => {
                        const formattedDate = value.format('YYYY-MM-DD')
                        getExpenses(formattedDate)
                        getExpensesByCategories(formattedDate)
                        setCurrentDate(formattedDate)
                    }}
                    value={dayjs(currentDate)}
                    className="calendar" />
                <Button
                    disabled={recordsLoading}
                    onClick={() => setViewModal(true)}>
                    <PlusOutlined />
                </Button>
                <Table
                    className="expenses-table"
                    rowKey="id"
                    columns={columnsToRender}
                    records={records}
                    loading={recordsLoading} />
            </Col>
            <Col>
                <Table
                    rowKey="categoryName"
                    records={summarizedRecords}
                    columns={summarizedColumns}
                    loading={summarizedRecordsLoading}
                />
            </Col>
        </Flex>
        {viewModal && <RecordModal
            recordInfo={modalInfo}
            title={modalInfo.id === null ? "Новая трата" : "Редактирование"}
            mode={modalInfo.id === null ? "create" : "edit"}
            categories={categories}
            categoriesLoading={categoriesLoading}
            open={viewModal}
            onEdit={(record) => editExpense({ amount: record.amount, categoryId: record.categoryId, id: record.id })}
            onCancel={() => {
                setViewModal(false)
                setModalInfo({ ...initialModal })
            }}
            onCreate={(data: NewRecord) => queriesOnCreate(data)}
        />}
    </div>
}