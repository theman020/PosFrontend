import { Customer } from "./customer";
import { Employee } from "./employee";
import { ModeOfPayment } from "./mode-of-payment.enum";
import { Status } from "./status.enum";

export interface Order {
    id?:number,
    customer?:Customer,
    employee?:Employee,
    modeOfPayment?:ModeOfPayment,
    status?:Status,
    amount?:number,
    orderDetails?:any,
    createOrderDateTime?:Date,
    updateOrderDateTime?:Date
}
