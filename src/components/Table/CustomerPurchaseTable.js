import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Badge } from 'react-bootstrap';

const CustomerPurchaseTable = (props) => {
    const [data, setData] = useState(null);
    const toast = useRef(null);

    useEffect(() => {
        console.log(props.data.data)
        setData(props.data.data);
    }, [])

    return (
        <div className="datatable-editing-demo">
            <Toast ref={toast} />
                <DataTable value={data} resizableColumns columnResizeMode="expand" responsiveLayout="stack">
                    <Column field="id" header="ID" ></Column>
                    <Column field="purchasedOn" header="Purchased On"></Column>
                    <Column field="category" header="Category"></Column>
                    <Column field="invoice" header="Invoice"  ></Column>
                    <Column field="serial" header="Serial"></Column>
                    <Column field="note1" header="Note1"></Column>
                    <Column field="note2" header="Note2"></Column>
                </DataTable>
        </div>
    )
    
}

export default CustomerPurchaseTable;

