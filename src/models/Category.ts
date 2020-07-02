import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  @CreateDateColumn({ update: false })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Category;
