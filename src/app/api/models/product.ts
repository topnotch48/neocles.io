export type ProductsSearchResult = {
    products: ProductRecord[],
    totalResultCount: number,
}

export type ProductRecord = {
    title: string,
    baseImageUrl: string,
}
