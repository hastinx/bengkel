
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
import ModalForm, { ModalDetail, ModalRetur } from './ModalDetail';
import MasterContainer from 'layouts/MasterContainer';
import axios from 'axios'
import Swal from 'sweetalert2';
import { TablePenjualan } from './TableData';
import moment from 'moment';


const LandingPage = () => {
    const [showModal, setShowModal] = useState(false)
    const [showModalDetail, setShowModalDetail] = useState(false)
    const [produk, setProduk] = useState([]);
    const [mekanik, setMekanik] = useState([]);
    const [detailPart, setDetailPart] = useState([]);
    const [ongkosMekanik, setOngkosMekanik] = useState(0)
    const [sparePart, setSparePart] = useState(0)
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [invoice, setInvoice] = useState()

    const getList = async () => {
        const data = await getApi('transaksi?start=' + moment(startDate).format('YYYY-MM-DD') + '&end=' + moment(endDate).format('YYYY-MM-DD') + '&inv=' + invoice);
        console.log(data)
        setProduk(data);
    };


    const getDetailData = async (id) => {
        let oMekanik = 0
        let sPart = 0
        const mekanikData = await getApi('transaksi/' + id + '/mekanik');
        setMekanik(mekanikData)
        mekanikData.map(i => oMekanik += i.ongkos)
        setOngkosMekanik(oMekanik)
        const detailData = await getApi('transaksi/' + id + '/produk');
        setDetailPart(detailData)
        detailData.map(i => sPart += i.totalHarga)
        setSparePart(sPart)
        setShowModalDetail(true)
    };

    const getReturData = async (id) => {
        let oMekanik = 0
        let sPart = 0
        const mekanikData = await getApi('transaksi/' + id + '/mekanik');
        setMekanik(mekanikData)
        mekanikData.map(i => oMekanik += i.ongkos)
        setOngkosMekanik(oMekanik)
        const detailData = await getApi('transaksi/' + id + '/produk');
        setDetailPart(detailData)
        detailData.map(i => sPart += i.totalHarga)
        setSparePart(sPart)
        setShowModal(true)
    };

    const payBill = async (id) => {
        try {
            const result = await axios.patch(process.env.REACT_APP_API + "transaksi/" + id)
            Swal.fire(result.data.message)
            getList()
        } catch (error) {
            console.log(error)
        }
    }

    const clearFilter = () => {
        setStartDate('')
        setEndDate('')
        setInvoice('')
    }

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

            <MasterContainer title='Data Transaksi' action={() => setShowModal(true)} actionTItle=' Tambah Spare Part' Menu='Transaksi'>
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
                                </div>
                            </div>

                        </div>
                    </Card.Body>
                </Card>
                <TablePenjualan Data={produk} Header={['Kode', 'Nama Customer', 'Alamat', 'No HP', 'Status Pembayrana', 'Tipe Transaksi', 'No PLAT', 'Kendaraan', 'KM Masuk', 'KM Keluar', 'Tanggal']} Field={['code', 'customer', 'alamat', 'noHp', 'statusPembayaran', 'tipeTransaksi', 'noPlat', 'kendaraan', 'kmMasuk', 'kmKeluar', 'createdAt']} Menu='Data Transaksi' Action={[(e) => getDetailData(e.target.id), (e) => getReturData(e.target.id), (e) => payBill(e.target.id)]} />
            </MasterContainer>

            <ModalDetail
                showModalDetail={showModalDetail}
                Action={[() => setShowModalDetail(false), () => addSparePart(), () => handleUpdate()]}
                mekanik={mekanik}
                detail={detailPart}
                ongkosMekanik={ongkosMekanik}
                sparePart={sparePart}

            />

            <ModalRetur
                showModal={showModal}
                Action={[() => setShowModal(false), () => addSparePart(), () => handleUpdate()]}
                mekanik={mekanik}
                detail={detailPart}
                ongkosMekanik={ongkosMekanik}
                sparePart={sparePart}

            />
        </>
    )
}

export default LandingPage