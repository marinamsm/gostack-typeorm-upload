import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepo = getCustomRepository(TransactionsRepository);

    await transactionsRepo.delete(id);
  }
}

export default DeleteTransactionService;
