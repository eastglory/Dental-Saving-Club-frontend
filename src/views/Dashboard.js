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
  Spinner
} from "react-bootstrap";
import ProgressBar from "@ramonak/react-progress-bar";
import ProductLineChart from "components/Charts/ProductLineChart";
import ProductBarChart from "components/Charts/ProductBarChart";
import ProductPieChart from "components/Charts/ProductPieChart";
import { TreeSelect } from 'primereact/treeselect'
import { ProgressSpinner } from 'primereact/progressspinner'
import { TreeProducts } from "assets/Products";

function Dashboard() {
  // const [data, setData] = useState(null)
  const [selectedNode, setSelectedNode] = useState(null)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [loading, setLoading] = useState(false)

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
    console.log(arr)
    setLoading(false)
    setSelectedProducts(arr)
  }
  return (
      <Container  fluid  >
        <Row>
          <TreeSelect 
            value={selectedNode} 
            className="w-100 m-3"
            options={TreeProducts.children} 
            onChange={handleSelectNode} 
            filter
            display="chip" 
            selectionMode="checkbox" 
            placeholder="Select Products">

          </TreeSelect>
        </Row>
        {
          loading?
              <ProgressSpinner 
                className="w-100 mx-auto mt-5" 
                strokeWidth='8' 
                fill="var(--surface-ground)" 
                animationDuration="1s" /> :
            <>
              <Row className="d-flex flex-row justify-content-between">
                <Col >
                  <Card className="card-stats">
                    <Card.Body>
                      <Row>
                        <Col xs="4">
                          <div className="icon-big text-center">
                            <i className="nc-icon nc-settings-tool-66 text-primary"></i>
                          </div>
                        </Col>
                        <Col xs="8">
                          <div className="numbers">
                            <p className="card-category">Total</p>
                            <Card.Title as="h2">150</Card.Title>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer>
                      <hr></hr>
                      <div className="stats">
                        <i className="fas fa-link mr-1"></i>
                        See detail
                      </div>
                    </Card.Footer>
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
                            <Card.Title as="h2">100</Card.Title>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer>
                      <hr></hr>
                      <div className="stats">
                        <i className="fas fa-link mr-1"></i>
                        See detail
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col >
                  <Card className="card-stats">
                    <Card.Body>
                      <Row>
                        <Col xs="4">
                          <div className="icon-big text-center icon-warning">
                            <i className="nc-icon nc-settings-90 text-warning"></i>
                          </div>
                        </Col>
                        <Col xs="8">
                          <div className="numbers">
                            <p className="card-category">In Progress</p>
                            <Card.Title as="h2">50</Card.Title>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer>
                      <hr></hr>
                      <div className="stats">
                        <i className="fas fa-link mr-1"></i>
                        See detail
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col >
                  <Card className="card-stats">
                    <Card.Body>
                      <Row>
                        <Col xs="4">
                          <div className="icon-big text-center icon-warning">
                            <i className="nc-icon nc-tag-content text-primary"></i>
                          </div>
                        </Col>
                        <Col xs="8">
                          <div className="numbers">
                            <p className="card-category">Under Warranty</p>
                            <Card.Title as="h2">635</Card.Title>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer>
                      <hr></hr>
                      <div className="stats">
                        <i className="fas fa-link mr-1"></i>
                        See detail
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col >
                  <Card className="card-stats">
                    <Card.Body>
                      <Row>
                        <Col xs="4">
                          <div className="icon-big text-center icon-warning">
                            <i className="nc-icon nc-tag-content text-primary"></i>
                          </div>
                        </Col>
                        <Col xs="8">
                          <div className="numbers">
                            <p className="card-category">Out of Warranty</p>
                            <Card.Title as="h2">635</Card.Title>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer>
                      <hr></hr>
                      <div className="stats">
                        <i className="fas fa-link mr-1"></i>
                        See detail
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md="8">
                  <Card>
                    <Card.Header className="text-center">
                      <Card.Title as="h4">Customer's Orders</Card.Title>
                      <p className="card-category">1 Week performance</p>
                    </Card.Header>
                    <Card.Body>
                      <ProductLineChart />
                    </Card.Body>
                  </Card>
                  <Row>
                    <Col md="4">
                      <Card>
                        <Card.Header className="text-center">
                          <Card.Title as="h4">Lorem Ipsum</Card.Title>
                          <hr></hr>
                        </Card.Header>
                        <Card.Body>
                          <ProductPieChart />
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md="4">
                      <Card>
                        <Card.Header className="text-center">
                          <Card.Title as="h4">Lorem Ipsum</Card.Title>
                          <hr></hr>
                        </Card.Header>
                        <Card.Body>
                          <ProductLineChart />
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md="4">
                      <Card>
                        <Card.Header className="text-center">
                          <Card.Title as="h4">Lorem Ipsum</Card.Title>
                          <hr></hr>
                        </Card.Header>
                        <Card.Body>
                          <ProductBarChart />
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                  <Col md="6">
                    <Card className="p-3">
                      <Card.Header className="text-center">
                        <Card.Title as="h4">Products Sales</Card.Title>
                        <p className="card-category">All products including Taxes</p>
                      </Card.Header>
                      <hr></hr>
                      <Card.Body>
                        <div className="py-2">
                          <p className="card-category">Product 1</p>
                          <ProgressBar bgColor="#007bff" height="10px" borderRadius="10px" isLabelVisible={false} completed={40}/>
                        </div>
                        <div className="py-2">
                          <p className="card-category">Product 2</p>
                          <ProgressBar bgColor="#28a745" height="10px" borderRadius="10px" isLabelVisible={false} completed={80}/>
                        </div>
                        <div className="py-2">
                          <p className="card-category">Product 3</p>
                          <ProgressBar bgColor="#dc3545" height="10px" borderRadius="10px" isLabelVisible={false} completed={24}/>
                        </div>
                        <div className="py-2">
                          <p className="card-category">Product 4</p>
                          <ProgressBar bgColor="#ffc107" height="10px" borderRadius="10px" isLabelVisible={false} completed={38}/>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md="6">
                    <Card className="p-3">
                      <Card.Header className="text-center">
                        <Card.Title as="h4">Products Sales</Card.Title>
                        <p className="card-category">All products including Taxes</p>
                      </Card.Header>
                      <hr></hr>
                      <Card.Body>
                        <Row>
                          <Col xs="4" className="border-right">
                            <p className="card-category text-right py-2">Product 1</p>
                            <p className="card-category text-right py-2">Product 2</p>
                            <p className="card-category text-right py-2">Product 3</p>
                            <p className="card-category text-right py-2">Product 4</p>
                            <p className="card-category text-right py-2">Product 5</p>
                            <p className="card-category text-right py-2">Product 6</p>
                          </Col>
                          <Col xs="8">
                            <ProgressBar className="py-2" bgColor="#007bff" baseBgColor="#ffffff" borderRadius="10px" completed={40}/>
                            <ProgressBar className="py-2" bgColor="#28a745" baseBgColor="#ffffff" borderRadius="10px" completed={100}/>
                            <ProgressBar className="py-2" bgColor="#dc3545" baseBgColor="#ffffff" borderRadius="10px" completed={54}/>
                            <ProgressBar className="py-2" bgColor="#ffc107" baseBgColor="#ffffff" borderRadius="10px" completed={38}/>
                            <ProgressBar className="py-2" bgColor="#6c757d" baseBgColor="#ffffff" borderRadius="10px" completed={75}/>
                            <ProgressBar className="py-2" bgColor="#6610f2" baseBgColor="#ffffff" borderRadius="10px" completed={43}/>
                          </Col>
                        </Row>   
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                </Col>
                <Col md="4">
                  <Card>
                    <Card.Header className="text-center p-5">
                      <Card.Title className="border-bottom pb-3"as="h4">Orders Statistics</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <div className="d-flex justify-content-between px-4 py-1">
                        <p className="m-0">Lorem Ipsum</p>
                        <Badge pill bg="warning" className="px-3" text="white">120</Badge>
                      </div>
                      <div className="d-flex justify-content-between px-4 py-1">
                        <p className="m-0">product imsum</p>
                        <Badge pill bg="warning" className="px-3" text="white">120</Badge>
                      </div>
                      <div className="d-flex justify-content-between px-4 py-1">
                        <p className="m-0">dental product sale</p>
                        <Badge pill bg="warning" className="px-3" text="white">120</Badge>
                      </div>
                      <div className="d-flex justify-content-between px-4 py-1">
                        <p className="m-0">Lorem product dental save</p>
                        <Badge pill bg="warning" className="px-3" text="white">120</Badge>
                      </div>
                      <div className="d-flex justify-content-between px-4 py-1">
                        <p className="m-0">dental saving club</p>
                        <Badge pill bg="warning" className="px-3" text="white">120</Badge>
                      </div>
                    </Card.Body>
                    <Card.Header className="text-center p-5">
                      <Card.Title className="border-bottom pb-3"as="h4">Orders Statistics</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <ProductBarChart />
                    </Card.Body>
                    <Card.Header className="text-center p-5">
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
