import { Category } from "./category.model";

export interface Item {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    category: Category;
    price: number;
    imagePath: string;
}