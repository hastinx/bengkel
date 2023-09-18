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
import { formatRupiah } from 'helper';
import moment from 'moment';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const LandingPage = () => {
    const [showModal, setShowModal] = useState(false)
    const [report, setReport] = useState([]);
    const [piutang, setPiutang] = useState([]);
    const [debet, setDebet] = useState([]);
    const [kredit, setKredit] = useState([]);
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [invoice, setInvoice] = useState()
    const [dataExcel, setDataExcel] = useState([])

    const getList = async () => {
        const data = await getApi('report/balance?start=' + moment(startDate).format('YYYY-MM-DD') + '&end=' + moment(endDate).format('YYYY-MM-DD') + '&inv=' + invoice);

        setReport(data.result);
        setPiutang(data.piutang);
        setDebet(data.debet);
        setKredit(data.kredit);

        const customData = data.result.map(i => ({
            'Tanggal': moment(i.log_createdAt).format('DD-MM-YYYY'),
            'Invoice': i.deskripsi,
            'Keterangan': i.log_act,
            'Piutang': formatRupiah(i.piutang),
            'Debet': formatRupiah(i.debet),
            'Kredit': formatRupiah(i.kredit),
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

    const exportToCSV = async () => {
        await getList()
        if (dataExcel.length > 0) {
            const ws = XLSX.utils.json_to_sheet(dataExcel);
            const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
            const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, 'Report Balance ' + moment(startDate).format('DD-MM-YYYY') + " S/D " + moment(endDate).format('DD-MM-YYYY') + fileExtension);
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
            <MasterContainer title='Report Balance' action={() => setShowModal(true)} actionTItle=' Tambah Customer' Menu='Report'>
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

                <TableData Data={report} Header={['Tanggal', 'Invoice', 'Keterangan', 'Piutang', 'Debet', 'Kredit']} Field={['log_createdAt', 'deskripsi', 'log_act', 'piutang', 'debet', 'kredit']} Menu='Report' Action={[(e) => getEditData(e.target.id), (e) => handleDelete(e.target.id)]} />
                <Card>
                    <Card.Body>
                        <div className='d-flex justify-content-end gap-2'>
                            <span><label className='fw-bold'>Piutang :</label>{piutang.length > 0 ? formatRupiah(piutang[0].piutang) : 'Rp 0'}</span>
                            <span><label className='fw-bold'>Debet :</label>{debet.length > 0 ? formatRupiah(debet[0].debet) : 'Rp 0'}</span>
                            <span><label className='fw-bold'>Kredit :</label>{kredit.length > 0 ? formatRupiah(kredit[0].kredit) : 'Rp 0'}</span>
                        </div>
                    </Card.Body>
                </Card>
            </MasterContainer>
        </>
    )
}

export default LandingPage