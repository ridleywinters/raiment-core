export class ThrottleGuard {
    delay: number;
    lastTime: number = 0;
    timeout: ReturnType<typeof setTimeout> | null = null;

    constructor(delay: number) {
        this.delay = delay;
    }

    run(fn: () => void, force = false): Promise<void> {
        const now = Date.now();
        const delta = now - this.lastTime;

        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        if (force || delta >= this.delay) {
            this.lastTime = now;
            const ret: any = fn();
            if (ret instanceof Promise) {
                return ret;
            }
            return Promise.resolve();
        }
        return new Promise((resolve) => {
            this.timeout = setTimeout(() => {
                this.timeout = null;
                this.lastTime = Date.now();
                const ret: any = fn();
                if (ret instanceof Promise) {
                    ret.then(() => resolve());
                } else {
                    resolve();
                }
            }, this.delay - delta);
        });
    }
}
