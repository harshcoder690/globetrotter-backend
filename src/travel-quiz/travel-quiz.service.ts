import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ChallengeUserService } from "src/challenge-user/challenge-user.service";
import { Destination, DestinationDocument } from "src/schemas/destination.schema";
import { getRandomItem, selectRandomClues, shuffleOptions } from "./helper/travel-quiz.helper";

@Injectable()
export class TravelQuizService {
    constructor(
        @InjectModel(Destination.name, 'globetrotter')
        private destinationModel: Model<DestinationDocument>,
        private challengeUserService: ChallengeUserService,
    ) { }

    async getNewChallenge() {
        const [correctDest, decoys] = await Promise.all([
            this.getRandomDestination(),
            this.getRandomDecoys(3),
        ]);

        if (!correctDest) {
            throw new Error('No destinations available');
        }

        const validDecoys = decoys as Array<{ city: string; country: string }>;

        return {
            destinationId: (correctDest._id as string).toString(),
            clues: selectRandomClues(correctDest.clues),
            options: shuffleOptions([
                `${correctDest.city}, ${correctDest.country}`,
                ...validDecoys.map(d => `${d.city}, ${d.country}`),
            ]),
        };
    }

    async validateAnswer(
        destinationId: string,
        guess: string,
        username?: string
    ) {
        const destination = await this.destinationModel.findById(destinationId);
        if (!destination) throw new Error('Destination not found');

        const isCorrect = guess === `${destination.city}, ${destination.country}`;

        console.log(destinationId, guess, username)

        if (username) {
            await this.challengeUserService.updateScore(username, isCorrect);
        }

        return {
            correct: isCorrect,
            funFact: getRandomItem(destination.funFacts),
            trivia: getRandomItem(destination.trivia),
        };
    }

    private async getRandomDestination(): Promise<DestinationDocument | null> {
        const count = await this.destinationModel.countDocuments();
        if (count === 0) return null;
        const random = Math.floor(Math.random() * count);
        return await this.destinationModel.findOne().skip(random).lean();
    }

    private async getRandomDecoys(count: number) {
        const randomDest = await this.getRandomDestination();
        return this.destinationModel.aggregate<{ city: string; country: string }>([
            { $match: { _id: { $ne: randomDest?._id } } },
            { $sample: { size: count } },
            { $project: { city: 1, country: 1 } }
        ]);
    }
}
