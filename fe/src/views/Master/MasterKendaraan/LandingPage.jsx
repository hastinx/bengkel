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
    const [merk, setMerk] = useState("");
    const [eId, setId] = useState(0);
    const [type, setType] = useState("");

    const getList = async () => {
        const data = await getApi('master/kendaraan');
        console.log(data)
        setProduk(data);
    };

    const addSparePart = async () => {
        try {
            const res = await axios.post(process.env.REACT_APP_API + "master/kendaraan/add", {
                nama: nama,
                merk: merk
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
            const res = await axios.post(process.env.REACT_APP_API + 'master/kendaraan/delete/' + id);
            getList()
            Swal.fire(res.data.message);
        } catch (error) {
            error.response ? Swal.fire(error.response.data.message) : ""
        }
    };

    const getEditData = async (id) => {
        const data = await getApi('master/kendaraan/byid/' + id);
        setNama(data[0].nama)
        setMerk(data[0].merk)
        setId(data[0].id)
        setType("edit")
        setShowModal(true)
    };

    const handleUpdate = async () => {
        try {
            const res = await axios.post(process.env.REACT_APP_API + "master/kendaraan/edit/" + eId, {
                nama: nama,
                merk: merk
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
            <MasterContainer title='Master Kendaraan' action={() => setShowModal(true)} actionTItle=' Tambah Kendaraan'>
                <TableData Data={produk} Header={['Merk', 'Name']} Field={['merk', 'nama']} Menu='Master Kendaraan' Action={[(e) => getEditData(e.target.id), (e) => handleDelete(e.target.id)]} />
            </MasterContainer>
            <ModalForm
                showModal={showModal}
                Type={type}
                Action={[() => setShowModal(false), () => addSparePart(), () => handleUpdate()]}
                SetState={[
                    (e) => setNama(e.target.value),
                    (e) => setMerk(e.target.value)
                ]}
                State={[nama, merk]} />
        </>
    )
}

export default LandingPage