import { Table } from '@shared/ui'
import { Button } from '@shared/ui'
import { PlusOutlined } from '@ant-design/icons'
import { initialModal } from './utils'
import { IExpensesPage } from './types'
import { Calendar } from '@shared/ui/components/calendar'
import { Col, Flex } from 'antd'
import { ExpensesContainer, Summary, Text, Title } from './ExpensesPage-styled'
import { isMobile } from 'react-device-detect'
import { NewRecord } from '@features/category'
import { RecordModal } from '@features/category'

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
  summaryExpenses,
  symbol,

  setModalInfo,
  queriesOnCreate,
  editExpense,
  getExpenses,
  getExpensesByCategories,
  setCurrentDate,
  setMode,
  setViewModal,
}: IExpensesPage) => {
  return (
    <ExpensesContainer>
      <Title>
        <Text>Расходы</Text>
      </Title>
      <Flex vertical={isMobile} justify="space-between">
        <Col
          style={{
            paddingBottom: isMobile ? '15px' : 0,
          }}
        >
          <Calendar
            //TODO брать локаль из настроек
            onChange={(value) => {
              const formattedDate = value.format('YYYY-MM-DD')
              getExpenses(formattedDate)
              getExpensesByCategories(formattedDate)
              setCurrentDate(formattedDate)
            }}
            value={currentDate}
          />
          <Button
            disabled={recordsLoading}
            onClick={() => {
              setMode('create')
              setViewModal(true)
            }}
          >
            <PlusOutlined />
          </Button>
          <Table
            className="expenses-table"
            rowKey="id"
            columns={columns}
            records={records}
            loading={recordsLoading}
            summary={
              <Summary>
                Итого: {summaryExpenses} {symbol}
              </Summary>
            }
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
      {viewModal && (
        <RecordModal
          recordInfo={modalInfo}
          onChangeRecordInfo={(data) => setModalInfo(data)}
          title={mode === 'create' ? 'Новая трата' : 'Редактирование'}
          mode={mode}
          categories={categories}
          categoriesLoading={categoriesLoading}
          open={viewModal}
          onEdit={(record) =>
            editExpense({
              amount: record.amount,
              categoryId: record.categoryId,
              id: record.id,
            })
          }
          onCancel={() => {
            setViewModal(false)
            setModalInfo({ ...initialModal })
          }}
          onCreate={(data: NewRecord) => queriesOnCreate(data)}
        />
      )}
    </ExpensesContainer>
  )
}
