import { Button } from "@mui/material";

const WeatherButton = ({ cities, setCity, selectedCity }) => {
    return (
        <>
            {cities.map((item, index) => (
                <Button
                    key={index}
                    variant="contained"
                    size="small"
                    onClick={() => setCity(item)}
                    color={selectedCity === item ? "secondary" : "primary"}
                >
                    {item}
                </Button>
            ))}
        </>
    );
};
export default WeatherButton;
