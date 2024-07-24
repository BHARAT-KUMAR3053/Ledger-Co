import { loan_details } from '@ledger-co/repository/loan-repository';
import { ILoanDetail, IProspectDetails } from '@ledger-co/controllers/main/interfaces';

function handleLoan(
  BANK_NAME: string,
  BORROWER_NAME: string,
  PRINCIPAL: string,
  NO_OF_YEARS: string,
  RATE_OF_INTEREST: string
) {
  const prospect_details: IProspectDetails = {
    prospectName: BORROWER_NAME,
    principalAmount: Number(PRINCIPAL),
    tenure: Number(NO_OF_YEARS),
    interest: Number(RATE_OF_INTEREST),
    totalAmount: 0,
    paidAmount: 0,
    lumpSumAmount: 0,
    lumpSumAtMonth: 0,
    noOfEmis: 0,
    monthlyEmi: 0,
  };
  const index = loan_details.findIndex((item) => item.bankName === BANK_NAME);
  const totalAmount =
    Number(PRINCIPAL) +
    Number(PRINCIPAL) * Number(NO_OF_YEARS) * Number(RATE_OF_INTEREST) * 0.01;
  const noOfEmis = Number(NO_OF_YEARS) * 12;
  const monthlyEmi = Math.ceil(Number(totalAmount) / Number(noOfEmis));

  if (loan_details.length === 0 || index === -1) {
    loan_details.push({
      bankName: BANK_NAME,
      details: [
        {
          ...prospect_details,
          totalAmount,
          noOfEmis,
          monthlyEmi,
        },
      ],
    });
    return;
  }

  loan_details[index].details.push({
    ...prospect_details,
    totalAmount,
    noOfEmis,
    monthlyEmi,
  });
  return;
}

function handlePayment(BANK_NAME: string, BORROWER_NAME: string, LUMPSUM_AMOUNT: string, EMI_NO: string) {
  loan_details.map((bank: ILoanDetail) => {
    if (bank.bankName === BANK_NAME) {
       bank.details = bank.details.map((detail) => {
        if (detail.prospectName === BORROWER_NAME) {
          return {
            ...detail,
            paidAmount: detail.lumpSumAmount + Number(LUMPSUM_AMOUNT),
            lumpSumAmount: Number(LUMPSUM_AMOUNT),
            lumpSumAtMonth: Number(EMI_NO),
          };
        }
        return detail;
      });
    }
    return bank;
  });
}

function handleBalance(BANK_NAME: string, BORROWER_NAME: string, EMI_NO: string) {
  try {
    const arr = loan_details
      ?.filter((bank) => bank.bankName === BANK_NAME)[0]
      ?.details?.filter((prospect) => prospect.prospectName === BORROWER_NAME);
    if (arr?.length === 0) {return;}
    const PAID_AMOUNT =
      Number(EMI_NO) > arr[0].lumpSumAtMonth
        ? arr[0]?.paidAmount + Number(EMI_NO) * arr[0]?.monthlyEmi
        : Number(EMI_NO) * arr[0]?.monthlyEmi;
    const NO_OF_EMIS =
      Number(EMI_NO) > arr[0].lumpSumAtMonth
        ? arr[0]?.noOfEmis -
          Number(EMI_NO) -
          Math.floor(Number(arr[0]?.paidAmount) / Number(arr[0]?.monthlyEmi))
        : arr[0]?.noOfEmis - Number(EMI_NO);
    console.log(`${BANK_NAME} ${BORROWER_NAME} ${PAID_AMOUNT} ${NO_OF_EMIS}`);
  } catch (error) {
    console.log('BANK_NOT_FOUND');
  }
}

export { handleLoan, handlePayment, handleBalance };
