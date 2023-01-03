import React, {useState, useRef, useEffect} from "react";

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
import { Autocomplete } from '@material-ui/lab';
import { Checkbox } from 'primereact/checkbox'
import axios from 'axios'

const warranties = [
    "Yes", 
    "No", 
    "WillBuyNow"
]

const persons = [
    "Plinio",
    "Chadi",
    "Sara",
    "Jurg",
    "Nicole"
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

const classMulfunctionedList = [
    "BATTERY",
    "BEARING",
    "CHUCK",
    "CHUCK BLOCKED",
    "GEAR",
    "HOUSING",
]

const products = [ 
    { label: 'EZSENSOR 1.0',
        description: 'HDI-S DIGITAL X RAY SENSOR #1.0' },
    { label: 'EZSENSOR 1.5',
        description: 'HDI-S DIGITAL X RAY SENSOR #1.5' },
    { label: 'EZSENSOR 2.0',
        description: 'HDI-S DIGITAL X RAY SENSOR #2.0' },
    { label: 'WBL-45', description: 'WOLF SURGICAL 45 DEG' },
    { label: 'WBL-KV-MED',
        description: 'WOlf Black Label High Speed Standard Head' },
    { label: 'WBL-KV-SMA',
        description: 'WOlf Black Label  Mini Head  Without coupler' },
    { label: 'WBL-NSK-MED',
        description: 'WOlf Black Label NSK Standard' },
    { label: 'WBL-NSK-SMAL',
        description: 'WOlf Black Label NSK Small' },
    { label: 'WNIN-KV-MEDL',
        description: 'WOLF NINJA KAVO STANDARD HEAD' },
    { label: 'WNIN-KV-SMAL',
        description: 'WOLF NINJA KAVO MINI  HEAD' },
    { label: 'WOLF1:1CA', description: 'WOLF 1:1 CONTRA ANGLE' },
    { label: 'WOLF16:1CA', description: 'WOLF 16:1 CONTRA ANGLE' },
    { label: 'WOLF16:1-H-ROT',
        description: 'WOLF 16:1 ROTATION HEAD' },
    { label: 'WOLF25', description: 'WOlf 25 K Air Motor' },
    { label: 'WOLF25KLED', description: 'WOLF 25K LED AIR MOTOR' },
    { label: 'WOLF4:1CA', description: 'WOLF 4:1 CONTRA ANGLE' },
    { label: 'WOLF-CFX', description: 'WOLF CURE FX CURING LIGHT' },
    { label: 'WOLFE',
        description: 'WOlf Electric Micromotor with Tablet' },
    { label: 'WOLFEIN', description: 'WOlf Internal Micro Motor' },
    { label: 'WOLF-HYG',
        description: 'WOLF HYGIENE HANDPIECE SLOW SPEED' },
    { label: 'WOLF-LUBRICATOR-2HS',
        description: 'WOLF Lubricator - Lubrication machine- 2 High Speed' },
    { label: 'WOLF-LUBRICATOR-2SS',
        description: 'Wolf Lubricator machine - 2 Slow Spped adaptors' },
    { label: 'WOLF-LUBRICATOR-OIL',
        description: 'WOlf Oil 1 liter' },
    { label: 'WOLFPBH',
        description: 'WOLF PUSH BUTTON BALL BEARING HEAD' },
    { label: 'WOLFREDX',
        description: 'WOLF RED X  1:5 HIGH SPEED ELECTRIC' },
    { label: 'WOLF-SCALATRON',
        description: 'WOLF SCALATRON Magnetostrictive Ultrasonic Scaler' },
    { label: 'WOLFSIH', description: 'WOLF SCREW IN PROPHY HEAD' },
    { label: 'WOLFSLH', description: 'WOLF STANDARD LATCH HEAD' },
    { label: 'WOLFSNAPON', description: 'WOlf SNAP ON HEAD' },
    { label: 'WPL-KV-MEDL',
        description: 'WOlf Platinum Label  Standard KAVO with Light' },
    { label: 'WPL-KV-SMAL',
        description: 'WOlf Platinum Label Mini KAVO with Light' },
    { label: 'WPL-NSK-MEDL',
        description: 'WOlf Platinum Label  Standard NSK with Light' },
    { label: 'WPL-NSK-SMAL',
        description: 'WOLF Platinum Label  small NSK with light' },
    { label: 'WR-B-FG', description: 'Wolf Blue Ring 1:1 FG' },
    { label: 'WR-B-FG-H', description: 'Wolf Blue Ring FG PBHead' },
    { label: 'WR-B-FG-LED',
        description: 'Wolf Blue Ring 1:1 FG LED' },
    { label: 'WR-B-RA', description: 'Wolf Blue Ring 1:1 RA' },
    { label: 'WR-B-RA-H', description: 'Wolf Blue Ring Ra Head' },
    { label: 'WR-B-RA-H1',
        description: 'Wolf Blue Ring RA PB Head' },
    { label: 'WR-B-RA-LED',
        description: 'WOLF Blue Ring RA LED 1:1' },
    { label: 'WR-G-FG', description: 'WOLF GREENRING4.1 FG HP' },
    { label: 'WR-G-RA', description: 'WOlf Green Ring 4:1 Ratio' },
    { label: 'WR-G-RA-LED', description: 'WOlf Green Ring 4:1 LED' },
    { label: 'WR-GREY', description: 'Wolf Grey Ring Straight HP.' },
    { label: 'WR-G-SI-H',
        description: 'WOLF GREEN RING SCREW HEAD' },
    { label: 'WSL-5H-MED',
        description: 'WOlf Silver Label 5 Hole No Light' },
    { label: 'WSL-5H-MEDL',
        description: 'WOlf Silver Label 5 Hole with Light' },
    { label: 'WSL-5H-SMA',
        description: 'WOlf Silver Label 5 Hole Small No Light' },
    { label: 'WSL-5H-SMAL',
        description: 'WOlf Silver Label 5 Hole Small with Light' },
    { label: 'WSL-KV-MED',
        description: 'WOlf Silver Label Standard KAVO No Light' },
    { label: 'WSL-KV-MEDL',
        description: 'WOlf Silver Label Standard KAVO with Light' },
    { label: 'WSL-KV-SMA',
        description: 'WOlf Silver Label Mini head KAVO No Light' },
    { label: 'WSL-KV-SMAL',
        description: 'WOlf Silver Label Mini Head KAVO with Light' },
    { label: 'WSL-MED-TUR',
        description: 'WOLF SILVER LABEL STANDARD TURBINE' },
    { label: 'WSL-NSK-MED',
        description: 'WOlf Silver Label Standard NSK No Light' },
    { label: 'WSL-NSK-MEDL',
        description: 'WOlf Silver Label Standard NSK with Light' },
    { label: 'WSL-NSK-SMA',
        description: 'WOlf Silver Label Mini NSK NO LIGHT' },
    { label: 'WSL-NSK-SMAL',
        description: 'WOlf Silver Label Mini NSK with Light' } 
]

function RepairJournal() {

    const [client, setClient] = useState("");
    const [clients, setClients] = useState([])
    const [person, setPerson] = useState(null)
    const [product, setProduct] = useState("");
    const [warranty, setWarranty] = useState(warranties[0]);
    const [chuck, setChuck] = useState(chucks[0]);
    const [bearing, setBearing] = useState(bearings[0]);
    const [waterBlockage, setWaterBlockage] = useState(waterBlockageList[0]);
    const [lubrification, setLubrification] = useState(lubrificationList[0]);
    const [feasability, setFeasability] = useState(feasabilities[0]);
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3,setCheck3] = useState(false);
    const [check4, setCheck4] = useState(false);
    const [check5, setCheck5] = useState(false);
    const [invoice, setInvoice] = useState(null)
    const [serial, setSerial] = useState(null)
    const [subject, setSubject] = useState(null)
    const [failurDescription, setFailurDescription] = useState(null)
    const [malfunctioned, setMalfunctioned] = useState(null)
    const [defectAnalysis, setDefectAnalysis] = useState(null)
    const [comment, setComment] = useState(null)
    const [datRec, setDatRec] = useState('')
    const [datHan, setDatHan] = useState("")
    const [datRep, setDatRep] = useState("")
    const [serials, setSerials] = useState([])
    const [recId, setRecId] = useState(null)
    const [adding, setAdding] = useState(false)
    const [searchLoading, setSearchLoading] = useState(false)
    const [files, setFiles] = useState([])
    const [urls, setUrls] = useState([])

    const fileUploadRef = useRef(null);
    const toast = useRef(null);

    useEffect(() => {
        const clientsData = JSON.parse(localStorage.getItem('clients'))
        let arr = [];
        if(clientsData) {
            clientsData.forEach(client => {
                arr.push(client.name)
            })
            setClients(arr)
        }
        
    }, [])
    
    const formatDate = (date) => {
            return new Date(date).toISOString().split('T')[0]
    }

    const addData = async () => {
        setAdding(true)

        const uploaders = files.map(file => {
            const formData = new FormData();
            const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dxyshl8cm/image/upload";
            formData.append("file", file);
            formData.append("upload_preset", process.env.REACT_APP_CLOUD_PRESET_NAME)
            formData.append('cloud_name', process.env.REACT_APP_CLOUD_NAME)
            console.log(process.env.REACT_APP_CLOUD_NAME)

            return axios.post(cloudinaryUrl, formData).then(res => {
                const data = res.data
                const url = data.secure_url
                let _urls = urls;
                _urls.push(url)
                setUrls(_urls)
            })
        })

        axios.all(uploaders).then(() => {
            const formData = new FormData()
            const body = {
                datRec: formatDate(datRec),
                datHan: formatDate(datHan),
                datRep: formatDate(datRep),
                person,
                client,
                invoice,
                serial,
                product,
                warranty,
                subject,
                failurDescription,
                malfunctioned,
                defectAnalysis,
                comment,
                check1,
                check2,
                check3,
                check4,
                check5,
                bearing,
                chuck,
                waterBlockage,
                lubrification,
                feasability,
                images: JSON.stringify(urls)
            }


            axios.post('https://dscbackend.onrender.com/setRepairJournal', body)
                .then(res => {
                    // localStorage.setItem('tray', JSON.stringify(res.data))
                    // setData(res.data)
                    toast.current.show({severity: 'success', summary: 'Updated Successfully!', detail: `${res}`})
                    // setLoading(false)
                    console.log(res.data)
                    setAdding(false)

                })
                .catch(err => {
                    toast.current.show({severity: 'error', summary: 'Error!', detail: `${err}`})
                    setAdding(false)
                    console.log(err)
                })
        })
        
    }

    const searchByRecId = async () => {
        setSearchLoading(true)
    
        const tray = JSON.parse(localStorage.getItem("tray"))
        const result = tray.find(item => item.recId == recId)
        if(result)
          {
            setClient(result.client)
            const [mon, day, yeartray] = recId.split('-')
            const year = yeartray.slice(0,4)
            const tray = yeartray.slice(4)
            setDatRec(new Date(`${mon}-${day}-${year}`))
            await axios.get(`https://dscbackend.onrender.com/getserialsfromrecid?recId=${recId}`)
                .then(res => {
                    let arr = []
                    res.data.forEach(item => arr.push(item.serial))
                    setSerials(arr)
                })
                .catch(err => console.log(err) )
          }
          else {
            setClient(null)
            setSplitRecId("")
          }
        setSearchLoading(false)
    }

    const onTemplateSelect = (e) => {
        let _files = files;
        const selectedFiles = Object.values(e.files)
        selectedFiles.forEach(file => {
            _files.push(file)
        });

        console.log(_files)


        setFiles(_files);
    }

    const onTemplateRemove = (file, callback) => {
        const _files = files
        _files.splice(files.indexOf(file), 1)
        setFiles(_files)
        callback();
    }

    const onTemplateClear = () => {
        setFiles([])
    }

    const headerTemplate = (options) => {
        const { className, chooseButton, cancelButton } = options;
        return (
            <div className={className} style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
                {chooseButton}
                {cancelButton}
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
    const cancelOptions = {icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'};


    return (
    <>
      <Container fluid>
        <Toast ref={toast} />
        <Row>
            <Card>
              <Card.Header className="d-flex flex-column justify-content-center">
                <Card.Title className="text-center" as="h4">Repair Journal</Card.Title>
                <div className="d-flex flex-row mx-auto mt-3 ">
                  <InputText
                    className="text-center" 
                    value={recId} 
                    placeholder="Type Rec Id..." 
                    onChange={(e) => {setRecId(e.target.value)}}
                  ></InputText>
                  <Button label="Search" loading={searchLoading} onClick={searchByRecId}/>
                </div>
              </Card.Header>
              <Card.Body>
                <Form>
                    <Row>
                    <Col md="7">
                        <Row>
                            <Col className="px-3" md="3">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">Received Date</label>
                                <Calendar value={datRec} onChange={e => setDatRec(e.value)}/>
                            </Form.Group>
                            </Col>
                            <Col className="pr-3" md="3">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">Handling Date</label>
                                <Calendar value={datHan} onChange={e => setDatHan(e.value)}/>
                            </Form.Group>
                            </Col>
                            <Col className="pr-3" md="3">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">Report Date</label>
                                <Calendar value={datRep} onChange={e => setDatRep(e.value)}/>
                            </Form.Group>
                            </Col>
                            <Col className="pr-3" md="3">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">Person</label>
                                <Dropdown 
                                    value={person}
                                    options={persons} 
                                    placeholder="select"
                                    className="w-100"
                                    onChange={(e) => setPerson(e.value)}    
                                />
                            </Form.Group>
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col className="px-3" md="2">
                                <label className="font-weight-bold w-100 text-dark rounded">Customer</label>
                            </Col>
                            <Col  md="10">
                            <Autocomplete freeSolo autoComplete autoHighlight 
                                options={clients} 
                                inputValue={client}
                                onChange={(e, value) => setClient(value.toUpperCase())}
                                renderInput={(params => ( 
                                    <div ref={params.InputProps.ref}>
                                        <input type="text" {...params.inputProps} 
                                        className="w-100 p-inputtext p-component p-filled p-inputnumber-input"
                                        onChange={(e) => setClient(e.target.value)}/>
                                    </div>
                            ))} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="px-3" md="2">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">Invoice</label>
                                <InputText className="w-100" value={invoice} onChange={e => setInvoice(e.target.value)}/>
                            </Form.Group>
                            </Col>
                            <Col className="pr-3" md="4">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">Serial</label>
                                <Dropdown 
                                    value={serial}
                                    options={serials} 
                                    placeholder="select"
                                    className="w-100"
                                    onChange={(e) => setSerial(e.value)}    
                                />
                            </Form.Group>
                            </Col>
                            <Col className="pr-3" md="4">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">Product</label>
                                <Autocomplete freeSolo autoComplete autoHighlight 
                                    options={products.map(product => {return product.label})} 
                                    inputValue={product}
                                    onChange={(e, value) => setProduct(value)}
                                    renderInput={(params => ( 
                                        <div ref={params.InputProps.ref}>
                                            <input type="text" {...params.inputProps} 
                                            className="p-inputtext p-component p-filled p-inputnumber-input"
                                            onChange={(e) => setProduct(e.target.value)}/>
                                        </div>
                                    ))} />
                            </Form.Group>
                            </Col>
                            <Col className="pr-3" md="2">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">Warranty</label>
                                <Dropdown 
                                    value={warranty}
                                    options={warranties} 
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
                            <InputText className="w-100" value={subject} onChange={e => setSubject(e.target.value)}/>
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col className="px-3" md="2">
                                <label className="font-weight-bold w-100 text-dark rounded">Customer Failur Description</label>
                            </Col>
                            <Col  md="10">
                                <InputTextarea className="w-100" rows={2} value={failurDescription} onChange={e => setFailurDescription(e.target.value)}/>
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col className="px-3" md="2">
                                <label className="font-weight-bold w-100 text-dark rounded">Class Malfunced</label>
                            </Col>
                            <Col  md="10">
                            <Dropdown 
                                    value={malfunctioned}
                                    options={classMulfunctionedList} 
                                    placeholder="select"
                                    className="w-100"
                                    onChange={(e) => setMalfunctioned(e.value)}    
                                />
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col className="px-3" md="2">
                                <label className="font-weight-bold w-100 text-dark rounded">Defect Analysis</label>
                            </Col>
                            <Col  md="10">
                                <InputTextarea className="w-100" rows={2} value={defectAnalysis} onChange={e => setDefectAnalysis(e.target.value)}/>
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col className="px-3" md="2">
                                <label className="font-weight-bold w-100 text-dark rounded">Comment</label>
                            </Col>
                            <Col  md="10">
                                <InputTextarea className="w-100" rows={2} value={comment} onChange={e => setComment(e.target.value)}/>
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
                                            checked={check1} 
                                            onChange={(e) => setCheck1(e.checked)}
                                            inputId="binary" 
                                            className="mr-2"/>
                                        <label className="font-weight-bold text-dark rounded">
                                            Unproper Lubrification
                                        </label>
                                    </Col>
                                    <Col md="4" className="align-items-center" >
                                        <Checkbox 
                                            checked={check2} 
                                            onChange={(e) => setCheck2(e.checked)}
                                            inputId="binary" 
                                            className="mr-2"/>
                                        <label className="font-weight-bold text-dark rounded">
                                            Physical Damabe
                                        </label>
                                    </Col>
                                    <Col md="3" className="align-items-center" >
                                        <Checkbox 
                                            checked={check3} 
                                            onChange={(e) => setCheck3(e.checked)}
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
                                            checked={check4} 
                                            onChange={(e) => setCheck4(e.checked)}
                                            inputId="binary" 
                                            className="mr-2"/>
                                        <label className="font-weight-bold text-dark rounded">
                                            Serious medical Failure
                                        </label>
                                    </Col>
                                    <Col md="4" className="align-items-center" >
                                        <Checkbox 
                                            checked={check5} 
                                            onChange={(e) => setCheck5(e.checked)}
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
                            onSelect={onTemplateSelect} 
                            onError={onTemplateClear} 
                            onClear={onTemplateClear}
                            headerTemplate={headerTemplate} 
                            itemTemplate={itemTemplate} 
                            emptyTemplate={emptyTemplate}
                            chooseOptions={chooseOptions} 
                            cancelOptions={cancelOptions} />
                            
                        <Row className="pt-4 mt-5">
                            <Col className="px-3" md="4">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">Bearings</label>
                                <Dropdown 
                                    value={bearing}
                                    options={bearings} 
                                    placeholder="select"
                                    className="w-100"
                                    onChange={(e) => setBearing(e.value)}    
                                />
                            </Form.Group>
                            </Col>
                            <Col className="pr-3" md="4">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">Chucks</label>
                                <Dropdown 
                                    value={chuck}
                                    options={chucks} 
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
                                    placeholder="select"
                                    className="w-100"
                                    onChange={(e) => setLubrification(e.value)}    
                                />
                            </Form.Group>
                            </Col>
                            <Col className="pr-3" md="6">
                            <Form.Group>
                                <label className="font-weight-bold w-100 text-dark rounded">Feasability</label>
                                <Dropdown 
                                    value={feasability}
                                    options={feasabilities} 
                                    placeholder="select"
                                    className="w-100"
                                    onChange={(e) => setFeasability(e.value)}    
                                />
                            </Form.Group>
                            </Col>
                        </Row>
                    </Col>
                    </Row>
                  </Form>
                  <Button className="mx-3 btn-fill float-right" variant="info" onClick={addData} loading={adding} >Save</Button>
                  <Button className="mx-3 btn-fill float-right" variant="info" /*onClick={addData} loading={adding}*/ >Print</Button>
              </Card.Body>
            </Card>
        </Row>
      </Container>
    </>
  );
}

export default RepairJournal;
