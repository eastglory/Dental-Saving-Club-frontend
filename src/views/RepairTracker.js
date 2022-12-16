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
  Form,
  OverlayTrigger,
  Tooltip,
  Image
} from "react-bootstrap";
import ProgressBar from "@ramonak/react-progress-bar";
import RepairTrackerTable from "components/Table/RepairTrackerTable";

const data = {
  data: [
    {
      customerName: "Skippy Kerner",
      serial: "21105W0321",
      dop: "52635",
      received: "dop",
      waterBlockage: 1,
      lubrification: 2,
      repairFeasability: 1,
      replacement: 0,
      remainingDay: "1Yr(s) & 12 Days over warranty",
      toWarranty: 80,
      curve: 100
    },
    
    {
      customerName: "Skippy Kerner",
      serial: "21105W0321",
      dop: "52635",
      received: "12-15-2022",
      waterBlockage: 1,
      lubrification: 0,
      repairFeasability: 0,
      replacement: 1,
      remainingDay: "2Yr(s) & 321 Days over warranty",
      toWarranty: 45,
      curve: 48
    },
    {
      customerName: "Kotelevskaya Elena",
      serial: "AD23FDF5",
      dop: "6526",
      received: "3-25-2022",
      waterBlockage: 1,
      lubrification: 1,
      repairFeasability: 1,
      replacement: 1,
      remainingDay: "2Yr(s) & 219 Days over warranty",
      toWarranty: 99,
      curve: 49
    },
    {
      customerName: "Kotelevskaya Elena",
      serial: "AD23FDF5",
      dop: "6526",
      received: "3-25-2022",
      waterBlockage: 0,
      lubrification: 1,
      repairFeasability: 0,
      replacement: 1,
      remainingDay: "1Yr(s) & 22 Days over warranty",
      toWarranty: 10,
      curve: 44
    },
    {
      customerName: "Kotelevskaya Elena",
      serial: "AD23FDF5",
      dop: "6526",
      received: "3-25-2022",
      waterBlockage: 0,
      lubrification: 0,
      repairFeasability: 0,
      replacement: 0,
      remainingDay: "3Yr(s) & 219 Days over warranty",
      toWarranty: 50,
      curve: 33
    },
  ]
}

function Dashboard() {
  return (
    <>
      <Container fluid>
        <Row className="bg-white align-items-center">
          <Col lg="3" sm="12">
              <Image fluid src={require("assets/img/logo.jpg")} />
          </Col>
          <Col lg="9" sm="12">
            <Row>
              <div className="p-3">
                <h3><i className="nc-icon nc-settings-gear-64 font-weight-bold"></i> Total Recieved: 3</h3>
              </div>
            </Row>
            <Row>
              <Col sm="12" md="6">
                <Table>
                  <thead>
                    <tr >
                      <th></th>
                      <th><i className="pi pi-check-circle text-primary"></i></th>
                      <th><i className="pi pi-info-circle text-warning"></i></th>
                      <th><i className="pi pi-times-circle text-danger"></i></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>LUBRIFICATION</td>
                      <td>0</td>
                      <td>2</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>FEASABLE REPAIR</td>
                      <td>2</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col sm="12" md="6">
              <Table>
                  <thead>
                    <tr >
                      <th></th>
                      <th><i className="pi pi-circle-fill text-primary"></i> yes</th>
                      <th><i className="pi pi-circle-fill text-danger"></i> no</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>UNDER WARRANTY</td>
                      <td>1</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>WATER BLOCKAGE</td>
                      <td>2</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>

          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Repair Authorisation Table</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <RepairTrackerTable data={data} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
