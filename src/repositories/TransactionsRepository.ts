import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const resultingBalance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    // this.transactions.reduce(
    //   (accumulator: Balance, transaction: Transaction) => {
    //     switch (transaction.type) {
    //       case 'income':
    //         accumulator.income += transaction.value;
    //         accumulator.total += transaction.value;
    //         break;
    //       case 'outcome':
    //         accumulator.outcome += transaction.value;
    //         accumulator.total -= transaction.value;
    //         break;
    //       default:
    //         console.log('Something is wrong...');
    //     }

    //     return resultingBalance;
    //   },
    //   resultingBalance,
    // );

    return resultingBalance;
  }
}

export default TransactionsRepository;
