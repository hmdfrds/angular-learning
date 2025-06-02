# Quick Weather Dash

This project is a weather dashboard application built to practice fetching and displaying data from an external API, along with other fundamental Angular concepts.

## What the App Does

- **Fetch Default Weather**: Automatically fetches and displays the current weather for a pre-set default city (e.g., Petaling Jaya) when the application loads.
- **Search by City**: Allows users to type a city name into a search field and fetch weather data for that specific city.
- **Display Weather Details**: Shows key current weather information, including:
  - City Name
  - Current Temperature (in Celsius)
  - Weather Condition (e.g., "Sunny," "Cloudy," "Rain")
  - An Icon representing the current weather
  - "Feels Like" Temperature (in Celsius)
  - Humidity (%)
  - Wind Speed (e.g., km/h)
- **Loading State**: Displays a "Loading..." message or indicator while weather data is being fetched.
- **Error Handling**: Shows user-friendly error messages if the API call fails (e.g., city not found, network error).

---

## How It Looks and Behaves

![Simple Task Tracker Demo](./assets/demo1.gif)

---

## Core Angular Concepts Touched

This project provides a hands-on introduction to:

- **Angular CLI**: Used for generating the project structure, components, and services.
- **Components**: The main `AppComponent` (or a dedicated `WeatherDashboardComponent`) manages the view and user interactions.
- **Services (`WeatherService`)**: Created to encapsulate the logic for fetching data from the weather API and managing the API key.
- **`HttpClientModule` & `HttpClient`**: Leveraged for making HTTP GET requests to the external weather API.
- **Observables (RxJS)**: Essential for handling asynchronous API responses. This includes:
  - `subscribe()`: To receive data from the Observable.
  - `pipe()` and `map()`: To transform the API response (e.g., ensuring icon URLs are correct).
  - Error handling within the subscription.
- **TypeScript Interfaces**: Defined to model the structure of the API response data, ensuring type safety.
- **Templates (HTML)**: Used to structure the component's view, displaying weather data and search forms.
- **Data Binding**:
  - One-way binding (`{{ }}` and `[property]`): For displaying weather information.
  - Two-way binding (`[(ngModel)]`): For the city search input field.
  - Event binding (`(click)`, `(ngSubmit)`): For triggering searches.
- **Directives**:
  - `*ngIf`: For conditionally rendering elements like the loading indicator, error messages, and the weather data display area.
- **Forms (Template-driven)**: A simple form with `ngModel` was used to capture the city name for searching.

---

## API Used

This project utilizes the **[WeatherAPI.com](https://www.weatherapi.com/)** free tier to fetch current weather data. You will need to sign up for a free API key to run the project.

**Set up API Key:**

1. Sign up for a free API key at [WeatherAPI.com](https://www.weatherapi.com/).
2. Create a new file at `src/environment.ts` file.
3. and and export `WEATHER_API_KEY` constant and replace `'YOUR_API_KEY'` with your actual API key:
   ```ts
   export const WEATHER_API_KEY = "YOUR_API_KEY";
   ```

---

**Goal**: Focus on understanding how to interact with external APIs in an Angular application, manage asynchronous data using RxJS, and implement dynamic data display and basic user interaction based on that data.
