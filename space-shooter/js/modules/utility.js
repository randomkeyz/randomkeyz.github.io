// Utility func for setting random int: https://stackoverflow.com/a/60308175
const setRandomInterval = (intervalFunction, minDelay, maxDelay) => {
    let timeout;

    const runInterval = () => {
        const timeoutFunction = () => {
            intervalFunction();
            runInterval();
        };

        const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

        timeout = setTimeout(timeoutFunction, delay);
    };

    runInterval();

    return {
        clear() { clearTimeout(timeout) }
    };
};

export { setRandomInterval };