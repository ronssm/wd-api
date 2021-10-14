import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UpdateUserDTO } from './dtos/updateUser.dto';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async remove(_id: string): Promise<any> {
    const foundUser = await this.userModel.findOne({ _id }).exec();

    if (!foundUser) {
      throw new NotFoundException(`User not found`);
    }

    return await this.userModel.deleteOne({ _id }).exec();
  }

  async update(_id: string, updateUserDTO: UpdateUserDTO): Promise<void> {
    const foundUser = await this.userModel.findOne({ _id }).exec();

    if (!foundUser) {
      throw new NotFoundException(`User not found`);
    }

    const { email } = updateUserDTO;

    const foundUserWithEmail = await this.userModel.findOne({ email }).exec();

    if (foundUserWithEmail && _id !== foundUserWithEmail._id.toString()) {
      throw new BadRequestException(`E-mail already in use`);
    }

    await this.userModel
      .findOneAndUpdate({ _id }, { $set: updateUserDTO })
      .exec();
  }

  async getById(_id: string): Promise<User> {
    const foundUser = await this.userModel.findOne({ _id }).exec();

    if (!foundUser) {
      throw new NotFoundException(`User not found`);
    }

    return foundUser;
  }

  async getAll(): Promise<Array<User>> {
    return await this.userModel.find().exec();
  }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const { email } = createUserDTO;

    const foundUser = await this.userModel.findOne({ email }).exec();

    if (foundUser) {
      throw new BadRequestException(`User already exists`);
    }

    const newUser = new this.userModel(createUserDTO);
    return await newUser.save();
  }
}
