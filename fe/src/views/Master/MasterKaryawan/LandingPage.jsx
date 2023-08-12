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
    const [email, setEmail] = useState("");
    const [hp, setHp] = useState("");
    const [alamat, setAlamat] = useState("");
    const [keahlian, setKeahlian] = useState("");
    const [eId, setId] = useState(0);
    const [type, setType] = useState("");

    const getList = async () => {
        const data = await getApi('master/karyawan');
        console.log(data)
        setProduk(data);
    };

    const addSparePart = async () => {
        try {
            const res = await axios.post(process.env.REACT_APP_API + "master/karyawan/add", {
                nama: nama,
                email: email,
                hp: hp,
                alamat: alamat,
                keahlian: keahlian
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
            const res = await axios.post(process.env.REACT_APP_API + 'master/karyawan/delete/' + id);
            getList()
            Swal.fire(res.data.message);
        } catch (error) {
            error.response ? Swal.fire(error.response.data.message) : ""
        }
    };

    const getEditData = async (id) => {
        const data = await getApi('master/karyawan/byid/' + id);
        setNama(data[0].nama)
        setEmail(data[0].email)
        setHp(data[0].hp)
        setAlamat(data[0].alamat)
        setKeahlian(data[0].keahlian)
        setId(data[0].id)
        setType("edit")
        setShowModal(true)
    };

    const handleUpdate = async () => {
        try {
            const res = await axios.post(process.env.REACT_APP_API + "master/karyawan/edit/" + eId, {
                nama: nama,
                email: email,
                hp: hp,
                alamat: alamat,
                keahlian: keahlian
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
            <MasterContainer title='Master Karyawan' action={() => setShowModal(true)} actionTItle=' Tambah Karyawan'>
                <TableData Data={produk} Header={['Nama', 'Email', 'No.Hp', 'Alamat', 'Keahlian']} Field={['nama', 'email', 'hp', 'alamat', 'keahlian']} Menu='Master Karyawan' Action={[(e) => getEditData(e.target.id), (e) => handleDelete(e.target.id)]} />
            </MasterContainer>
            <ModalForm
                showModal={showModal}
                Type={type}
                Action={[() => setShowModal(false), () => addSparePart(), () => handleUpdate()]}
                SetState={[
                    (e) => setNama(e.target.value),
                    (e) => setEmail(e.target.value),
                    (e) => setHp(e.target.value),
                    (e) => setAlamat(e.target.value),
                    (e) => setKeahlian(e.target.value)
                ]}
                State={[
                    nama,
                    email,
                    hp,
                    alamat,
                    keahlian
                ]} />
        </>
    )
}

export default LandingPage