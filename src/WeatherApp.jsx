//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
import './WeatherApp.css';
import { useState } from 'react';

export const WeatherApp = () => {
	const urlBase = 'https://api.openweathermap.org/data/2.5/weather';
	const API_KEY = 'APIKEY';
	const lang = 'es';
	const diffKelvin = 273.15;
	const [city, setCity] = useState('');
	const [weatherData, setWeatherData] = useState(null);
	const icoUrlFirst = 'https://openweathermap.org/img/wn/';
	const icoUrlLast = '@2x.png';

	const fetchWeatherData = async () => {
		try {
			const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=${lang}`);
			const data = await response.json();
			setWeatherData(data);
			console.log(data);
		} catch (error) {
			console.error('Ha ocurrido un error', error);
		}
	};

	const handleSubmit = event => {
		event.preventDefault();
		console.log(city);
		fetchWeatherData();
	};

	const handleCityChange = event => {
		setCity(event.target.value);
	};

	return (
		<div className="container">
			<hr />
			<h1>Aplicacion de clima</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Ingresa una ciudad"
					value={city}
					onChange={handleCityChange}
				/>
				<button type="submit">Buscar</button>
			</form>

			{weatherData && (
				<div>
					<h2>
						{weatherData.name}, {weatherData.sys.country}
					</h2>
					<p>La temperatura es: {Math.floor(weatherData.main.temp - diffKelvin)}C</p>
					<p>Condicion actual: {weatherData.weather[0].description}</p>
					<img
						src={`${icoUrlFirst}${weatherData.weather[0].icon}${icoUrlLast}`}
						alt="representacion visual de la condicion actual"
					/>
				</div>
			)}

			<hr />
		</div>
	);
};
