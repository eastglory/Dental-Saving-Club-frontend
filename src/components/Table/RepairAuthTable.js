import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Badge } from 'react-bootstrap';
import { Calendar } from 'primereact/calendar'
import { Autocomplete } from '@material-ui/lab';


const descriptions = [ 
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
const warranties = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No"},
    { label: "Ext.Warranty", value: "ExtWarranty"},
    { label: "", value: null}
]

const authorisedList = [
    { label: "Pending", value: "Pending" },
    { label: "Authorised", value: "Authorised"},
    { label: "No-return as is", value: "No-return as is"},
    { label: "No-will buy new", value: "No-will buy new"},
    { label: "", value: null}
]

const RepairAuthTable = () => {
    const tableData = [
            {
                description: "",
                serial: null,
                invoice: null,
                dop: "",
                warranty: null,
                cost: 0,
                authorised: null
            }
        ]
    const [data, setData] = useState(null);
    const [costEditorDisabled, setCostEditorDisabled] = useState(true)
    const [totalCost, setTotalCost] = useState(0)
    const toast = useRef(null);

    useEffect(() => {
        setData(tableData);
    }, [])

 


    // const columns = Object.keys(props.data[1]).map(key => {return {filed: key, header: key.toUpperCase()}});

    const getWarrantyLabel = (warranty) => {
        return warranties.find(item => item.value === warranty).label;
    }

    const warrantyBodyTemplate = (rowData) => {
        return getWarrantyLabel(rowData.warranty)
    }
    const getCostLabel = (cost) => {
        return costs.find(item => item.value === cost).label;
    }

    const getAuthorisedLabel = (authorised) => {
        return authorisedList.find(item => item.value === authorised).label;
    }
    const authorisedBodyTemplate = (rowData) => {
        return getAuthorisedLabel(rowData.authorised);
    }


    const onRowEditComplete = (e) => {
        let _data = [...data];
        let {newData, index } = e;

        _data[index] = newData;

        let _totalCost = 0
        _data.forEach((data) => _totalCost += data.cost)

        setTotalCost(_totalCost)
        setData(_data);
    }

    const addRow = () => {
        let _data = [...data];
        _data.push({
            description: "",
            serial: null,
            invoice: null,
            dop: "",
            warranty: null,
            cost: 0,
            authorised: null
        })
        setData(_data)
    }

    const textEditor = (options) => {
        return <InputText value={options.value} onChange={(e) => options.editorCallback(e.target.value || "")} />;
    }

    const descriptionEditor = (options) => {
        return (
            <Autocomplete freeSolo autoComplete autoHighlight 
                options={descriptions.map(description => {return description.label})} 
                inputValue={options.value}
                onChange={(e, value) => options.editorCallback(value)}
                renderInput={(params => ( 
                    <div ref={params.InputProps.ref}>
                        <input type="text" {...params.inputProps} 
                        className="p-inputtext p-component p-filled p-inputnumber-input"
                        onChange={(e) => options.editorCallback(e.target.value)}/>
                    </div>
                  ))} />
        );
    }
    
    const warrantyEditor = (options) => {
        const onChangeHandler = (e) => {
            if(e.value == "No") setCostEditorDisabled(false)
            else setCostEditorDisabled(true)
            options.editorCallback(e.value)
        }
        return (
            <Dropdown value={options.value} options={warranties} optionLabel="label" optionValue="value"
                onChange={onChangeHandler} placeholder="Select a warranty"
                itemTemplate={(option) => {
                    return <span>{option.label}</span>
                }} />
        );
    }


    const authorisedEditor = (options) => {
        return (
            <Dropdown value={options.value} options={authorisedList} optionLabel="label" optionValue="value"
                onChange={(e) => options.editorCallback(e.value)} placeholder="Select a authorisation"
                itemTemplate={(option) => {
                    return <span>{option.label}</span>
                }} />
        );
    }
    const datePickerEditor = (options) => {
        return (
            <Calendar className="mw-100" value={new Date(options.value || "")} onChange={(e) => {options.editorCallback(e.value.toLocaleDateString().replaceAll('/', '-'))} }/>
        )
    }

    const costBodyTemplate = (rowData) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rowData.cost);
    }

    const costEditor = (options) => {
        return <InputNumber value={options.value} disabled={costEditorDisabled} onValueChange={(e) => {console.log(e.value); options.editorCallback(e.value)}} mode="currency" currency="USD" locale="en-US" />
    }

    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

    return (
        <div className="datatable-editing-demo">
            <Toast ref={toast} />
                <DataTable 
                    value={data} 
                    editMode="row" 
                    dataKey="id" 
                    onRowEditComplete={onRowEditComplete} 
                    resizableColumns 
                    columnResizeMode="expand" 
                    responsiveLayout="stack" 
                    selectionAutoFocus={false}
                    paginatorRight={paginatorRight}
                >
                    <Column field="description" header="Description" editor={(options) => descriptionEditor(options)}></Column>
                    <Column field="serial" header="Serial" editor={(options => textEditor(options))}></Column>
                    <Column field="invoice" header="Invoice" editor={(options => textEditor(options))} ></Column>
                    <Column field="dop" style={{"minWidth": '200px'}} header="D.O.P" editor={(options => datePickerEditor(options))} ></Column>
                    <Column field="warranty" header="Warranty" body={warrantyBodyTemplate} editor={(options) => warrantyEditor(options)} ></Column>
                    <Column field="cost" header="Cost" body={costBodyTemplate} editor={(options) => costEditor(options)} ></Column>
                    <Column field="authorised" header="Repair(s) Authorised" body={authorisedBodyTemplate} editor={(options) => authorisedEditor(options)} ></Column>
                    <Column header="Edit" rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                </DataTable>
                <Button icon="pi pi-plus" className="mt-0 w-100 p-button-raised p-button-text p-button-sm radius-0" onClick={addRow}/>
                <p className="text-right mt-3">Total cost: ${totalCost.toFixed(2)}</p>
                
        </div>
    )
    
}

export default RepairAuthTable;

