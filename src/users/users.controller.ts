import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UpdateUserDTO } from './dtos/updateUser.dto';
import { User } from './user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return await this.usersService.create(createUserDTO);
  }

  @Get()
  async getAll(): Promise<User[]> {
    return await this.usersService.getAll();
  }

  @Get('/:_id')
  async getById(@Param('_id') _id: string): Promise<User> {
    return await this.usersService.getById(_id);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() updateUserDTO: UpdateUserDTO,
    @Param('_id') _id: string,
  ): Promise<void> {
    await this.usersService.update(_id, updateUserDTO);
  }

  @Delete('/:_id')
  async remove(@Param('_id') _id: string): Promise<void> {
    await this.usersService.remove(_id);
  }
}
