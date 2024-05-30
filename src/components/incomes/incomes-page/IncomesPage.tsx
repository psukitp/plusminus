import { Table } from '@components/table'
import './IncomesPage.less'
import { Button, Calendar, Col, Flex } from "antd"
import { useIncomes } from "@hooks/use-incomes"
import { useState } from "react"
import dayjs from "dayjs"
import { AddNewModal, NewRecord } from "@components/common/modal"
import { useIncomesCategories } from "@hooks/use-incomes-categories/useIncomesCategories"


export const IncomesPage = () => {
    const [
        [records, columns],
        [summarizedRecords, summarizedColumns],
        {
            createNewIncomes,
            getIncomes,
            getIncomesByCategories
        }] = useIncomes()
    const [categories, categoriesLoading] = useIncomesCategories()

    const [currentDate, setCurrentDate] = useState<string>(dayjs().format('YYYY-MM-DD'))
    const [viewModal, setViewModal] = useState<boolean>(false)

    const queriesOnOk = async (data: NewRecord) => {
        await createNewIncomes({ ...data, date: dayjs(currentDate).format('YYYY-MM-DD') } as any)
        await getIncomesByCategories(dayjs(currentDate).format('YYYY-MM-DD'))
    }

    return <div className='incomes'>
        <Flex align='center' className='title'>
            <div className='title-text'>
                Доходы
            </div>
        </Flex>
        <Flex justify="space-between">
            <Col>
                <Calendar
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
                    // disabled={recordsLoading}
                    onClick={() => setViewModal(true)}
                    className="new-expense-button">
                    Новый доход
                </Button>
                <Table
                    className="expenses-table"
                    rowKey="id"
                    columns={columns}
                    records={records}
                // loading={recordsLoading}
                />
            </Col>
            <Col>
                <Table
                    rowKey="categoryName"
                    records={summarizedRecords}
                    columns={summarizedColumns}
                // loading={summarizedRecordsLoading}
                />
            </Col>
        </Flex>
        {viewModal && <AddNewModal
            categories={categories}
            categoriesLoading={categoriesLoading}
            title="Новый доход"
            open={viewModal}
            onCancel={() => setViewModal(false)}
            onOk={(data: NewRecord) => {
                queriesOnOk(data)
                setViewModal(false)
            }}
        />}
    </div>
}