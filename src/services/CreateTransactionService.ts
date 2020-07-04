import { getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateCategoryService from './CreateCategoryService';
import AppError from '../errors/AppError';

interface Request {
  title: string;
  type: 'income' | 'outcome' | string;
  value: number;
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    value,
    category,
  }: Request): Promise<Transaction> {
    const categoryService = new CreateCategoryService();
    const transactionRepo = getCustomRepository(TransactionsRepository);

    const { income } = await transactionRepo.getBalance();

    if (type === 'outcome' && value > income) {
      throw new AppError('Invalid transaction');
    }

    const newCategory = await categoryService.execute({ title: category });

    const transactionObj = transactionRepo.create({
      title,
      type,
      value,
      category: newCategory,
    });

    const newTransaction = await transactionRepo.save(transactionObj);

    return newTransaction;
  }
}

export default CreateTransactionService;
