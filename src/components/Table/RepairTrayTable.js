import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar'
import { Badge } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField'
import { Autocomplete } from '@material-ui/lab';


const RepairTrayTable = () => {
    const [data, setData] = useState([{
        tray: "",
        client: "",
        recId: "",
        notes: "",
        receptionDate: "",
        location: "",
        status: "",
        followUp: ""
    }]);
    const [clients, setClients] = useState([{
        name: "",
        street: "",
        phone: "",
        city: "",
        province: "",
        postalcode: "",
        country: "",
    }]);
    const [editingRows, setEditingRows] = useState({});
    const toast = useRef(null);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        axios.get('https://dscbackend.onrender.com/getalltray')
            .then(res => {setData(res.data); setLoading(false)})
            .catch(err => console.log(err) )
        
        axios.get('https://dscbackend.onrender.com/getallclients')
            .then(res => {setClients(res.data)})
            .catch(err => console.log(err))

    }, [])

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;


    const locations = [
        { label: "Billy", value: "BILLY" },
        { label: "OutSourced", value: "OUTSORCED"},
        { label: "Chadi", value: "CHADI"},
        { label: "Sara", value: "SARA"},
        { label: "Wall", value: "WALL" },
        { label: "Plinio", value: "PLINIO"}
    ]

    const statuses = [
        { label: "Completed", value: "COMPLETED", badge: "success"},
        { label: "Under Review", value: "UNDERREVIEW", badge: "warning"},
        { label: "Pending", value: "PENDING", badge: "info"},
        { label: "Quoted", value: "QUOTED", badge: "danger"},
        { label: "In Progress", value: "INPROGRESS", badge: "primary"}
    ]

    const getStatusLabel = (status) => {
        return statuses.find(item => item.value === status)?statuses.find(item => item.value === status):{};
    }

    const getLocationLabel = (location) => {
        return locations.find(item => item.value === location)?locations.find(item => item.value === location).label:"";
    }

    const onRowEditComplete = async (e) => {
        const { newData } = e
        setLoading(true)
        await axios.post('https://dscbackend.onrender.com/settray', 
                {...newData, recId: newData.receptionDate + newData.tray}
            )
            .then(res => {
                setData(res.data)
                toast.current.show({severity: 'success', summary: 'Updated Successfully!', detail: `${newData}`})
                setLoading(false)
            })
            .catch(err => {
                toast.current.show({severity: 'error', summary: 'Error!', detail: `${err}`})
                console.log(err)
            })
    }

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value || "")} />;
    }

    const trayEditor = (options) => {
        return <InputNumber value={options.value} onChange={(e) => options.editorCallback(e.value)} />;
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
            <Autocomplete freeSolo autoComplete autoHighlight 
                options={clients.map(client => {return client.name})} 
                inputValue={options.value}
                onChange={(e, value) => options.editorCallback(value.toUpperCase())}
                renderInput={(params => ( 
                    <div ref={params.InputProps.ref}>
                        <input type="text" {...params.inputProps} 
                        className="p-inputtext p-component p-filled p-inputnumber-input"
                        onChange={(e) => options.editorCallback(e.target.value)}/>
                    </div>
                  ))} />
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
            <Calendar value={new Date(options.value)} onChange={(e) => {options.editorCallback(e.value.toLocaleDateString().replaceAll('/', '-'))} }/>
        )
    }

    const statusBodyTemplate = (rowData) => {
        return <Badge bg={`${getStatusLabel(rowData.status).badge}`} text="white">{getStatusLabel(rowData.status).label}</Badge>
    }

    const locationBodyTemplate = (rowData) => {
        return getLocationLabel(rowData.location);
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
                paginator
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Shwoing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5,10,20,50]}
                paginatorLeft={paginatorLeft}
                paginatorRight={paginatorRight}
                loading={loading}
                filterDisplay="row"
            >
                <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="tray" header="Tray"  editor={(options) => trayEditor(options)} ></Column>
                <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="client" header="Client" editor={(options) => clientEditor(options)} ></Column>
                <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="recId" header="Rec ID" ></Column>
                <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="notes" header="Notes" editor={(options) => textEditor(options)} ></Column>
                <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="receptionDate" header="Reception Date" editor={(options) => datePickerEditor(options)} ></Column>
                <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="location" header="Location" body={locationBodyTemplate} editor={(options) => locationEditor(options)} ></Column>
                <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="status" header="Status" body={statusBodyTemplate} editor={(options) => statusEditor(options)} ></Column>
                <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="followUp" header="Follow Up" editor={(options) => textEditor(options)} ></Column>
                <Column header="Edit" rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
            </DataTable>
        </div>
    )
    
}

export default RepairTrayTable;