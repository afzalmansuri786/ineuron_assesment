import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { USER_COLLECTION_NAME } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModel, users } from './user.service.spec';
import {MongoClient } from 'mongodb';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};
export const UserServiceMock: MockType<UserService> = {
  getUserByEmail: jest.fn().mockReturnValue(users[1]),
  createUser: jest.fn().mockReturnValue(users[0]),
  updateUserByEmail: jest.fn().mockReturnValue({message : 'User data successfully updated !'}),
  deleteUserByEmail: jest.fn().mockReturnValue({ message : 'User has been deleted successfully !'}),
  getAllUser: jest.fn().mockReturnValue(users[0])
};


describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let connection;
  let db;
  const configService = new ConfigService();


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModel, UserModel],
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: UserServiceMock
        }
      ]
    }).compile();

    connection = await MongoClient.connect(configService.get('MONGODB_URI'));
    db = await connection.db(USER_COLLECTION_NAME);


    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService)
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const data = await userService.createUser(users[0])
      expect(data).toBe(users[0])
    });
  });

  describe('updateUser', () => {
    it('should update a  user', async () => {
      const data = await userService.updateUserByEmail(users[1].email,users[1])
      expect(data).toBe({message : 'User data successfully updated !'})
    });
  });

  describe('deleteUser', () => {
    it('should delete a  user', async () => {
      const data = await userService.deleteUserByEmail(users[1].email)
      expect(data).toBe({message : 'User data successfully updated !'})
    });
  });

  describe('getUserByEail', () => {
    it('should return a user', async () => {
      const data = await userService.getUserByEmail(users[1].email)
      expect(data).toBe(users[1])
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const data = await userService.getAllUser()
      expect(data).toBe(users)
    });
  });
});
