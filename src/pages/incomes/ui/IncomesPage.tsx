import { Table } from '@shared/ui'
import { Col, Flex } from 'antd'
import { IIncomesPageProps } from './types'
import { initialModal } from './utils'
import { IncomesContainer } from './IncomesPage-styled'
import { isMobile } from 'react-device-detect'
import { NewRecord } from '@features/category'
import { RecordModal } from '@features/category'
import { Calendar } from '@shared/ui/components/calendar'
import { Button } from '@shared/ui/components/button'

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
  return (
    <IncomesContainer>
      <Flex vertical={isMobile} justify="space-between" gap={24}>
        <Col
          span={8}
          style={{
            paddingBottom: isMobile ? '15px' : 0,
          }}
        >
          <div className="calendar">
            <Calendar
              value={currentDate}
              onChange={(value) => {
                const formattedDate = value.format('YYYY-MM-DD')
                getIncomes(formattedDate)
                getIncomesByCategories(formattedDate)
                setCurrentDate(formattedDate)
              }}
            />
          </div>
          <div className="btn">
            <Button
              type="primary"
              text="Добавить расход"
              onClick={() => {
                setMode('create')
                setViewModal(true)
              }}
              textAlign="center"
            />
          </div>
          <Table
            className="expenses-table"
            rowKey="id"
            columns={columns}
            records={records}
            loading={recordsLoading}
          />
        </Col>
        <Col span={16}>
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
          onChangeRecordInfo={(data) => setModalInfo(data)}
          categories={categories}
          categoriesLoading={categoriesLoading}
          title={mode === 'create' ? 'Новая трата' : 'Редактирование'}
          open={viewModal}
          onCancel={() => {
            setViewModal(false)
            setModalInfo({ ...initialModal })
          }}
          mode={mode}
          onCreate={(data: NewRecord) => queriesOnCreate(data)}
          onEdit={(record) =>
            editIncome({
              amount: record.amount,
              categoryId: record.categoryId,
              id: record.id,
            })
          }
          recordInfo={modalInfo}
        />
      )}
    </IncomesContainer>
  )
}
