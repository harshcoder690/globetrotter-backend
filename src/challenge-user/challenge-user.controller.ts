import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChallengeUserService } from './challenge-user.service';

@Controller('api/v1/challenge')
export class ChallengeUserController {
    constructor(private readonly ChallengeUserService: ChallengeUserService) { }

    @Post('register')
    async registerUser(
        @Body('username') username: string,
        @Body('score') score: string
    ) {
        console.log(username, score); // Debugging
        return this.ChallengeUserService.registerUser(username, parseInt(score));
    }

    @Post('generate')
    async generateChallenge(@Body('username') username: string) {
        return this.ChallengeUserService.generateChallenge(username);
    }

    @Get(':challengeId')
    async getChallengeDetails(@Param('challengeId') challengeId: string) {
        return this.ChallengeUserService.getChallengeDetails(challengeId);
    }
}