/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
import { PostService } from './provider/post.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetPostParamDto } from './dto/postParam.dto';
import { CreatePostDto } from './dto/createPost.dto';


@Controller('posts')
@ApiTags('posts')
export class PostController {
    constructor (private readonly postService: PostService) {}
    
    @ApiResponse({  //
        status: 200, 
        description: 'Post(s) fetched successfully'
    })
    @ApiOperation({
        summary: 'Fetches all user(s) post'
    })


    @Get("/:id?")
    @ApiQuery({
        name: 'limit',
        type: 'number',
        required: false,
    })
    @ApiQuery({
        name: 'page',
        type: 'number',
        required: false
    })
    public getPosts(
        @Param('id') getpostparamdto: GetPostParamDto,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    ) {
        console.log('getting all posts');
        return this.postService.findAllPosts();
    }

    
    @Post()
    public createPost (
        @Body() createpostdto: CreatePostDto
    ) {
        console.log(createpostdto)
        return this.postService.createPost(createpostdto)
    }


    @Delete()
    public async deleteOnePost (
        @Query('id', ParseIntPipe) id: number
    ) {
        return this.postService.deletePost(id)
    }
 }
