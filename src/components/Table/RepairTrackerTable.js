import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { ProgressBar } from 'react-bootstrap';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Badge } from 'react-bootstrap';



const RepairTrackerTable = (props) => {
    const [data, setData] = useState(null);
    const [tableLoading, setTableLoading] = useState(false)
    const toast = useRef(null);

    useEffect(() => {
        setData(props.data);
        // console.log(temp)
    }, [props])

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


    return (
        <div>
            <Toast ref={toast} />
                <DataTable 
                    className="datatable-editing-demo"
                    tableClassName="datatable-editing-demo"
                    paginatorClassName='datatable-editing-demo'
                    value={data} 
                    filterDisplay="row" 
                    editMode="row" 
                    dataKey="id" 
                    paginator
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Shwoing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5,10]}
                    resizableColumns 
                    columnResizeMode="expand" 
                    responsiveLayout="stack"
                    loading={props.loading}>
                    <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="client" header="Customer Name"></Column>
                    <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="product" header="Product" ></Column>
                    <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="serial" header="Serial Number"></Column>
                    <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="dop" header="Original D.O.P" body={dopBodyTemplate} ></Column>
                    <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="datRec" header="Received on" body={datRecBodyTemplate}></Column>
                    <Column field="toWarranty" header="To Warranty" body={toWarrantyBodyTemplate}></Column>
                    <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="bearing" header="Bearing" ></Column>
                    <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="chuck" header="Chuck" ></Column>
                    <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="waterblockage" header="Water Blockage" ></Column>
                    <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="lubrification" header="Lubrification" ></Column>
                    <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="feasability" header="Repair Feasability" ></Column>
                    <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="resn" header="Replacement SN"  ></Column>
                </DataTable>
        </div>
    )
    
}

export default RepairTrackerTable;

