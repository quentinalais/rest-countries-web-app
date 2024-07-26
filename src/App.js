import { useState, useEffect } from "react";
import "./App.css";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import Table from "./Components/Table";

function App() {
  const [countryClicked, setcountryClicked] = useState('')
  const [data, setdata] = useState(null)

  useEffect(() => {
    const  fetchData = async ()=>{
      const response = await fetch("https://restcountries.com/v3.1/all")
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      let postsData = await response.json();  

      let result = postsData.map(country=>({
        Country : country.name.common,
        Flag : country.flag,
        Population : country.population,
        Currencies : country.currencies ? Object.values(country.currencies).map(c => c.name +" ("+c.symbol+")").join(', ') : 'N/A',
        Languages : country.languages ? Object.values(country.languages).join(', ') : 'N/A',
        Action:'bonjour'
      }))
      setdata(result)
    }

    fetchData()
  }, [])



  const [colDefs, setColDefs] = useState([
    { field: "Country",filter: true  },
    { field: "Flag",  },
    { field: "Population", },
    { field: "Language",filter: true },
    { field: "Languages",filter: true },
    { field: "Currencies",filter: true },
  ]);

  const onRowClicked = (event) => {
    setcountryClicked(event.data.Country)
  };

  return (
    <div className="App">
      <div> Selected country: {countryClicked}</div>
      <Table rowData={data} colDefs={colDefs} onRowClicked={onRowClicked}/>
    </div>
  );
}

export default App;
