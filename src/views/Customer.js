import React, { useState, useEffect } from "react";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Dropdown, InputMask } from "primereact/dropdown";
import ProductBarChart from "components/Charts/ProductBarChart";
import CustomerServiceTable from "components/Table/CustomerServiceTable";
import { Country, State, City } from 'country-state-city';

const data = {
    data: [
      {
        description: 0,
        serial: "21105W0321",
        invoice: "52635",
        dop: "dop",
        warranty: 1,
        cost: 1,
        authorised: 0
      },
      {
        description: 2,
        serial: "ADF5DS",
        invoice: "65235",
        dop: "dop",
        warranty: 2,
        cost: 2,
        authorised: 1
      }
    ]
}

const countries = Country.getAllCountries()

function Customer() {

    const [country, setCountry] = useState(countries[1]);
    const [state, setState] = useState(State.getAllStates(country.isoCode)[1]);
    const [city, setCity] = useState(City.getCitiesOfState(country.isoCode, state.isoCode));
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="5">
            <Card>
              <Card.Header className="text-center">
                <Card.Title as="h4">Customer's Information</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table borderless>
                    <tbody>
                        <tr>
                            <td className="col-xs-3">ID</td>
                            <td><Form.Control /></td>
                        </tr>
                        <tr>
                            <td className="col-xs-3">Customer</td>
                            <td><Form.Control /></td>
                        </tr>
                        <tr>
                            <td className="col-xs-3">Institution</td>
                            <td><Form.Control /></td>
                        </tr>
                        <tr>
                            <td className="col-xs-3">Address</td>
                            <td><Form.Control /></td>
                        </tr>
                        <tr>
                            <td className="col-xs-3">Zip</td>
                            <td><Form.Control /></td>
                        </tr>
                        <tr>
                            <td className="col-xs-3">Country</td>
                            <td><Dropdown className="w-100" value={country} onChange={(e) => setCountry(e.value)} options={countries} optionLabel="name" placeholder="Select country" /></td>
                        </tr>
                        
                        <tr>
                            <td className="col-xs-3">State</td>
                            <td><Dropdown className="w-100" value={state} onChange={(e) => setState(e.value)} options={State.getStatesOfCountry(country.isoCode)} optionLabel="name" placeholder="Select state" /></td>
                        </tr>
                        <tr>
                            <td className="col-xs-3">City</td>
                            <td><Dropdown className="w-100" value={city} onChange={(e) => setCity(e.value)} options={City.getCitiesOfState(country.isoCode, state.isoCode)} optionLabel="name" placeholder="Select city" /></td>
                        </tr>
                        <tr>
                            <td className="col-xs-3">Tel</td>
                            <td><Form.Control /></td>
                        </tr>
                        <tr>
                            <td className="col-xs-3">Fax</td>
                            <td><Form.Control /></td>
                        </tr>
                        <tr>
                            <td className="col-xs-3">Mobile</td>
                            <td><Form.Control /></td>
                        </tr>
                        <tr>
                            <td className="col-xs-3">Email</td>
                            <td><Form.Control type='email'/></td>
                        </tr>
                        <tr>
                            <td className="col-xs-3">Website</td>
                            <td><Form.Control /></td>
                        </tr>
                    </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md="7">
            <Card>
              <Card.Header className="text-center pt-5">
                <Card.Title className="border-bottom pb-3"as="h4">Service Done</Card.Title>
              </Card.Header>
              <Card.Body>
                <CustomerServiceTable data={data}/>
              </Card.Body>
              <Card.Header className="text-center pt-5">
                <Card.Title className="border-bottom pb-3"as="h4">Purchase Done</Card.Title>
              </Card.Header>
              <Card.Body>
                <CustomerServiceTable data={data}/>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
      </Container>
    </>
  );
}

export default Customer;
