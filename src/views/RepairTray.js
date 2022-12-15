import React from "react";

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
} from "react-bootstrap";
import RepairTrayTable from "components/Table/RepairTrayTable.js"

const data={
    data :[
        {
            tray: 1,
            client: 0,
            recId: "10-10-20226",
            notes: "",
            receptionDate: "12-12-2021",
            location: "BILLY",
            status: "UNDERREVIEW",
            followUp: "",
            secondReception: "",
            thirdReception: ""
        },
        {
            tray: 2,
            client: 1,
            recId: "7-10-20227",
            notes: "SENSOR",
            receptionDate: "2-12-2021",
            location: "BILLY",
            status: "COMPLETED",
            followUp: "",
            secondReception: "",
            thirdReception: ""
        },{
            tray: 3,
            client: 2,
            recId: "5-10-20227",
            notes: "",
            receptionDate: "4-13-2021",
            location: "BILLY",
            status: "PENDING",
            followUp: "",
            secondReception: "",
            thirdReception: ""
        },
        {
            tray: 4,
            client: 3,
            recId: "28-10-20226",
            notes: "",
            receptionDate: "7-12-2021",
            location: "BILLY",
            status: "QUOTED",
            followUp: "",
            secondReception: "",
            thirdReception: ""
        },
        {
            tray: 5,
            client: 4,
            recId: "28-10-20226",
            notes: "",
            receptionDate: "2-12-2021",
            location: "BILLY",
            status: "UNDERREVIEW",
            followUp: "",
            secondReception: "",
            thirdReception: ""
        },
        {
          tray: 6,
          client: 0,
          recId: "28-10-20226",
          notes: "",
          receptionDate: "3-12-2021",
          location: "BILLY",
          status: "UNDERREVIEW",
          followUp: "",
          secondReception: "",
          thirdReception: ""
      },
      
    ]
}
const clients = [
    { label: "M Smile Line dental Clinic", value: 0},
    { label: "LEDUC GABRIEL DMD INC.", value: 1},
    { label: "BARTON DENTAL", value: 2},
    { label: "M Smile Line dental", value: 3},
    { label: "M Smile Line dental club", value: 4}
]

const locations = [
    { label: "Billy", value: "BILLY" },
    { label: "OutSourced", value: "OUTSORCED"}
]

const status = [
    { label: "Completed", value: "COMPLETED"},
    { label: "Under Review", value: "UNDERREVIEW"},
    { label: "Pending", value: "PENDING"},
    { label: "Quoted", value: "QUOTED"},
    { label: "In Progress", value: "INPROGRESS"}
]

function RepairTray() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Repair Tray Status</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <RepairTrayTable products={data}/>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RepairTray;
