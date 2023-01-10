import React, { useState, useEffect, useRef } from "react";
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
  Spinner
} from "react-bootstrap";
import ProgressBar from "@ramonak/react-progress-bar";
import ProductLineChart from "components/Charts/ProductLineChart";
import ProductBarChart from "components/Charts/ProductBarChart";
import ProductPieChart from "components/Charts/ProductPieChart";
import { TreeSelect } from 'primereact/treeselect'
import { ProgressSpinner } from 'primereact/progressspinner'
import { TreeProducts } from "assets/Products";
import { products } from "assets/Products";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import { Toast } from "primereact/toast"
import CustomPieChart from "components/Charts/CustomPieChart";

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', "Dec"]
const analysisNames = [
  'UNPROPER LUBRIFICATION', 
  'PHYSICAL DAMAGE', 
  'DEVICE FAILUR', 
  'SERIOUS MEDICAL FAILUR', 
  'USER FAILUR', 
]

const waterBlockageList = [
  "Yes",
  "No",
]

const lubrificationList = [
  "Adequate", 
  "Under lubricated",
  "Over lubricated",
  "None",
]

const chucks = [
  "GOOD RETENTION", 
  "DOES NOT HOLD", 
  "DOES NOT RELEASE", 
]

const bearings = [
  "GOOD",
  "WORN",
  "CORRODED",
]

const feasabilities = [
  "REPAIRED", 
  "NEW MIDSHAFT GEAR OR/AND NEW HEAD", 
  "REPLACE HOUSING", 
  "RETURNED AS IS", 
  "DISPOSED", 
]

