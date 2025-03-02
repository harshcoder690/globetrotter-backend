import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TravelQuizController } from "./travel-quiz.controller";
import { TravelQuizService } from "./travel-quiz.service";
import { Destination, DestinationSchema } from "src/schemas/destination.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { ChallengeUserModule } from "src/challenge-user/challenge-user.module";

@Module({
    imports: [ConfigModule,
        ChallengeUserModule,
        MongooseModule.forFeature([
            {
                name: Destination.name,
                schema: DestinationSchema,
                collection: "places-data"
            }
        ], 'globetrotter')],
    controllers: [TravelQuizController],
    providers: [TravelQuizService],
    exports: [TravelQuizService],
})

export class TravelQuizModule { }
