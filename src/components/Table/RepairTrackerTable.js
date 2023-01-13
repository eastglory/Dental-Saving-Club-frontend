import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { ProgressBar } from 'react-bootstrap';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Badge } from 'react-bootstrap';
import { MultiSelect } from 'primereact/multiselect';

const formatDate = (date) => {
        if(date) return new Date(date).toISOString().split('T')[0]
        else return ''
    }

const toWarrantyBodyTemplate = (rowData) => {
    const green = 100 > rowData.toWarranty? rowData.toWarranty: 100
    const red = 100>rowData.toWarranty? 0: rowData.toWarranty-100
        
    return (
        <ProgressBar className='bg-white' style={{"height" : '4vh'}}>
            <ProgressBar className="progress-bar-label-overflow text-dark" variant="success" label={`${rowData.toWarranty}%`} now={green/2} key={1} />
            <ProgressBar className="progress-bar-label-overflow text-dark" variant="danger" label="" now={red/2} key={2} />
        </ProgressBar>
    )
}

const dopBodyTemplate = (rowData) => {
    return formatDate(rowData.dop)
}

const datRecBodyTemplate = (rowData) => {
    return formatDate(rowData.datRec)
}

const RepairTrackerTable = (props) => {

    const columns = [
        {field: 'product', header: 'Product', body: null},
        {field: 'serial', header: 'Serial Number', body: null},
        {field: 'dop', header: 'Original D.O.P', body: dopBodyTemplate},
        {field: 'datRec', header: 'Received on', body: datRecBodyTemplate},
        {field: 'toWarranty', header: 'To Warranty', body: toWarrantyBodyTemplate},
        {field: 'bearing', header: 'Bearing', body: null},
        {field: 'chuck', header: 'Chuck', body: null},
        {field: 'waterblockage', header: 'WaterBlockage', body: null},
        {field: 'lubrification', header: 'Lubrification', body: null},
        {field: 'feasability', header: 'Repair Feasability', body: null},
        {field: 'resn', header: 'Replacement SN', body: null},
    ]

    const [data, setData] = useState(null);
    const [selectedColumns, setSelectedColumns] = useState(columns)
    const toast = useRef(null);

    useEffect(() => {
        setData(props.data);
        // console.log(temp)
    }, [props])

    const onColumnToggle = (event) => {
        let selectedColumns = event.value;
        let orderedSelectedColumns = columns.filter(col => selectedColumns.some(sCol => sCol.field === col.field));
        setSelectedColumns(orderedSelectedColumns);
    }

    


    const paginatorRight =  (
        <div style={{ textAlign:'left' }}>
            <MultiSelect value={selectedColumns} options={columns} optionLabel="header" onChange={onColumnToggle} style={{width:'15em'}}/>
        </div>
    );

    


    return (
        <div>
            <Toast ref={toast} />
                <DataTable 
                    className="datatable-editing-demo"
                    tableClassName="datatable-editing-demo"
                    paginatorClassName='datatable-editing-demo'
                    paginatorRight={paginatorRight}
                    value={data} 
                    filterDisplay="row" 
                    editMode="row" 
                    dataKey="id" 
                    paginator
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Shwoing {first} to {last} of {totalRecords}" 
                    rows={5} 
                    rowsPerPageOptions={[5,10]}
                    resizableColumns 
                    columnResizeMode="expand" 
                    responsiveLayout="stack"
                    loading={props.loading}>
                    <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="client" header="Customer Name"></Column>
                    {selectedColumns.map(col=> {
                        return <Column 
                            filterHeaderClassName="py-0" 
                            filterHeaderStyle={{"minWidth": '200px'}} 
                            filter 
                            sortable 
                            key={col.field} 
                            field={col.field} 
                            header={col.header} 
                            body={col.body}/>;
                        })
                    }
                </DataTable>
        </div>
    )
    
}

export default RepairTrackerTable;

