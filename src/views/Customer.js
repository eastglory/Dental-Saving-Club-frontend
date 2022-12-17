import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
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
import CustomerPurchaseTable from "components/Table/CustomerPurchaseTable";

const serviceData = {
    data: [
      {
        id: 1,
        receivedOn: "3-25-2022",
        handledOn: "4-10-2022",
        reportedOn: "6-4-2022",
        invoice: "52635",
        serial: "21105W0321",
        Product: "PIN5"
      },
      {
        id: 2,
        receivedOn: "3-4-2022",
        handledOn: "4-25-2022",
        reportedOn: "6-1-2022",
        invoice: "42338",
        serial: "321DS2",
        Product: "Light Gen"
      },
    ]
}
const purchaseData = {
    data: [
      {
        id: 13221,
        purchasedOn: "3-25-2022",
        category: "Blue Ring RA",
        invoice: "52635",
        serial: "21105W0321",
        note1: "",
        note2: ""
      },
      {
        id: 63215,
        purchasedOn: "3-4-2022",
        category: "Blue Label NSK",
        invoice: "42338",
        serial: "321DS2",
        note1: "",
        note2: ""
      },
    ]
}

const countries = Country.getAllCountries()

function Customer() {

    const [country, setCountry] = useState(countries[1]);
    const [state, setState] = useState(State.getAllStates(country.isoCode)[1]);
    const [city, setCity] = useState(City.getCitiesOfState(country.isoCode, state.isoCode));

    const history = useHistory();

    const handleClick = () => {
      history.push('/admin/repairJournal');
    }
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="4">
            <Card>
              <Card.Header className="text-center">
                <Card.Title as="h4">Customer's Information</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table borderless>
                    <tbody>
                        <tr>
                            <td className="col-xs-3 pb-0">ID</td>
                            <td className="pb-0"><Form.Control /></td>
                        </tr>
                        <tr>
                            <td className="col-xs-3 pb-0">Customer</td>
                            <td className="pb-0"><Form.Control /></td>
                        </tr>
                        <tr>
                            <td className="col-xs-3 pb-0">Institution</td>
                            <td className="pb-0"><Form.Control /></td>
                        </tr>
                        <tr>
                            <td className="col-xs-3 pb-0">Address</td>
                            <td className="pb-0"><Form.Control /></td>
                        </tr>
                        <tr>
                            <td className="col-xs-3 pb-0">Zip</td>
                            <td className="pb-0"><Form.Control /></td>
                        </tr>
                        <tr>
                            <td className="col-xs-3 pb-0">Country</td>
                            <td className="pb-0"><Dropdown className="w-100" value={country} onChange={(e) => setCountry(e.value)} options={countries} optionLabel="name" placeholder="Select country" /></td>
                        </tr>
                        
                        <tr>
                            <td className="col-xs-3 pb-0">State</td>
                            <td className="pb-0"><Dropdown className="w-100" value={state} onChange={(e) => setState(e.value)} options={State.getStatesOfCountry(country.isoCode)} optionLabel="name" placeholder="Select state" /></td>
                        </tr>
                        <tr>
                            <td className="col-xs-3 pb-0">City</td>
                            <td className="pb-0"><Dropdown className="w-100" value={city} onChange={(e) => setCity(e.value)} options={City.getCitiesOfState(country.isoCode, state.isoCode)} optionLabel="name" placeholder="Select city" /></td>
                        </tr>
                        <tr>
                            <td className="col-xs-3 pb-0">Tel</td>
                            <td className="pb-0"><Form.Control /></td>
                        </tr>
                        <tr>
                            <td className="col-xs-3 pb-0">Fax</td>
                            <td className="pb-0"><Form.Control /></td>
                        </tr>
                        <tr>
                            <td className="col-xs-3 pb-0">Mobile</td>
                            <td className="pb-0"><Form.Control /></td>
                        </tr>
                        <tr>
                            <td className="col-xs-3 pb-0">Email</td>
                            <td className="pb-0"><Form.Control type='email'/></td>
                        </tr>
                        <tr>
                            <td className="col-xs-3 pb-0">Website</td>
                            <td className="pb-0"><Form.Control /></td>
                        </tr>
                        <tr>
                            <td className="pb-0"></td>
                            <td className="pb-0"><Button onClick={handleClick} className="float-right">ADD</Button></td>
                        </tr>
                    </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md="8">
            <Card>
              <Card.Header className="text-center pt-5">
                <Card.Title className="border-bottom pb-3"as="h4">Service Done</Card.Title>
              </Card.Header>
              <Card.Body>
                <CustomerServiceTable data={serviceData}/>
              </Card.Body>
              <Card.Header className="text-center pt-5">
                <Card.Title className="border-bottom pb-3"as="h4">Purchase Done</Card.Title>
              </Card.Header>
              <Card.Body>
                <CustomerPurchaseTable data={purchaseData}/>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
      </Container>
    </>
  );
}

export default Customer;
