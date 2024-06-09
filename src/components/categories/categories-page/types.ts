import { Category } from "@common/types";
import { ModalInfo } from "../categories-modal/CategoryModal";
import { ColumnsType } from "antd/es/table";

export interface ICategoriesPageProps {
    openModal: {
        expense: boolean;
        income: boolean;
    }
    modalInfo: ModalInfo

    expLoading: boolean
    expColumns: ColumnsType<Category>
    expRecords: Category[]

    incLoading: boolean
    incColumns: ColumnsType<Category>
    incRecords: Category[]

    refreshExpenseCategories: () => void
    refreshIncomeCategories: () => void
    setOpenModal: React.Dispatch<React.SetStateAction<{
        expense: boolean;
        income: boolean;
    }>>
    setModalInfo: React.Dispatch<React.SetStateAction<ModalInfo>>
    editExpenseCategory: (category: Partial<Category>) => void
    editIncomeCategory: (category: Partial<Category>) => void
    createExpenseCategory: (newCategory: Pick<Category, "name" | "color">) => void
    createIncomeCategory: (newCategory: Pick<Category, "name" | "color">) => void
}