
import { Component, Input } from "@angular/core";
import { Product } from "../../../models";

@Component({
    selector: 'product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
    @Input() imageSize: number = 128;
    @Input() item: Product;

    isLoading: boolean = true;

    onImageLoaded(event) {
        this.isLoading = false;
    }
}
