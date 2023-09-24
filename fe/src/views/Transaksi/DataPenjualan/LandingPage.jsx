
import React, { useEffect, useState, useRef } from 'react'
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
import { formatRupiah } from 'helper';
import ModalForm, { ModalDetail, ModalRetur } from './ModalDetail';
import MasterContainer from 'layouts/MasterContainer';
import axios from 'axios'
import Swal from 'sweetalert2';
import { TablePenjualan } from './TableData';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print'


const LandingPage = () => {
    const [showModal, setShowModal] = useState(false)
    const [showModalDetail, setShowModalDetail] = useState(false)
    const [showModalPrint, setShowModalPrint] = useState(false)
    const [produk, setProduk] = useState([]);
    const [mekanik, setMekanik] = useState([]);
    const [detailPart, setDetailPart] = useState([]);
    const [ongkosMekanik, setOngkosMekanik] = useState(0)
    const [sparePart, setSparePart] = useState(0)
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [invoice, setInvoice] = useState()
    const [invoiceHeader, setInvoiceHeader] = useState([])
    const [invoiceMekanik, setInvoiceMekanik] = useState([])
    const [invoiceProduk, setInvoiceProduk] = useState([])
    const [totalPrica, setTotalPrica] = useState(0)
    const componentRef = useRef()

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
        detailData.map(i => sPart += i.total_harga)
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

    const getForInvoice = async (id) => {
        try {
            let tOngkos = 0
            let tProduk = 0
            const result = await getApi('transaksi/' + id)
            setInvoiceHeader(result.transaksi)
            setInvoiceMekanik(result.mekanik)
            setInvoiceProduk(result.produk)

            result.mekanik.map(i => tOngkos += i.ongkos)
            setOngkosMekanik(tOngkos)

            result.produk.map(i => tProduk += i.totalHarga)
            setTotalPrica(tProduk)
            setShowModalPrint(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleToPrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-date',
        onAfterPrint: () => alert('Print Success')
    })

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
                <TablePenjualan Data={produk} Header={['Kode', 'Nama Customer', 'Alamat', 'No HP', 'Status Pembayrana', 'Tipe Transaksi', 'No PLAT', 'Kendaraan', 'KM Masuk', 'KM Keluar', 'Tanggal']} Field={['code', 'customer', 'alamat', 'noHp', 'status_pembayaran', 'tipe_transaksi', 'no_plat', 'kendaraan', 'km_masuk', 'km_keluar', 'createdAt']} Menu='Data Transaksi' Action={[(e) => getDetailData(e.target.id), (e) => getReturData(e.target.id), (e) => payBill(e.target.id), (e) => getForInvoice(e.target.id)]} />
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

            <Modal
                className="modal"
                show={showModalPrint}
                size="lg"
                onHide={() => setShowModalPrint(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Button
                            className="btn-fill pull-right"
                            type="submit"
                            variant="info"
                            onClick={() => handleToPrint()}
                        >
                            Print
                        </Button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div ref={componentRef} style={{ width: '95%', display: 'flex', justifyContent: 'center', height: window.innerHeight, marginLeft: '10px', marginRight: '10px' }}>
                        <div style={{ width: '100%' }}>
                            <header style={{ marginLeft: '10px' }}>
                                <h2>BENGKEL FAHMI MOTOR</h2>
                            </header>
                            <section style={{ marginLeft: '10px', marginRight: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'block' }}>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            <div style={{ fontFamily: 'Arial', fontSize: '11px', fontWeight: 'bolder' }}>Nama Customer</div>
                                            <div style={{ fontFamily: 'Arial', fontSize: '11px' }}>:</div>
                                            <div style={{ fontFamily: 'Arial', fontSize: '11px' }}>{invoiceHeader.length === 0 ? '' : invoiceHeader[0].customer}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            <div style={{ fontFamily: 'Arial', fontSize: '11px', fontWeight: 'bolder' }}>No.HP</div>
                                            <div style={{ fontFamily: 'Arial', fontSize: '11px' }}>:</div>
                                            <div style={{ fontFamily: 'Arial', fontSize: '11px' }}>{invoiceHeader.length === 0 ? '' : invoiceHeader[0].noHp}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            <div style={{ fontFamily: 'Arial', fontSize: '11px', fontWeight: 'bolder' }}>Alamat</div>
                                            <div style={{ fontFamily: 'Arial', fontSize: '11px' }}>:</div>
                                            <div style={{ fontFamily: 'Arial', fontSize: '11px' }}>{invoiceHeader.length === 0 ? '' : invoiceHeader[0].alamat}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            <div style={{ fontFamily: 'Arial', fontSize: '11px', fontWeight: 'bolder' }}>Kendaraan</div>
                                            <div style={{ fontFamily: 'Arial', fontSize: '11px' }}>:</div>
                                            <div style={{ fontFamily: 'Arial', fontSize: '11px' }}>{invoiceHeader.length === 0 ? '' : invoiceHeader[0].kendaraan}</div>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            <div style={{ fontFamily: 'Arial', fontSize: '11px', fontWeight: 'bolder' }}>No.Plat</div>
                                            <div style={{ fontFamily: 'Arial', fontSize: '11px' }}>:</div>
                                            <div style={{ fontFamily: 'Arial', fontSize: '11px', textTransform: 'uppercase' }}>{invoiceHeader.length === 0 ? '' : invoiceHeader[0].no_plat}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            <div style={{ fontFamily: 'Arial', fontSize: '11px', fontWeight: 'bolder' }}>KM Mobil</div>
                                            <div style={{ fontFamily: 'Arial', fontSize: '11px' }}>:</div>
                                            <div style={{ fontFamily: 'Arial', fontSize: '11px' }}>{invoiceHeader.length === 0 ? '' : invoiceHeader[0].km_masuk + " - " + invoiceHeader[0].km_keluar}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            <div style={{ fontFamily: 'Arial', fontSize: '11px', fontWeight: 'bolder' }}>Tipe Transaksi</div>
                                            <div style={{ fontFamily: 'Arial', fontSize: '11px' }}>:</div>
                                            <div style={{ fontFamily: 'Arial', fontSize: '11px' }}>{invoiceHeader.length === 0 ? '' : invoiceHeader[0].tipe_transaksi}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            <div style={{ fontFamily: 'Arial', fontSize: '11px', fontWeight: 'bolder' }}>Status</div>
                                            <div style={{ fontFamily: 'Arial', fontSize: '11px' }}>:</div>
                                            <div style={{ fontFamily: 'Arial', fontSize: '11px' }}>{invoiceHeader.length === 0 ? '' : invoiceHeader[0].status_pembayaran}</div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div style={{ marginTop: '20px', marginBottom: '15px' }}>
                                    <table style={{ width: '100%', border: '1px solid #000', borderCollapse: 'collapse' }}>
                                        <thead style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                            <tr style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                                <th style={{ border: '1px solid #000', fontSize: '11px', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial', textAlign: 'center', fontWeight: 'bolder' }}>
                                                    Spare Part
                                                </th>
                                                <th style={{ border: '1px solid #000', fontSize: '11px', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial', textAlign: 'center', fontWeight: 'bolder' }}>
                                                    Qty
                                                </th>
                                                <th style={{ border: '1px solid #000', fontSize: '11px', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial', textAlign: 'center', fontWeight: 'bolder' }}>
                                                    Harga Satuan
                                                </th>
                                                <th style={{ border: '1px solid #000', fontSize: '11px', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial', textAlign: 'center', fontWeight: 'bolder' }}>
                                                    Harga Total
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                            {invoiceProduk.length === 0 ? <tr style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                                <td style={{ border: '1px solid #000', fontSize: '11px', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial' }}>-</td>
                                                <td style={{ border: '1px solid #000', fontSize: '11px', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial' }}>-</td>
                                                <td style={{ border: '1px solid #000', fontSize: '11px', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial' }}>-</td>
                                                <td style={{ border: '1px solid #000', fontSize: '11px', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial' }}>-</td>
                                            </tr> :
                                                invoiceProduk.map(i =>
                                                    <tr style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                                        <td style={{ border: '1px solid #000', fontSize: '11px', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial' }}>
                                                            {i.nama}
                                                        </td>
                                                        <td style={{ border: '1px solid #000', fontSize: '11px', borderCollapse: 'collapse', padding: '3px', textAlign: 'center', fontFamily: 'Arial' }}>
                                                            {i.qty}
                                                        </td>
                                                        <td style={{ border: '1px solid #000', fontSize: '11px', borderCollapse: 'collapse', padding: '3px', textAlign: 'right', fontFamily: 'Arial' }}>
                                                            {formatRupiah(i.hargaSatuan)}
                                                        </td>
                                                        <td style={{ border: '1px solid #000', fontSize: '11px', borderCollapse: 'collapse', padding: '3px', textAlign: 'right', fontFamily: 'Arial' }}>
                                                            {formatRupiah(i.totalHarga)}
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                            <tr style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                                <td colSpan={3} style={{ border: '1px solid #000', fontSize: '11px', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial', fontWeight: 'bolder' }}>
                                                    Total
                                                </td>
                                                <td style={{ border: '1px solid #000', fontSize: '11px', borderCollapse: 'collapse', padding: '3px', textAlign: 'right', fontFamily: 'Arial' }}>
                                                    {formatRupiah(totalPrica)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table style={{ width: '100%', border: '1px solid #000', borderCollapse: 'collapse', marginTop: '2px' }}>
                                        <thead style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                            <tr style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                                <th style={{ border: '1px solid #000', fontSize: '11px', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial', textAlign: 'center', fontWeight: 'bolder' }}>
                                                    Mekanik
                                                </th>
                                                <th style={{ border: '1px solid #000', fontSize: '11px', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial', textAlign: 'center', fontWeight: 'bolder' }}>
                                                    Ongkos
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                            {invoiceMekanik.length === 0 ? <tr style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                                <td style={{ border: '1px solid #000', fontSize: '11px', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial' }}>-</td>
                                                <td style={{ border: '1px solid #000', fontSize: '11px', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial' }}>-</td>
                                            </tr> :
                                                invoiceMekanik.map(i =>
                                                    <tr style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                                        <td style={{ border: '1px solid #000', fontSize: '11px', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial' }}>
                                                            {i.mekanik}
                                                        </td>
                                                        <td style={{ border: '1px solid #000', fontSize: '11px', borderCollapse: 'collapse', padding: '3px', textAlign: 'right', fontFamily: 'Arial' }}>
                                                            {formatRupiah(i.ongkos)}
                                                        </td>
                                                    </tr>
                                                )

                                            }
                                            <tr style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                                <td style={{ border: '1px solid #000', fontSize: '11px', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial', fontWeight: 'bolder' }}>
                                                    Total Ongkos
                                                </td>
                                                <td style={{ border: '1px solid #000', fontSize: '11px', borderCollapse: 'collapse', padding: '3px', textAlign: 'right', fontFamily: 'Arial' }}>
                                                    {formatRupiah(ongkosMekanik)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <hr />
                                    <div style={{ display: 'flex', justifyContent: 'end' }}><span style={{ fontFamily: 'Arial', fontSize: '11px', fontWeight: 'bolder' }}>TOTAL : {formatRupiah(totalPrica + ongkosMekanik)}</span> </div>
                                    <hr />

                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <span style={{ fontFamily: 'Arial', fontSize: '11px' }}>Diterima</span>
                                            <br />
                                            <br />
                                            <br />
                                            <span style={{ fontFamily: 'Arial', fontSize: '11px', fontWeight: 'bolder' }}>{invoiceHeader.length === 0 ? '' : invoiceHeader[0].customer}</span>
                                        </div>
                                        <div>
                                            <span style={{ fontFamily: 'Arial', fontSize: '11px' }}>Tgl, {moment().format('DD/MM/YYYY hh:mm')}</span>
                                            <br />
                                            <br />
                                            <br />
                                            <span style={{ fontFamily: 'Arial', fontSize: '11px', fontWeight: 'bolder' }}>...................................</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowModalPrint(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default LandingPage