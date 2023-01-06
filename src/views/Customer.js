import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
// react-bootstrap components
import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Form,
  Modal
} from "react-bootstrap";
import { Button } from 'primereact/button'
import {InputText} from 'primereact/inputtext'
import { Image } from 'primereact/image'
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import CustomerServiceTable from "components/Table/CustomerServiceTable";
import { Country, State, City } from 'country-state-city';
import CustomerPurchaseTable from "components/Table/CustomerPurchaseTable";
import { Autocomplete } from '@material-ui/lab';
import axios from 'axios'
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
    const [clients, setClients] = useState([])
    const [clientsData, setClientsData] = useState([])
    const [client, setClient] = useState("")
    const [clientData, setClientData] = useState({})
    const [serviceData, setServiceData] = useState([])
    const [serviceLoading, setServiceLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [modalData, setModalData] = useState({})
    const [journalData, setJournalData] = useState({})

    const history = useHistory();

    useEffect(() => {
      const clientsData = JSON.parse(localStorage.getItem('clients'))
      let arr = [];
      if(clientsData) {
        setClientsData(clientsData)
        clientsData.forEach(client => {
            arr.push(client.name)
        })
        setClients(arr)
      }
      
    }, [])

    useEffect(() => {
      if(Object.keys(modalData).length) setModalVisible(true)
      else setModalVisible(false)
    }, [modalData])

    const formatDate = (date) => {
        if(date) return new Date(date).toISOString().split('T')[0]
        else return ''
    }

    const getClientData = async (value) => {
      setClient(value.toUpperCase())
      const result = clientsData.find(item => item.name.toUpperCase() == value.toUpperCase())
      setServiceLoading(true)
      setClientData(result)
      await axios.get(`https://dscbackend.onrender.com/getservicedata?client=${value}`).then(res => {
        let _serviceData = []
        res.data.forEach(item => {
          _serviceData.push({
            id: item.recId,
            receivedOn: formatDate(item.datRec),
            handledOn: formatDate(item.datHan),
            reportedOn: formatDate(item.datRep),
            invoice: item.invoice,
            serial: item.serial,
            product: item.product
          })
        })
        setJournalData(res.data)
        setServiceData(_serviceData)
        console.log(res.data)
      }).catch(err => console.log(err) )
      setServiceLoading(false)

    }
    const onRowClick = (data) => {
      const imageUrls = JSON.parse(journalData[data.index].images)
      setModalData({...journalData[data.index], images: imageUrls})
      // setModalVisible(true)
    }

    const handleClick = () => {
      history.push('/admin/repairJournal');
    }
    
    const hideModal = () => {
      setModalData({})
    }
    return (
      <>
        <Modal show={modalVisible} animation={false} onHide={hideModal} size='xl' > 
          <Modal.Header>
            <Modal.Title>Journal Detail: ${modalData.recId}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Container fluid>
            <Row>
              <Card>
                <Card.Body>
                  <Form>
                      <Row>
                      <Col md="12">
                          <Row>
                              <Col className="px-3" md="3">
                              <Form.Group>
                                  <label className="font-weight-bold w-100 text-dark rounded">Received Date</label>
                                  <InputText disabled value={modalData.datRec&&formatDate(modalData.datRec)} className="w-100"/>
                              </Form.Group>
                              </Col>
                              <Col className="pr-3" md="3">
                              <Form.Group>
                                  <label className="font-weight-bold w-100 text-dark rounded">Handling Date</label>
                                  <InputText disabled value={modalData.datHan&&formatDate(modalData.datHan)}  className="w-100"/>
                              </Form.Group>
                              </Col>
                              <Col className="pr-3" md="3">
                              <Form.Group>
                                  <label className="font-weight-bold w-100 text-dark rounded">Report Date</label>
                                  <InputText disabled value={modalData.datRep&&formatDate(modalData.datRep)}  className="w-100"/>
                              </Form.Group>
                              </Col>
                              <Col className="pr-3" md="3" >
                              <Form.Group>
                                  <label className="font-weight-bold w-100 text-dark rounded">Person</label>
                                  <InputText 
                                      disabled value={modalData.person}
                                      className="w-100"   
                                  />
                              </Form.Group>
                              </Col>
                          </Row>
                          <Row className="align-items-center">
                              <Col className="px-3" md="2">
                                  <label className="font-weight-bold w-100 text-dark rounded">Customer</label>
                              </Col>
                              <Col  md="10">
                              <InputText 
                                  disabled value={modalData.client}
                                  className="w-100"/>
                              </Col>
                          </Row>
                          <Row>
                              <Col className="px-3" md="2">
                              <Form.Group>
                                  <label className="font-weight-bold w-100 text-dark rounded">Invoice</label>
                                  <InputText className="w-100" disabled value={modalData.invoice}/>
                              </Form.Group>
                              </Col>
                              <Col className="pr-3" md="4">
                              <Form.Group>
                                  <label className="font-weight-bold w-100 text-dark rounded">Serial</label>
                                  <InputText 
                                      disabled value={modalData.serial}   
                                      className="w-100"
                                  />
                              </Form.Group>
                              </Col>
                              <Col className="pr-3" md="4">
                              <Form.Group>
                                  <label className="font-weight-bold w-100 text-dark rounded">Product</label>
                                  <InputText 
                                      disabled value={modalData.product}
                                      className="w-100"
                                      />
                              </Form.Group>
                              </Col>
                              <Col className="pr-3" md="2">
                              <Form.Group>
                                  <label className="font-weight-bold w-100 text-dark rounded">Warranty</label>
                                  <InputText 
                                      disabled value={modalData.warranty}  
                                      className="w-100"
                                  />
                              </Form.Group>
                              </Col>
                          </Row>
                          <Row className="align-items-center">
                              <Col className="px-3" md="2">
                                  <label className="font-weight-bold w-100 text-dark rounded">Subject</label>
                              </Col>
                              <Col  md="10">
                              <InputText className="w-100" disabled value={modalData.subject} />
                              </Col>
                          </Row>
                          <Row className="align-items-center">
                              <Col className="px-3" md="2">
                                  <label className="font-weight-bold w-100 text-dark rounded">Customer Failur Description</label>
                              </Col>
                              <Col  md="10">
                                  <InputTextarea rows={2} className="w-100" disabled value={modalData.failurDesc} />
                              </Col>
                          </Row>
                          <Row className="align-items-center">
                              <Col className="px-3" md="2">
                                  <label className="font-weight-bold w-100 text-dark rounded">Class Malfunced</label>
                              </Col>
                              <Col  md="10">
                              <InputText 
                                      disabled value={modalData.malfunctioned}
                                      className="w-100"
                                  />
                              </Col>
                          </Row>
                          <Row className="align-items-center">
                              <Col className="px-3" md="2">
                                  <label className="font-weight-bold w-100 text-dark rounded">Defect Analysis</label>
                              </Col>
                              <Col  md="10">
                                  <InputTextarea className="w-100" rows={2} disabled value={modalData.defect} />
                              </Col>
                          </Row>
                          <Row className="align-items-center">
                              <Col className="px-3" md="2">
                                  <label className="font-weight-bold w-100 text-dark rounded">Comment</label>
                              </Col>
                              <Col  md="10">
                                  <InputTextarea className="w-100" rows={2} disabled value={modalData.comment} />
                              </Col>
                          </Row>
                          <Row className="align-items-center">
                              <Col className="px-3" md="2">
                                  <label className="font-weight-bold w-100 text-dark rounded">Analysis</label>
                              </Col>
                              <Col  md="10">
                                  <Row>
                                      <Col md="5" className="align-items-center" >
                                          <Checkbox 
                                              disabled checked={!!modalData.check1} 
                                              inputId="binary" 
                                              className="mr-2"/>
                                          <label className="font-weight-bold text-dark rounded">
                                              Unproper Lubrification
                                          </label>
                                      </Col>
                                      <Col md="4" className="align-items-center" >
                                          <Checkbox 
                                              disabled checked={!!modalData.check2} 
                                              inputId="binary" 
                                              className="mr-2"/>
                                          <label className="font-weight-bold text-dark rounded">
                                              Physical Damabe
                                          </label>
                                      </Col>
                                      <Col md="3" className="align-items-center" >
                                          <Checkbox 
                                              disabled checked={!!modalData.check3} 
                                              inputId="binary" 
                                              className="mr-2"/>
                                          <label className="font-weight-bold text-dark rounded">
                                              Device Failur
                                          </label>
                                      </Col>
                                  </Row> 
                                  <Row>  
                                      <Col md="5" className="align-items-center" >
                                          <Checkbox 
                                              disabled checked={!!modalData.check4} 
                                              inputId="binary" 
                                              className="mr-2"/>
                                          <label className="font-weight-bold text-dark rounded">
                                              Serious medical Failure
                                          </label>
                                      </Col>
                                      <Col md="4" className="align-items-center" >
                                          <Checkbox 
                                              disabled checked={!!modalData.check5} 
                                              inputId="binary" 
                                              className="mr-2"/>
                                          <label className="font-weight-bold text-dark rounded">
                                              User Failur
                                          </label>
                                      </Col>
                                  </Row>
                              </Col>
                          </Row>
                          <label className="font-weight-bold w-100 text-dark rounded">Image</label>
                          { modalData.images?
                            (modalData.images.map(image => (
                              <Image src={image} alt="Image" width='300' className="mx-3 my-3" preview />
                              
                            ))):<h5 className="text-center">No Image</h5>
                          }
                          <Row className="pt-4 mt-5">
                              <Col className="px-3" md="4">
                              <Form.Group>
                                  <label className="font-weight-bold w-100 text-dark rounded">Bearings</label>
                                  <InputText 
                                      disabled value={modalData.bearing}
                                      className="w-100"
                                  />
                              </Form.Group>
                              </Col>
                              <Col className="pr-3" md="4">
                              <Form.Group>
                                  <label className="font-weight-bold w-100 text-dark rounded">Chucks</label>
                                  <InputText 
                                      disabled value={modalData.chuck}
                                      className="w-100"
                                  />
                              </Form.Group>
                              </Col>
                              <Col className="pr-3" md="4">
                              <Form.Group>
                                  <label className="font-weight-bold w-100 text-dark rounded">WATERBLOCKAGE</label>
                                  <InputText 
                                      disabled value={modalData.waterblockage} 
                                      className="w-100"
                                  />
                              </Form.Group>
                              </Col>
                          </Row>
                          <Row>
                              <Col className="pr-3" md="6">
                              <Form.Group>
                                  <label className="font-weight-bold w-100 text-dark rounded">Lubrification</label>
                                  <InputText 
                                      disabled value={modalData.lubrification}
                                      className="w-100"
                                  />
                              </Form.Group>
                              </Col>
                              <Col className="pr-3" md="6">
                              <Form.Group>
                                  <label className="font-weight-bold w-100 text-dark rounded">Feasability</label>
                                  <InputText 
                                      disabled value={modalData.feasability}
                                      className="w-100"
                                  />
                              </Form.Group>
                              </Col>
                          </Row>
                      </Col>
                      </Row>
                    </Form>
                </Card.Body>
              </Card>
            </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={hideModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
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
                              <td className="col-xs-3 pb-0">Customer</td>
                              <td className="pb-0">
                                <Autocomplete freeSolo autoComplete autoHighlight 
                                  options={clients} 
                                  inputValue={client}
                                  onChange={(e, value) => getClientData(value)}
                                  renderInput={(params => ( 
                                      <div ref={params.InputProps.ref}>
                                          <input type="text" {...params.inputProps} 
                                          className="form-control"
                                          onChange={(e) => setClient(e.target.value)} 
                                      />
                                      </div>
                                  ))} />
                                </td>
                          </tr>
                          <tr>
                              <td className="col-xs-3 pb-0">Address</td>
                              <td className="pb-0"><Form.Control value={clientData.street}/></td>
                          </tr>
                          <tr>
                              <td className="col-xs-3 pb-0">Zip</td>
                              <td className="pb-0"><Form.Control value={clientData.postal}/></td>
                          </tr>
                          <tr>
                              <td className="col-xs-3 pb-0">Country</td>
                              <td className="pb-0"><Form.Control value={clientData.country}/></td>
                              {/* <td className="pb-0"><Dropdown className="w-100" value={country} onChange={(e) => setCountry(e.value)} options={countries} optionLabel="name" placeholder="Select country" /></td> */}
                          </tr>
                          
                          <tr>
                              <td className="col-xs-3 pb-0">State</td>
                              <td className="pb-0"><Form.Control value={clientData.province}/></td>
                              {/* <td className="pb-0"><Dropdown className="w-100" value={state} onChange={(e) => setState(e.value)} options={State.getStatesOfCountry(country.isoCode)} optionLabel="name" placeholder="Select state" /></td> */}
                          </tr>
                          <tr>
                              <td className="col-xs-3 pb-0">City</td>
                              <td className="pb-0"><Form.Control value={clientData.city}/></td>
                              {/* <td className="pb-0"><Dropdown className="w-100" value={city} onChange={(e) => setCity(e.value)} options={City.getCitiesOfState(country.isoCode, state.isoCode)} optionLabel="name" placeholder="Select city" /></td> */}
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
                  <CustomerServiceTable data={serviceData} loading={serviceLoading} onRowClick={onRowClick}/>
                </Card.Body>
                {/* <Card.Header className="text-center pt-5">
                  <Card.Title className="border-bottom pb-3"as="h4">Purchase Done</Card.Title>
                </Card.Header>
                <Card.Body>
                  <CustomerPurchaseTable data={purchaseData}/>
                </Card.Body> */}
              </Card>
            </Col>
          </Row>
          
        </Container>
      </>
    );
}

export default Customer;
