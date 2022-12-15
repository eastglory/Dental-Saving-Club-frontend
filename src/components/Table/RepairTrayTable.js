import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar'
import { Badge } from 'react-bootstrap';

const RepairTrayTable = (products) => {
    console.log(products)
    const [data, setData] = useState(null);
    const [editingRows, setEditingRows] = useState({});
    const toast = useRef(null);

    useEffect(() => {
        setData(products.products.data);
    }, [])

    const columns = Object.keys(products.products.data[1]).map(key => {return {filed: key, header: key.toUpperCase()}});

    const clients = [
        { label: "M Smile Line dental Clinic", value: 0},
        { label: "LEDUC GABRIEL DMD INC.", value: 1},
        { label: "BARTON DENTAL", value: 2},
        { label: "M Smile Line dental", value: 3},
        { label: "M Smile Line dental club", value: 4}
    ]

    const locations = [
        { label: "Billy", value: "BILLY" },
        { label: "OutSourced", value: "OUTSORCED"}
    ]

    const statuses = [
        { label: "Completed", value: "COMPLETED", badge: "success"},
        { label: "Under Review", value: "UNDERREVIEW", badge: "warning"},
        { label: "Pending", value: "PENDING", badge: "info"},
        { label: "Quoted", value: "QUOTED", badge: "danger"},
        { label: "In Progress", value: "INPROGRESS", badge: "primary"}
    ]

    const getStatusLabel = (status) => {
        return statuses.find(item => item.value === status);
    }

    const getLocationLabel = (location) => {
        return locations.find(item => item.value === location).label;
    }

    const getClientLabel = (client) => {
        return clients.find(item => item.value === client).label;
    }

    const onRowEditComplete = (e) => {
        let _data = [...data];
        console.log(e)
        let {newData, index } = e;
        _data[index] = {...newData, receptionDate: newData.receptionDate.toLocaleDateString()};

        setData(_data);
    }

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }

    const statusEditor = (options) => {
        return (
            <Dropdown value={options.value} options={statuses} optionLabel="label" optionValue="value"
                onChange={(e) => options.editorCallback(e.value)} placeholder="Select a Status"
                itemTemplate={(option) => {
                    return <span>{option.label}</span>
                }} />
        );
    }
    
    const clientEditor = (options) => {
        return (
            <Dropdown value={options.value} options={clients} optionLabel="label" optionValue="value"
                onChange={(e) => options.editorCallback(e.value)} placeholder="Select a Client"
                itemTemplate={(option) => {
                    return <span>{option.label}</span>
                }} />
        );
    }

    const locationEditor = (options) => {
        return (
            <Dropdown value={options.value} options={locations} optionLabel="label" optionValue="value"
                onChange={(e) => options.editorCallback(e.value)} placeholder="Select a Status"
                itemTemplate={(option) => {
                    return <span>{option.label}</span>
                }} />
        );
    }
    const datePickerEditor = (options) => {
        return (
            <Calendar value={new Date(options.value)} onChange={(e) => options.editorCallback(e.value)} />
        )
    }

    const statusBodyTemplate = (rowData) => {
        return <Badge bg={`${getStatusLabel(rowData.status).badge}`} text="white">{getStatusLabel(rowData.status).label}</Badge>
    }

    const clientBodyTemplate = (rowData) => {
        return getClientLabel(rowData.client);
    }

    const locationBodyTemplate = (rowData) => {
        return getLocationLabel(rowData.location);
    }

    return (
        <div className="datatable-editing-demo">
            <Toast ref={toast} />
                <DataTable value={data} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} resizableColumns columnResizeMode="expand" responsiveLayout="stack">
                    <Column field="tray" header="Tray"  style={{ width: '2%' }}></Column>
                    <Column field="client" header="Client" body={clientBodyTemplate} editor={(options) => clientEditor(options)} ></Column>
                    <Column field="recId" header="Rec ID" editor={(options) => textEditor(options)} ></Column>
                    <Column field="notes" header="Notes" editor={(options) => textEditor(options)} ></Column>
                    <Column field="receptionDate" header="Reception Date" editor={(options) => datePickerEditor(options)} ></Column>
                    <Column field="location" header="Location" body={locationBodyTemplate} editor={(options) => locationEditor(options)} ></Column>
                    <Column field="status" header="Status" body={statusBodyTemplate} editor={(options) => statusEditor(options)} ></Column>
                    <Column field="followUp" header="Follow Up" editor={(options) => textEditor(options)} ></Column>
                    <Column header="Edit" rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                </DataTable>
        </div>
    )
    
}

export default RepairTrayTable;