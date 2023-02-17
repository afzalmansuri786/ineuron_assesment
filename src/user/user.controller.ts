import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  SerializeOptions,
} from '@nestjs/common';
import { Delete, UseInterceptors } from '@nestjs/common/decorators';
import { ApiBody, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserSchemaI } from './interface/user.interface';
import { CreateUserDto } from './dto/creatUserDto';
import { UpdateUserDto } from './dto/updateUserDto';

@ApiTags('USER')

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUser();
  }

  @ApiParam({ name: 'email' })
  @Get('/:email')
  async getUserByEmail(@Param('email') email: string) {
    return await this.userService.getUserByEmail(email);
  }

  @ApiBody({ type : CreateUserDto})
  @Post('/create')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ) {
    return await this.userService.createUser(createUserDto);
  }

  @ApiBody({type: UpdateUserDto})
  @Post('/updateUser/:email')
  async updateUserByEmail(@Param('email') email, @Body() updateUserDto:UpdateUserDto) {
    return await this.userService.updateUserByEmail(email, updateUserDto);
  }

  @Post('/remove/:email')
  async deleteUserByEmail(@Param('email') email) {
    return await this.userService.deleteUserByEmail(email);
  }
}
