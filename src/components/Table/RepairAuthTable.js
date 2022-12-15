import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Badge } from 'react-bootstrap';

const RepairAuthTable = (props) => {
    const [data, setData] = useState(null);
    const toast = useRef(null);

    useEffect(() => {
        console.log(props.data.data)
        setData(props.data.data);
    }, [])

    // const columns = Object.keys(props.data[1]).map(key => {return {filed: key, header: key.toUpperCase()}});

    const descriptions = [
        { label: "MP5", value: 0},
        { label: "Light Gen", value: 1},
        { label: "6 PIN", value: 2},
        { label: "5 PIN", value: 3},
        { label: "WolfLight", value: 4}
    ]

    const warranties = [
        { label: "Yes", value: 0 },
        { label: "No", value: 1},
        { label: "WillBuyNow", value: 2},
    ]

    const costs = [
        { label: "Under paid repair", value: 0 },
        { label: "To be determined", value: 1},
        { label: "No charge", value: 2},
    ]

    const authorisedList = [
        { label: "Pending", value: 0 },
        { label: "Authorised", value: 1},
        { label: "No-return as is", value: 2},
        { label: "No-will buy new", value: 3},
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

    return (
        <div className="datatable-editing-demo">
            <Toast ref={toast} />
                <DataTable value={data} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} resizableColumns columnResizeMode="expand" responsiveLayout="stack">
                    <Column field="description" header="Description" body={descriptionBodyTemplate} editor={(options) => descriptionEditor(options)}></Column>
                    <Column field="serial" header="Serial"></Column>
                    <Column field="invoice" header="Invoice"  ></Column>
                    <Column field="dop" header="D.O.P" ></Column>
                    <Column field="warranty" header="Warranty" body={warrantyBodyTemplate} editor={(options) => warrantyEditor(options)} ></Column>
                    <Column field="cost" header="Cost" body={costBodyTemplate} editor={(options) => costEditor(options)} ></Column>
                    <Column field="authorised" header="Repair(s) Authorised" body={authorisedBodyTemplate} editor={(options) => authorisedEditor(options)} ></Column>
                    <Column header="Edit" rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                </DataTable>
        </div>
    )
    
}

export default RepairAuthTable;

