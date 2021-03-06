
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { Product } from "../../../../models";
import { ImageDimensions } from "./product.models";

@Component({
    selector: 'product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
    @Input() imageSize: ImageDimensions = 128;
    @Input() item: Product;
    isLoading: boolean = true;
    failedToLoad: boolean = false;
    imageClass: any;

    constructor(private cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.imageClass = `is-${this.imageSize}x${this.imageSize}`;
    }

    onImageLoaded(event) {
        this.isLoading = false;
        this.cd.markForCheck();
    }

    onImageLoadFailed(event) {
        this.failedToLoad = true;
        this.isLoading = false;
        this.cd.markForCheck();
    }
}
