

export interface TimerType {
    timerLengthInSeconds: number;
    timerName: string;
    timerId: string;
    linked: boolean;
}

export interface CreateTimerType {
    timeInSeconds: number;
    timerName: string;
    timerId?: string;
    order?: number;
}