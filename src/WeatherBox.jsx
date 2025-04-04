import { React } from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WaterIcon from "@mui/icons-material/Water";

const WeatherBox = ({ weather }) => {
    const weatherIcon = () => {
        switch (weather?.weather[0].main) {
            case "Clear":
                return <WbSunnyIcon />;
            case "Clouds":
                return <CloudIcon />;
            case "Rain":
                return <WaterIcon />;
            case "Snow":
                return <AcUnitIcon />;
            default:
                return null;
        }
    };
    // console.log(React.createElement(weatherIcon));
    return (
        <>
            {weather ? (
                <>
                    <h1>{weather?.name}</h1>
                    <ul className="weather-list">
                        <li>
                            <strong>{weather.weather[0].main}</strong>{" "}
                            {weatherIcon()}
                        </li>
                        <li>
                            Temperature :{" "}
                            <strong>
                                {weather.main.temp}°C /{" "}
                                {(Number(weather.main.temp) * 1.8 + 32).toFixed(
                                    2
                                )}
                                °F
                            </strong>
                        </li>
                        <li>
                            humidity : <strong>{weather.main.humidity}</strong>
                        </li>
                        <li>
                            <strong>{weather.weather[0].description}</strong>
                        </li>
                    </ul>
                </>
            ) : (
                "No data"
            )}
        </>
    );
};
export default WeatherBox;
