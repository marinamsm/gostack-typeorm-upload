import { EntityRepository, getRepository, Repository } from 'typeorm';
import Category from '../models/Category';

interface Request {
  title: string;
}

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {
  public async existsCategory({ title }: Request): Promise<Category | null> {
    const categoryRepo = getRepository(Category);

    const category = await categoryRepo.findOne({
      where: {
        title,
      },
    });

    if (category) {
      return category;
    }

    return null;
  }
}

export default CategoryRepository;
