import { React, useEffect } from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WaterIcon from "@mui/icons-material/Water";
import UmbrellaIcon from "@mui/icons-material/Umbrella";

const weatherMeta = {
    Clear: {
        icon: <WbSunnyIcon />,
        background: "sun.jpg",
    },
    Clouds: {
        icon: <CloudIcon />,
        background: "cloud.jpg",
    },
    Rain: {
        icon: <UmbrellaIcon />,
        background: "rain.jpg",
    },
    Mist: {
        icon: <WaterIcon />,
        background: "mist.jpg",
    },
    Snow: {
        icon: <AcUnitIcon />,
        background: "snow.jpg",
    },
    Default: {
        icon: null,
        background: "default.jpg",
    },
};

const WeatherBox = ({ weather, setBg }) => {
    const main = weather?.weather[0].main;
    const icon = weatherMeta[main]?.icon;
    useEffect(() => {
        if (main) {
            setBg(weatherMeta[main]?.background); // 날씨 바뀌면 배경 업데이트
        }
    }, [weather, setBg]);

    if (!weather) return <>No data</>;

    return (
        <>
            <h1>{weather.name}</h1>
            <ul className="weather-list">
                <li>
                    <strong>{main}</strong> {icon}
                </li>
                <li>
                    Temperature :{" "}
                    <strong>
                        {weather.main.temp}°C /{" "}
                        {(Number(weather.main.temp) * 1.8 + 32).toFixed(2)}°F
                    </strong>
                </li>
                <li>
                    Humidity : <strong>{weather.main.humidity}</strong>
                </li>
                <li>
                    <strong>{weather.weather[0].description}</strong>
                </li>
            </ul>
        </>
    );
};
export default WeatherBox;
