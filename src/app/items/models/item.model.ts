import { Category } from "./category.model";
import { ItemImage } from "./itemimage.mode";

export interface Item {
    id: number;
    name: string;
    description: string;
    categoryId: number;
    category: Category;
    price: number;
    imagePath: string;
    images: ItemImage[];
}