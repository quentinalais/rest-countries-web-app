import { useState, useEffect } from "react";
import "./App.css";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import Table from "./Components/Table";
import {Button, Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [countryClicked, setcountryClicked] = useState('')
  const [data, setdata] = useState(null)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        Region: country.region,
        Subregion: country.subregion,
        Maps:country.maps.googleMaps,
        Action:'h'
      }))
      setdata(result)
    }

    fetchData()
  }, [])

  console.log(data)
  

  const [colDefs, setColDefs] = useState([
    { field: "Country",filter: true  },
    { field: "Flag",  },
    { field: "Population", },
    { field: "Language",filter: true },
    { field: "Languages",filter: true },
    { field: "Currencies",filter: true },
    { field: "Region" },
    { field: "Subregion"},


  ]);

  const onRowClicked = (event) => {
    //let selectedCountry = 
    setcountryClicked(event.data.Country)
    handleShow()
  };

  return (
    <div className="App">
      <div> Selected country: {countryClicked}</div>
      <ModalComponent 
        country={countryClicked} 
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
      />
      <Table rowData={data} colDefs={colDefs} onRowClicked={onRowClicked}/>
    </div>
  );
}

export default App;



function ModalComponent(props) {
    return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.country}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


