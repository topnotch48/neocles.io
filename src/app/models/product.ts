export type ProductsSearchResult = {
    products: ProductRecord[],
    totalResultCount: number,
}

export type ProductRecord = {
    title: string,
    baseImageUrl: string,
}

export class Product {
    readonly title: string;
    readonly imageUrl: string;
    readonly price?: number;

    public getImageUrlSquare(size: number) {
        return this.getImageUrl(size, size);
    }

    public getImageUrl(width: number, height: number) {
        if (this.imageUrl.indexOf("?") == -1)
            return `${this.imageUrl}?width=${width}&height=${height}`;
        return `${this.imageUrl}&width=${width}&height=${height}`;
    }

    constructor(account: ProductRecord) {
        this.title = account.title;
        this.imageUrl = account.baseImageUrl;
        this.price = null;
    }
}
