import csvParse from 'csv-parse';
import fs from 'fs';
// import path from 'path';

import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';
import AppError from '../errors/AppError';

async function readCSVFile(csvFilePath: string): Promise<string[]> {
  // const csvFilePath = path.resolve(__dirname, '..', '..', 'tmp', 'import_template.csv');

  const readCSVStream = fs.createReadStream(csvFilePath);

  const parseStream = csvParse({
    from_line: 2,
    ltrim: true,
    rtrim: true,
  });

  const parseCSV = readCSVStream.pipe(parseStream);

  const lines: string[] = [];

  parseCSV.on('data', line => {
    lines.push(line);
  });

  await new Promise(resolve => {
    parseCSV.on('end', resolve);
  });

  return lines;
}

class ImportTransactionsService {
  async execute(file: Express.Multer.File): Promise<Transaction[]> {
    const lines = await readCSVFile(file.path);

    const transactionService = new CreateTransactionService();

    const promises: Transaction[] = [];

    for (const line of lines) {
      const transactionObj = {
        title: line[0],
        type: line[1],
        value: parseFloat(line[2]),
        category: line[3],
      };

      try {
        const newTransaction = await transactionService.execute(transactionObj);

        promises.push(newTransaction);
      } catch (error) {
        throw new AppError(error.message);

        // console.log('ignore: ', error.message);
      }
    }

    const results = await Promise.all(promises);

    return results;
  }
}

export default ImportTransactionsService;
