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
    Spinner,
} from "react-bootstrap";
import { getApi } from 'helper/api';
import ModalForm from './ModalForm';
import MasterContainer from 'layouts/MasterContainer';
import axios from 'axios'
import Swal from 'sweetalert2';
import moment from 'moment';

const LandingPage = () => {
    const [showModal, setShowModal] = useState(false)
    const [produk, setProduk] = useState([]);
    const [nama, setNama] = useState("");
    const [kode, setKode] = useState("");
    const [harga_modal, setHargaModal] = useState("");
    const [harga_jual, setHargaJual] = useState("");
    const [jumlah, setJumlah] = useState("");
    const [eId, setId] = useState(0);
    const [type, setType] = useState("");
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(false)

    const getList = async () => {
        setLoading(true)
        const data = await getApi('master/produk?filterBy=' + filter);
        setProduk(data);
        setLoading(false)
    };

    const clearField = () => {
        setNama("")
        setKode("")
        setHargaModal("")
        setHargaJual("")
        setJumlah("")
    }

    const clearFilter = async () => {
        setFilter("")
        const data = await getApi('master/produk');
        setProduk(data);

    }

    const addSparePart = async () => {
        try {
            const res = await axios.post(process.env.REACT_APP_API + "master/produk/add", {
                nama: nama,
                kode: kode,
                harga_modal: harga_modal,
                harga_jual: harga_jual,
                stok_input: jumlah,
                createdAt: moment().format('YYYY-MM'),
                createdBefore: moment().add(-1).format('YYYY-MM'),
            })
            Swal.fire(res.data.message)
            getList()
            setShowModal(false)
            clearField()
        } catch (error) {
            console.log(error)
            Swal.fire(error.response.data.message)
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await axios.post(process.env.REACT_APP_API + 'master/produk/delete/' + id);
            getList()
            Swal.fire(res.data.message);
        } catch (error) {
            Swal.fire(error.response.data.message);
        }
    };

    const getEditData = async (id) => {
        const data = await getApi('master/produk/byid/' + id);
        setNama(data[0].nama)
        setKode(data[0].kode)
        setHargaModal(data[0].harga_modal)
        setHargaJual(data[0].harga_jual)
        setJumlah(data[0].stok)
        setId(data[0].id)
        setType("edit")
        setShowModal(true)
    };

    const handleUpdate = async () => {
        try {
            const res = await axios.post(process.env.REACT_APP_API + "master/produk/edit/" + eId, {
                nama: nama,
                kode: kode,
                harga_modal: harga_modal,
                harga_jual: harga_jual,
                stok_input: jumlah,
            })

            Swal.fire(res.data.message)
            getList()
            setShowModal(false)
            clearField()
        } catch (error) {
            error.response ? Swal.fire(error.response.data.message) : ""
        }
    }

    useEffect(() => {
        getList()
    }, [])
    return (
        <>
            <MasterContainer title='Master Spare Part' action={() => { setShowModal(true); setType(""); clearField() }} actionTItle=' Tambah Spare Part'>
                <Card>
                    <Card.Body>
                        <div className='d-flex justify-content-Start gap-2'>
                            <div className='form-group'>
                                <label className='form-label'>Kode / Nama</label>
                                <input type='text' className='form-control' placeholder='Kode Barang / Nama' value={filter} onChange={(e) => setFilter(e.target.value)} />
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
                {loading ? <Spinner /> : <TableData Data={produk} Header={['Periode', 'Nama', 'Kode', 'Stok Input', 'Stok', 'Terjual', 'Sisa', 'Harga Modal', 'Harga Jual']} Field={['createdAt', 'nama', 'kode', 'stok_input', 'stok', 'stok_terjual', 'stok_sisa', 'harga_modal', 'harga_jual']} Menu='Master Spare Part' Action={[(e) => getEditData(e.target.id), (e) => handleDelete(e.target.id)]} />}

            </MasterContainer>
            <ModalForm
                showModal={showModal}
                Type={type}
                Action={[() => { setShowModal(false); setType(""); clearField() }, () => addSparePart(), () => handleUpdate()]}
                SetState={[
                    (e) => setKode(e.target.value),
                    (e) => setNama(e.target.value),
                    (e) => setJumlah(e.target.value),
                    (e) => setHargaModal(e.target.value),
                    (e) => setHargaJual(e.target.value)
                ]}
                State={[kode, nama, jumlah, harga_modal, harga_jual]} />
        </>
    )
}

export default LandingPage