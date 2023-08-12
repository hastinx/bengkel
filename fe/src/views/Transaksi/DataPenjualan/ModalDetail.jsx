import TableData from 'components/TableMaster/Table'
import React from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'

const ModalDetail = ({ showModal, Action, SetState, Type, State, mekanik, detail }) => {
    return (
        <Modal
            className="modal"
            show={showModal}
            onHide={Action[0]}
            size="xl"
        >

            <Modal.Header className="justify-content-center">
                Detail Transaksi
            </Modal.Header>
            <Modal.Body className="">
                <Row className='mt-2'>
                    <Col className="pr-1" md="12">
                        <TableData
                            Data={mekanik} Header={[
                                'Kode',
                                'Nama Mekanik',
                                'Ongkos',]} Field={[
                                    'codeTransaksi',
                                    'mekanik',
                                    'ongkos']}
                            Menu='Detail Transaksi Mekanik'
                            Action={[(e) => getDetailData(e.target.id), (e) => handleDelete(e.target.id)]}
                        />
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col className="pr-1" md="12">
                        <TableData
                            Data={detail} Header={[
                                'Kode',
                                'Spare Part',
                                'Kode Part',
                                'Harga',
                                'Qty',
                                'Total Harga']} Field={[
                                    'codeTransaksi',
                                    'nama',
                                    'kodeProduk',
                                    'hargaSatuan',
                                    'qty',
                                    'totalHarga']}
                            Menu='Detail Transaksi Produk'
                            Action={[(e) => getDetailData(e.target.id), (e) => handleDelete(e.target.id)]}
                        />
                    </Col>
                </Row>
            </Modal.Body>
            <div className="modal-footer">
                <Button
                    className="btn-simple"
                    type="button"
                    variant="link"
                    onClick={Action[0]}
                >
                    Kembali
                </Button>
            </div>

        </Modal>
    )
}

export default ModalDetail