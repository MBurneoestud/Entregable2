import { Interface } from 'readline';
export declare class Terminal {
    rl: Interface;
    constructor();
    ask(question: string): Promise<string>;
    print(message: string): void;
    printHeader(title: string): void;
    showMenu(options: string[]): Promise<number>;
    close(): void;
    clear(): void;
}
//# sourceMappingURL=terminal.d.ts.map