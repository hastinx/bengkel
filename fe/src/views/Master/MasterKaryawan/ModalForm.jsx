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
                {Type === "edit" ? "Edit " : ""}Master Karyawan
            </Modal.Header>
            <Modal.Body className="">
                <Row className='mt-2'>
                    <Col md="4"><label>Nama</label></Col>
                    <Col className="pr-1" md="8">
                        <Form.Group>
                            <Form.Control
                                defaultValue={State[0]}
                                placeholder="Nama"
                                type="text"
                                onChange={SetState[0]}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col md="4"><label>Email</label></Col>
                    <Col className="pr-1" md="8">
                        <Form.Group>
                            <Form.Control
                                defaultValue={State[1]}
                                placeholder="Email"
                                type="text"
                                onChange={SetState[1]}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col md="4"><label>No.Hp</label></Col>
                    <Col className="pr-1" md="8">
                        <Form.Group>
                            <Form.Control
                                defaultValue={State[2]}
                                placeholder="No.Hp"
                                type="text"
                                onChange={SetState[2]}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col md="4"><label>Alamat</label></Col>
                    <Col className="pr-1" md="8">
                        <Form.Group>
                            <Form.Control
                                defaultValue={State[3]}
                                placeholder="Alamat"
                                type="text"
                                onChange={SetState[3]}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col md="4"><label>Keahlian</label></Col>
                    <Col className="pr-1" md="8">
                        <Form.Group>
                            <Form.Control
                                defaultValue={State[4]}
                                placeholder="Keahlian"
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
                    onClick={Type = "edit" ? Action[2] : Action[1]}
                >
                    Simpan
                </Button>
            </div>
        </Modal>
    )
}

export default ModalForm