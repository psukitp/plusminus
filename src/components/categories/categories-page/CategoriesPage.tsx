import { Col, Flex, Row } from "antd"
import './CategoriesPage.less'
import { Table } from "@components/table"
import { CategoryModal } from "../categories-modal/CategoryModal"
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons"
import { Button } from "@components/common/buttons"
import { ICategoriesPageProps } from "./types"
import { initialModal } from "./utils"

export const CategoriesPage = ({
    openModal,
    modalInfo,

    expLoading,
    expColumns,
    expRecords,

    incLoading,
    incColumns,
    incRecords,

    refreshExpenseCategories,
    refreshIncomeCategories,
    setOpenModal,
    setModalInfo,
    editExpenseCategory,
    editIncomeCategory,
    createExpenseCategory,
    createIncomeCategory
}: ICategoriesPageProps) => {

    return <div className='categories'>
        <div className='title-text'>
            Категория
        </div>
        <Row>
            <Col span={12}>
                <Flex align="center">
                    <div className='subtitle-text'>
                        Расходы
                    </div>
                    <Button
                        style={{ marginRight: '10px' }}
                        type="text"
                        onClick={() => setOpenModal({ expense: true, income: false })}>
                        <PlusOutlined />
                    </Button>
                    <Button
                        type="text"
                        onClick={refreshExpenseCategories}>
                        <ReloadOutlined />
                    </Button>
                </Flex>
                <Table
                    rowKey="id"
                    loading={expLoading}
                    columns={expColumns}
                    records={expRecords} />
            </Col>
            <Col span={12}>
                <Flex align="center">
                    <div className='subtitle-text'>
                        Доходы
                    </div>
                    <Button
                        style={{ marginRight: '10px' }}
                        type="text"
                        onClick={() => setOpenModal({ expense: false, income: true })}>
                        <PlusOutlined />
                    </Button>
                    <Button
                        type="text"
                        onClick={refreshIncomeCategories}>
                        <ReloadOutlined />
                    </Button>
                </Flex>
                <Table
                    rowKey="id"
                    loading={incLoading}
                    columns={incColumns}
                    records={incRecords} />
            </Col>
        </Row>
        {(!!openModal.expense || !!openModal.income) && <CategoryModal
            onCancel={() => {
                setModalInfo({ ...initialModal })
                setOpenModal({ expense: false, income: false })
            }}
            mode={modalInfo.name === '' ? "create" : "edit"}
            onEdit={openModal.expense ? editExpenseCategory : editIncomeCategory}
            onCreate={openModal.expense ? createExpenseCategory : createIncomeCategory}
            open={openModal.expense || openModal.income}
            modalInfo={modalInfo} />
        }
    </div>
}