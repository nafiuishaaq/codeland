import { Post } from 'src/post/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Post, (post) => post.author)
  post: Post;

  @Column('varchar', { length: 100, nullable: false })
  firstName: string;

  @Column('varchar', { length: 100, nullable: false })
  lastName: string;

  @Column('varchar', { unique: true, nullable: false })
  email: string;

  @Column('varchar', { nullable: false })
  password: string;

  @Column({ default: false })
  isActive: boolean;
}
