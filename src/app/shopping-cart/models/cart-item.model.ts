import { Item } from "../../items/models/item.model";

export interface CartItem {
    email: string;
    itemId: number;    
    item: Item;
    quantity: number;
  }
  