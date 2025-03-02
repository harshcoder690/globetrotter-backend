import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TravelQuizModule } from './travel-quiz/travel-quiz.module';
import { ChallengeUserModule } from './challenge-user/challenge-user.module';

const TIME_OUT = 60000;

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI || '', {
      connectionName: 'globetrotter',
      connectTimeoutMS: TIME_OUT,
      socketTimeoutMS: TIME_OUT
    }),
    TravelQuizModule,
    ChallengeUserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
