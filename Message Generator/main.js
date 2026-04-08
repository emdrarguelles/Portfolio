const creatures = ['Dragon', 'Phoenix', 'Kraken', 'Chimera', 'Basilisk', 'Griffon', 'Leviathan', 'Manticore', 'Cerberus', 'Hydra']

const colors = ['Crimson', 'Obsidian', 'Emerald', 'Azure', 'Golden', 'Ivory', 'Violet']

const elements = ['Fire', 'Water', 'Wind', 'Earth', 'Light', 'Shadow']

const rarity = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary']

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const randomize = (max) => Math.floor(Math.random() * max);

const getPowerLevel = (rarity) => {
    switch (rarity) {
        case 'Common': return randomize(40) + 10;
        case 'Uncommon': return randomize(40) + 25;
        case 'Rare': return randomize(50) + 50;
        case 'Epic': return randomize(60) + 75;
        case 'Legendary': return randomize(100) + 100;
        default: return randomize(20) + 5;
    }
}

const summonCreature = async () => {
    const randCreature = creatures[randomize(creatures.length)]
    const randColor = colors[randomize(colors.length)]
    const randElement = elements[randomize(elements.length)]
    const randRarity = rarity[randomize(rarity.length)]
    console.log('Welcome summoner! Let the summoning begin...');
    await delay(1000);
    console.log('Summoning...');
    await delay(2000);
    console.log('⚡ The ground shakes...');
    await delay(2000);
    console.log('✨ A blinding light erupts...');
    await delay(2000);
    console.log('As the light fades...')
    await delay(3000);
    console.log(`${randColor} ${randCreature} with pure ${randElement} energy emerges.`)
    await delay(1000);
    console.log(`Power Level: ${getPowerLevel(randRarity)} | Rarity: ${randRarity}`)
    await delay(2000);
    switch (randRarity) {
        case 'Common':
            console.log('Better luck next time!');
            break;
        case 'Uncommon':
            console.log('Not the worst, but not the best!');
            break;
        case 'Rare':
            console.log("Congratulations! That's a rare summon!");
            break;
        case 'Epic':
            console.log('What an epic summon! Congratulations!');
            break;
        case 'Legendary':
            console.log('You have summoned a legendary being! Rejoice!');
            break;
    }
    
}
await summonCreature()