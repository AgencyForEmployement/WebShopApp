import { ServiceItem } from "./ServiceItem.model";

export class Transaction {
    public id: number = 0;
    public amount: number = 0;
    public merchantOrderId: number = 0;
    public merchantOrderTimestamp: any;
    public services: ServiceItem[] = [];
    public status: any;
    public paymentMethod: string =""

} 