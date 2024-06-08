import { Table } from '@components/table'
import './IncomesPage.less'
import { Calendar, Col, Flex, Space } from "antd"
import { useIncomes } from "@hooks"
import { useCallback, useMemo, useState } from "react"
import dayjs from "dayjs"
import { RecordModal, NewRecord } from "@components/common/modal"
import { useIncomesCategories } from "@hooks"
import { Button } from '@components/common/buttons'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { genereateCalendarCfg } from '@common/utils'
import { ModalRecordInfo } from '@components/common/modal/RecordModal'
import { IncomesRecord } from './types'

const initialModal: ModalRecordInfo = {
    amount: null,
    categoryId: null,
    id: null
}

export const IncomesPage = () => {
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

    return <div className='incomes'>
        <Flex align='center' className='title'>
            <div className='title-text'>
                Доходы
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
                        getIncomes(formattedDate)
                        getIncomesByCategories(formattedDate)
                        setCurrentDate(formattedDate)
                    }}
                    value={dayjs(currentDate)}
                    className="calendar" />
                <Button
                    disabled={recordsLoading}
                    onClick={() => {
                        setMode("create")
                        setViewModal(true)
                    }}>
                    <PlusOutlined />
                </Button>
                <Table
                    className="expenses-table"
                    rowKey="id"
                    columns={columnsToRender}
                    records={records}
                    loading={recordsLoading}
                />
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
            onChangeRecordInfo={(data) => setModalInfo(data)}
            categories={categories}
            categoriesLoading={categoriesLoading}
            title={mode === "create" ? "Новая трата" : "Редактирование"}
            open={viewModal}
            onCancel={() => {
                setViewModal(false)
                setModalInfo({ ...initialModal })
            }}
            mode={mode}
            onCreate={(data: NewRecord) => queriesOnCreate(data)}
            onEdit={(record) => editIncome({ amount: record.amount, categoryId: record.categoryId, id: record.id })}
            recordInfo={modalInfo}
        />}
    </div>
}