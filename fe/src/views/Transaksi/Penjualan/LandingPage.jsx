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
import ModalForm from './ModalForm';
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
var optionMekanik = [];
var optionCustomer = [];

const LandingPage = () => {

    const history = useHistory()
    const [showModal, setShowModal] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [optionsCustomer, setOptionCustomer] = useState([])
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
    const [mekanik, setMekanik] = useState([])
    const componentRef = useRef(), optionMekanik1 = useRef(), optionMekanik2 = useRef(), optionMekanik3 = useRef(), optionProduk = useRef(), optionType = useRef(), optionJenis = useRef()
    //===============STATE INSERT NEW CUSTOMER ========================

    const [newNama, setNewNama] = useState("")
    const [newHp, setNewHp] = useState("")
    const [newAlamat, setNewAlamat] = useState("")
    const [newKendaraan, setNewKendaraan] = useState("")
    const [newPlat, setNewPlat] = useState("")
    //===============STATE INSERT NEW CUSTOMER ========================

    const logo = require('./../../../assets/img/FM_BAN.png')

    const getDataCustomer = async () => {
        const data = await getApi('master/customer');
        console.log(data)
        optionCustomer = []
        if (data && data.length > 0) {
            data.map(i => {
                optionCustomer.push({
                    value: i.no_plat,
                    label: i.no_plat
                })
            })
        }
        setOptionCustomer(data);
    };

    const clearFieldCustomer = () => {
        setCustomer('')
        setNoHp('')
        setAlamat('')
        setKendaraan('')
        setNoPlat('')
    }

    const clearFieldInsertCustomer = () => {
        setNewNama("")
        setNewHp("")
        setNewAlamat("")
        setNewKendaraan("")
        setNewPlat("")
    }

    const addNewCustomer = async () => {
        try {
            const res = await axios.post(process.env.REACT_APP_API + "master/customer/add", {
                nama: newNama,
                hp: newHp,
                alamat: newAlamat,
                kendaraan: newKendaraan,
                no_plat: newPlat
            })
            Swal.fire(res.data.message)
            getDataCustomer()
            setShowModal(false)
            clearFieldInsertCustomer()
        } catch (error) {
            console.log(error)
            error.response ? Swal.fire(error.response.data.message) : ""
        }
    }

    const getOptionSpareParts = async () => {
        try {
            const result = await getApi('master/produk')
            result.map(i =>
                options.push({
                    value: i.id + ">" + i.kode + ">" + i.nama + ">" + i.stok_sisa + ">" + i.harga_jual,
                    label: i.nama
                })
            )
        } catch (error) {
            console.log(error)
        }
    }

    const getOptionMekanik = async () => {
        try {
            const result = await getApi('master/mekanik')
            console.log(result)
            result.map(i => {
                optionMekanik.push({
                    value: i.nama,
                    label: i.nama
                })
            })
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
            result.map(i => total += (i.stok_terjual * i.harga_satuan))
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

    const removeFromCart = async (id) => {
        try {
            await axios.delete(process.env.REACT_APP_API + 'cart/' + id)
            getCart()
        } catch (error) {

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

            Swal.fire(result.data.message)

            document.getElementById("customer").value = ""
            document.getElementById("noHp").value = ""
            document.getElementById("alamat").value = ""
            document.getElementById("kendaraan").value = ""
            document.getElementById("noPlat").value = ""
            document.getElementById("kmMasuk").value = ""
            document.getElementById("kmKeluar").value = ""
            document.getElementById("ongkos1").value = ""
            document.getElementById("ongkos2").value = ""
            document.getElementById("ongkos3").value = ""
            optionMekanik1.current.clearValue();
            optionMekanik2.current.clearValue();
            optionMekanik3.current.clearValue();
            optionProduk.current.clearValue();
            optionJenis.current.clearValue();
            optionType.current.clearValue();
            setCart([])
            setTotalPrica(0)
            setOngkosMekanik(0)
            setMekanik1({})
            setMekanik2({})
            setMekanik3({})
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
        documentTitle: 'fahmi-ban-invoice'
    })

    const getCustomerByNoPlat = async (no_plat) => {
        try {
            const data = await getApi('master/customer/byPlat?noPlat=' + no_plat);
            setCustomer(data[0].nama)
            setNoHp(data[0].hp)
            setAlamat(data[0].alamat)
            setKendaraan(data[0].kendaraan)
            setNoPlat(data[0].no_plat)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getOptionSpareParts()
        getOptionMekanik()
        getCart()
        getDataCustomer()
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
                                                            defaultValue={customer}
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
                                                            defaultValue={noHp}
                                                            value={noHp}
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
                                                            defaultValue={alamat}
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
                                                            defaultValue={kendaraan}
                                                            onChange={(e) => setKendaraan(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1" md="6">
                                                    <Form.Group>
                                                        <label className='fw-bold text-dark'>NO.PLAT KENDARAAN
                                                            <Button
                                                                className="btn-simple"
                                                                type="button"
                                                                variant="link"
                                                                onClick={() => setShowModal(true)}
                                                            >
                                                                Tambah data customer
                                                            </Button>
                                                        </label>
                                                        <Select
                                                            ref={optionCustomer}
                                                            isClearable={true}
                                                            onChange={(e) => { e !== null ? getCustomerByNoPlat(e.value) : clearFieldCustomer() }}
                                                            options={optionCustomer}
                                                        />
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
                                                        <Select
                                                            ref={optionMekanik1}
                                                            isClearable={true}
                                                            onChange={(e) => e !== null ? setMekanik1(state => ({ ...state, mekanik: e.value, no: 1 })) : setMekanik1(state => ({ ...state, mekanik: '', no: 1 }))}
                                                            options={optionMekanik}
                                                        />
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
                                                        <Select
                                                            ref={optionMekanik2}
                                                            isClearable={true}
                                                            onChange={(e) => e !== null ? setMekanik2(state => ({ ...state, mekanik: e.value, no: 2 })) : setMekanik2(state => ({ ...state, mekanik: '', no: 2 }))}
                                                            options={optionMekanik}
                                                        />
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
                                                        <Select
                                                            ref={optionMekanik3}
                                                            isClearable={true}
                                                            onChange={(e) => e !== null ? setMekanik3(state => ({ ...state, mekanik: e.value, no: 3 })) : setMekanik3(state => ({ ...state, mekanik: '', no: 3 }))}
                                                            options={optionMekanik}
                                                        />
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
                                                            ref={optionType}
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
                                                            ref={optionJenis}
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
                                                            ref={optionProduk}
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
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.length > 0 ? cart.map(i =>
                                                    <tr key={i.id}>
                                                        <td>{i.nama}</td>
                                                        <td>{i.harga_satuan}</td>
                                                        <td><input type='number' defaultValue={i.stok_terjual} onChange={(e) => addToCart(i.harga_satuan, i.kode_produk, e.target.value)} /></td>
                                                        <td>{formatRupiah(Number(i.stok_terjual * i.harga_satuan))}</td>
                                                        <td><Button
                                                            className="btn-simple btn-link p-1"
                                                            type="button"
                                                            variant="danger"
                                                            id={i.id}
                                                            onClick={(e) => removeFromCart(e.target.id)}
                                                        >
                                                            <i className="fas fa-times" id={i.id}></i>
                                                        </Button></td>
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
                    <div ref={componentRef} style={{ width: '95%', display: 'flex', justifyContent: 'center', height: window.innerHeight, marginLeft: '10px', marginRight: '10px' }}>
                        <div style={{ width: '100%' }}>
                            <header style={{ marginLeft: '10px' }}>
                                {/* <h2>FAHMI BAN</h2> */}
                                <img src={logo} alt='' style={{ height: '50px', marginTop: '20px', marginBottom: '30px' }} />
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
                    <Button onClick={() => setModalShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <ModalForm
                showModal={showModal}
                Action={[() => { setShowModal(false); clearFieldInsertCustomer() }, () => addNewCustomer()]}
                SetState={[
                    (e) => setNewNama(e.target.value),
                    (e) => setNewHp(e.target.value),
                    (e) => setNewAlamat(e.target.value),
                    (e) => setNewKendaraan(e.target.value),
                    (e) => setNewPlat(e.target.value)
                ]}
                State={[
                    newNama,
                    newHp,
                    newAlamat,
                    newKendaraan,
                    newPlat
                ]}
            />
        </>
    )
}

export default LandingPage