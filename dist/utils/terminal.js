import readline from 'readline';
import { Interface } from 'readline';
export class Terminal {
    rl;
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    ask(question) {
        return new Promise((resolve) => {
            this.rl.question(question, (answer) => {
                resolve(answer.trim());
            });
        });
    }
    print(message) {
        console.log(message);
    }
    printHeader(title) {
        console.log('\n' + '='.repeat(50));
        console.log(`  ${title}`);
        console.log('='.repeat(50) + '\n');
    }
    async showMenu(options) {
        this.print('Select an option:');
        options.forEach((option, index) => {
            this.print(` ${index + 1}. ${option}`);
        });
        const answer = await this.ask('\nEnter your choice: ');
        const choice = parseInt(answer);
        if (isNaN(choice) || choice < 1 || choice > options.length) {
            this.print('Invalid choice. Please try again.');
            return this.showMenu(options);
        }
        return choice - 1;
    }
    close() {
        this.rl.close();
    }
    clear() {
        console.clear();
    }
}
//# sourceMappingURL=terminal.js.map