import React, { useEffect } from "react";

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
import axios from "axios";


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
                <RepairTrayTable />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* {console.log("second")} */}
    </>
  );
}

export default RepairTray;
