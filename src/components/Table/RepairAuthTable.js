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

const RepairAuthTable = () => {
    const tableData = [
            {
                description: null,
                serial: null,
                invoice: null,
                dop: null,
                warranty: null,
                cost: null,
                authorised: null
            }
        ]
    const [data, setData] = useState(null);
    const toast = useRef(null);

    useEffect(() => {
        setData(tableData);
    }, [])

    // const columns = Object.keys(props.data[1]).map(key => {return {filed: key, header: key.toUpperCase()}});

    const descriptions = [
        { label: "MP5", value: "MP5"},
        { label: "Light Gen", value: "Light Gen"},
        { label: "6 PIN", value: 2},
        { label: "5 PIN", value: "5 PIN"},
        { label: "WolfLight", value: "WolfLight"},
        { label: "", value: null}
    ]

    const warranties = [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No"},
        { label: "WillBuyNow", value: "WillBuyNow"},
        { label: "", value: null}
    ]

    const costs = [
        { label: "Under paid repair", value: "Under paid repair" },
        { label: "To be determined", value: "To be determined"},
        { label: "No charge", value: "No charge"},
        { label: "", value: null}
    ]

    const authorisedList = [
        { label: "Pending", value: "Pending" },
        { label: "Authorised", value: "Authorised"},
        { label: "No-return as is", value: "No-return as is"},
        { label: "No-will buy new", value: "No-will buy new"},
        { label: "", value: null}
    ]

    const getDescriptionLabel = (description) => {
        return descriptions.find(item => item.value === description).label;
    }
    const descriptionBodyTemplate = (rowData) => {
        return getDescriptionLabel(rowData.description);
    }
    const getWarrantyLabel = (warranty) => {
        return warranties.find(item => item.value === warranty).label;
    }

    const warrantyBodyTemplate = (rowData) => {
        return getWarrantyLabel(rowData.warranty)
    }
    const getCostLabel = (cost) => {
        return costs.find(item => item.value === cost).label;
    }

    const costBodyTemplate = (rowData) => {
        return getCostLabel(rowData.cost);
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

        setData(_data);
    }

    const addRow = () => {
        let _data = [...data];
        _data.push({
            description: null,
            serial: null,
            invoice: null,
            dop: null,
            warranty: null,
            cost: null,
            authorised: null
        })
        setData(_data)
    }

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value || "")} />;
    }

    const descriptionEditor = (options) => {
        return (
            <Dropdown value={options.value} options={descriptions} optionLabel="label" optionValue="value"
                onChange={(e) => options.editorCallback(e.value)} placeholder="Select a description"
                itemTemplate={(option) => {
                    return <span>{option.label}</span>
                }} />
        );
    }
    
    const warrantyEditor = (options) => {
        return (
            <Dropdown value={options.value} options={warranties} optionLabel="label" optionValue="value"
                onChange={(e) => options.editorCallback(e.value)} placeholder="Select a warranty"
                itemTemplate={(option) => {
                    return <span>{option.label}</span>
                }} />
        );
    }

    const costEditor = (options) => {
        return (
            <Dropdown value={options.value} options={costs} optionLabel="label" optionValue="value"
                onChange={(e) => options.editorCallback(e.value)} placeholder="Select a cost"
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
                >
                    <Column field="description" header="Description" body={descriptionBodyTemplate} editor={(options) => descriptionEditor(options)}></Column>
                    <Column field="serial" header="Serial" editor={(options => textEditor(options))}></Column>
                    <Column field="invoice" header="Invoice" editor={(options => textEditor(options))} ></Column>
                    <Column field="dop" style={{"minWidth": '200px'}} header="D.O.P" editor={(options => datePickerEditor(options))} ></Column>
                    <Column field="warranty" header="Warranty" body={warrantyBodyTemplate} editor={(options) => warrantyEditor(options)} ></Column>
                    <Column field="cost" header="Cost" body={costBodyTemplate} editor={(options) => costEditor(options)} ></Column>
                    <Column field="authorised" header="Repair(s) Authorised" body={authorisedBodyTemplate} editor={(options) => authorisedEditor(options)} ></Column>
                    <Column header="Edit" rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                </DataTable>
                <Button icon="pi pi-plus" className="mt-0 w-100 p-button-raised p-button-text p-button-sm radius-0" onClick={addRow}/>
                
        </div>
    )
    
}

export default RepairAuthTable;