function Dashboard() {
  // const [data, setData] = useState(null)
  const [selectedNode, setSelectedNode] = useState(null)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [year, setYear] = useState(2023)
  const [total, setTotal] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [underWarranty, setUnderWarranty] = useState(0)
  const [outOfWarranty, setOutOfWarranty] = useState(0)
  const [monthlySpreadData, setMonthlySpreadData] = useState([])
  const [numCheck1, setNumCheck1] = useState(0)
  const [numCheck2, setNumCheck2] = useState(0)
  const [numCheck3, setNumCheck3] = useState(0)
  const [numCheck4, setNumCheck4] = useState(0)
  const [numCheck5, setNumCheck5] = useState(0)
  const [monthlyAnalysis, setMonthlyAnalysis] = useState([])
  const [analysisPerType, setAnalysisPerType] = useState([])
  const [bearingData, setBearingData] = useState([])
  const [chuckData, setChuckData] = useState([])
  const [waterblockageData, setWaterblockageData] = useState([])
  const [lubrificationData, setLubrificationData] = useState([])
  const [feasabilityData, setFeasabilityData] = useState([])

  const toast = useRef(null)

  const calculateWarranty = (item) => {
    let difference = new Date(item.datRec).getTime() - new Date(item.dop).getTime()
    let totalDays = Math.ceil(difference / (1000 * 3600 * 24))
    let productsWarranty = products.find(product => product.label == item.product).warranty
    let warranty = Math.ceil(totalDays * 100 / productsWarranty)
    return warranty
  }

  useEffect(() => {
    setLoading(true)
    const _products = selectedProducts.length ? selectedProducts : products.map(product => (product.label))
    const body = {products: _products, year: year}
    axios.post('https://coordinated-supreme-spoonbill.glitch.me/getdashboarddata', body).then(res => {
      axios.post('https://coordinated-supreme-spoonbill.glitch.me/getdashboarddata', {products: _products, year: year-1}).then(resp => {
        let _data = []
        if(selectedProducts.includes("HIGH SPEED") && !selectedProducts.includes("SLOW SPEED")){
          for(let i = 0; i < 12; i++){
            _data.push({
              name: monthNames[i],
              current: {
                "NINJA": res.data.authData.filter(item => item.recId.split('-')[0] == i+1 && JSON.stringify(TreeProducts.children[1].children[0]).includes(item.description)).length,
                "PLATINUM": res.data.authData.filter(item => item.recId.split('-')[0] == i+1 && JSON.stringify(TreeProducts.children[1].children[1]).includes(item.description)).length,
                "BLACK": res.data.authData.filter(item => item.recId.split('-')[0] == i+1 && JSON.stringify(TreeProducts.children[1].children[2]).includes(item.description)).length,
                "SILVER": res.data.authData.filter(item => item.recId.split('-')[0] == i+1 && JSON.stringify(TreeProducts.children[1].children[3]).includes(item.description)).length,
              },
              last: {
                "NINJA": resp.data.authData.filter(item => item.recId.split('-')[0] == i+1 && JSON.stringify(TreeProducts.children[1].children[0]).includes(item.description)).length,
                "PLATINUM": resp.data.authData.filter(item => item.recId.split('-')[0] == i+1 && JSON.stringify(TreeProducts.children[1].children[1]).includes(item.description)).length,
                "BLACK": resp.data.authData.filter(item => item.recId.split('-')[0] == i+1 && JSON.stringify(TreeProducts.children[1].children[2]).includes(item.description)).length,
                "SILVER": resp.data.authData.filter(item => item.recId.split('-')[0] == i+1 && JSON.stringify(TreeProducts.children[1].children[3]).includes(item.description)).length,
              }
            })
          }
        }

        if(!selectedProducts.includes("HIGH SPEED") && selectedProducts.includes("SLOW SPEED")){
          for(let i = 0; i < 12; i++){
            _data.push({
              name: monthNames[i],
              current: {
                "RA": res.data.authData.filter(item => item.recId.split('-')[0] == i+1 && JSON.stringify(TreeProducts.children[2].children[0]).includes(item.description)).length,
                "FG": res.data.authData.filter(item => item.recId.split('-')[0] == i+1 && JSON.stringify(TreeProducts.children[2].children[1]).includes(item.description)).length,
              },
              last : {
                "RA": resp.data.authData.filter(item => item.recId.split('-')[0] == i+1 && JSON.stringify(TreeProducts.children[2].children[0]).includes(item.description)).length,
                "FG": resp.data.authData.filter(item => item.recId.split('-')[0] == i+1 && JSON.stringify(TreeProducts.children[2].children[1]).includes(item.description)).length,
              }
            })
          }
        }

        if(selectedProducts.includes("HIGH SPEED") && selectedProducts.includes("SLOW SPEED")){
          for(let i = 0 ; i< 12 ; i++){
            _data.push({
              name: monthNames[i],
              current: {
                "HIGH SPEED": res.data.authData.filter(item => item.recId.split('-')[0] == i+1 && JSON.stringify(TreeProducts.children[1]).includes(item.description)).length,
                "SLOW SPEED": res.data.authData.filter(item => item.recId.split('-')[0] == i+1 && JSON.stringify(TreeProducts.children[2]).includes(item.description)).length,
              },
              last: {
                "HIGH SPEED": resp.data.authData.filter(item => item.recId.split('-')[0] == i+1 && JSON.stringify(TreeProducts.children[1]).includes(item.description)).length,
                "SLOW SPEED": resp.data.authData.filter(item => item.recId.split('-')[0] == i+1 && JSON.stringify(TreeProducts.children[2]).includes(item.description)).length,
              }
            })
          }
        }

        if(!selectedProducts.includes("HIGH SPEED") && !selectedProducts.includes("SLOW SPEED")){
          for(let i = 0; i < 12; i++){
            _data.push({
              name: monthNames[i],
              current: {
                "TOTAL": res.data.authData.filter(item => item.recId.split('-')[0] == i+1).length,
              },
              last: {
                "TOTAL": resp.data.authData.filter(item => item.recId.split('-')[0] == i+1).length,
              }
              
            })
          }
        }
        setMonthlySpreadData(_data)
      }).catch(err => console.log(err))

      //setting 5 cards data
      setTotal(res.data.authData.length)
      setCompleted(res.data.trackerData.length)
      setUnderWarranty(res.data.trackerData.filter(item => calculateWarranty(item)<100).length)
      setOutOfWarranty(res.data.trackerData.filter(item => calculateWarranty(item)>=100).length)

      //setting check data
      setNumCheck1(res.data.trackerData.filter(item => item.check1 == 1).length)
      setNumCheck2(res.data.trackerData.filter(item => item.check2 == 1).length)
      setNumCheck3(res.data.trackerData.filter(item => item.check3 == 1).length)
      setNumCheck4(res.data.trackerData.filter(item => item.check4 == 1).length)
      setNumCheck5(res.data.trackerData.filter(item => item.check5 == 1).length)

      //setting monthly analysis data
      let _monthlyAnalysisData = []
      for(let i = 0; i < 12; i++){
        _monthlyAnalysisData.push({
          name: monthNames[i],
          'UNPROPER LUBRIFICATION': res.data.trackerData.filter(item => item.check1 == 1 && item.recId.split('-')[0] == i + 1).length,
          'PHYSICAL DAMAGE': res.data.trackerData.filter(item => item.check2 == 1 && item.recId.split('-')[0] == i + 1).length,
          'DEVICE FAILUR': res.data.trackerData.filter(item => item.check3 == 1 && item.recId.split('-')[0] == i + 1).length,
          'SERIOUS MEDICAL FAILUR': res.data.trackerData.filter(item => item.check4 == 1 && item.recId.split('-')[0] == i + 1).length,
          'USER FAILUR': res.data.trackerData.filter(item => item.check5 == 1 && item.recId.split('-')[0] == i + 1).length
        })
      }
      setMonthlyAnalysis(_monthlyAnalysisData)

      //setting analysis data per type
      // let _analysisPerType = []
      // for(let i = 0; i < 5; i++){
      //   let _data = {}
      //   _data.name = analysisNames[i]
      //   monthNames.forEach((item, index) => {
      //     _data[item] = res.data.trackerData.filter(tracker => tracker.recId.split('-')[0] == index + 1).length
      //   })
      //   _analysisPerType.push(_data)
      // }
      // setAnalysisPerType(_analysisPerType)

      //setting bearing data
      let _bearingData = []
      bearings.forEach(bearing => {
        _bearingData.push({
          name: bearing,
          value: res.data.trackerData.filter(item => item.bearing == bearing).length
        })
      })
      setBearingData(_bearingData)

      //setting chuck data
      let _chuckData = []
      chucks.forEach(chuck => {
        _chuckData.push({
          name: chuck,
          value: res.data.trackerData.filter(item => item.chuck == chuck).length
        })
      })
      setChuckData(_chuckData)

      //setting waterblockage data
      let _waterblockageData = []
      waterBlockageList.forEach(waterblockage => {
        _waterblockageData.push({
          name: waterblockage,
          value: res.data.trackerData.filter(item => item.waterblockage == waterblockage).length
        })
      })
      setWaterblockageData(_waterblockageData)

      //setting lubrifcation data
      let _lubrificationData = []
      lubrificationList.forEach(lubrification => {
        _lubrificationData.push({
          name: lubrification,
          value: res.data.trackerData.filter(item => item.lubrification == lubrification).length
        })
      })
      setLubrificationData(_lubrificationData)

      //setting feasability data
      let _feasabilityData = []
      feasabilities.forEach(feasability => {
        _feasabilityData.push({
          name: feasability,
          value: res.data.trackerData.filter(item => item.feasability == feasability).length
        })
      })
      setFeasabilityData(_feasabilityData)

      setLoading(false)
  }).catch(err => {console.log(err); setLoading(false)})

  }, [selectedProducts, year])

  const searchData = (element, key) => {
    if(element.key == key ) return element;
    else if(element.children != null) {
      let i
      let result = null
      for(i = 0; result == null && i < element.children.length; i++){
        result = searchData(element.children[i], key)
      }
      return result
    }
    return null
  }

  const handleSelectNode = (e) => {
    setLoading(true)
    const value = e.value
    let arr = []
    setSelectedNode(value)
    Object.keys(value).forEach(item => {
      if(value[item].checked) arr.push(searchData(TreeProducts, item).label)
    })
    setLoading(false)
    setSelectedProducts(arr)
  }
  return (
    
      <Container  fluid  >
        <Row className="d-flex flex-row justify-content-between p-3">
          <TreeSelect 
            value={selectedNode} 
            className="flex-grow-1 overflow-hidden col-md-9 mr-2"
            options={TreeProducts.children} 
            onChange={handleSelectNode} 
            filter
            display="chip" 
            selectionMode="checkbox" 
            placeholder="Select Products">
          </TreeSelect>
          <Dropdown className="col-md-2" value={year} options={[2018,2019,2020,2021,2022,2023]} onChange={(e) => setYear(e.value)}/>
        </Row>
        {
          loading?
              <ProgressSpinner 
                className="w-100 mx-auto mt-5" 
                strokeWidth='8' 
                fill="var(--surface-ground)" 
                animationDuration="1s" /> :
            <>
              <Row className="d-flex flex-lg-row flex-md-column flex-sm-column flex-xs-column justify-content-between">
                <Col >
                  <Card className="card-stats">
                    <Card.Body>
                      <Row>
                        <Col xs="4">
                          <div className="icon-big text-center">
                            <i className="nc-icon nc-paper-2 text-primary"></i>
                          </div>
                        </Col>
                        <Col xs="8">
                          <div className="numbers">
                            <p className="card-category">Total</p>
                            <Card.Title as="h2">{total}</Card.Title>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                    { /* <Card.Footer> 
                      <hr></hr>
                      <div className="stats">
                        <i className="fas fa-link mr-1"></i>
                        See detail
                      </div>
                    </Card.Footer> */}
                  </Card>
                </Col>
                <Col >
                  <Card className="card-stats">
                    <Card.Body>
                      <Row>
                        <Col xs="4">
                          <div className="icon-big text-center">
                            <i className="nc-icon nc-check-2 text-success"></i>
                          </div>
                        </Col>
                        <Col xs="8">
                          <div className="numbers">
                            <p className="card-category">Completed</p>
                            <Card.Title as="h2">{completed}</Card.Title>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                    { /* <Card.Footer> 
                      <hr></hr>
                      <div className="stats">
                        <i className="fas fa-link mr-1"></i>
                        See detail
                      </div>
                    </Card.Footer> */}
                  </Card>
                </Col>
                <Col >
                  <Card className="card-stats">
                    <Card.Body>
                      <Row>
                        <Col xs="4">
                          <div className="icon-big text-center icon-warning">
                            <i className="nc-icon nc-refresh-02 text-warning"></i>
                          </div>
                        </Col>
                        <Col xs="8">
                          <div className="numbers">
                            <p className="card-category">In Progress</p>
                            <Card.Title as="h2">{total - completed}</Card.Title>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                    { /* <Card.Footer> 
                      <hr></hr>
                      <div className="stats">
                        <i className="fas fa-link mr-1"></i>
                        See detail
                      </div>
                    </Card.Footer> */}
                  </Card>
                </Col>
                <Col >
                  <Card className="card-stats">
                    <Card.Body>
                      <Row>
                        <Col xs="4">
                          <div className="icon-big text-center icon-warning">
                            <i className="nc-icon nc-watch-time text-primary"></i>
                          </div>
                        </Col>
                        <Col xs="8">
                          <div className="numbers">
                            <p className="card-category">Under Warranty</p>
                            <Card.Title as="h2">{underWarranty}</Card.Title>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                    { /* <Card.Footer> 
                      <hr></hr>
                      <div className="stats">
                        <i className="fas fa-link mr-1"></i>
                        See detail
                      </div>
                    </Card.Footer> */}
                  </Card>
                </Col>
                <Col >
                  <Card className="card-stats">
                    <Card.Body>
                      <Row>
                        <Col xs="4">
                          <div className="icon-big text-center icon-warning">
                            <i className="nc-icon nc-watch-time text-danger"></i>
                          </div>
                        </Col>
                        <Col xs="8">
                          <div className="numbers">
                            <p className="card-category">Out of Warranty</p>
                            <Card.Title as="h2">{outOfWarranty}</Card.Title>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                    { /* <Card.Footer> 
                      <hr></hr>
                      <div className="stats">
                        <i className="fas fa-link mr-1"></i>
                        See detail
                      </div>
                    </Card.Footer> */}
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col lg="8" md='12'>
                  <Card>
                    <Card.Header className="text-center">
                      <Card.Title as="h4">Monthly Spread</Card.Title>
                      <p className="card-category">{year}</p>
                    </Card.Header>
                    <Card.Body>
                      <ProductLineChart data={monthlySpreadData}/>
                    </Card.Body>
                  </Card>
                  <Row>
                    <Col md="4">
                      <Card>
                        <Card.Header className="text-center">
                          <Card.Title as="h4">Bearings</Card.Title>
                          <hr></hr>
                        </Card.Header>
                        <Card.Body>
                          <CustomPieChart data={bearingData}/>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md="4">
                      <Card>
                        <Card.Header className="text-center">
                          <Card.Title as="h4">Chucks</Card.Title>
                          <hr></hr>
                        </Card.Header>
                        <Card.Body>
                          <CustomPieChart data={chuckData}/>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md="4">
                      <Card>
                        <Card.Header className="text-center">
                          <Card.Title as="h4">Waterblockage</Card.Title>
                          <hr></hr>
                        </Card.Header>
                        <Card.Body>
                          <CustomPieChart data={waterblockageData}/>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                  <Col md="6">
                    <Card>
                      <Card.Header className="text-center">
                        <Card.Title as="h4">Lubrification</Card.Title>
                        <hr></hr>
                      </Card.Header>
                      <Card.Body>
                        <CustomPieChart data={lubrificationData}/>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md="6">
                    <Card>
                      <Card.Header className="text-center">
                        <Card.Title as="h4">Feasability</Card.Title>
                        <hr></hr>
                      </Card.Header>
                      <Card.Body>
                        <CustomPieChart data={feasabilityData}/>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                </Col>
                <Col lg="4" md='12'>
                  <Card>
                    <Card.Header className="text-center p-5">
                      <Card.Title className="border-bottom pb-3"as="h4">Analysis</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <div className="d-flex justify-content-between px-4 py-1">
                        <p className="m-0">Unproper lubrification</p>
                        <Badge pill bg="primary" className="px-3" text="white">{numCheck1}</Badge>
                      </div>
                      <div className="d-flex justify-content-between px-4 py-1">
                        <p className="m-0">Physical damage</p>
                        <Badge pill bg="success" className="px-3" text="white">{numCheck2}</Badge>
                      </div>
                      <div className="d-flex justify-content-between px-4 py-1">
                        <p className="m-0">Device failur</p>
                        <Badge pill bg="warning" className="px-3" text="white">{numCheck3}</Badge>
                      </div>
                      <div className="d-flex justify-content-between px-4 py-1">
                        <p className="m-0">Serious medical failur</p>
                        <Badge pill bg="danger" className="px-3" text="white">{numCheck4}</Badge>
                      </div>
                      <div className="d-flex justify-content-between px-4 py-1">
                        <p className="m-0">User failur</p>
                        <Badge pill bg="secondary" className="px-3" text="white">{numCheck5}</Badge>
                      </div>
                    </Card.Body>
                    <Card.Header className="text-center pt-5">
                      <Card.Title className="border-bottom pb-3"as="h4">Monthly Analysis</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <ProductBarChart data={monthlyAnalysis} dropdown={analysisNames} default={analysisNames[0]}/>
                    </Card.Body>
                    
                    {/* <Card.Header className="text-center pt-5">
                      <Card.Title className="border-bottom pb-3"as="h4">Analysis Per Type</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <ProductBarChart data={analysisPerType} dropdown={monthNames} default={monthNames[0]}/>
                    </Card.Body> */}
                    {/* <Card.Header className="text-center p-5">
                      <Card.Title className="border-bottom pb-3"as="h4">Orders Statistics</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col lg="6">
                          <ProductPieChart />
                        </Col>
                        <Col lg="6" className="d-flex flex-column justify-content-center">
                          <div>
                            <p className="card-category">Product sales</p>
                            <p className="card-category">Lorme ipsum dolor is random sentence</p>
                            <ProgressBar bgColor="#007bff" height="10px" borderRadius="10px" isLabelVisible={false} completed={65}/>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body> */}
                  </Card>
                    <Card>
                      <Card.Header className="text-center">
                        <Card.Title as="h4">Warranty</Card.Title>
                        <hr></hr>
                      </Card.Header>
                      <Card.Body>
                        <ProductPieChart data={[{name: "Under", value: underWarranty}, {name: "Out", value: outOfWarranty}]}/>
                      </Card.Body>
                    </Card>
                </Col>
              </Row>
            </>
        }
      </Container>
  );
}

export default Dashboard;
