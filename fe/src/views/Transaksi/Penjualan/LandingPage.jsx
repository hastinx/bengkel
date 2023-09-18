import axios from 'axios';
import { formatRupiah } from 'helper';
import { getApi } from 'helper/api';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col,
    Table,
    Modal
} from "react-bootstrap";
import { Redirect, useHistory } from 'react-router-dom';
import Select from 'react-select';
import Swal from 'sweetalert2';
import Invoice from './invoice';
import { useReactToPrint } from 'react-to-print'
const options = [];
const tipe = [
    { value: 'cash', label: 'cash' },
    { value: 'hutang', label: 'hutang' },
];
const status = [
    { value: 'lunas', label: 'lunas' },
    { value: 'belum lunas', label: 'belum lunas' },
];
var arrMekanik = [];

const LandingPage = () => {

    const history = useHistory()
    const [modalShow, setModalShow] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedTipe, setSelectedTipe] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [cart, setCart] = useState([])
    const [totalPrica, setTotalPrica] = useState(0)
    const [ongkosMekanik, setOngkosMekanik] = useState(0)
    const [customer, setCustomer] = useState()
    const [noHp, setNoHp] = useState()
    const [alamat, setAlamat] = useState()
    const [kendaraan, setKendaraan] = useState()
    const [noPlat, setNoPlat] = useState()
    const [kmMasuk, setKmMasuk] = useState()
    const [kmKeluar, setKmKeluar] = useState()
    const [tipeTransaksi, setTipeTransaksi] = useState()
    const [statusPembayaran, setStatusPembayaran] = useState()
    const [mekanik1, setMekanik1] = useState({})
    const [mekanik2, setMekanik2] = useState({})
    const [mekanik3, setMekanik3] = useState({})
    const [invoiceHeader, setInvoiceHeader] = useState([])
    const [invoiceMekanik, setInvoiceMekanik] = useState([])
    const [invoiceProduk, setInvoiceProduk] = useState([])
    const componentRef = useRef()
    const getOptionSpareParts = async () => {
        try {
            const result = await getApi('master/produk')
            result.map(i =>
                options.push({
                    value: i.id + ">" + i.kode + ">" + i.nama + ">" + i.qty + ">" + i.harga_jual,
                    label: i.nama
                })
            )
        } catch (error) {
            console.log(error)
        }
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
            setModalShow(true)
        } catch (error) {
            console.log(error)
        }
    }

    const getCart = async () => {
        try {
            let total = 0
            const result = await getApi('cart')
            setCart(result)
            result.map(i => total += (i.qty * i.hargaSatuan))
            setTotalPrica(total)
            console.log(totalPrica)
        } catch (error) {
            console.log(error)
        }
    }

    const addToCart = async (harga, kode, qty) => {
        console.log(qty)
        try {
            if (selectedOption !== null) {
                await axios.post(process.env.REACT_APP_API + 'cart', {
                    hargaSatuan: selectedOption.value.split(">")[4],
                    kodeProduk: selectedOption.value.split(">")[1],
                    qty: 1
                })
                getCart()
                setSelectedOption(null)
            } else if (kode !== undefined) {
                await axios.post(process.env.REACT_APP_API + 'cart', {
                    hargaSatuan: harga,
                    kodeProduk: kode,
                    qty: qty
                })
                getCart()
            } else {
                getCart()
            }

        } catch (error) {
            console.log(error)
        }
    }

    const saveTransaction = async () => {
        try {

            if (customer === undefined && noPlat === undefined) {
                return Swal.fire("Data customer tidak boleh kosong")
            }
            const result = await axios.post(process.env.REACT_APP_API + 'transaksi', {
                customer: customer,
                noHp: noHp,
                alamat: alamat,
                kendaraan: kendaraan,
                noPlat: noPlat,
                kmMasuk: kmMasuk,
                kmKeluar: kmKeluar,
                tipeTransaksi: selectedTipe.value,
                statusPembayaran: selectedStatus.value,
                mekanik: arrMekanik,
                produk: cart,
                totalBayar: totalPrica + ongkosMekanik
            })

            // Swal.fire(result.data.message)

            document.getElementById("customer").value = ""
            document.getElementById("noHp").value = ""
            document.getElementById("alamat").value = ""
            document.getElementById("kendaraan").value = ""
            document.getElementById("noPlat").value = ""
            document.getElementById("kmMasuk").value = ""
            document.getElementById("kmKeluar").value = ""
            document.getElementById("1").value = ""
            document.getElementById("ongkos1").value = ""
            document.getElementById("2").value = ""
            document.getElementById("ongkos2").value = ""
            document.getElementById("3").value = ""
            document.getElementById("ongkos3").value = ""
            setCart([])
            setMekanik1({})
            setMekanik2({})
            setMekanik3({})
            setTotalPrica(0)
            setOngkosMekanik(0)
            setCustomer()
            setNoHp()
            setAlamat()
            setKendaraan()
            setNoPlat()
            setKmMasuk()
            setKmKeluar()
            setTipeTransaksi()
            setStatusPembayaran()
            setSelectedOption(null)
            setSelectedTipe(null)
            setSelectedStatus(null)
            setTimeout(() => {
                getForInvoice(result.data.invoice)
            }, 1000)
        } catch (error) {
            console.log(error)
        }
    }
    console.log('ini', customer)
    const addMekanik = () => {
        arrMekanik = []
        console.log(mekanik1, mekanik2, typeof (mekanik3))
        if (mekanik1 !== undefined && mekanik1.mekanik !== undefined && mekanik1.mekanik !== "") {
            arrMekanik.push(mekanik1)
        }
        if (mekanik2 !== undefined && mekanik2.mekanik !== undefined && mekanik2.mekanik !== "") {
            arrMekanik.push(mekanik2)
        }
        if (mekanik3 !== undefined && mekanik3.mekanik !== undefined && mekanik3.mekanik !== "") {
            arrMekanik.push(mekanik3)
        }
        console.log(arrMekanik)
        let total = 0
        arrMekanik.map(i => total += i.ongkos)
        setOngkosMekanik(total)
    }

    const handlePrint = () => {
        // var content = <Invoice />;
        // var pri = document.getElementById("frame").contentWindow;
        // pri.document.open();
        // pri.document.write(content.innerHTML);
        // pri.document.close();
        // pri.focus();
        // pri.print();
        setModalShow(true)
    }

    const handleToPrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-date',
        onAfterPrint: () => alert('Print Success')
    })

    useEffect(() => {
        getOptionSpareParts()
        getCart()
    }, [])

    useEffect(() => {
        addToCart()
    }, [selectedOption])
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="6">
                        <Row>
                            <Col md='12'>
                                <Card>
                                    <Card.Header>DATA PEMILIK DAN KENDARAAN</Card.Header>
                                    <Card.Body>
                                        <Form>
                                            <Row>
                                                <Col className="pr-1" md="4">
                                                    <Form.Group>
                                                        <label className='fw-bold text-dark'>Pemilik Kendaraan</label>
                                                        <Form.Control
                                                            // defaultValue="Creative Code Inc."
                                                            className='text-uppercase'
                                                            placeholder="PEMILIK KENDARAAN"
                                                            type="text"
                                                            id="customer"
                                                            onChange={(e) => setCustomer(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="px-1" md="4">
                                                    <Form.Group>
                                                        <label className='fw-bold text-dark'>NO.HP</label>
                                                        <Form.Control
                                                            // defaultValue="michael23"
                                                            className='text-uppercase'
                                                            placeholder="NO.HP"
                                                            type="text"
                                                            id="noHp"
                                                            onChange={(e) => setNoHp(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1" md="4">
                                                    <Form.Group>
                                                        <label htmlFor="exampleInputEmail1" className='fw-bold text-dark'>
                                                            ALAMAT
                                                        </label>
                                                        <Form.Control
                                                            className='text-uppercase'
                                                            placeholder="ALAMAT"
                                                            type="text"
                                                            id="alamat"
                                                            onChange={(e) => setAlamat(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="pr-1" md="6">
                                                    <Form.Group>
                                                        <label className='fw-bold text-dark'>KENDARAAN</label>
                                                        <Form.Control
                                                            // defaultValue="Mike"
                                                            className='text-uppercase'
                                                            placeholder="KENDARAAN"
                                                            type="text"
                                                            id="kendaraan"
                                                            onChange={(e) => setKendaraan(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1" md="6">
                                                    <Form.Group>
                                                        <label className='fw-bold text-dark'>NO.PLAT KENDARAAN</label>
                                                        <Form.Control
                                                            // defaultValue="Andrew"
                                                            className='text-uppercase'
                                                            placeholder="NO.PLAT KENDARAAN"
                                                            type="text"
                                                            id="noPlat"
                                                            onChange={(e) => setNoPlat(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="pr-1" md="6">
                                                    <Form.Group>
                                                        <label className='fw-bold text-dark'>KM KENDARAAN MASUK</label>
                                                        <Form.Control
                                                            // defaultValue="Mike"
                                                            className='text-uppercase'
                                                            placeholder="KM KENDARAAN MASUK"
                                                            type="number"
                                                            id="kmMasuk"
                                                            onChange={(e) => setKmMasuk(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1" md="6">
                                                    <Form.Group>
                                                        <label className='fw-bold text-dark'>KM KENDARAAN KELUAR</label>
                                                        <Form.Control
                                                            // defaultValue="Andrew"
                                                            className='text-uppercase'
                                                            placeholder="KM KENDARAAN KELUAR"
                                                            type="number"
                                                            id="kmKeluar"
                                                            onChange={(e) => setKmKeluar(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            {/* <Button
                                                className="btn-fill pull-right me-2"
                                                type="submit"
                                                variant="info"
                                            >
                                                Simpan
                                            </Button>
                                            <Button
                                                className="btn-fill pull-right"
                                                type="submit"
                                                variant="warning"
                                            >
                                                Ubah
                                            </Button> */}
                                            <div className="clearfix"></div>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col md='12'>
                                <Card>
                                    <Card.Header>ONGKOS MEKANIK</Card.Header>
                                    <Card.Body>
                                        <Form>
                                            <Row>
                                                <Col className="pr-1" md="6">
                                                    <Form.Group>
                                                        <label className='fw-bold text-dark'>MEKANIK 1</label>
                                                        <Form.Control
                                                            // defaultValue="Creative Code Inc."
                                                            className='text-uppercase'
                                                            id="1"
                                                            placeholder="MEKANIK 1"
                                                            type="text"
                                                            onChange={(e) => setMekanik1(state => ({ ...state, mekanik: e.target.value, no: Number(e.target.id) }))}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pr-1" md="6">
                                                    <Form.Group>
                                                        <label className='fw-bold text-dark'>ONGKOS JASA MEKANIK 1</label>
                                                        <Form.Control
                                                            // defaultValue="Creative Code Inc."
                                                            className='text-uppercase'
                                                            id="ongkos1"
                                                            placeholder="ONGKOS"
                                                            type="number"
                                                            onChange={(e) => setMekanik1(state => ({ ...state, ongkos: Number(e.target.value) }))}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col className="pr-1" md="6">
                                                    <Form.Group>
                                                        <label className='fw-bold text-dark'>MEKANIK 2</label>
                                                        <Form.Control
                                                            // defaultValue="Creative Code Inc."
                                                            className='text-uppercase'
                                                            id="2"
                                                            placeholder="MEKANIK 2"
                                                            type="text"
                                                            onChange={(e) => setMekanik2(state => ({ ...state, mekanik: e.target.value, no: Number(e.target.id) }))}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pr-1" md="6">
                                                    <Form.Group>
                                                        <label className='fw-bold text-dark'>ONGKOS JASA MEKANIK 2</label>
                                                        <Form.Control
                                                            // defaultValue="Creative Code Inc."
                                                            className='text-uppercase'
                                                            id="ongkos2"
                                                            placeholder="ONGKOS"
                                                            type="number"
                                                            onChange={(e) => setMekanik2(state => ({ ...state, ongkos: Number(e.target.value) }))}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col className="pr-1" md="6">
                                                    <Form.Group>
                                                        <label className='fw-bold text-dark'>MEKANIK 3</label>
                                                        <Form.Control
                                                            // defaultValue="Creative Code Inc."
                                                            className='text-uppercase'
                                                            id="3"
                                                            placeholder="MEKANIK 3"
                                                            type="text"
                                                            onChange={(e) => setMekanik3(state => ({ ...state, mekanik: e.target.value, no: Number(e.target.id) }))}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pr-1" md="6">
                                                    <Form.Group>
                                                        <label className='fw-bold text-dark'>ONGKOS JASA MEKANIK 3</label>
                                                        <Form.Control
                                                            // defaultValue="Creative Code Inc."
                                                            className='text-uppercase'
                                                            id="ongkos3"
                                                            placeholder="ONGKOS"
                                                            type="number"
                                                            onChange={(e) => setMekanik3(state => ({ ...state, ongkos: Number(e.target.value) }))}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Button
                                                className="btn-fill pull-right"
                                                type="button"
                                                variant="success"
                                                onClick={() => addMekanik()}
                                            >
                                                Tambah Mekanik
                                            </Button>
                                            <div className="clearfix"></div>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>

                        </Row>
                    </Col>
                    <Col md="6">
                        <Row>
                            <Col md='12'>
                                <Card>
                                    <Card.Header>TRANSAKSI / PEMBAYARAN</Card.Header>
                                    <Card.Body>
                                        <Form>
                                            <Row>
                                                <Col className="pr-1" md="6">
                                                    <Form.Group>
                                                        <label className='fw-bold text-dark'>TIPE TRANSAKSI</label>
                                                        <Select
                                                            defaultValue={selectedTipe}
                                                            isClearable={true}
                                                            onChange={setSelectedTipe}
                                                            options={tipe}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pr-1" md="6">
                                                    <Form.Group>
                                                        <label className='fw-bold text-dark'>STATUS PEMBAYARAN</label>
                                                        <Select
                                                            defaultValue={selectedStatus}
                                                            isClearable={true}
                                                            onChange={setSelectedStatus}
                                                            options={status}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <div className="clearfix"></div>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col md='12'>
                                <Card>
                                    <Card.Header>SPARE PART</Card.Header>
                                    <Card.Body>
                                        <Form>
                                            <Row>
                                                <Col className="pr-1" md="12">
                                                    <Form.Group>
                                                        <label className='fw-bold text-dark'>SPARE PART</label>
                                                        <Select
                                                            defaultValue={selectedOption}
                                                            isClearable={true}
                                                            onChange={setSelectedOption}
                                                            options={options}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <div className="clearfix"></div>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col md='12'>
                                <Card>
                                    <Card.Header className='fs-2'>TOTAL : {formatRupiah(totalPrica + ongkosMekanik)}</Card.Header>
                                    <Card.Body>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>Spare Part</th>
                                                    <th>Harga</th>
                                                    <th>Qty</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.length > 0 ? cart.map(i =>
                                                    <tr key={i.id}>
                                                        <td>{i.nama}</td>
                                                        <td>{i.hargaSatuan}</td>
                                                        <td><input type='number' defaultValue={i.qty} onChange={(e) => addToCart(i.hargaSatuan, i.kodeProduk, e.target.value)} /></td>
                                                        <td>{formatRupiah(Number(i.qty * i.hargaSatuan))}</td>
                                                    </tr>) : ""}

                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button
                                            className="btn-fill pull-right me-2"
                                            type="button"
                                            variant="success"
                                            onClick={() => saveTransaction()}
                                        >
                                            Simpan
                                        </Button>
                                        <Button
                                            className="btn-fill pull-right"
                                            type="submit"
                                            variant="info"
                                            onClick={() => handlePrint()}
                                        >
                                            Print
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Modal
                className="modal"
                show={modalShow}
                size="lg"
                onHide={() => setModalShow(false)}
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
                    <div ref={componentRef} style={{ width: '100%', height: window.innerHeight }}>

                        <header style={{ marginLeft: '10px' }}>
                            <h2>BENGKEL ABC</h2>
                        </header>
                        <section style={{ marginLeft: '10px', marginRight: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'block' }}>
                                    <div style={{ display: 'flex', gap: 4 }}>
                                        <div style={{ fontFamily: 'Arial', fontWeight: 'bolder' }}>Nama Customer</div>
                                        <div style={{ fontFamily: 'Arial' }}>:</div>
                                        <div style={{ fontFamily: 'Arial' }}>{invoiceHeader.length === 0 ? '' : invoiceHeader[0].customer}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 4 }}>
                                        <div style={{ fontFamily: 'Arial', fontWeight: 'bolder' }}>No.HP</div>
                                        <div style={{ fontFamily: 'Arial' }}>:</div>
                                        <div style={{ fontFamily: 'Arial' }}>{invoiceHeader.length === 0 ? '' : invoiceHeader[0].noHp}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 4 }}>
                                        <div style={{ fontFamily: 'Arial', fontWeight: 'bolder' }}>Alamat</div>
                                        <div style={{ fontFamily: 'Arial' }}>:</div>
                                        <div style={{ fontFamily: 'Arial' }}>{invoiceHeader.length === 0 ? '' : invoiceHeader[0].alamat}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 4 }}>
                                        <div style={{ fontFamily: 'Arial', fontWeight: 'bolder' }}>Kendaraan</div>
                                        <div style={{ fontFamily: 'Arial' }}>:</div>
                                        <div style={{ fontFamily: 'Arial' }}>{invoiceHeader.length === 0 ? '' : invoiceHeader[0].kendaraan}</div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div style={{ display: 'flex', gap: 4 }}>
                                        <div style={{ fontFamily: 'Arial', fontWeight: 'bolder' }}>No.Plat</div>
                                        <div style={{ fontFamily: 'Arial' }}>:</div>
                                        <div style={{ fontFamily: 'Arial', textTransform: 'uppercase' }}>{invoiceHeader.length === 0 ? '' : invoiceHeader[0].noPlat}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 4 }}>
                                        <div style={{ fontFamily: 'Arial', fontWeight: 'bolder' }}>KM Mobil</div>
                                        <div style={{ fontFamily: 'Arial' }}>:</div>
                                        <div style={{ fontFamily: 'Arial' }}>{invoiceHeader.length === 0 ? '' : invoiceHeader[0].kmMasuk + " - " + invoiceHeader[0].kmKeluar}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 4 }}>
                                        <div style={{ fontFamily: 'Arial', fontWeight: 'bolder' }}>Tipe Transaksi</div>
                                        <div style={{ fontFamily: 'Arial' }}>:</div>
                                        <div style={{ fontFamily: 'Arial' }}>{invoiceHeader.length === 0 ? '' : invoiceHeader[0].tipeTransaksi}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 4 }}>
                                        <div style={{ fontFamily: 'Arial', fontWeight: 'bolder' }}>Status</div>
                                        <div style={{ fontFamily: 'Arial' }}>:</div>
                                        <div style={{ fontFamily: 'Arial' }}>{invoiceHeader.length === 0 ? '' : invoiceHeader[0].statusPembayaran}</div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div style={{ marginTop: '20px', marginBottom: '15px' }}>
                                <table style={{ width: '100%', border: '1px solid #000', borderCollapse: 'collapse' }}>
                                    <thead style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                        <tr style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                            <th style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial', textAlign: 'center', fontWeight: 'bolder' }}>
                                                Spare Part
                                            </th>
                                            <th style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial', textAlign: 'center', fontWeight: 'bolder' }}>
                                                Qty
                                            </th>
                                            <th style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial', textAlign: 'center', fontWeight: 'bolder' }}>
                                                Harga Satuan
                                            </th>
                                            <th style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial', textAlign: 'center', fontWeight: 'bolder' }}>
                                                Harga Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                        {invoiceProduk.length === 0 ? <tr style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                            <td style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial' }}>-</td>
                                            <td style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial' }}>-</td>
                                            <td style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial' }}>-</td>
                                            <td style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial' }}>-</td>
                                        </tr> :
                                            invoiceProduk.map(i =>
                                                <tr style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                                    <td style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial' }}>
                                                        {i.nama}
                                                    </td>
                                                    <td style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', textAlign: 'center', fontFamily: 'Arial' }}>
                                                        {i.qty}
                                                    </td>
                                                    <td style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', textAlign: 'right', fontFamily: 'Arial' }}>
                                                        {formatRupiah(i.hargaSatuan)}
                                                    </td>
                                                    <td style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', textAlign: 'right', fontFamily: 'Arial' }}>
                                                        {formatRupiah(i.totalHarga)}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        <tr style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                            <td colSpan={3} style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial', fontWeight: 'bolder' }}>
                                                Total
                                            </td>
                                            <td style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', textAlign: 'right', fontFamily: 'Arial' }}>
                                                {formatRupiah(totalPrica)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table style={{ width: '100%', border: '1px solid #000', borderCollapse: 'collapse', marginTop: '2px' }}>
                                    <thead style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                        <tr style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                            <th style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial', textAlign: 'center', fontWeight: 'bolder' }}>
                                                Mekanik
                                            </th>
                                            <th style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial', textAlign: 'center', fontWeight: 'bolder' }}>
                                                Ongkos
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                        {invoiceMekanik.length === 0 ? <tr style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                            <td style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial' }}>-</td>
                                            <td style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial' }}>-</td>
                                        </tr> :
                                            invoiceMekanik.map(i =>
                                                <tr style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                                    <td style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial' }}>
                                                        {i.mekanik}
                                                    </td>
                                                    <td style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', textAlign: 'right', fontFamily: 'Arial' }}>
                                                        {formatRupiah(i.ongkos)}
                                                    </td>
                                                </tr>
                                            )

                                        }
                                        <tr style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                            <td style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial', fontWeight: 'bolder' }}>
                                                Total Ongkos
                                            </td>
                                            <td style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', textAlign: 'right', fontFamily: 'Arial' }}>
                                                {formatRupiah(ongkosMekanik)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <hr />
                                <div style={{ display: 'flex', justifyContent: 'end' }}><span style={{ fontFamily: 'Arial', fontWeight: 'bolder' }}>TOTAL : {formatRupiah(totalPrica + ongkosMekanik)}</span> </div>
                                <hr />

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <span style={{ fontFamily: 'Arial' }}>Diterima</span>
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <span style={{ fontFamily: 'Arial', fontWeight: 'bolder' }}>{invoiceHeader.length === 0 ? '' : invoiceHeader[0].customer}</span>
                                    </div>
                                    <div>
                                        <span style={{ fontFamily: 'Arial' }}>Tgl, {moment().format('DD/MM/YYYY hh:mm')}</span>
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <span style={{ fontFamily: 'Arial', fontWeight: 'bolder' }}>...................................</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModalShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default LandingPage