import { Category } from "./category.model";

export interface Item {
    id: number;
    name: string;
    description: string;
    categoryId: number;
    category: Category;
    price: number;
    imagePath: string;
}