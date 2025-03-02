export function selectRandomClues(clues: string[]) {
    return clues.length > 1 ? [clues[Math.floor(Math.random() * clues.length)]] : clues;
}

export function shuffleOptions(options: string[]) {
    return [...options].sort(() => Math.random() - 0.5);
}

export function getRandomItem<T>(array: T[]): T {
    if (!array || array.length === 0) {
        return null as unknown as T;
    }
    return array[Math.floor(Math.random() * array.length)];
}