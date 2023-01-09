import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Badge } from 'react-bootstrap';
import { FilterMatchMode, FilterOperator } from 'primereact/api';

const CustomerServiceTable = (props) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const [filterValue, setFilterValue] = useState('')
    const [filters, setFilters] = useState({
        'serial': {
            value: null,
            matchmode: FilterMatchMode.CONTAINS
        }
    })

    const toast = useRef(null);

    const onFilterValueChange = (e) => {
        const value = e.target.value
        let _filters = {...filters}
        _filters['serial'].value = value
        setFilters(_filters)
        setFilterValue(value)
    }

    const renderHeader = () => {
        return (
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="m-0">Service Details</h4>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={filterValue} onChange={onFilterValueChange} placeholder="Serial Search" />
                </span>
            </div>
        )
    }

    return (
        <div className="">
            <Toast ref={toast} />
                <DataTable 
                    filters={filters}
                    header={renderHeader}
                    loading={props.loading} 
                    value={props.data} 
                    resizableColumns 
                    rowHover
                    paginator
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Shwoing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5,10]}
                    onRowClick={props.onRowClick}
                    columnResizeMode="expand" 
                    responsiveLayout="stack">
                    <Column field="id" header="ID"></Column>
                    <Column field="receivedOn" header="Received On"></Column>
                    <Column field="handledOn" header="Handled On"></Column>
                    <Column field="reportedOn" header="Reported On"></Column>
                    <Column field="invoice" header="Invoice"  ></Column>
                    <Column field="serial" header="Serial"></Column>
                    <Column field="product" header="Product"></Column>
                </DataTable>
        </div>
    )
    
}

export default CustomerServiceTable;

