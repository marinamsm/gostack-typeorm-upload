import { getCustomRepository } from 'typeorm';
import Category from '../models/Category';
import CategoryRepository from '../repositories/CategoryRepository';

interface Request {
  title: string;
}

class CreateCategoryService {
  public async execute({ title }: Request): Promise<Category> {
    const categoryRepo = getCustomRepository(CategoryRepository);

    const existentRepo = await categoryRepo.existsCategory({ title });

    if (existentRepo) {
      return existentRepo;
    }

    const categoryObj = categoryRepo.create({
      title,
    });

    const newCategory = await categoryRepo.save(categoryObj);

    return newCategory;
  }
}

export default CreateCategoryService;
