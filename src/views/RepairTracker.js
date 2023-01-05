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

const products = [ 
  { label: 'EZSENSOR 1.0', description: 'HDI-S DIGITAL X RAY SENSOR #1.0', warranty: 730},
  { label: 'EZSENSOR 1.5',  description: 'HDI-S DIGITAL X RAY SENSOR #1.5', warranty: 730},
  { label: 'EZSENSOR 2.0', description: 'HDI-S DIGITAL X RAY SENSOR #2.0', warranty: 730},
  { label: 'WBL-45', description: 'WOLF SURGICAL 45 DEG', warranty:365 },
  { label: 'WBL-KV-MED', description: 'WOlf Black Label High Speed Standard Head', warranty: 730},
  { label: 'WBL-KV-SMA',description: 'WOlf Black Label  Mini Head  Without coupler', warranty: 730},
  { label: 'WBL-NSK-MED',description: 'WOlf Black Label NSK Standard', warranty: 730},
  { label: 'WBL-NSK-SMAL',description: 'WOlf Black Label NSK Small', warranty: 730},
  { label: 'WNIN-KV-MEDL',description: 'WOLF NINJA KAVO STANDARD HEAD', warranty: 1825},
  { label: 'WNIN-KV-SMAL',description: 'WOLF NINJA KAVO MINI  HEAD', warranty: 1825},
  { label: 'WOLF1:1CA', description: 'WOLF 1:1 CONTRA ANGLE', warranty:365},
  { label: 'WOLF16:1CA', description: 'WOLF 16:1 CONTRA ANGLE', warranty:365},
  { label: 'WOLF16:1-H-ROT', description: 'WOLF 16:1 ROTATION HEAD', warranty:365},
  { label: 'WOLF25', description: 'WOlf 25 K Air Motor', warranty:365},
  { label: 'WOLF25KLED', description: 'WOLF 25K LED AIR MOTOR', warranty:365},
  { label: 'WOLF4:1CA', description: 'WOLF 4:1 CONTRA ANGLE', warranty:365},
  { label: 'WOLF-CFX', description: 'WOLF CURE FX CURING LIGHT', warranty:365},
  { label: 'WOLFE', description: 'WOlf Electric Micromotor with Tablet' },
  { label: 'WOLFEIN', description: 'WOlf Internal Micro Motor' },
  { label: 'WOLF-HYG', description: 'WOLF HYGIENE HANDPIECE SLOW SPEED', warranty: 365},
  { label: 'WOLF-LUBRICATOR-2HS', description: 'WOLF Lubricator - Lubrication machine- 2 High Speed' },
  { label: 'WOLF-LUBRICATOR-2SS', description: 'Wolf Lubricator machine - 2 Slow Spped adaptors' },
  { label: 'WOLF-LUBRICATOR-OIL', description: 'WOlf Oil 1 liter' },
  { label: 'WOLFPBH', description: 'WOLF PUSH BUTTON BALL BEARING HEAD' },
  { label: 'WOLFREDX', description: 'WOLF RED X  1:5 HIGH SPEED ELECTRIC', warranty: 365},
  { label: 'WOLF-SCALATRON', description: 'WOLF SCALATRON Magnetostrictive Ultrasonic Scaler', warranty: 365},
  { label: 'WOLFSIH', description: 'WOLF SCREW IN PROPHY HEAD' },
  { label: 'WOLFSLH', description: 'WOLF STANDARD LATCH HEAD' },
  { label: 'WOLFSNAPON', description: 'WOlf SNAP ON HEAD' },
  { label: 'WPL-KV-MEDL', description: 'WOlf Platinum Label  Standard KAVO with Light', warranty: 1095}, 
  { label: 'WPL-KV-SMAL', description: 'WOlf Platinum Label Mini KAVO with Light', warranty: 1095}, 
  { label: 'WPL-NSK-MEDL', description: 'WOlf Platinum Label  Standard NSK with Light', warranty: 1095}, 
  { label: 'WPL-NSK-SMAL', description: 'WOLF Platinum Label  small NSK with light', warranty: 1095}, 
  { label: 'WR-B-FG', description: 'Wolf Blue Ring 1:1 FG', warranty: 365},
  { label: 'WR-B-FG-H', description: 'Wolf Blue Ring FG PBHead', warranty: 365},
  { label: 'WR-B-FG-LED', description: 'Wolf Blue Ring 1:1 FG LED', warranty: 365},
  { label: 'WR-B-RA', description: 'Wolf Blue Ring 1:1 RA', warranty: 365},
  { label: 'WR-B-RA-H', description: 'Wolf Blue Ring Ra Head', warranty: 365},
  { label: 'WR-B-RA-H1', description: 'Wolf Blue Ring RA PB Head', warranty: 365},
  { label: 'WR-B-RA-LED', description: 'WOLF Blue Ring RA LED 1:1', warranty: 365},
  { label: 'WR-G-FG', description: 'WOLF GREENRING4.1 FG HP', warranty: 365},
  { label: 'WR-G-RA', description: 'WOlf Green Ring 4:1 Ratio', warranty: 365},
  { label: 'WR-G-RA-LED', description: 'WOlf Green Ring 4:1 LED', warranty: 365},
  { label: 'WR-GREY', description: 'Wolf Grey Ring Straight HP.', warranty: 365},
  { label: 'WR-G-SI-H', description: 'WOLF GREEN RING SCREW HEAD' },
  { label: 'WSL-5H-MED', description: 'WOlf Silver Label 5 Hole No Light', warranty: 365}, 
  { label: 'WSL-5H-MEDL', description: 'WOlf Silver Label 5 Hole with Light', warranty: 365}, 
  { label: 'WSL-5H-SMA', description: 'WOlf Silver Label 5 Hole Small No Light', warranty: 365}, 
  { label: 'WSL-5H-SMAL', description: 'WOlf Silver Label 5 Hole Small with Light', warranty: 365}, 
  { label: 'WSL-KV-MED', description: 'WOlf Silver Label Standard KAVO No Light', warranty: 365}, 
  { label: 'WSL-KV-MEDL', description: 'WOlf Silver Label Standard KAVO with Light', warranty: 365}, 
  { label: 'WSL-KV-SMA', description: 'WOlf Silver Label Mini head KAVO No Light', warranty: 365}, 
  { label: 'WSL-KV-SMAL', description: 'WOlf Silver Label Mini Head KAVO with Light', warranty: 365}, 
  { label: 'WSL-MED-TUR',  description: 'WOLF SILVER LABEL STANDARD TURBINE', warranty: 365}, 
  { label: 'WSL-NSK-MED',  description: 'WOlf Silver Label Standard NSK No Light', warranty: 365}, 
  { label: 'WSL-NSK-MEDL', description: 'WOlf Silver Label Standard NSK with Light', warranty: 365}, 
  { label: 'WSL-NSK-SMA', description: 'WOlf Silver Label Mini NSK NO LIGHT', warranty: 365}, 
  { label: 'WSL-NSK-SMAL', description: 'WOlf Silver Label Mini NSK with Light', warranty: 365}, 
]

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
                <h3><i className="nc-icon nc-settings-gear-64 font-weight-bold"></i> Total Recieved: {received}</h3>
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
