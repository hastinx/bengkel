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
    const [report, setReport] = useState([]);

    const getList = async () => {
        const data = await getApi('report/transaksi/hutang');
        console.log(data)
        setReport(data);
    };


    useEffect(() => {
        getList()
    }, [])

    return (
        <>
            <MasterContainer title='Report Transaksi Cash' action={() => setShowModal(true)} actionTItle=' Tambah Customer' Menu='Report'>
                <TableData Data={report} Header={['Tanggal', 'Invoice', 'TOTAL TRANSAKSI']} Field={['tanggal', 'deskripsi', 'piutang']} Menu='Report' Action={[(e) => getEditData(e.target.id), (e) => handleDelete(e.target.id)]} />
            </MasterContainer>
        </>
    )
}

export default LandingPage