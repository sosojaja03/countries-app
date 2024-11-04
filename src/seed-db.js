import axios from 'axios';
import fs from 'fs/promises';

// Function to convert an image URL to Base64
async function convertImageToBase64(url) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const buffer = Buffer.from(response.data, 'binary');
  return `data:image/png;base64,${buffer.toString('base64')}`;
}

async function seedDatabase() {
  try {
    // Fetch the list of countries
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const countries = await Promise.all(
      response.data.map(async (country) => {
        const imageBase64 = await convertImageToBase64(country.flags.png);
        return {
          id: country.cca3,
          name: {
            en: country.name.common,
          },
          capital: country.capital ? country.capital[0] : 'N/A',
          population: country.population,
          likes: 0,
          image: imageBase64,
        };
      })
    );

    // Write the data to database.json
    await fs.writeFile('database.json', JSON.stringify({ countries }, null, 2));
    console.log('Database seeded successfully with Base64 images.');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the seeding function
seedDatabase();
