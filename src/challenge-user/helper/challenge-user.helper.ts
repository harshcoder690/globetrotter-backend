export function buildShareUrl(challengeId: string): string {
    const baseURL = process.env.FRONTEND_URL;
    console.log(baseURL)
    const url = new URL(`/challenge/${challengeId}`, baseURL);
    console.log(url)
    return url.toString();
}

export function generateShareImage(score: number): string {
    // Replace with actual image generation logic or a third-party service
    return `https://fakeimg.pl/600x400/?text=Score:${score}`;
}