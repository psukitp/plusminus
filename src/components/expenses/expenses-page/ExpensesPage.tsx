import { Table } from "../../table"
import { MonthButton } from "../../common/buttons"
import { Button, Calendar, Col, Flex } from "antd"
import { useExpenses } from "../../../hooks/use-expenses"
import { useEffect, useMemo, useState } from "react"
import dayjs from "dayjs"
import { AddNewModal, NewRecord } from "../../common/modal"

import './ExpensesPage.less'

//TODO унести все стили в лесс файлик
export const ExpensesPage = () => {
    const [
        [records, columns, recordsLoading],
        [summarizedRecords, summarizedColumns, summarizedRecordsLoading],
        {
            createNewExpense,
            getExpenses
        }] = useExpenses()

    useEffect(() => console.log(recordsLoading), [recordsLoading])

    const [currentDate, setCurrentDate] = useState<string>(dayjs().format('YYYY-MM-DD'))
    const [viewModal, setViewModal] = useState<boolean>(false)

    return <div className='expenses'>
        <Flex align='center' className='title'>
            <div className='title-text'>
                Расходы
            </div>
        </Flex>
        <Flex justify="space-between">
            <Col>
                <Calendar
                    fullscreen={false}
                    onChange={(value) => {
                        const formattedDate = value.format('YYYY-MM-DD')
                        getExpenses(formattedDate)
                        setCurrentDate(formattedDate)
                    }}
                    value={dayjs(currentDate)}
                    className="calendar" />
                <Button
                    disabled={recordsLoading}
                    onClick={() => setViewModal(true)}
                    className="new-expense-button">
                    Новая трата
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
        <AddNewModal
            open={viewModal}
            onCancel={() => setViewModal(false)}
            onOk={(data: NewRecord) => {
                //TODO убрать any, щас пока что хочется функционально сделать
                createNewExpense({ ...data, date: dayjs(currentDate).format('YYYY-MM-DD') } as any)
                setViewModal(false)
            }}
        />
    </div>
}