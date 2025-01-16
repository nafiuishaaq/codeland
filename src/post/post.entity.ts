import { 
  Column, 
  CreateDateColumn, 
  Entity,
  JoinColumn, 
  JoinTable, 
  ManyToMany, 
  ManyToOne, 
  OneToOne, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn 
} from "typeorm";
import { PostType } from "./enums/postType.enum";
import { PostStatus } from "./enums/postStatus.enum";
import { CreatePostDto } from "./dto/createPost.dto";
import { MetaOption } from "src/meta-options/meta-option.entity";
import { timestamp } from "rxjs";
import { User } from "src/users/entity/user.entity";
import { Tag } from "src/tag/tag.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.post,  { eager: true})
    author: User

    @Column('varchar')
    title: string;

    @Column({type: 'enum', enum: PostType, default: PostType.STORY})
    postType: PostType;

    @Column({type: 'enum', enum:PostStatus, default: PostStatus.DRAFT})
    postStatus: PostStatus;

    @Column('varchar')
    content:string;

    @Column({nullable: true})
    imageUrl: string;

    @CreateDateColumn() 
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date

    @Column({type: "timestamp", nullable: true}) // Explicit date column
    publishedDate: Date;

    @OneToOne(() => MetaOption, (metaOption) => metaOption.post,
    {
        cascade: true, 
        eager: true
    })
    metaOptions?: MetaOption;


    @ManyToOne(() => Tag)
    @JoinTable()
    tags: Tag[];
}