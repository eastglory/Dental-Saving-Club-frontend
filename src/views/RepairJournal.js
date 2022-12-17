import React, {useState, useRef} from "react";

// react-bootstrap components
import {
  Badge,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber'
import { InputTextarea} from 'primereact/inputtextarea'
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { Checkbox } from 'primereact/checkbox'

const warranties = [
    { label: "Yes", value: 0 },
    { label: "No", value: 1},
    { label: "WillBuyNow", value: 2},
]

const clients = [
    { label: "M Smile Line dental Clinic", value: 0},
    { label: "LEDUC GABRIEL DMD INC.", value: 1},
    { label: "BARTON DENTAL", value: 2},
    { label: "M Smile Line dental", value: 3},
    { label: "M Smile Line dental club", value: 4}
]
const waterBlockageList = [
    { label: "Yes", value: 0},
    { label: "No", value: 1},
]

const products = [
    { label: "MP5", value: 0},
    { label: "Light Gen", value: 1},
    { label: "6 PIN", value: 2},
    { label: "5 PIN", value: 3},
    { label: "WolfLight", value: 4}
]

const lubrificationList = [
    { label: "Adequate", value: 0 },
    { label: "Under lubricated", value: 1},
    { label: "Over lubricated", value: 2},
    { label: "None", value: 3},
]

const chucks = [
    { label: "GOOD RETENTION", value: 0},
    { label: "DOES NOT HOLD", value: 1},
    { label: "DOES NOT RELEASE", value: 2},
]

const bearings = [
    { label: "GOOD", value: 0},
    { label: "WORN", value: 1},
    { label: "CORRODED", value: 2},
]

const feasabilities = [
    { label: "REPAIRED", value: 0},
    { label: "NEW MIDSHAFT GEAR OR/AND NEW HEAD", value: 1},
    { label: "REPLACE HOUSING", value: 2},
    { label: "RETURNED AS IS", value: 3},
    { label: "DISPOSED", value: 4},
]

const classMulfunctionedList = [
    { label: "BATTERY", value: 0},
    { label: "BEARING", value: 1},
    { label: "CHUCK", value: 2},
    { label: "CHUCK BLOCKED", value: 3},
    { label: "GEAR", value: 4},
    { label: "HOUSING", value: 5},
]

function RepairJournal() {

    const [client, setClient] = useState(clients[0]);
    const [product, setProduct] = useState(products[0]);
    const [warranty, setWarranty] = useState(warranties[0]);
    const [chuck, setChuck] = useState(chucks[0]);
    const [bearing, setBearing] = useState(bearings[0]);
    const [waterBlockage, setWaterBlockage] = useState(waterBlockageList[0]);
    const [lubrification, setLubrification] = useState(lubrificationList[0]);
    const [feasability, setFeasability] = useState(feasabilities[0]);
    const [calssMulfunctioned, setCalssMulfunctioned] = useState(classMulfunctionedList[0]);
    const [totalSize, setTotalSize] = useState(0);
    const [unproperLubrificationChecked, setUnproperLubrificationChecked] = useState(false);
    const [physicalDamageChecked, setPhysicalDamageChecked] = useState(false);
    const [deviceFailur,setDeviceFailur] = useState(false);
    const [seriousMedicalFailur, setSeriousMedicalFailur] = useState(false);
    const [userFailur, setUserFailur] = useState(false);

    const toast = useRef(null);
    const fileUploadRef = useRef(null);

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        e.files.forEach(file => {
            _totalSize += file.size;
        });

        setTotalSize(_totalSize);
    }

    const onTemplateUpload = (e) => {
        let _totalSize = 0;
        e.files.forEach(file => {
            _totalSize += (file.size || 0);
        });

        setTotalSize(_totalSize);
        toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    }

    const onTemplateClear = () => {
        setTotalSize(0);
    }

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize/10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';
        // console.log(className);
        return (
            <div className={className} style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <ProgressBar value={value} displayValueTemplate={() => `${formatedValue} / 1 MB`} style={{width: '300px', height: '20px', marginLeft: 'auto'}}></ProgressBar>
            </div>
        );
    }

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{width: '40%'}}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        )
    }

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)'}}></i>
                <span style={{'fontSize': '1.2em', color: 'var(--text-color-secondary)'}} className="my-5">Drag and Drop Image Here</span>
            </div>
        )
    }

    const chooseOptions = {icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined'};
    const uploadOptions = {icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined'};
    const cancelOptions = {icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'};


    return (
    <>
      <Container fluid>
        <Row>
            <Card>
              <Card.Header>
                <Card.Title as="h4">Repair Journal</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                    <Row>
                    <Col md="7">
                        <Row>
                            <Col className="px-3" md="2">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">ID</label>
                                <InputText className="mw-100" />
                            </Form.Group>
                            </Col>
                            <Col className="pr-3" md="2">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">Received Date</label>
                                <Calendar value={new Date()}/>
                            </Form.Group>
                            </Col>
                            <Col className="pr-3" md="2">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">Handling Date</label>
                                <Calendar value={new Date()}/>
                            </Form.Group>
                            </Col>
                            <Col className="pr-3" md="2">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">Report Date</label>
                                <Calendar value={new Date()}/>
                            </Form.Group>
                            </Col>
                            <Col className="pr-3" md="4">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">Person</label>
                                <Dropdown 
                                    value={client}
                                    options={clients} 
                                    optionLabel="label" 
                                    optionValue="value" 
                                    placeholder="select"
                                    className="w-100"
                                    onChange={(e) => setClient(e.value)}    
                                />
                            </Form.Group>
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col className="px-3" md="2">
                                <label className="font-weight-bold w-100 text-dark rounded">Customer</label>
                            </Col>
                            <Col  md="10">
                            <InputText className="w-100" />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="px-3" md="2">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">Invoice</label>
                                <InputText className="w-100" />
                            </Form.Group>
                            </Col>
                            <Col className="pr-3" md="4">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">Serial</label>
                                <InputText className="w-100" />
                            </Form.Group>
                            </Col>
                            <Col className="pr-3" md="4">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">Product</label>
                                <Dropdown 
                                    value={product}
                                    options={products} 
                                    optionLabel="label" 
                                    optionValue="value" 
                                    placeholder="select"
                                    className="w-100"
                                    onChange={(e) => setProduct(e.value)}    
                                />
                            </Form.Group>
                            </Col>
                            <Col className="pr-3" md="2">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">Warranty</label>
                                <Dropdown 
                                    value={warranty}
                                    options={warranties} 
                                    optionLabel="label" 
                                    optionValue="value" 
                                    placeholder="select"
                                    className="w-100"
                                    onChange={(e) => setWarranty(e.value)}    
                                />
                            </Form.Group>
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col className="px-3" md="2">
                                <label className="font-weight-bold w-100 text-dark rounded">Subject</label>
                            </Col>
                            <Col  md="10">
                            <InputText className="w-100" />
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col className="px-3" md="2">
                                <label className="font-weight-bold w-100 text-dark rounded">Customer Failur Description</label>
                            </Col>
                            <Col  md="10">
                                <InputTextarea className="w-100" rows={2}/>
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col className="px-3" md="2">
                                <label className="font-weight-bold w-100 text-dark rounded">Class Malfunced</label>
                            </Col>
                            <Col  md="10">
                            <Dropdown 
                                    value={calssMulfunctioned}
                                    options={classMulfunctionedList} 
                                    optionLabel="label" 
                                    optionValue="value" 
                                    placeholder="select"
                                    className="w-100"
                                    onChange={(e) => setCalssMulfunctioned(e.value)}    
                                />
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col className="px-3" md="2">
                                <label className="font-weight-bold w-100 text-dark rounded">Defect Analysis</label>
                            </Col>
                            <Col  md="10">
                                <InputTextarea className="w-100" rows={2}/>
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col className="px-3" md="2">
                                <label className="font-weight-bold w-100 text-dark rounded">Comment</label>
                            </Col>
                            <Col  md="10">
                                <InputTextarea className="w-100" rows={2}/>
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
                                            checked={unproperLubrificationChecked} 
                                            onChange={(e) => setUnproperLubrificationChecked(e.checked)}
                                            inputId="binary" 
                                            className="mr-2"/>
                                        <label className="font-weight-bold text-dark rounded">
                                            Unproper Lubrification
                                        </label>
                                    </Col>
                                    <Col md="4" className="align-items-center" >
                                        <Checkbox 
                                            checked={physicalDamageChecked} 
                                            onChange={(e) => setPhysicalDamageChecked(e.checked)}
                                            inputId="binary" 
                                            className="mr-2"/>
                                        <label className="font-weight-bold text-dark rounded">
                                            Physical Damabe
                                        </label>
                                    </Col>
                                    <Col md="3" className="align-items-center" >
                                        <Checkbox 
                                            checked={deviceFailur} 
                                            onChange={(e) => setDeviceFailur(e.checked)}
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
                                            checked={seriousMedicalFailur} 
                                            onChange={(e) => setSeriousMedicalFailur(e.checked)}
                                            inputId="binary" 
                                            className="mr-2"/>
                                        <label className="font-weight-bold text-dark rounded">
                                            Serious medical Failure
                                        </label>
                                    </Col>
                                    <Col md="4" className="align-items-center" >
                                        <Checkbox 
                                            checked={userFailur} 
                                            onChange={(e) => setUserFailur(e.checked)}
                                            inputId="binary" 
                                            className="mr-2"/>
                                        <label className="font-weight-bold text-dark rounded">
                                            User Failur
                                        </label>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="5">
                        <label className="font-weight-bold w-100 text-dark rounded">Image</label>
                        <FileUpload 
                            ref={fileUploadRef} 
                            name="demo[]" 
                            multiple 
                            accept="image/*" 
                            maxFileSize={1000000}
                            onUpload={onTemplateUpload} 
                            onSelect={onTemplateSelect} 
                            onError={onTemplateClear} 
                            onClear={onTemplateClear}
                            headerTemplate={headerTemplate} 
                            itemTemplate={itemTemplate} 
                            emptyTemplate={emptyTemplate}
                            chooseOptions={chooseOptions} 
                            uploadOptions={uploadOptions} 
                            cancelOptions={cancelOptions} />
                            
                        <Row className="pt-4 mt-5">
                            <Col className="px-3" md="4">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">Bearings</label>
                                <Dropdown 
                                    value={bearing}
                                    options={bearings} 
                                    optionLabel="label" 
                                    optionValue="value" 
                                    placeholder="select"
                                    className="w-100"
                                    onChange={(e) => setBearing(e.value)}    
                                />
                            </Form.Group>
                            </Col>
                            <Col className="pr-3" md="4">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">Product</label>
                                <Dropdown 
                                    value={chuck}
                                    options={chucks} 
                                    optionLabel="label" 
                                    optionValue="value" 
                                    placeholder="select"
                                    className="w-100"
                                    onChange={(e) => setChuck(e.value)}    
                                />
                            </Form.Group>
                            </Col>
                            <Col className="pr-3" md="4">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">WATERBLOCKAGE</label>
                                <Dropdown 
                                    value={waterBlockage}
                                    options={waterBlockageList} 
                                    optionLabel="label" 
                                    optionValue="value" 
                                    placeholder="select"
                                    className="w-100"
                                    onChange={(e) => setWaterBlockage(e.value)}    
                                />
                            </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pr-3" md="6">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">Lubrification</label>
                                <Dropdown 
                                    value={lubrification}
                                    options={lubrificationList} 
                                    optionLabel="label" 
                                    optionValue="value" 
                                    placeholder="select"
                                    className="w-100"
                                    onChange={(e) => setLubrification(e.value)}    
                                />
                            </Form.Group>
                            </Col>
                            <Col className="pr-3" md="6">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">Warranty</label>
                                <Dropdown 
                                    value={feasability}
                                    options={feasabilities} 
                                    optionLabel="label" 
                                    optionValue="value" 
                                    placeholder="select"
                                    className="w-100"
                                    onChange={(e) => setFeasability(e.value)}    
                                />
                            </Form.Group>
                            </Col>
                        </Row>
                        
                        <Button
                            className="btn-fill pull-right float-right"
                            variant="info"
                        >
                            ADD
                        </Button>
                    </Col>
                    </Row>
                  </Form>
              </Card.Body>
            </Card>
        </Row>
      </Container>
    </>
  );
}

export default RepairJournal;
