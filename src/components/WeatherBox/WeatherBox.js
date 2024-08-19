import React, { useCallback, useState } from 'react';
import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {
  const [weatherData, setWeatherData] = useState({});
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback((cityName) => {
    setError(false);
    setPending(true);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c6987d79e2dd1eb2b4e3389157436e27&units=metric`)
      .then(res => {
        if (res.status === 200) {
          return res.json()
            .then(data => {
              setPending(false);
              setWeatherData({
                city: data.name,
                temp: data.main.temp,
                icon: data.weather[0].icon,
                description: data.weather[0].main
              })

            })
        } else {
          setError(true);
          //alert('ERROR!');
        }
      })
  }, []);

return (
  <section>
    <PickCity action={handleCityChange} />
    {(weatherData && !error) && <WeatherSummary {...weatherData} />}
    {(pending && !error) && <Loader />}
    { error && <ErrorBox />}
  </section>
)
};

export default WeatherBox;