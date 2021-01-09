import React, { useState, useEffect } from "react";
import { FormControl, Select, MenuItem, Card } from "@material-ui/core";
import InfoBox from "./components/InfoBox";
import Map from "./screens/Map";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // United State
            value: country.countryInfo.iso2, // UK, USA, FR
          }));
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });

    console.log(countryInfo);

    // https://disease.sh/v3/covid-19/all  worldwide
    // https://disease.sh/v3/covid-19/countries/[countrycode]   country
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <div className="app__header-logo">
            <img src="./img/Covid-logo.png" alt="logo" />
            <h1>COVID19-TRACKER</h1>
          </div>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide" className="selectedWorld">
                WorldWide
              </MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            title="CoronaVirus cases"
            total={2000}
            cases={countryInfo.todayCases}
          />
          <InfoBox
            title="Recovered"
            total={1500}
            cases={countryInfo.todayRecovered}
          />
          <InfoBox title="Deaths" total={600} cases={countryInfo.todayDeaths} />
        </div>

        <Map />
      </div>
      <Card className="app__right">
        <h3>live cases by country</h3>
        {/* Table */}
        <h3>worldwide new cases</h3>
        {/* Graph */}
      </Card>
    </div>
  );
}

export default App;
