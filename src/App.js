import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./components/InfoBox";
import Map from "./screens/Map";
import TableInfo from "./components/TableInfo";
import { sortData } from "./util";
import LineGraph from "./components/LineGraph";
import "leaflet/dist/leaflet.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";

import EmailIcon from "@material-ui/icons/Email";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(2);

  const [mapCountries, setMapCountries] = useState([]);

  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // United State
            value: country.countryInfo.iso2, // UK, USA, FR
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    // setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

        // setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapCenter(
          countryCode === "worldwide"
            ? { lat: 34.80746, lng: -40.4796 }
            : [data.countryInfo.lat, data.countryInfo.long]
        );
        setMapZoom(countryCode === "worldwide" ? 2 : 4);
      });

    // https://disease.sh/v3/covid-19/all  worldwide
    // https://disease.sh/v3/covid-19/countries/[countrycode]   country
  };
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <div className="app__header-logo">
            {/* <img src="./img/Covid-logo.png" alt="logo" /> */}
            <h1>Justin's COVID19-TRACKER</h1>
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
            onClick={(e) => setCasesType("cases")}
            title="CoronaVirus cases"
            total={countryInfo.cases}
            cases={countryInfo.todayCases}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
          />
          {/* <InfoBox src={countryInfo.countryInfo.flag} /> */}
        </div>

        <Map
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
          casesType={casesType}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>live cases by country</h3>
          <TableInfo countries={tableData} />
        </CardContent>
        <CardContent>
          <h3>worldwide new {casesType}</h3>
          <LineGraph casesType={casesType} className="app__graph" />
        </CardContent>
      </Card>

      <div className="footer">
        <div className="footer__left">
          <p>&copy;Justin</p>
        </div>
        <div className="footer__right">
          <a
            href="https://www.facebook.com/justin.cho.98622"
            target="_blank"
            rel="noreferrer"
          >
            <FacebookIcon />
          </a>
          <a
            href="https://www.instagram.com/jcmaker0627/"
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon />
          </a>
          <a href="https://github.com/jcmaker" target="_blank" rel="noreferrer">
            <GitHubIcon />
          </a>
          <a
            href="https://wakatime.com/@jcmaker0627"
            target="_blank"
            rel="noreferrer"
          >
            <AccessAlarmsIcon />
          </a>
          <span
            onClick={() => {
              const textArea = document.createElement("textarea");
              textArea.value = "jcmaker0627@gmail.com";
              document.body.appendChild(textArea);
              textArea.select();
              document.execCommand("Copy");
              textArea.remove();
              alert("My Email is Copied!! Crtl + V");
            }}
          >
            <EmailIcon />
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
