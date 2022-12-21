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
    const toast = useRef(null);

    useEffect(() => {
        console.log(props.data.data)
        setData(props.data.data);
    }, [])

    // const columns = Object.keys(props.data[1]).map(key => {return {filed: key, header: key.toUpperCase()}});

    const waterBlockageList = [
        { label: "Yes", value: 0},
        { label: "No", value: 1},
    ]

    const products = [
        { label: "MP5", value: 0},
        { label: "Light Gen", value: 1},
        { label: "6 PIN", value: 2},
        { label: "5 PIN", value: 3},
        { label: "WolfLight", value: 4}
    ]

    const lubrificationList = [
        { label: "Adequate", value: 0 },
        { label: "Under lubricated", value: 1},
        { label: "Over lubricated", value: 2},
        { label: "None", value: 3},
    ]

    const repairFeasabilityList = [
        { label: "Good Repaired", value: 0 },
        { label: "Replaced housing", value: 1},
        { label: "New midshaft bear cartridge or/and head", value: 2},
    ]

    const replacementList = [
        { label: "Possible", value: 0 },
        { label: "Not feasable", value: 1},
    ]

    const getWaterBlockageLabel = (value) => {
        return waterBlockageList.find(item => item.value === value).label;
    }
    const waterBlockageBodyTemplate = (rowData) => {
        return getWaterBlockageLabel(rowData.waterBlockage);
    }
    const getProductLabel = (value) => {
        return products.find(item => item.value === value).label;
    }
    const productBodyTemplate = (rowData) => {
        return getProductLabel(rowData.product);
    }
    const getLubrificationLabel = (value) => {
        return lubrificationList.find(item => item.value === value).label;
    }

    const lubrificationBodyTemplate = (rowData) => {
        return getLubrificationLabel(rowData.lubrification)
    }
    const getRepairFeasabilityLabel = (value) => {
        return repairFeasabilityList.find(item => item.value === value).label;
    }

    const repairFeasabilityBodyTemplate = (rowData) => {
        return getRepairFeasabilityLabel(rowData.repairFeasability);
    }
    const getReplacementLabel = (value) => {
        return replacementList.find(item => item.value === value).label;
    }
    const replacementBodyTemplate = (rowData) => {
        return getReplacementLabel(rowData.replacement);
    }

    const toWarrantyBodyTemplate = (rowData) => {
        return (
            <ProgressBar className="bg-secondary">
                <ProgressBar className="progress-bar-label-overflow" variant="success" label={`${100>rowData.toWarranty? rowData.toWarranty: 100}%`} now={(100 > rowData.toWarranty)? rowData.toWarranty / 1.5: 100 / 1.5} key={1} />
                <ProgressBar className="progress-bar-label-overflow" variant="danger" label= {`${100>rowData.toWarranty? "": `${rowData.toWarranty-100}%`}`} now={(100 > rowData.toWarranty)? 0: (rowData.toWarranty - 100) / 1.5} key={2} />
            </ProgressBar>
        )
    }

    const onRowEditComplete = (e) => {
        let _data = [...data];
        let {newData, index } = e;

        _data[index] = newData;

        setData(_data);
    }

    const waterBlockageEditor = (options) => {
        return (
            <Dropdown value={options.value} options={waterBlockageList} optionLabel="label" optionValue="value"
                onChange={(e) => options.editorCallback(e.value)} placeholder="Select"
                itemTemplate={(option) => {
                    return <span>{option.label}</span>
                }} />
        );
    }
    const productEditor = (options) => {
        return (
            <Dropdown value={options.value} options={products} optionLabel="label" optionValue="value"
                onChange={(e) => options.editorCallback(e.value)} placeholder="Select"
                itemTemplate={(option) => {
                    return <span>{option.label}</span>
                }} />
        );
    }
    
    const lubrificationEditor = (options) => {
        return (
            <Dropdown value={options.value} options={lubrificationList} optionLabel="label" optionValue="value"
                onChange={(e) => options.editorCallback(e.value)} placeholder="Select "
                itemTemplate={(option) => {
                    return <span>{option.label}</span>
                }} />
        );
    }

    const repairFeasabilityEditor = (options) => {
        return (
            <Dropdown value={options.value} options={repairFeasabilityList} optionLabel="label" optionValue="value"
                onChange={(e) => options.editorCallback(e.value)} placeholder="Select "
                itemTemplate={(option) => {
                    return <span>{option.label}</span>
                }} />
        );
    }
    const replacementEditor = (options) => {
        return (
            <Dropdown value={options.value} options={replacementList} optionLabel="label" optionValue="value"
                onChange={(e) => options.editorCallback(e.value)} placeholder="Select "
                itemTemplate={(option) => {
                    return <span>{option.label}</span>
                }} />
        );
    }

    return (
        <div className="datatable-editing-demo">
            <Toast ref={toast} />
                <DataTable value={data} filterDisplay="row" editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} resizableColumns columnResizeMode="expand" responsiveLayout="stack">
                    <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="customerName" header="Customer Name"></Column>
                    <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="product" header="Product" body={productBodyTemplate} editor={(options) => productEditor(options)}></Column>
                    <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="serial" header="Serial Number"></Column>
                    <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="dop" header="Original D.O.P"  ></Column>
                    <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="received" header="Received on" ></Column>
                    <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="waterBlockage" header="Water Blockage" body={waterBlockageBodyTemplate} editor={(options) => waterBlockageEditor(options)} ></Column>
                    <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="lubrification" header="Lubrification" body={lubrificationBodyTemplate} editor={(options) => lubrificationEditor(options)} ></Column>
                    <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="repairFeasabilbity" header="Repair Feasability" body={repairFeasabilityBodyTemplate} editor={(options) => repairFeasabilityEditor(options)} ></Column>
                    <Column filterHeaderClassName="py-0" filterHeaderStyle={{"minWidth": '200px'}} filter sortable field="replacement" header="Replacement SN" body={replacementBodyTemplate} editor={(options) => replacementEditor(options)} ></Column>
                    <Column field="toWarranty" header="To Warranty" body={toWarrantyBodyTemplate}></Column>
                    <Column header="Edit" rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                </DataTable>
        </div>
    )
    
}

export default RepairTrackerTable;

