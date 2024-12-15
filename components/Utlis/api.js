// const API_KEY = '8d7ca18b34c146239a490042240312'; // Replace with a real API key
// const BASE_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=india&aqi=no`;

//  const BaseUrl=params =>`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=$&aqi=no`

// export const getWeatherByCoordinates = async (latitude, longitude) => {
//     try {
//         const response = await fetch(
//             `${BASE_URL}?key=${API_KEY}&lat=${latitude}&lon=${longitude}`
//         );

//         if (!response.ok) {
//             throw new Error('Failed to fetch weather data.');
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching weather data:', error);
//         return null;
//     }
// };
