/* eslint-disable no-case-declarations */
import readline from 'readline';

import { Health } from '@ledger-co/controllers/health/health';
import { checkForArguments } from '@ledger-co/utils/utility-functions';
import { handleBalance, handleLoan, handlePayment } from '@ledger-co/controllers/main/loan-controllers';

export class Server {

  public start(): void {
    //health check
    const health = new Health();
    health.health();
    this.createInputOutputInterface();
  }

  private createInputOutputInterface(){
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '> ',
    });

    rl.prompt();

    rl.on('line', (line) => {
      const input = line.trim().split(' ');

      const command = input[0].toUpperCase();
      const args = input.slice(1);


      switch (command) {
        case 'LOAN':
          checkForArguments(args, 5);
          const [
            BANK_NAME,
            BORROWER_NAME,
            PRINCIPAL,
            NO_OF_YEARS,
            RATE_OF_INTEREST,
          ] = args;
          handleLoan(
            BANK_NAME,
            BORROWER_NAME,
            PRINCIPAL,
            NO_OF_YEARS,
            RATE_OF_INTEREST
          );
          break;
        case 'PAYMENT':
          checkForArguments(args, 4);
          const [
            PAYMENT_BANK_NAME,
            PAYMENT_BORROWER_NAME,
            PAYMENT_LUMPSUM_AMOUNT,
            EMI_NUMBER,
          ] = args;
          handlePayment(
            PAYMENT_BANK_NAME,
            PAYMENT_BORROWER_NAME,
            PAYMENT_LUMPSUM_AMOUNT,
            EMI_NUMBER
          );
          break;
        case 'BALANCE':
          checkForArguments(args, 3);
          const [BALANCE_BANK_NAME, BALANCE_BORROWER_NAME, BALANCE_EMI_NUMBER] =
            args;
          handleBalance(
            BALANCE_BANK_NAME,
            BALANCE_BORROWER_NAME,
            BALANCE_EMI_NUMBER
          );
          break;
        default:
          console.log(`Unknown command: ${command}`);
          break;
      }

      rl.prompt();
    }).on('close', () => {
      console.log('Exiting the application');
      process.exit(0);
    });
  }

}
