import type { TimerType } from "$lib/types";
import { browser } from '$app/environment';

function generateUniqueId() {
    return Math.random().toString(36).slice(2, 9);
}

export async function load() {
    let timers: TimerType[] = [];

    // Make sure we're in the browser
    if (browser) {
        // If we are, load the timers from local storage - if they exist.
        const storedTimers = localStorage.getItem('timers');
        timers = storedTimers ? JSON.parse(storedTimers) : [];
    }
    if (timers.length === 0) {
        // Initialize the timers with the default timer
        timers = [
            {
                timerLengthInSeconds: 60,
                timerName: 'Default',
                timerId: generateUniqueId(),
                linked: true
            }
        ]
    }


    return {
        timers: timers || []

    };
}
