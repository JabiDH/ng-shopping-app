import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./register.component";
import { SharedModule } from "../../../shared/modules/shared.module";

export const routes: Routes = [
    { 
        path: '', 
        component: RegisterComponent
    }
];

@NgModule({
    declarations: [
        RegisterComponent
    ],
    imports: [       
        RouterModule.forChild(routes),
        SharedModule
    ]
})
export class RegisterModule {

}