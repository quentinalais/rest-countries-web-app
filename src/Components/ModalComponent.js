import React from 'react'
import { Button, Modal, Alert, Col, Row } from "react-bootstrap";

function ModalComponent(props) {
    return (
      <>
        {props.country && (
          <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {props.country.Flag} {props.country.Country}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              
                <Row>
                  <Col> <p><b >Official name</b>: {props.country.Official}</p></Col>
                  <Col><p><b>Population</b>: {props.country.Population}</p></Col>
                </Row>
                
              <div>
                {" "}
                
              </div>
              <div>
                {" "}
                <b>Languages</b>: {props.country.Languages}
              </div>
              <div>
                {" "}
                <b>Currencies</b>: {props.country.Currencies}
              </div>
              <hr/>
              <Row>
                <Col>
                <p><b>Region</b>: {props.country.Region}</p>
                <p><b>Subregion</b>: {props.country.Subregion}</p>
                </Col>
                <Col>
                <Alert.Link href={props.country.Maps} target="_blank">
              🌎 Google Maps
              </Alert.Link>
                </Col>
                
              </Row>
              <div>
                {" "}
               
              </div>
  
             
            </Modal.Body>
            <Modal.Footer>
              <Button style={{backgroundColor:"#006989"}} onClick={props.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </>
    );
}
  

export default ModalComponent