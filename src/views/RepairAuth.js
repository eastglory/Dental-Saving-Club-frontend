import React, {useState} from "react";

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
  Image,
  InputGroup,
  Form
} from "react-bootstrap";
import { Calendar } from 'primereact/calendar'
import { Dropdown } from "primereact/dropdown";
import { InputTextarea} from"primereact/inputtextarea"
import RepairAuthTable from "components/Table/RepairAuthTable";

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
    },
    {
      description: 3,
      serial: "ADF6DSF",
      invoice: "13531",
      dop: "dop",
      warranty: 2,
      cost: 1,
      authorised: 2
    },
  ]
}

const customerData = {
  "Customer Name": "123 - Taunton Village Dental",
  "Send to(Location)": "210 Taunton Rd E",
  "Province/City": "Oshawa, ON",
  "Postal code": "L1K 1A8",
  "Telephone": "(905) 432-5000",
  "Email": "example@ex.com"
}
const statuses = [
  { label: "Completed", value: "COMPLETED", badge: "success"},
  { label: "Under Review", value: "UNDERREVIEW", badge: "warning"},
  { label: "Pending", value: "PENDING", badge: "info"},
  { label: "Quoted", value: "QUOTED", badge: "danger"},
  { label: "In Progress", value: "INPROGRESS", badge: "primary"}
]

const reporters = [
  { label: "Customer", value: "CUSTOMER"},
  { label: "Sara", value: "SARA"},
  { label: "Chadi", value: "CHADI" },
  { label: "Nicole", value: "NICOLE"},
]

const instructions = [
  {label: "none", value: "NONE"},
  {label: "Return as is", value: "RETURNASIS"},
  {label: "Will buy new", value: "WILLBUYNEW"},
  {label: "Under review", value: "UNDERREVIEW"}
]


function RepairAuth() {

  const [selectValue1, setSelectValue1] = useState(null);
  const [selectValue2, setSelectValue2] = useState(null);
  const [status, setStatus] = useState(null);
  const [reporter, setReporter] = useState(null);
  const [instruction, setInstruction] = useState(null);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title className="text-center d-" as="h4">Commnication Log & Repair Authorization</Card.Title>
                <InputGroup size="sm" className="mb-3 mx-auto pt-2 w-25">
                  <InputGroup.Text id="basic-addon1" className="p-0 bg-white border-0">Recieved on: </InputGroup.Text>
                  <Calendar  inputStyle={{padding: 0, "max-width":"8rem" }}value={new Date()}></Calendar>
                  <Form.Control />
                </InputGroup>
              </Card.Header>
                <hr></hr>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className='w-50'>
                  <tbody>
                    {Object.keys(customerData).map(item => {
                      return (
                        <tr key={item}>
                          <td  className="font-weight-bold border-0 ">{item}</td>
                          <td  className="border-0">{customerData[item]}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
                <div className="pt-5 d-flex flex-row align-items-center">
                  <label className="font-weight-bold text-dark col-sm-2 ">Quote On: </label>
                  <Calendar value={new Date()}></Calendar>
                  <label className="font-weight-bold text-dark ml-5 mr-3">via:</label>
                  <Dropdown value={selectValue1} onChange={(e)=>setSelectValue1(e.value)} options={[{name: 'email'}, {name: 'phone'}, {name: 'other'}]} optionLabel="name" placeholder="Select" />
                </div>
                <div className="pt-2 d-flex flex-row align-items-center">
                  <label className="font-weight-bold text-dark col-sm-2 ">Follow Up On: </label>
                  <Calendar value={new Date()}></Calendar>
                  <label className="font-weight-bold text-dark ml-5 mr-3">via:</label>
                  <Dropdown value={selectValue2} onChange={(e)=>setSelectValue2(e.value)} options={[{name: 'email'}, {name: 'phone'}, {name: 'other'}]} optionLabel="name" placeholder="Select" />
                </div>
                <div className="pt-2 d-flex flex-row align-items-center">
                  <label className="font-weight-bold text-dark col-sm-2 ">Status</label>
                  <Dropdown value={status} onChange={(e)=>setStatus(e.value)} options={statuses} optionLabel="label" placeholder="Select status" />
                  <label className="font-weight-bold text-dark ml-5 mr-3">As of:</label>
                  <Calendar value={new Date()}></Calendar>
                  <label className="font-weight-bold text-dark ml-5 mr-3">Reported By:</label>
                  <Dropdown value={reporter} onChange={(e)=>setReporter(e.value)} options={reporters} optionLabel="label" placeholder="Select Reporter" />
                </div>
                <div className="pt-2 d-flex flex-row align-items-center">
                  <label className="font-weight-bold text-dark col-sm-3 ">Comments or special instructions :</label>
                  <Dropdown value={instruction} onChange={(e)=>setInstruction(e.value)} options={instructions} optionLabel="label" placeholder="Select" />
                </div>
                <div className="mx-3 mt-2">
                  <InputTextarea className="col-md-12"/>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Repair Authorisation Table</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <RepairAuthTable data={data} />
                <div className="pt-2 d-flex flex-row align-items-center">
                  <label className="font-weight-bold text-dark col-sm-2 ">Signature: </label>
                  <Form.Control className="border-bottom w-25"/>
                  <label className="font-weight-bold text-dark ml-5 mr-3">Date:</label>
                  <Calendar value={new Date()}></Calendar>
                </div>
                <div className="pt-2 d-flex flex-row align-items-center">
                  <label className="font-weight-bold text-dark col-sm-2 ">Serviced By: </label>
                  <Form.Control className="border-bottom w-25"/>
                  <label className="font-weight-bold text-dark ml-5 mr-3">Date:</label>
                  <Calendar value={new Date()}></Calendar>
                  <label className="font-weight-bold text-dark ml-5 mr-3 ">ID: </label>
                  <Form.Control className="border-bottom w-25"/>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RepairAuth;
