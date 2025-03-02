import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { v4 as uuidv4 } from 'uuid';
import { buildShareUrl, generateShareImage } from './helper/challenge-user.helper';

@Injectable()
export class ChallengeUserService {
    constructor(
        @InjectModel(User.name, 'globetrotter')
        private userModel: Model<UserDocument>
    ) { }

    async registerUser(username: string): Promise<User> {
        const existingUser = await this.userModel.findOne({ username }).lean();
        if (existingUser) {
            return existingUser;
        }
        return this.userModel.create({ username });
    }

    async generateChallenge(username: string): Promise<{ shareUrl: string; imageUrl: string }> {
        const user = await this.userModel.findOne({ username }).lean();
        if (!user) throw new Error('User not found');

        const challengeId = uuidv4();
        const shareUrl = buildShareUrl(challengeId); // Use helper below
        const imageUrl = generateShareImage(user.score);

        await this.userModel.updateOne(
            { username },
            { $set: { challengeId, shareImageUrl: imageUrl } }
        );

        return { shareUrl, imageUrl };
    }

    async getChallengeDetails(challengeId: string): Promise<{ username: string; score: number }> {
        const user = await this.userModel.findOne({ challengeId }).lean();
        if (!user) throw new Error('Invalid challenge link');
        return { username: user.username, score: user.score };
    }

    async updateScore(username: string, correct: boolean): Promise<void> {
        const user = await this.userModel.findOne({ username });
        if (!user) throw new Error('User not found');

        // Make sure the score never goes below 0
        let newScore = user.score;
        if (correct) {
            newScore += 1;
        } else {
            newScore = Math.max(newScore - 1, 0);
        }
        console.log(newScore)

        await this.userModel.updateOne({ username }, { $set: { score: newScore } });
    }
}
