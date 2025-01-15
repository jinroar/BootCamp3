import promptSync from 'prompt-sync';

export interface Root {
    page: number
    results: Result[]
    total_results: number
    total_pages: number
}

export interface Result {
    id: number;
    name: string;
    vision: string;
    rarity: string;
    result: ResultChar
  }

export interface Root {
    result: ResultChar
  }

export interface ResultChar {
    id: number
    name: string
    title: string[]
    rarity: string
    weapon: string
    vision: string
    model_type: string
    birthday: string
    constellation: string
    region: string[]
    affiliation: string[]
    special_dish: string
    how_to_obtain: string[]
    release_day: string
    release_version: string
    category: string
    voice_actors: VoiceActor[]
    wiki_url: string
}

export interface VoiceActor {
    English: string
    Chinese: string
    Japanese: string
    Korean: string
}


const prompt = promptSync();

const getChars = async (page) => {
    try {
        const response = await fetch(`https://gsi.fly.dev/characters?page=${page}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

     
        const result: Root = await response.json();

        const mappedCharacters = result.results.map(character => (
            {
                ID: character.id,
                Name: character.name,
                Vision: character.vision,
                Rarity: character.rarity
            }));

        console.log(mappedCharacters);
    } catch (error) {
        console.error('Error fetching characters:', error);
    }
}

const findChar = async (id) => {

    const gi = await fetch(`https://gsi.fly.dev/characters/${id}`)
    const giData: Root = await gi.json();

    console.log(` ID: ${giData.result.id}
                  Name:  ${giData.result.name}
                  Weapon: ${giData.result.weapon}
                  Vision: ${giData.result.vision}
                  Rarity: ${giData.result.rarity}
                  Birthday: ${giData.result.birthday}
                  Region: ${giData.result.region}
                  Special Dish: ${giData.result.special_dish}
        `)
}

const isNumeric = (string) => string == Number.parseInt(string)

const disp = async () => {

    let tot_page = 6;
    let page = 1;

    while (true) {
        await getChars(page);
        let input = prompt('Enter [p] for previous and [n] next: ');

        if (input === "") {
            break;
        } else if (input === 'n') {
            if (page < tot_page) {
                page += 1;
                await getChars(page);
            } else {
                console.log("You're at the end.");
            }
        } else if (input === 'p') {
            if (page > 1) {
                page = page - 1;
                await getChars(page);
            } else {
                console.log("This is the first page ");
            }
        } else {
            if (!isNumeric(input)) {
                console.log("Invalid command.");
            } else {
                await findChar(input);
            }
        }
    }
}

disp();