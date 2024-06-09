import { Table } from '@components/table'
import './IncomesPage.less'
import { Calendar, Col, Flex } from "antd"
import dayjs from "dayjs"
import { RecordModal, NewRecord } from "@components/common/modal"
import { Button } from '@components/common/buttons'
import { PlusOutlined } from '@ant-design/icons'
import { genereateCalendarCfg } from '@common/utils'
import { IIncomesPageProps } from './types'
import { initialModal } from './utils'


export const IncomesPage = ({
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
    editIncome,
    getIncomes,
    getIncomesByCategories,
    setCurrentDate,
    setMode,
    setViewModal,
}: IIncomesPageProps) => {
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
                    columns={columns}
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