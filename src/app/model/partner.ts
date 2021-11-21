export interface Limit {
    daily: Range;
    monthly: Range;
}

export interface Loan {
    amount: number;
    time: Date;
}

export interface Partner {
    _id?: string;
    name: string;
    limit: Limit;
    loans: Array<Loan>;
}

export interface Range {
    amount: number;
    numberOfLoans: number;    
}
