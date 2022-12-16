import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { ProgressBar } from 'primereact/progressbar';
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
        return <ProgressBar value={rowData.toWarranty} showValue={true} color="#28a745"></ProgressBar>
    }

    const curveBodyTemplate = (rowData) => {
        return <ProgressBar value={rowData.curve} showValue={true} color="#dc3545"></ProgressBar>
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
                <DataTable value={data} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} resizableColumns columnResizeMode="expand" responsiveLayout="stack">
                    <Column field="customerName" header="Customer Name"></Column>
                    <Column field="serial" header="Serial Number"></Column>
                    <Column field="dop" header="Original D.O.P"  ></Column>
                    <Column field="received" header="Received on" ></Column>
                    <Column field="waterBlockage" header="Water Blockage" body={waterBlockageBodyTemplate} editor={(options) => waterBlockageEditor(options)} ></Column>
                    <Column field="lubrification" header="Lubrification" body={lubrificationBodyTemplate} editor={(options) => lubrificationEditor(options)} ></Column>
                    <Column field="repairFeasabilbity" header="Repair Feasability" body={repairFeasabilityBodyTemplate} editor={(options) => repairFeasabilityEditor(options)} ></Column>
                    <Column field="replacement" header="Replacement SN" body={replacementBodyTemplate} editor={(options) => replacementEditor(options)} ></Column>
                    <Column field="remainingDay" header="Remaining Days"></Column>
                    <Column field="toWarranty" header="To Warranty" body={toWarrantyBodyTemplate}></Column>
                    <Column field="curve" header="Curve" body={curveBodyTemplate}></Column>
                    <Column header="Edit" rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                </DataTable>
        </div>
    )
    
}

export default RepairTrackerTable;

