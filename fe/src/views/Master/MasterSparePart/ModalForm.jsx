import React from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'

const ModalForm = ({ showModal, Action, SetState, Type, State }) => {
    console.log('Type', Type)
    return (
        <Modal
            className="modal modal-primary"
            show={showModal}
            onHide={Action[0]}
        >
            <Modal.Header className="justify-content-center">
                {Type === "edit" ? "Edit " : ""}Master Spare Part
            </Modal.Header>
            <Modal.Body className="">
                <Row className='mt-2'>
                    <Col md="4"><label>Kode</label></Col>
                    <Col className="pr-1" md="8">
                        <Form.Group>
                            <Form.Control
                                defaultValue={State[0]}
                                placeholder="Kode spare part"
                                type="text"
                                onChange={SetState[0]}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col md="4"><label>Nama</label></Col>
                    <Col className="pr-1" md="8">
                        <Form.Group>
                            <Form.Control
                                defaultValue={State[1]}
                                placeholder="Nama spare part"
                                type="text"
                                onChange={SetState[1]}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col md="4"><label>Jumlah</label></Col>
                    <Col className="pr-1" md="8">
                        <Form.Group>
                            <Form.Control
                                defaultValue={State[2]}
                                placeholder="Stock spare part"
                                type="text"
                                onChange={SetState[2]}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col md="4"><label>Harga Modal</label></Col>
                    <Col className="pr-1" md="8">
                        <Form.Group>
                            <Form.Control
                                defaultValue={State[3]}
                                placeholder="Harga Modal"
                                type="text"
                                onChange={SetState[3]}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col md="4"><label>Harga Jual</label></Col>
                    <Col className="pr-1" md="8">
                        <Form.Group>
                            <Form.Control
                                defaultValue={State[4]}
                                placeholder="Harga Jual"
                                type="text"
                                onChange={SetState[4]}
                            ></Form.Control>
                        </Form.Group>
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
                <Button
                    className="btn btn-success"
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