import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserMongooseModule } from './schema/user.schema';

@Module({
  imports: [UserMongooseModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
