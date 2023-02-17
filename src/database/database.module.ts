import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
const configService = new ConfigService();

@Module({
  imports: [
    MongooseModule.forRoot(configService.get('MONGODB_URI')),
  ],
})
export class DatabaseModule {}
