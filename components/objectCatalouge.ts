export type Owner = {
    id:number,
    name:string,
    photos:string
};

export type Pet ={
    id:number,
    name:string,
    age:string,
    fFood:string,
    fToy:string,
    type:string,
    breed:string,
    photos:string
}

export type Visit ={
    id:number,
    visitDate:string,
    petName:string,
    notes:string,
    status:string,
    totalProduct:string,
    totalService:string,
    diagnosis:Array<any>
}

export type userSession ={
    jwt:string,
    userObject:Object
}

export type petBooking = {
    idPet:string,
    notes:string,
    bookingDate:string,
    bookingTime:string
}