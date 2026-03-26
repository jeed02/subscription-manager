import type {
    Category,
    CreateCategoryRequest,
    UpdateCategoryRequest,
} from "../types/settings";
import { api } from "../utils/api";

export const getCategories = async (): Promise<Category[]> => {
    const response = await api.get("/categories");
    return response.data;
};

export const createCategory = async (
    data: CreateCategoryRequest,
): Promise<Category> => {
    const response = await api.post("/categories", data);
    return response.data;
};

export const updateCategory = async (
    id: string,
    data: UpdateCategoryRequest,
): Promise<Category> => {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
};
