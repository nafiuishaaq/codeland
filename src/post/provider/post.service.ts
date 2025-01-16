import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { CreatePostDto } from '../dto/createPost.dto';
import { UserService } from 'src/users/providers/user.services';
import { TagService } from 'src/tag/tag.service';
import { PatchPostDto } from '../dto/patchPost.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    // @InjectRepository(MetaOption)
    // private readonly metaRepository: Repository<MetaOption>,

    private readonly userService: UserService, //  Dependency Injection

    private readonly tagsService: TagService,
  ) {}

  public async findAllPosts(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  public async createPost(createPostDto: CreatePostDto) {
    // Find author from database
    const author = await this.userService.findOneById(createPostDto.authorId);

    // find Tags from database
    const tag = await this.tagsService.findMultipleTag(createPostDto.tags);

    // Create a post
    // const post = this.postRepository.create({
    //   ...createPostDto,
    //   author,
    //   tag,
    // });

    // Return the post to the user
    // return await this.postRepository.save(post);
  }

  public async updatePost(patchPostDto: PatchPostDto) {
    // find the tags
    const tags = await this.tagsService.findMultipleTag(patchPostDto.tags);

    // find the post
    let post = await this.postRepository.findBy({
      id: patchPostDto.id,
    });

    //update the post
    // post.title = patchPostDto ?? post.title;

    // assign the new tags
    // post.tags = tags;

    //save the post
    return await this.postRepository.save(post);
  }

  public async deletePost(
    id: number,
  ): Promise<{ message: string; id: number }> {
    // Find the target post and metaOption
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      return { message: 'Post not found', id };
    }

    // Delete the target post
    await this.postRepository.delete({ id });

    // Delete the target metaOption, if it exists
    // if (post.metaOptions) {
    //   await this.metaRepository.delete(post.metaOptions.id);
    // }

    // Confirmation
    return { message: 'Hurray!! you don delete am', id };
  }
}
