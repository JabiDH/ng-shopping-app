import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdownDirective } from "../directives/dropdown-directive";
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";
import { ImageSlideshowComponent } from "../image-slideshow/image-slideshow.component";

@NgModule({
    declarations:[
        DropdownDirective,
        LoadingSpinnerComponent, 
        ImageSlideshowComponent
    ],
    imports:[
        CommonModule,
        FormsModule,      
        ReactiveFormsModule
    ],
    exports: [
        DropdownDirective,
        LoadingSpinnerComponent,
        ImageSlideshowComponent
    ]
})
export class SharedModule {

}