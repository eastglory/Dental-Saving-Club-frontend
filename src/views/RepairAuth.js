import React, {useState} from "react";

// react-bootstrap components
import {
  Badge,
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
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from "primereact/dropdown";
import { InputTextarea} from"primereact/inputtextarea"
import { InputMask } from "primereact/inputmask"
import { InputText } from 'primereact/inputtext'
import RepairAuthTable from "components/Table/RepairAuthTable";
import JsPDF from 'jspdf'
import html2canvas from 'html2canvas'



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
  const [recId, setRecId] = useState(null)
  const [searchLoading, setSearchLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [client, setClient] = useState(null)
  const [splitRecId, setSplitRecId] = useState("")

  const searchByRecId = () => {
    setSearchLoading(true)
    setSelectValue1(null);
    setSelectValue2(null);
    setStatus(null);
    setReporter(null);
    setInstruction(null);

    console.log(recId)
    const clients = JSON.parse(localStorage.getItem("clients"))
    console.log(clients)
    const tray = JSON.parse(localStorage.getItem("tray"))
    console.log(tray)
    const result = tray.find(item => item.recId == recId)
    console.log(result)
    if(result)
      {
        const client = clients.find(client => client.name.toUpperCase() == result.client)
        const clientData = {
          "Customer Name": client.name,
          "Country": client.country,
          "Province/City": `${client.city}, ${client.province}`,
          "Street": client.street,
          "Postal code": client.postal,
          "Telephone": client.phone
        }
        setClient(clientData)
        const [mon, day, yeartray] = recId.split('-')
        const year = yeartray.slice(0,4)
        const tray = yeartray.slice(4)
        setSplitRecId(`Received On: ${mon}-${day}-${year}, Tray-${tray}`)
      }
      else {
        setClient(null)
        setSplitRecId("")
      }
    setSearchLoading(false)
  }

  const export2Pdf = async () => {
    setSaving(true)
    const pdf = new JsPDF('portrait', 'pt', 'a4')
    const data = await html2canvas(document.querySelector('#AuthReport'))
    const img = data.toDataURL("image/png")
    const imgProperties = pdf.getImageProperties(img)
    const pdfWidth = pdf.internal.pageSize.getWidth(img)
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight)
    pdf.save('RepairAuth.pdf')
    setSaving(false)
  }

  return (
    <div >
      <Container fluid>
        <Row id="AuthReport">
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header className="d-flex flex-column justify-content-center">
                <Card.Title className="text-center" as="h4">Commnication Log & Repair Authorization</Card.Title>
                <div className="d-flex flex-row mx-auto mt-3 ">
                  <InputText
                    className="text-center" 
                    value={recId} 
                    placeholder="Type Rec Id..." 
                    onChange={(e) => {setRecId(e.target.value)}}
                  ></InputText>
                  <Button label="Search" loading={searchLoading} onClick={searchByRecId}/>
                </div>
                <p className="text-right mb-0">{splitRecId}</p>
                
                {/* <InputGroup size="sm" className="mb-3 mx-auto pt-2 w-25">
                  <InputGroup.Text id="basic-addon1" className="p-0 bg-white border-0">Recieved on: </InputGroup.Text>
                  <Calendar  inputStyle={{padding: 0, "maxWidth":"8rem" }}value={new Date()}></Calendar>
                  <Form.Control />
                </InputGroup> */}
              </Card.Header>
                <hr></hr>
              <Card.Body className="table-full-width table-responsive px-0">
                {client?
                  (<Table className='w-50'>
                    <tbody>
                      {Object.keys(client).map(item => {
                        return (
                          <tr key={item}>
                            <td  className="font-weight-bold border-0 ">{item}</td>
                            <td  className="border-0">{client[item]}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>):
                  <h3 className="text-center">Not Found</h3>
                } 
                <div className="pt-5 d-flex flex-row align-items-center">
                  <label className="font-weight-bold text-dark col-sm-2 ">Quote On: </label>
                  <Calendar value={new Date()}></Calendar>
                  <label className="font-weight-bold text-dark ml-5 mr-3">via:</label>
                  <Dropdown value={selectValue1} onChange={(e)=>setSelectValue1(e.value)} options={[{name: 'email'}, {name: 'phone'}, {name: 'other'}]} optionLabel="name" placeholder="Select" />
                </div>
                <div className="pt-2 d-flex flex-row align-items-center">
                  <label className="font-weight-bold text-dark col-sm-2 ">Follow Up On: </label>
                  <Calendar value={""}></Calendar>
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
                <RepairAuthTable  />
                
              </Card.Body>
            </Card>
          </Col>
          <Col md="12" className="d-flex flex-row justify-content-end">
            <Card.Body>
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
          </Col>
          
        </Row>
        <Col md="12" className="d-flex flex-row justify-content-end">
            <Button className="mx-3" label="Save" loading={saving} onClick={export2Pdf}/>
            <Button className="mx-3" label="Email" loading={searchLoading} />
            <Button className="mx-3" label="Print" loading={searchLoading} />
          </Col>
      </Container>
    </div>
  );
}

export default RepairAuth;
