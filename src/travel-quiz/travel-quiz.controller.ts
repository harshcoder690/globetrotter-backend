import { Body, Controller, Get, Post } from "@nestjs/common";
import { TravelQuizService } from "./travel-quiz.service";

@Controller("api/v1/travel-quiz")
export class TravelQuizController {
    constructor(private readonly TravelQuizService: TravelQuizService) { }

    @Get('new-challenge')
    async getNewChallenge() {
        return this.TravelQuizService.getNewChallenge();
    }

    @Post('validate')
    async validateAnswer(
        @Body() body: { destinationId: string; guess: string, username: string }
    ) {
        return this.TravelQuizService.validateAnswer(body.destinationId, body.guess, body.username);
    }
}