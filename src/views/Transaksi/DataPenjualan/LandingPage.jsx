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
import ModalForm from './ModalDetail';
import MasterContainer from 'layouts/MasterContainer';
import axios from 'axios'
import Swal from 'sweetalert2';
import ModalMekanik from './ModalDetail';
import ModalDetail from './ModalDetail';

const LandingPage = () => {
    const [showModal, setShowModal] = useState(false)
    const [produk, setProduk] = useState([]);
    const [mekanik, setMekanik] = useState([]);
    const [detailPart, setDetailPart] = useState([]);

    const getList = async () => {
        const data = await getApi('transaksi');
        console.log(data)
        setProduk(data);
    };

    const addSparePart = async () => {
        try {
            const res = await axios.post(process.env.REACT_APP_API + "master/produk/add", {
                nama: nama,
                kode: kode,
                harga_modal: harga_modal,
                harga_jual: harga_jual,
                qty: jumlah
            })
            Swal.fire(res.data.message)
            getList()
            setShowModal(false)
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

    const getDetailData = async (id) => {
        const mekanikData = await getApi('transaksi/' + id + '/mekanik');
        setMekanik(mekanikData)
        const detailData = await getApi('transaksi/' + id + '/produk');
        setDetailPart(detailData)
        setShowModal(true)
    };

    const handleUpdate = async () => {
        try {
            const res = await axios.post(process.env.REACT_APP_API + "master/produk/edit/" + eId, {
                nama: nama,
                kode: kode,
                harga_modal: harga_modal,
                harga_jual: harga_jual,
                qty: jumlah
            })

            Swal.fire(res.data.message)
            getList()
            setShowModal(false)
        } catch (error) {
            error.response ? Swal.fire(error.response.data.message) : ""
        }
    }

    useEffect(() => {
        getList()
    }, [])
    return (
        <>

            <MasterContainer title='Data Transaksi' action={() => setShowModal(true)} actionTItle=' Tambah Spare Part' Menu='Transaksi'>
                <TableData Data={produk} Header={[
                    'Kode',
                    'Nama Customer',
                    'Alamat',
                    'No HP',
                    'Status Pembayrana',
                    'Tipe Transaksi',
                    'No PLAT',
                    'Kendaraan',
                    'KM Masuk',
                    'KM Keluar',
                    'Tanggal']} Field={[
                        'code',
                        'customer',
                        'alamat',
                        'noHp',
                        'statusPembayaran',
                        'tipeTransaksi',
                        'noPlat',
                        'kendaraan',
                        'kmMasuk',
                        'kmKeluar',
                        'createdAt']} Menu='Data Transaksi' Action={[(e) => getDetailData(e.target.id), (e) => handleDelete(e.target.id)]} />
            </MasterContainer>
            <ModalDetail
                showModal={showModal}
                // Type={type}
                Action={[() => setShowModal(false), () => addSparePart(), () => handleUpdate()]}
                // SetState={[
                //     (e) => setKode(e.target.value),
                //     (e) => setNama(e.target.value),
                //     (e) => setJumlah(e.target.value),
                //     (e) => setHargaModal(e.target.value),
                //     (e) => setHargaJual(e.target.value)
                // ]}
                // State={[kode, nama, jumlah, harga_modal, harga_jual]} 
                mekanik={mekanik}
                detail={detailPart}

            />
        </>
    )
}

export default LandingPage