import { Col, Flex, Row } from "antd"
import { Table } from "@components/table"
import { CategoryModal } from "../categories-modal/CategoryModal"
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons"
import { Button } from "@components/common/buttons"
import { ICategoriesPageProps } from "./types"
import { initialModal } from "./utils"
import { CategoriesContainer, SubTitle, Title } from "./CategoriesPage-styled"
import { isMobile } from "react-device-detect"



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

    return <CategoriesContainer>
        <Title>
            Категории
        </Title>
        <Row>
            <Col span={isMobile ? 24 : 12}
                style={{
                    paddingBottom: isMobile ? '15px' : 0
                }}>
                <Flex align="center">
                    <SubTitle>
                        Расходы
                    </SubTitle>
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
            <Col span={isMobile ? 24 : 12}>
                <Flex align="center">
                    <SubTitle>
                        Доходы
                    </SubTitle>
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
    </CategoriesContainer>
}