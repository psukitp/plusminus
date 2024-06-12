import { Category } from "@common/types";
import { getAxiosInstance } from "../axios-client";
import { IncomesCategoriesService } from "../services/incomes-categories-service";
import { Key } from "react";
import { NewCategory } from "@components/categories/categories-modal/CategoryModal";

const client = getAxiosInstance()
const incomesCategoriesService = new IncomesCategoriesService(client)

const fetchIncomesCategories = async (): Promise<Category[]> => {
    const result = await incomesCategoriesService.getCategories()
    return result
}

const createNewCategory = async (newCategory: NewCategory): Promise<Category | null> => {
    const result = await incomesCategoriesService.postCategory(newCategory)
    return result
}

const editCategory = async (category: Partial<Category>): Promise<Category | null> => {
    const result = await incomesCategoriesService.editCategory(category)
    return result
}

const deleteCategory = async (id: Key): Promise<Key | null> => {
    const result = await incomesCategoriesService.deleteCategory(id)
    return result
}

export const incomesCategoriesQueries = {
    fetchIncomesCategories,
    createNewCategory,
    editCategory,
    deleteCategory
}