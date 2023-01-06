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
  Image
} from "react-bootstrap";
import ProgressBar from "@ramonak/react-progress-bar";
import RepairTrackerTable from "components/Table/RepairTrackerTable";
import axios from "axios";
import {products} from '../assets/Products'



function RepairTracker() {

  const [data, setData] = useState([])
  const [received, setReceived] = useState(0)
  const [tableLoading, setTableLoading] = useState(false)
  const [warrantyYes, setWarrantyYes] = useState(0)
  const [warrantyNo, setWarrantyNo] = useState(0)
  const [waterblockageYes, setWaterblockageYes] = useState(0)
  const [waterblockageNo, setWaterblockageNo] = useState(0)

  useEffect(() => {
    setTableLoading(true)
    axios.get('https://dscbackend.onrender.com/getrepairtrackerdata').then(res => {
      let _data = res.data
      let temp = _data.map(item => (
          {...item, toWarranty: calculateWarranty(item)}
      ))
      setData(temp)
      setTableLoading(false)
      setReceived(temp.length)
      setWarrantyYes(temp.filter(item => item.toWarranty < 100).length)
      setWarrantyNo(temp.filter(item => item.toWarranty >= 100).length)
      setWaterblockageYes(temp.filter(item => item.waterblockage == 'Yes').length)
      setWaterblockageNo(temp.filter(item => item.waterblockage == 'No').length)

    }).catch(err => console.log(err))
  }, [])

  const calculateWarranty = (item) => {
    let difference = new Date(item.datRec).getTime() - new Date(item.dop).getTime()
    let totalDays = Math.ceil(difference / (1000 * 3600 * 24))
    let productsWarranty = products.find(product => product.label == item.product).warranty
    let warranty = Math.ceil(totalDays * 100 / productsWarranty)
    return warranty
}

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
                <h3 className="align-items-center"><i className="nc-icon nc-settings-gear-64 font-weight-bold"></i> Total Recieved: {received}</h3>
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
                      <td>{warrantyYes}</td>
                      <td>{warrantyNo}</td>
                    </tr>
                    <tr>
                      <td>WATER BLOCKAGE</td>
                      <td>{waterblockageYes}</td>
                      <td>{waterblockageNo}</td>
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
                <Card.Title as="h4">Repair Tracker</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <RepairTrackerTable loading={tableLoading} data={data} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RepairTracker;
