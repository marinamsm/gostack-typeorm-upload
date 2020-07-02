import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import CreateCategoryService from './CreateCategoryService';

interface Request {
  title: string;
  type: 'income' | 'outcome';
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
    const transactionRepo = getRepository(Transaction);

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
