export interface Room {
    id: number;
    hostId: number;
    homeStayType: string;
    homeStayName: string;
    country: string;
    province: string;
    district: string;
    subDistrict: string;
    street: string;
    apartNumber: string;
    addressDetail: string;
    square: string;
    bedRooms:string;
    bathRooms:string;
    kitchens:string;
    bedNums: number,
    price: string;
    guestNums: number;
    status: boolean,
    isChecked: number,
    intro: string;
    bgUrl: string;
    
}
