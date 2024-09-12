import { NewCategory } from "@features/category/ui/modal/types"
import { Category } from "@shared/lib"
import { ColumnsType } from "antd/es/table"
import { Key, useEffect } from "react"
import { useIncomesCategoriesData } from "../../store/incomesCategoriesStore"
import { incomesCategoriesQueries } from "../../api/queries/incomes-categories-queries"


type UseIncomesCategoriesResult = [
    Category[],
    ColumnsType<Category>,
    boolean,
    {
        createNewCategory: (newCategory: NewCategory) => void
        editCategory: (category: Partial<Category>) => void
        deleteCategory: (id: Key) => void
        refreshData: () => void
    }
]

const columns: ColumnsType<Category> = [
    {
        title: 'Категория',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Цвет',
        dataIndex: 'color',
        key: 'color',
        render: (value) => <div style={{
            width: '20px',
            height: '20px',
            backgroundColor: value,
            margin: '0 auto',
            border: '1px solid #a6a6a6',
            borderRadius: '50%'
        }} />
    },
    {
        title: "Действия",
        dataIndex: 'actions',
        key: "actions"
    }
]

export const useIncomesCategories = (): UseIncomesCategoriesResult => {
    const {
        data,
        loading,
        isDataFetched,
        fetchData,
        deleteCategory: deleteCategoryState,
        editCategory: editCategoryState,
        addCategory: addCategoryState,

    } = useIncomesCategoriesData(state => state)

    useEffect(() => {
        if (!isDataFetched)
            fetchData()
    }, [])

    const createNewCategory = (newCategory: NewCategory) => {
        incomesCategoriesQueries.createNewCategory(newCategory).then(result => {
            if (result != null)
                addCategoryState(result)
        })
    }

    const editCategory = (category: Partial<Category>) => {
        incomesCategoriesQueries.editCategory(category).then(result => {
            if (result != null)
                editCategoryState(result)
        })
    }

    const deleteCategory = (id: Key) => {
        incomesCategoriesQueries.deleteCategory(id).then(result => {
            if (result != null)
                deleteCategoryState(result)
        })
    }

    return [data, columns, loading, { createNewCategory, editCategory, deleteCategory, refreshData: fetchData }]
}