import { useEffect, useState } from "react";
import "./App.css";
import WeatherBox from "./WeatherBox";
import WeatherButton from "./WeatherButton";
import { Button, CircularProgress } from "@mui/material";

// 앱이 실행되자마자 현재 위치의 날씨 정보가 보인다.
// 도시명, 섭씨, 화씨, 날씨 상태를 보여준다.
// 다섯개의 도시 버튼을 누르면(현재위치버튼 포함) 각 도시의 날씨정보를 보여준다.
// 로딩스피너 추가하기 : 로딩중에는 박스가 안보임.
function App() {
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
    // const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState("Current Location");
    const cities = ["paris", "new york", "hanoi", "Queenstown"];
    const [loading, setLoading] = useState(false);
    const [bg, setBg] = useState("default.jpg");

    // 내위치의 위도,경도 받아오기기
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            // console.log(lat, lon);
            getWeatherByLocation(lat, lon);
        });
    };

    // 내위치 정보를 받아 날씨 정보 호출
    const getWeatherByLocation = async (lat, lon) => {
        setLoading(true);
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            let response = await fetch(url);
            let data = await response.json();
            // console.log(data);
            setWeather(data);
        } catch (error) {
            console.error("Error fetching weather:", error);
        } finally {
            setLoading(false);
        }
    };

    const getWeatherByCity = async () => {
        setLoading(true);
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
            let response = await fetch(url);
            let data = await response.json();
            // console.log(data);
            setWeather(data);
        } catch (error) {
            console.error("Error fetching weather:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCurrentLocation = () => {
        setCity("Current Location");
        getLocation();
    };

    useEffect(() => {
        if (city == "Current Location") {
            // 초기에 city가 없을 때 실행
            getLocation();
        } else {
            // city가 있다면 city 기준의 api 실행
            getWeatherByCity();
        }
    }, [city]);

    return (
        <div
            className="wrap"
            style={{
                backgroundImage: `url(${bg})`,
            }}
        >
            <div className="weather-box">
                {loading ? (
                    <CircularProgress />
                ) : (
                    <WeatherBox weather={weather} setBg={setBg} />
                )}
            </div>
            <div className="button-wrap">
                <Button
                    variant="contained"
                    size="small"
                    onClick={handleCurrentLocation}
                    color={
                        city === "Current Location" ? "secondary" : "primary"
                    }
                >
                    Current Location
                </Button>
                <WeatherButton
                    cities={cities}
                    setCity={setCity}
                    selectedCity={city}
                />
            </div>
        </div>
    );
}

export default App;
