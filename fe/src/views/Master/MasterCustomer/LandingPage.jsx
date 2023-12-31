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

const LandingPage = () => {
    const [showModal, setShowModal] = useState(false)
    const [produk, setProduk] = useState([]);
    const [nama, setNama] = useState("");
    const [hp, setHp] = useState("");
    const [alamat, setAlamat] = useState("");
    const [kendaraan, setKendaraan] = useState("");
    const [no_plat, setNoPlat] = useState("");
    const [eId, setId] = useState(0);
    const [type, setType] = useState("");

    const getList = async () => {
        const data = await getApi('master/customer');
        console.log(data)
        setProduk(data);
    };

    const clearField = () => {
        setNama("")
        setHp("")
        setAlamat("")
        setKendaraan("")
        setNoPlat("")
    }

    const addSparePart = async () => {
        try {
            const res = await axios.post(process.env.REACT_APP_API + "master/customer/add", {
                nama: nama,
                hp: hp,
                alamat: alamat,
                kendaraan: kendaraan,
                no_plat: no_plat
            })
            Swal.fire(res.data.message)
            getList()
            setShowModal(false)
        } catch (error) {
            console.log(error)
            error.response ? Swal.fire(error.response.data.message) : ""
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await axios.post(process.env.REACT_APP_API + 'master/customer/delete/' + id);
            getList()
            Swal.fire(res.data.message);
        } catch (error) {
            error.response ? Swal.fire(error.response.data.message) : ""
        }
    };

    const getEditData = async (id) => {
        const data = await getApi('master/customer/byid/' + id);
        setNama(data[0].nama)
        setHp(data[0].hp)
        setAlamat(data[0].alamat)
        setKendaraan(data[0].kendaraan)
        setNoPlat(data[0].no_plat)
        setId(data[0].id)
        setType("edit")
        setShowModal(true)
    };

    const handleUpdate = async () => {
        try {
            const res = await axios.post(process.env.REACT_APP_API + "master/customer/edit/" + eId, {
                nama: nama,
                hp: hp,
                alamat: alamat,
                kendaraan: kendaraan,
                no_plat: no_plat
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
            <MasterContainer title='Master Customer' action={() => { setShowModal(true); clearField(); setType("") }} actionTItle=' Tambah Customer'>
                <TableData Data={produk} Header={['Nama', 'No.Hp', 'Alamat', 'Kendaraan', 'No.Plat']} Field={['nama', 'hp', 'alamat', 'kendaraan', 'no_plat']} Menu='Master Customer' Action={[(e) => getEditData(e.target.id), (e) => handleDelete(e.target.id)]} />
            </MasterContainer>
            <ModalForm
                showModal={showModal}
                Type={type}
                Action={[() => { setShowModal(false); clearField(); setType("") }, () => addSparePart(), () => handleUpdate()]}
                SetState={[
                    (e) => setNama(e.target.value),
                    (e) => setHp(e.target.value),
                    (e) => setAlamat(e.target.value),
                    (e) => setKendaraan(e.target.value),
                    (e) => setNoPlat(e.target.value)
                ]}
                State={[
                    nama,
                    hp,
                    alamat,
                    kendaraan,
                    no_plat
                ]}
            />
        </>
    )
}

export default LandingPage