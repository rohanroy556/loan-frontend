import { Limit } from "./partner";

export interface PartnerLimit {
    _id: string,
    name: string,
    limitLeft: Limit
}