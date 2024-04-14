export interface productModel {
    id?: number;
    name: string;
    description: string;
    price: number;
    quantityAvailable: number;
}

export interface productCarModel {
    element: productModel,
    quantity: number
}

export interface detailOrder {
    dateOrder: Date,
    status: string
}

export interface orderModel {
    elements: productCarModel[],
    order: detailOrder,
}

export class orderClass implements orderModel {
    elements: productCarModel[];
    order: detailOrder;

    constructor(products: productCarModel[], detail: detailOrder) {
        this.elements = products;
        this.order = detail;
    }
}