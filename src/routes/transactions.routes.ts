import multer from 'multer';
import { Router } from 'express';

import uploadConfig from '../config/upload';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();
const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request, response) => {
  const transactionRepo = new TransactionsRepository();

  const transactions = await transactionRepo.findTransactions();

  const balance = await transactionRepo.getBalance();

  return response.json({
    transactions,
    balance,
  });
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;

  const transactionService = new CreateTransactionService();

  const newTransaction = await transactionService.execute({
    title,
    value,
    type,
    category,
  });

  return response.status(201).json(newTransaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const transactionService = new DeleteTransactionService();

  await transactionService.execute(id);

  return response.status(204).send();
});

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    // console.log('FILE---', request.file);
    const transactionService = new ImportTransactionsService();

    const transactions = await transactionService.execute(request.file);

    return response.json(transactions);
  },
);

export default transactionsRouter;
