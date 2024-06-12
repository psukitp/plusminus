import { Table } from "@components/table"
import { Calendar, Col, Flex } from "antd"
import dayjs from "dayjs"
import { RecordModal, NewRecord } from "@components/common/modal"
import './ExpensesPage.less'
import { Button } from "@components/common/buttons"
import { PlusOutlined } from "@ant-design/icons"
import { genereateCalendarCfg } from "@common/utils"
import { initialModal } from "./utils"
import { IExpensesPage } from "./types"

export const ExpensesPage = ({
    currentDate,
    columns,
    records,
    categories,
    mode,
    categoriesLoading,
    modalInfo,
    recordsLoading,
    summarizedRecords,
    summarizedColumns,
    summarizedRecordsLoading,
    viewModal,

    setModalInfo,
    queriesOnCreate,
    editExpense,
    getExpenses,
    getExpensesByCategories,
    setCurrentDate,
    setMode,
    setViewModal,
}: IExpensesPage) => {

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
                    onClick={() => {
                        setMode("create")
                        setViewModal(true)
                    }}>
                    <PlusOutlined />
                </Button>
                <Table
                    className="expenses-table"
                    rowKey="id"
                    columns={columns}
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
            onChangeRecordInfo={(data) => setModalInfo(data)}
            title={mode === "create" ? "Новая трата" : "Редактирование"}
            mode={mode}
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