export interface IProspectDetails {
  prospectName: string;
  principalAmount: number;
  tenure: number;
  interest: number;
  totalAmount: number;
  paidAmount: number;
  lumpSumAmount: number;
  lumpSumAtMonth: number;
  noOfEmis: number;
  monthlyEmi: number;
}

export interface ILoanDetail {
  bankName: string;
  details: IProspectDetails[];
}
