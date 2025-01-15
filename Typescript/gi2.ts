
import promptSync from 'prompt-sync'; // Import prompt-sync

let currentPage = 1; // Initial page number
let totalPages = 6; // Example total number of pages (change according to your API)

const prompt = promptSync({ sigint: true }); // sigint: true allows you to gracefully handle CTRL+C

// Function to fetch data from an API using the native fetch
const fetchData = async (page: number) => {
  try {
    // Example API URL (replace with your actual API)
    const apiUrl = `https://gsi.fly.dev/characters?page=${page}`;

    // Fetch data from the API using native fetch
    const response = await fetch(apiUrl);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Clear the console
    console.clear();

    // Log the fetched data
    console.log(`Page ${page}`);
    data.forEach((item: any, index: number) => {
      console.log(`${index + 1}. ${item.title}`);
    });

    console.log(`\nPress "n" for next page, "p" for previous page, or any other key to quit...`);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Function to handle user input (keypress to go to the next or previous page)
const listenForKeyPress = () => {
  while (true) {
    // Prompt the user for input and wait for a key press
    const input = prompt('Press "n" for next page, "p" for previous page, or any other key to quit... ').toLowerCase();

    if (input === 'n') {
      // Go to the next page
      currentPage++;
      fetchData(currentPage);
    } else if (input === 'p' && currentPage > 1) {
      // Go to the previous page (prevent going below page 1)
      currentPage--;
      fetchData(currentPage);
    } else {
      // Quit the program if any other key is pressed
      console.log('Exiting...');
      break;
    }
  }
};

// Initial fetch and start listening for key presses
fetchData(currentPage);
listenForKeyPress();
