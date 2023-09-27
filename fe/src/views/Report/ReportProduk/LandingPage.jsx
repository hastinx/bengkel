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
import DatePicker from 'react-datepicker';

const LandingPage = () => {
    const [showModal, setShowModal] = useState(false)
    const [report, setReport] = useState([]);
    const [date, setDate] = useState()
    const [produk, setProduk] = useState()
    const [dataExcel, setDataExcel] = useState([])
    const [month, setMonth] = useState(null)

    const getList = async () => {
        const data = await getApi('report/produk?date=' + date + '&produk=' + produk);

        setReport(data);
        if (data && data.length > 0) {
            const customData = data.map(i => ({
                'Periode': moment(i.createdAt).format('MM-YYYY'),
                'Spare Part': i.nama,
                'Modal': i.modal,
                'Terjual': i.total_jual,
                'Keuntungan': i.keuntungan,
            }))

            setDataExcel(customData)
        }
    };

    const clearFilter = () => {
        setStartDate('')
        setEndDate('')
        setProduk('')
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
            FileSaver.saveAs(data, 'Report Produk ' + moment(dt).format('MM-YYYY') + fileExtension);
        } else {
            alert('Data belum tersedia, silahkan coba lagi')
        }
    };

    const handleSelect = (dt) => {
        setMonth(dt)
        setDate(moment(dt).format('YYYY-MM-'))
        console.log(moment(dt).format('YYYY-MM-'))
    }

    useEffect(() => {
        getList()
    }, [])


    return (
        <>
            <MasterContainer title='Report Produk' action={() => setShowModal(true)} actionTItle=' Tambah Customer' Menu='Report'>
                <Card>
                    <Card.Body>
                        <div className='d-flex justify-content-Start gap-2'>
                            <div className='form-group'>
                                <label className='form-label'>Periode</label>
                                <div className='input-group'>
                                    <DatePicker
                                        showIcon
                                        selected={month ? month : new Date()}
                                        showMonthYearPicker
                                        dateFormat="MM/yyyy"
                                        onChange={(month) => handleSelect(month)}
                                        className='form-control'
                                    />
                                    {/* <input type='date' className='form-control' defaultValue={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                    <input type='date' className='form-control' defaultValue={endDate} onChange={(e) => setEndDate(e.target.value)} /> */}
                                </div>

                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Nama Spare Part</label>
                                <input type='text' className='form-control' placeholder='Spare Part' value={produk} onChange={(e) => setProduk(e.target.value)} />
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

                <TableData Data={report} Header={['Periode', 'Spare Part', 'Modal', 'Penjualan', 'Keuntungan']} Field={['createdAt', 'nama', 'modal', 'total_jual', 'keuntungan']} Menu='Report' Action={[(e) => getEditData(e.target.id), (e) => handleDelete(e.target.id)]} />
                {/* <Card>
                    <Card.Body>
                        <div className='d-flex justify-content-end gap-2'>
                            <span><label className='fw-bold'>Piutang :</label>{piutang.length > 0 ? formatRupiah(piutang[0].piutang) : 'Rp 0'}</span>
                            <span><label className='fw-bold'>Debet :</label>{debet.length > 0 ? formatRupiah(debet[0].debet) : 'Rp 0'}</span>
                            <span><label className='fw-bold'>Kredit :</label>{kredit.length > 0 ? formatRupiah(kredit[0].kredit) : 'Rp 0'}</span>
                        </div>
                    </Card.Body>
                </Card> */}
            </MasterContainer>
        </>
    )
}

export default LandingPage