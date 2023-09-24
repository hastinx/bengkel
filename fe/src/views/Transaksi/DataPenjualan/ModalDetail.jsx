import TableData from 'components/TableMaster/Table'
import { formatRupiah } from 'helper'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { TableRetur } from './TableData'

export const ModalDetail = ({ showModalDetail, Action, SetState, Type, State, mekanik, detail, ongkosMekanik, sparePart }) => {

    return (
        <Modal
            className="modal"
            show={showModalDetail}
            onHide={Action[0]}
            size="xl"
        >

            <Modal.Header className="justify-content-center">
                DETAIL TRANSAKSI - {mekanik.length === 0 ? '' : mekanik[0].codeTransaksi}
            </Modal.Header>
            <Modal.Body className="">
                <div>Jasa Mekanik</div>
                <Row className='mt-2'>
                    <Col className="pr-1" md="12">
                        <TableData
                            Data={mekanik} Header={[
                                'Nama Mekanik',
                                'Ongkos',]} Field={[
                                    'mekanik',
                                    'ongkos']}
                            Menu='Detail Transaksi Mekanik'
                            Action={[(e) => getDetailData(e.target.id), (e) => handleDelete(e.target.id)]}
                        />
                    </Col>
                </Row>
                <div className='d-flex justify-content-end'> Total : {formatRupiah(ongkosMekanik)}</div>
                <hr />
                <div>Spare Part</div>
                <Row className='mt-2'>
                    <Col className="pr-1" md="12">
                        <TableData
                            Data={detail} Header={[
                                'Spare Part',
                                'Kode Part',
                                'Harga',
                                'Qty',
                                'Total Harga']} Field={[
                                    'nama',
                                    'kode_produk',
                                    'harga_satuan',
                                    'qty',
                                    'total_harga']}
                            Menu='Detail Transaksi Produk'
                            Action={[(e) => getDetailData(e.target.id), (e) => handleDelete(e.target.id)]}
                        />
                    </Col>
                </Row>
                <div className='d-flex justify-content-end'> Total : {formatRupiah(sparePart)}</div>
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

export const ModalRetur = ({ showModal, Action, SetState, Type, State, mekanik, detail, ongkosMekanik, sparePart }) => {

    return (
        <Modal
            className="modal"
            show={showModal}
            onHide={Action[0]}
            size="xl"
        >

            <Modal.Header className="justify-content-center fs-bold" closeButton>
                DETAIL TRANSAKSI - {mekanik.length === 0 ? '' : mekanik[0].codeTransaksi}


            </Modal.Header>
            <Modal.Body className="">
                <div>Jasa Mekanik</div>
                <Row className='mt-2'>
                    <Col className="pr-1" md="12">
                        <TableData
                            Data={mekanik} Header={[
                                'Nama Mekanik',
                                'Ongkos',]} Field={[
                                    'mekanik',
                                    'ongkos']}
                            Menu='Detail Transaksi Mekanik'
                            Action={[(e) => getDetailData(e.target.id), (e) => handleDelete(e.target.id)]}
                        />
                    </Col>
                </Row>
                <div className='d-flex justify-content-end'> Total : {formatRupiah(ongkosMekanik)}</div>
                <hr />
                <div>Spare Part</div>
                <Row className='mt-2'>
                    <Col className="pr-1" md="12">
                        <TableRetur
                            Data={detail} Header={[
                                'Spare Part',
                                'Kode Part',
                                'Harga',
                                'Qty',
                                'Total Harga']} Field={[
                                    'nama',
                                    'kode_produk',
                                    'harga_satuan',
                                    'stok_terjual',
                                    'total_harga']}
                            Menu='Detail Transaksi Produk'
                            Action={[(e) => getDetailData(e.target.id), (e) => handleDelete(e.target.id)]}
                        />
                    </Col>
                </Row>
                <div className='d-flex justify-content-end'> Total : {formatRupiah(sparePart)}</div>
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

