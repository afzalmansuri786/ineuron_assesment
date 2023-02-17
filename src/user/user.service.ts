import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/creatUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { UserSchemaI } from './interface/user.interface';
import { USER_MONGOOSE_PROVIDER } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_MONGOOSE_PROVIDER)
    private userModel: Model<UserSchemaI>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userModel.create({
        ...createUserDto
    });
    return user;
  }

  async getUserByEmail(email:string){
    const user = await this.userModel.findOne({email}).lean();
    if(!user){
        throw new NotFoundException('User not found !')
    }
    return user;
  }

  async updateUserByEmail(email:string,updateUserDto: UpdateUserDto){
    const user = await this.userModel.findOneAndUpdate({email},{...updateUserDto})
    if(!user){
        throw new NotFoundException('user not found');
    }
    return { message : 'User data successfully updated !'};
  }

  async getAllUser(){
    const users = await this.userModel.find({}).sort({createdAt:-1});
    if(!users){
        throw new NotFoundException('There are no users exist !');
    }
    return users;
  }

  async deleteUserByEmail(email:string){
    const user = await this.userModel.findOneAndDelete({email});
    if(!user){
        throw new NotFoundException('There are no users exist !');
    }
    return { message : 'User has been deleted successfully !'}
  }
}
