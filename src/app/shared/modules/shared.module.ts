import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { DropdownDirective } from "../directives/dropdown-directive";
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";

@NgModule({
    declarations:[
        DropdownDirective,
        LoadingSpinnerComponent
    ],
    imports:[
        CommonModule,        
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        DropdownDirective,
        LoadingSpinnerComponent
    ]
})
export class SharedModule {

}