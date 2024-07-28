import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Alert, Button, Spinner } from "react-bootstrap";
import "./App.css";
import Header from "./Components/Header";
import ModalComponent from "./Components/ModalComponent";
import Table from "./Components/Table";

const API_URL = "https://restcountries.com/v3.1/all";

function App() {
  const favs = localStorage.getItem("favorite_countries")
    ? JSON.parse(localStorage.getItem("favorite_countries"))
    : []; // value that will initialise favorite 

  const [countryClicked, setcountryClicked] = useState(null);
  const [data, setdata] = useState(null); // Data holding countries result from API
  const [show, setShow] = useState(false); // Boolean value to show the modal

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [favorite, setfavorite] = useState(favs);

  // Modal Handlers
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const postsData = await response.json();
        const result = postsData.map((country) => ({
          Country: country.name.common,
          Flag: country.flag,
          Population: country.population,
          Currencies: country.currencies
            ? Object.values(country.currencies)
                .map((c) => c.name + " (" + c.symbol + ")")
                .join(", ")
            : "N/A",
          Languages: country.languages
            ? Object.values(country.languages).join(", ")
            : "N/A",
          Region: country.region,
          Subregion: country.subregion,
          Maps: country.maps.googleMaps,
          Official: country.name.official,
          Action: "h",
          Favorites: favs.includes(country.name.common) ? "favorite" : "",
        }));
        setdata(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching country data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [favorite]);

  const handleFavorite = (props, data) => {
    if (!localStorage.getItem("favorite_countries")) {
      localStorage.setItem(
        "favorite_countries",
        JSON.stringify([data.Country])
      );
    } else {
      var previous = localStorage.getItem("favorite_countries");
      previous = JSON.parse(previous);
      if (!previous.includes(data.Country)) {
        localStorage.setItem(
          "favorite_countries",
          JSON.stringify([...previous, data.Country])
        );
      }

      if (!favorite.includes(data.Country)) {
        setfavorite((prev) => [...prev, data.Country]);
      }

      if (favorite.includes(data.Country)) {
        setfavorite(favorite.filter((row) => row !== data.Country));
      }

      if (previous.includes(data.Country)) {
        localStorage.setItem(
          "favorite_countries",
          JSON.stringify(previous.filter((row) => row !== data.Country))
        );
      }
    }
  };

  const onRowClicked = (event) => {
    if (event.event.target.className !== "btn btn-outline-secondary btn-sm") {
      let selectedCountry = data.filter(
        (country) => country.Country === event.data.Country
      );
      setcountryClicked(selectedCountry[0]);
      handleShow();
    }
  };

  const [colDefs] = useState([
    { field: "Country", filter: true },
    { field: "Flag" },
    { field: "Population" },
    { field: "Languages", filter: true },
    { field: "Currencies", filter: true },
    {
      field: "Action",
      cellRenderer: (props) => {
        let data = props.data;
        return (
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={(props) => handleFavorite(props, data)}
          >
            Favorite
          </Button>
        );
      },
    },
    {
      field: "Favorites",
      filter: true,
      valueFormatter: (p) => (p.value === "favorite" ? "⭐" : ""),
    },
  ]);

  return (
    <div className="main">
      <Header />
      <div className="App">
        <ModalComponent
          country={countryClicked}
          show={show}
          handleShow={handleShow}
          handleClose={handleClose}
        />
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Table rowData={data} colDefs={colDefs} onRowClicked={onRowClicked} />
        )}
      </div>
    </div>
  );
}

export default App;
