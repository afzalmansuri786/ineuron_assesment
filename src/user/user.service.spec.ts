import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserMongooseModule, UserSchema, USER_COLLECTION_NAME } from './schema/user.schema';
import mongoose, { Mongoose, Schema } from 'mongoose';
import { UserSchemaI } from './interface/user.interface';
import { DatabaseModule } from 'src/database/database.module';
import {MongoClient} from 'mongodb';
import { ConfigService } from '@nestjs/config';


type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};

export const users = [
  {
    _id: '63efd3444e7f80f29e3d38c1',
    name: 'test6',
    email: 't5@gmail.com',
    status: 'active',
    userId: '66592857-c0a8-44c8-a8fc-a198db5df0f3',
    createdAt: '2023-02-17T19:19:32.012Z',
    updatedAt: '2023-02-17T19:19:32.012Z',
  },
  {
    _id: '63efd3414e7f80f29e3d38bf',
    name: 'test6',
    email: 't3@gmail.com',
    status: 'active',
    userId: 'af8148fe-a4b4-425c-831d-a69fb55b1631',
    createdAt: '2023-02-17T19:19:29.794Z',
    updatedAt: '2023-02-17T19:19:29.794Z',
  },
  {
    _id: '63efd33e4e7f80f29e3d38bd',
    name: 'test6',
    email: 't2@gmail.com',
    status: 'active',
    userId: 'd3bccd82-1d79-4436-94b9-33aec3c46a24',
    createdAt: '2023-02-17T19:19:26.424Z',
    updatedAt: '2023-02-17T19:19:26.424Z',
  },
  {
    _id: '63efd32c4e7f80f29e3d38b9',
    name: 'test6',
    email: 't1@gmail.com',
    status: 'active',
    userId: '735bf2d4-224c-4720-8005-ce59fe6a0f42',
    createdAt: '2023-02-17T19:19:08.526Z',
    updatedAt: '2023-02-17T19:19:08.526Z',
  },
];

export const UserModel: any = {
  find: jest.fn().mockReturnValue(users),
  findOne: jest.fn().mockReturnValue(users[0]),
  findOneAndUpdate: jest.fn().mockReturnValue({message : 'User data successfully updated !'}),
  findOneAndDelete: jest.fn().mockReturnValue({ message : 'User has been deleted successfully !'}),
  create: jest.fn().mockReturnValue(users[0])
};

describe('UserService', () => {
  let service: UserService;
  let connection;
  let db;
  const configService = new ConfigService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule,UserMongooseModule],
      providers: [UserService],
    }).compile();
    connection = await MongoClient.connect(configService.get('MONGODB_URI'));
    db = await connection.db(USER_COLLECTION_NAME);

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const data = await UserModel.create(users[0])
      expect(data).toBe(users[0])
    });
  });

  describe('updateUser', () => {
    it('should update a  user', async () => {
      const data = await UserModel.findOneAndUpdate(users[1].email,users[1])
      expect(data).toBe({message : 'User data successfully updated !'})
    });
  });

  describe('deleteUser', () => {
    it('should delete a  user', async () => {
      const data = await UserModel.findOneAndDelete(users[1].email)
      expect(data).toBe({message : 'User data successfully updated !'})
    });
  });

  describe('getUserByEail', () => {
    it('should return a user', async () => {
      const data = await UserModel.findOne(users[1].email)
      expect(data).toBe(users[1])
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const data = await UserModel.findOne({})
      expect(data).toBe(users)
    });
  });
});
