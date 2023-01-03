import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Badge } from 'react-bootstrap';

const CustomerServiceTable = (props) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const toast = useRef(null);


    return (
        <div className="datatable-editing-demo">
            <Toast ref={toast} />
                <DataTable loading={props.loading} value={props.data} resizableColumns columnResizeMode="expand" responsiveLayout="stack">
                    <Column field="id" header="ID" ></Column>
                    <Column field="receivedOn" header="Recieved On"></Column>
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

