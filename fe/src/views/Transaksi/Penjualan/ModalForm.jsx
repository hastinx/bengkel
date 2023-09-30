import React from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'

const ModalForm = ({ showModal, Action, SetState, State, Type }) => {
    return (
        <Modal
            className="modal modal-primary"
            show={showModal}
            onHide={Action[0]}
        >
            <Modal.Header className="justify-content-center">
                {Type === "edit" ? "Edit " : ""}Tambah Customer Baru
            </Modal.Header>
            <Modal.Body className="">
                <Row className='mt-2'>
                    <Col md="4"><label>Nama</label></Col>
                    <Col className="pr-1" md="8">
                        <Form.Group>
                            <Form.Control
                                defaultValue={State[0]}
                                placeholder="Customer"
                                type="text"
                                onChange={SetState[0]}
                                className='text-uppercase'
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col md="4"><label>No.Hp</label></Col>
                    <Col className="pr-1" md="8">
                        <Form.Group>
                            <Form.Control
                                defaultValue={State[1]}
                                placeholder="No.Hp"
                                type="text"
                                onChange={SetState[1]}
                                className='text-uppercase'
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col md="4"><label>Alamat</label></Col>
                    <Col className="pr-1" md="8">
                        <Form.Group>
                            <Form.Control
                                defaultValue={State[2]}
                                placeholder="Alamat"
                                type="text"
                                onChange={SetState[2]}
                                className='text-uppercase'
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col md="4"><label>Kendaraan</label></Col>
                    <Col className="pr-1" md="8">
                        <Form.Group>
                            <Form.Control
                                defaultValue={State[3]}
                                placeholder="Kendaraan"
                                type="text"
                                onChange={SetState[3]}
                                className='text-uppercase'
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col md="4"><label>No.Plat</label></Col>
                    <Col className="pr-1" md="8">
                        <Form.Group>
                            <Form.Control
                                defaultValue={State[4]}
                                placeholder="No.Plat"
                                type="text"
                                onChange={SetState[4]}
                                className='text-uppercase'
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

            </Modal.Body>
            <div className="modal-footer">
                <Button
                    className="btn-fill"
                    type="button"
                    variant="danger"
                    onClick={Action[0]}
                >
                    Kembali
                </Button>
                <Button
                    className="btn btn-success btn-fill"
                    type="button"
                    variant="solid"
                    onClick={Type === "edit" ? Action[2] : Action[1]}
                >
                    Simpan
                </Button>
            </div>
        </Modal>
    )
}

export default ModalForm