import TableData from 'components/TableMaster/Table';
import React, { useEffect, useState } from 'react'
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
    OverlayTrigger,
    Tooltip,
    Stack,
    Modal,
    Form,
} from "react-bootstrap";
import { getApi } from 'helper/api';
import ModalForm from './ModalForm';
import MasterContainer from 'layouts/MasterContainer';
import axios from 'axios'
import Swal from 'sweetalert2';
import moment from 'moment';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { formatRupiah } from 'helper';

const LandingPage = () => {
    const [showModal, setShowModal] = useState(false)
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [invoice, setInvoice] = useState()
    const [report, setReport] = useState([]);
    const [dataExcel, setDataExcel] = useState([])

    const getList = async () => {
        const data = await getApi('report/transaksi/cash?start=' + moment(startDate).format('YYYY-MM-DD') + '&end=' + moment(endDate).format('YYYY-MM-DD') + '&inv=' + invoice);
        console.log(data)
        setReport(data);

        const customData = data.map(i => ({
            'Tanggal': moment(i.tanggal).format('DD-MM-YYYY'),
            'Invoice': i.deskripsi,
            'Total Transaksi': formatRupiah(i.debet),
        }))

        setDataExcel(customData)
    };

    const clearFilter = () => {
        setStartDate('')
        setEndDate('')
        setInvoice('')
    }

    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = () => {
        getList()
        if (dataExcel.length > 0) {
            console.log('export duluan')
            console.log(dataExcel)
            const ws = XLSX.utils.json_to_sheet(dataExcel);
            const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
            const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, 'Report Transaksi Cash ' + moment(startDate).format('DD-MM-YYYY') + " S/D " + moment(endDate).format('DD-MM-YYYY') + fileExtension);
        } else {
            alert('Data belum tersedia, silahkan coba lagi')
        }

    };

    useEffect(() => {
        getList()
        setStartDate(moment().format("YYYY-MM-DD"))
    }, [])

    useEffect(() => {
        let newEndDate = moment(startDate).add(1, 'days');
        setEndDate(moment(newEndDate).format("YYYY-MM-DD"))
    }, [startDate])

    return (
        <>
            <MasterContainer title='Report Transaksi Cash' action={() => setShowModal(true)} actionTItle=' Tambah Customer' Menu='Report'>
                <Card>
                    <Card.Body>
                        <div className='d-flex justify-content-Start gap-2'>
                            <div className='form-group'>
                                <label className='form-label'>Tanggal</label>
                                <div className='input-group'>
                                    <input type='date' className='form-control' defaultValue={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                    <input type='date' className='form-control' defaultValue={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                </div>

                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Invoice</label>
                                <input type='text' className='form-control' placeholder='invoice' value={invoice} onChange={(e) => setInvoice(e.target.value)} />
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Action</label>
                                <div className='d-flex gap-2'>
                                    <button className='btn btn-success btn-fill form-control' onClick={() => getList()}>
                                        Search
                                    </button>
                                    <button className='btn btn-warning btn-fill form-control' onClick={() => clearFilter()}>
                                        Clear
                                    </button>
                                    <button className='btn btn-primary btn-fill form-control' onClick={() => exportToCSV()}>
                                        Excel
                                    </button>
                                </div>
                            </div>

                        </div>
                    </Card.Body>
                </Card>
                <TableData Data={report} Header={['Tanggal', 'INVOICE', 'TOTAL TRANSAKSI']} Field={['tanggal', 'deskripsi', 'debet']} Menu='Report' Action={[(e) => getEditData(e.target.id), (e) => handleDelete(e.target.id)]} />
            </MasterContainer>
        </>
    )
}

export default LandingPage