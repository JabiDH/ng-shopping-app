import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable, catchError, map, of, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PermissionService {

    constructor(private http: HttpClient) {}

    hasPermission(email: string, role: string) : Observable<boolean> {
        if(!email) return of(false);
        return this.http
        .get<boolean>(`${environment.shoppingCartApiUrl}/permission/HasPermission`, {
            params: new HttpParams().set('email', email).set('role', role)
        })
        .pipe(
            catchError(throwError),
            map(res => res)
        );
    }
}