import { Terminal } from "./utils/terminal.js";
import { ArmyList } from "./models/ArmyList.js";
import { Unit } from "./models/Unit.js";
import { spaceMarinesUnits, spaceMarinesWeapons } from "./data/SpaceMarinesData.js";
class ArmyListBuilder {
    terminal;
    armyList;
    faction;
    constructor() {
        this.terminal = new Terminal();
        this.armyList = null;
        this.faction = 'Space Marines';
    }
    async start() {
        this.terminal.clear();
        this.terminal.printHeader('Warhammer 40,00 Army List Builder');
        this.terminal.print(`Faction: ${this.faction}`);
        this.terminal.print(`Point Limit: 500 - 1,000 points`);
        this.terminal.print(`Keywords: Infantry, Battleline, Mounted, Vehicle, Character`);
        this.terminal.print(`Max 4 units per keyword`);
        this.terminal.print(`Must include at least 1 Character unit\n`);
        await this.createArmyList();
        await this.mainMenu();
    }
    async createArmyList() {
        while (true) {
            const name = await this.terminal.ask('Enter a name for your army list: ');
            if (name.length > 0) {
                this.armyList = new ArmyList(name);
                this.terminal.print(`\nArmy list "${name}" created successfully!\n`);
                break;
            }
            this.terminal.print('List name cannot be empty. Please try again\n');
        }
    }
    async mainMenu() {
        while (true) {
            this.terminal.print(this.armyList.getDisplayString());
            const options = [
                'Add Unit',
                'Add Weapon to Unit',
                'Remove Unit',
                'Remove Weapon from Unit',
                'Filter Units by Keyword',
                'Sort Units by Points',
                'Validate List',
                'Exit'
            ];
            const choice = await this.terminal.showMenu(options);
            switch (choice) {
                case 0:
                    await this.addUnit();
                    break;
                case 1:
                    await this.addWeaponToUnit();
                    break;
                case 2:
                    await this.removeUnit();
                    break;
                case 3:
                    await this.removeWeaponFromUnit();
                    break;
                case 4:
                    await this.filterUnitsByKeyword();
                    break;
                case 5:
                    await this.sortUnitsByPoints();
                    break;
                case 6:
                    await this.validateList();
                    break;
                case 7:
                    this.terminal.print('\nThank you for using the Army List Builder!');
                    this.terminal.close();
                    process.exit(0);
            }
        }
    }
    async addUnit() {
        this.terminal.printHeader('Add Unit');
        const availableUnits = spaceMarinesUnits.filter(unit => this.armyList.canAddUnit(unit));
        if (availableUnits.length === 0) {
            this.terminal.print('No units available to add. Keyword limits reached.\n');
            await this.terminal.ask('Press Enter to continue...');
            return;
        }
        const options = availableUnits.map(unit => `${unit.name} (${unit.basePoints} pts) - [${unit.keywords.join(', ')}]`);
        const choice = await this.terminal.showMenu(options);
        const selectedUnit = availableUnits[choice];
        const newUnit = new Unit(selectedUnit.name, selectedUnit.basePoints, [...selectedUnit.keywords], [...selectedUnit.availableWeapons]);
        if (this.armyList.addUnit(newUnit)) {
            this.terminal.print(`\n${newUnit.name} added to the list!\n`);
        }
        else {
            this.terminal.print('\nFailed to add unit. Keyword limit reached.\n');
        }
        await this.terminal.ask('Press Enter to continue...');
    }
    async addWeaponToUnit() {
        this.terminal.printHeader('Add Weapon to Unit');
        if (this.armyList.units.length === 0) {
            this.terminal.print('No units in the list. Add a unit first.\n');
            await this.terminal.ask('Press Enter to continue...');
            return;
        }
        const unitOptions = this.armyList.units.map((unit, index) => `${index + 1}. ${unit.getDisplayString()}`);
        this.terminal.print('Select a unit:');
        unitOptions.forEach(option => this.terminal.print(option));
        const unitChoice = await this.terminal.ask('\nEnter unit number: ');
        const unitIndex = parseInt(unitChoice) - 1;
        if (isNaN(unitIndex) || unitIndex < 0 || unitIndex >= this.armyList.units.length) {
            this.terminal.print('\nInvalid unit selection.\n');
            await this.terminal.ask('Press Enter to continue...');
            return;
        }
        const selectedUnit = this.armyList.units[unitIndex];
        const availableWeapons = selectedUnit.availableWeapons.filter(weapon => !selectedUnit.equippedWeapons.some(equipped => equipped.name === weapon.name));
        if (availableWeapons.length === 0) {
            this.terminal.print('\nNo available weapons for this unit.\n');
            await this.terminal.ask('Press Enter to continue...');
            return;
        }
        const weaponOptions = availableWeapons.map(weapon => `${weapon.name} (${weapon.points} pts)`);
        const weaponChoice = await this.terminal.showMenu(weaponOptions);
        const selectedWeapon = availableWeapons[weaponChoice];
        if (selectedUnit.equipWeapon(selectedWeapon)) {
            this.terminal.print(`\n${selectedWeapon.name} added to ${selectedUnit.name}!\n`);
        }
        else {
            this.terminal.print('\nFailed to add weapon. Incompatible with unit type.\n');
        }
        await this.terminal.ask('Press Enter to continue...');
    }
    async removeUnit() {
        this.terminal.printHeader('Remove Unit');
        if (this.armyList.units.length === 0) {
            this.terminal.print('No units in the list.\n');
            await this.terminal.ask('Press Enter to continue...');
            return;
        }
        const options = this.armyList.units.map((unit, index) => `${unit.getDisplayString()}`);
        const choice = await this.terminal.showMenu(options);
        const removedUnit = this.armyList.units.splice(choice, 1)[0];
        this.terminal.print(`\n${removedUnit.name} removed from the list!\n`);
        await this.terminal.ask('Press Enter to continue...');
    }
    async removeWeaponFromUnit() {
        this.terminal.printHeader('Remove Weapon from Unit');
        if (this.armyList.units.length === 0) {
            this.terminal.print('No units in the list.\n');
            await this.terminal.ask('Press Enter to continue...');
            return;
        }
        const unitOptions = this.armyList.units.map((unit, index) => `${index + 1}. ${unit.getDisplayString()}`);
        this.terminal.print('Select a unit:');
        unitOptions.forEach(option => this.terminal.print(option));
        const unitChoice = await this.terminal.ask('\nEnter unit number: ');
        const unitIndex = parseInt(unitChoice) - 1;
        if (isNaN(unitIndex) || unitIndex < 0 || unitIndex >= this.armyList.units.length) {
            this.terminal.print('\nInvalid unit selection.\n');
            await this.terminal.ask('Press Enter to continue...');
            return;
        }
        const selectedUnit = this.armyList.units[unitIndex];
        if (selectedUnit.equippedWeapons.length === 0) {
            this.terminal.print('\nNo weapons equipped on this unit.\n');
            await this.terminal.ask('Press Enter to continue...');
            return;
        }
        const weaponOptions = selectedUnit.equippedWeapons.map(weapon => `${weapon.name} (${weapon.points} pts)`);
        const weaponChoice = await this.terminal.showMenu(weaponOptions);
        const removedWeapon = selectedUnit.equippedWeapons.splice(weaponChoice, 1)[0];
        this.terminal.print(`\n${removedWeapon.name} removed from ${selectedUnit.name}!\n`);
        await this.terminal.ask('Press Enter to continue...');
    }
    async filterUnitsByKeyword() {
        this.terminal.printHeader('Filter Units by Keyword');
        const keywords = ['Infantry', 'Battleline', 'Mounted', 'Vehicle', 'Character'];
        this.terminal.print('Available keywords:');
        keywords.forEach((keyword, index) => {
            this.terminal.print(`  ${index + 1}. ${keyword}`);
        });
        const keywordChoice = await this.terminal.ask('\nEnter keyword number: ');
        const keywordIndex = parseInt(keywordChoice) - 1;
        if (isNaN(keywordIndex) || keywordIndex < 0 || keywordIndex >= keywords.length) {
            this.terminal.print('\nInvalid keyword selection.\n');
            await this.terminal.ask('Press Enter to continue...');
            return;
        }
        const selectedKeyword = keywords[keywordIndex];
        const filteredUnits = spaceMarinesUnits.filter(unit => unit.hasKeyword(selectedKeyword));
        this.terminal.print(`\n=== Units with "${selectedKeyword}" keyword ===\n`);
        if (filteredUnits.length === 0) {
            this.terminal.print('No units found with this keyword.\n');
        }
        else {
            filteredUnits.forEach((unit, index) => {
                this.terminal.print(`${index + 1}. ${unit.name} (${unit.basePoints} pts) - [${unit.keywords.join(', ')}]`);
            });
            this.terminal.print(`\nTotal: ${filteredUnits.length} units`);
        }
        await this.terminal.ask('\nPress Enter to continue...');
    }
    async sortUnitsByPoints() {
        this.terminal.printHeader('Sort Units by Points');
        const sortOptions = [
            'Lowest to Highest',
            'Highest to Lowest'
        ];
        const sortChoice = await this.terminal.showMenu(sortOptions);
        const sortedUnits = [...spaceMarinesUnits].sort((a, b) => {
            return sortChoice === 0
                ? a.basePoints - b.basePoints
                : b.basePoints - a.basePoints;
        });
        this.terminal.print(`\n=== Units sorted by points (${sortOptions[sortChoice]}) ===\n`);
        sortedUnits.forEach((unit, index) => {
            this.terminal.print(`${index + 1}. ${unit.name} (${unit.basePoints} pts) - [${unit.keywords.join(', ')}]`);
        });
        this.terminal.print(`\nTotal: ${sortedUnits.length} units`);
        await this.terminal.ask('\nPress Enter to continue...');
    }
    async validateList() {
        this.terminal.printHeader('List Validation');
        const totalPoints = this.armyList.getTotalPoints();
        const hasCharacter = this.armyList.hasCharacter();
        const withinPointLimit = this.armyList.isValidPointCost();
        const isValid = this.armyList.isValid();
        this.terminal.print(`Total Points: ${totalPoints}`);
        this.terminal.print(`Point Limit: 500 - 1,000`);
        this.terminal.print(`Within Point Limit: ${withinPointLimit ? 'YES' : 'NO'}`);
        this.terminal.print(`Has Character Unit: ${hasCharacter ? 'YES' : 'NO'}`);
        this.terminal.print(`\nList Valid: ${isValid ? 'YES ✓' : 'NO ✗'}`);
        if (!isValid) {
            this.terminal.print('\nIssues:');
            if (!hasCharacter) {
                this.terminal.print('  - List must contain at least 1 Character unit');
            }
            if (!withinPointLimit) {
                if (totalPoints < 500) {
                    this.terminal.print('  - List must be at least 500 points');
                }
                else {
                    this.terminal.print('  - List cannot exceed 1,000 points');
                }
            }
        }
        this.terminal.print('');
        await this.terminal.ask('Press Enter to continue...');
    }
}
const app = new ArmyListBuilder();
app.start().catch(error => {
    console.error('An error occurred:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map