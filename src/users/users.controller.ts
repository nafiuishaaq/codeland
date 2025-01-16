/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  // Headers,
  // Ip,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  SetMetadata,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/updateUser.dto';
// import { GetUserParamDto } from 'src/dto/userParam.dto';
import { UserService } from './providers/user.services';
import { GetUserParamDto } from 'src/users/dto/userParam.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { enumsTypes } from 'src/auth/enums/auth-type-enums';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  // GET  Request all/byId
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully based on the query',
  })
  @ApiOperation({
    summary: 'Fetches from the users',
  })
  @Get('/:id?')
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'page number',
  })
  public getUsers(
    @Param() getuserparamdto: GetUserParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.userService.getAll();
  }

  @ApiResponse({
    status: 200,
    description: 'User created successfully.',
  })
  @ApiOperation({
    summary: 'creates a new user',
  })
  @Post()
  // @SetMetadata('authType', 'none')
  @Auth(enumsTypes.None)
  public createUsers(
    @Body() createuserdto: CreateUserDto,
    // @Ip() ip: string,
    // @Headers() header: any)
  ) {
    return this.userService.createUser(createuserdto);
  }

  @ApiResponse({
    status: 200,
    description: 'User edited successfully',
  })
  @ApiOperation({
    summary: 'Edits an existing user',
  })
  @Patch()
  public UpdateUser(@Body() updateuserdto: UpdateUserDto) {
    console.log(updateuserdto);
    return 'Patching up the pants';
  }
}
