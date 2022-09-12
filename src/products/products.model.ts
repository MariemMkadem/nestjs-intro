
export class Product {
    //public : accessible outside the class 
    constructor(
    public id: string,
    public title: string,
    public description: string,
    public price: number
    ) {

    };
}