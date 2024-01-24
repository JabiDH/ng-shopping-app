import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { ItemDto } from "../../items/dtos/item.dto";
import { Observable, catchError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    

    constructor(private http: HttpClient) {

    }

    // Get all items 
    // loadItems(): Observable<ItemDto[]>  {
    //     return this.http
    //         .get<ItemDto[]>(`${environment.shoppingCartApiUrl}/api/items/GetAllItems`);
    // }
}