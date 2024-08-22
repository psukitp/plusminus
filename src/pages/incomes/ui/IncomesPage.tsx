import { RecordModal, Table } from '@shared/ui'
import { Col, Flex } from "antd"
import { Button } from '@shared/ui'
import { PlusOutlined } from '@ant-design/icons'
import { IIncomesPageProps } from './types'
import { initialModal } from './utils'
import { Calendar } from '@shared/ui'
import { IncomesContainer, Text, Title } from './IncomesPage-styled'
import { isMobile } from 'react-device-detect'
import { NewRecord } from '@shared/ui/record-modal/types'


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
    return <IncomesContainer>
        <Title>
            <Text>
                Доходы
            </Text>
        </Title>
        <Flex
            vertical={isMobile}
            justify="space-between">
            <Col
                style={{
                    paddingBottom: isMobile ? "15px" : 0
                }}>
                <Calendar
                    value={currentDate}
                    onChange={(value) => {
                        const formattedDate = value.format('YYYY-MM-DD')
                        getIncomes(formattedDate)
                        getIncomesByCategories(formattedDate)
                        setCurrentDate(formattedDate)
                    }}
                />
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
    </IncomesContainer>
}