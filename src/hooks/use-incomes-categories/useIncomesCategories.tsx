import { Key, useEffect } from "react";
import { Category } from "@common/types";
import { incomesCategoriesQueries } from "@api/queries/incomes-categories-queries";
import { ColumnsType } from "antd/es/table";
import { useIncomesCategoriesData } from "@store/store";

type UseIncomesCategoriesResult = [
    Category[],
    ColumnsType<Category>,
    boolean,
    {
        createNewCategory: (newCategory: Pick<Category, "color" | "name">) => void
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

    const createNewCategory = (newCategory: Pick<Category, "color" | "name">) => {
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

    const refreshData = () => { fetchData() }

    return [data, columns, loading, { createNewCategory, editCategory, deleteCategory, refreshData: fetchData }]
}