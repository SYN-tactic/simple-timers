

export interface TimerType {
    timerLengthInSeconds: number;
    timerName: string;
    timerId: string;
}

export interface CreateTimerType {
    timeInSeconds: number;
    timerName: string;
    timerId?: string;
    order?: number;
}