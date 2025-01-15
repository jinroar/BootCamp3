import promptSync from "prompt-sync";

const prompt = promptSync();
const BASE_URL = "https://gsi.fly.dev/characters";
let currentPage = 1;

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

interface APIResponse {
  results: ResultChar[];
  totalPages?: number;
}

export interface VoiceActor {
    English: string
    Chinese: string
    Japanese: string
    Korean: string
  }

const fetchCharacters = async (page: number) => {
  try {
    const res = await fetch(`${BASE_URL}?page=${page}`);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

const displayCharacters = (characters: ResultChar[]) =>
  characters.forEach(({ id, name }) => console.log(`ID: ${id}, Name: ${name}`));

const fetchCharacterById = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const { result: character } = await res.json();
    if (!character) return console.log("Character not found.");
    console.log(
      `\nID: ${character.id}\nName: ${character.name}\nDescription: ${
        character.description || "Not provided"
      }`
    );
  } catch (err) {
    console.error(err.message);
  }
};

const main = async () => {
  let data = await fetchCharacters(currentPage);

  while (data?.results.length) {
    displayCharacters(data.results);

    const totalPages = data.totalPages ?? 6;
    console.log(
      `\nCommands: [n] Next, [p] Previous, [q] Quit, [id] Fetch by ID (number)\nPage: ${currentPage} / ${totalPages}`
    );
    const command = prompt("Enter command: ").toLowerCase().trim();

    switch (command) {
      case "n":
        if (currentPage < totalPages) {
          currentPage++;
          data = await fetchCharacters(currentPage);
        } else console.log("You are already on the last page.");
        break;
      case "p":
        if (currentPage > 1) {
          currentPage--;
          data = await fetchCharacters(currentPage);
        } else console.log("You are on the first page.");
        break;
      case "q":
        return console.log("Exiting...");
      default:
        !isNaN(+command)
          ? await fetchCharacterById(command)
          : console.log("Invalid command.");
    }
  }
};

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);
process.on("SIGINT", () => {
  console.log("\nExiting gracefully...");
  process.exit();
});

main();
