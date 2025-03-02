import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schema";
import { ChallengeUserController } from "./challenge-user.controller";
import { ChallengeUserService } from "./challenge-user.service";

@Module({
    imports: [
        ConfigModule, 
        MongooseModule.forFeature(
          [{ name: User.name, schema: UserSchema }], 
          'globetrotter'
        )
      ],      
    controllers: [ChallengeUserController],
    providers: [ChallengeUserService],
    exports: [ChallengeUserService],
})

export class ChallengeUserModule { }
