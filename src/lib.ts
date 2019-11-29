import * as rlp from "readline";

const rl = rlp.createInterface({
    input: process.stdin,
    output: process.stdout
});

export function input(question = "") {
    return new Promise((resolve: (arg0: string) => void, reject) => {
        rl.question(question, (answer: string) => resolve(answer));
    });
}

export function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
