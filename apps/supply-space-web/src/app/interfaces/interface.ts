export interface IProduct{
    name:string;
    desc:string;
    price:number;
    discPrice:number;
    id:string;
    images:image[];
}

export interface image{
    id:string,
    url:string
}

export interface IStore{
    id:string;
    archived?:boolean
    name:string;
    gstin:string;
    mobile:string;
    address:string;
    contactName:string;
    email:string;
    products?:IProduct[]
}