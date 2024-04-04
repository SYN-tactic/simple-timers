import type { TimerType } from "$lib/types";
import { browser } from '$app/environment';

// Ensures that the load function only loads on the client side
export const ssr = false;

function generateUniqueId() {
    return Math.random().toString(36).slice(2, 9);
}

export async function load() {
    let timers: TimerType[] = [];

    // Make sure we're in the browser
    if (browser) {
        console.log('Loading timers from local storage')
        // If we are, load the timers from local storage - if they exist.
        const storedTimers = localStorage.getItem('timers');
        timers = storedTimers ? JSON.parse(storedTimers) : [];
        if (timers.length === 0) {
            // Initialize the timers with the default timer
            timers = [
                {
                    timerLengthInSeconds: 63,
                    timerName: 'Default',
                    timerId: generateUniqueId(),
                    linked: true
                }
            ]
        }
        return {
            timers: timers
        };
    }

    return {
        timers: []
    }
}
