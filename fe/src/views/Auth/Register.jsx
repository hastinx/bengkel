import axios from 'axios';
import React, { useState } from 'react'
import {
    Row,
    Col,
    Form,
    Container,
    Card,
    Button
} from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import logo from '../../assets/img/wrench.svg';

const Register = () => {
    let history = useHistory()
    const [nama, setNama] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [msg, setMsg] = useState('')
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        if (form.checkValidity() === true) {
            event.preventDefault();
            handleRegister()
        }
    };

    const handleRegister = async () => {
        try {
            await axios.post(process.env.REACT_APP_API + 'auth/register', {
                nama: nama,
                email: email,
                confirmPassword: confirmPassword,
                password: password
            }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
            history.push('/')
        } catch (error) {
            if (error.response) setMsg(error.response.data.message)
        }
    }

    const toLoginPage = () => {
        history.push('/')
    }
    return (
        <>
            <Container fluid className='d-flex justify-content-center align-items-center bg-light vw-100 vh-100'>
                <Card className="p-3">
                    <Card.Header className='text-center'><img src={logo} alt='' className='avatar border-gray' /> {" "}Bengkel - Register <br /><span className='text-danger'>{msg}</span></Card.Header>
                    <Card.Body>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className='mt-2'>
                                <Col md="4"><label className='text-dark'>Nama</label></Col>
                                <Col className="pr-1" md="8">
                                    <Form.Group>
                                        <Form.Control
                                            required
                                            placeholder="Nama"
                                            type="text"
                                            onChange={(e) => setNama(e.target.value)}
                                        ></Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            nama harus di isi
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col md="4"><label className='text-dark'>Email</label></Col>
                                <Col className="pr-1" md="8">
                                    <Form.Group>
                                        <Form.Control
                                            required
                                            placeholder="Email"
                                            type="text"
                                            onChange={(e) => setEmail(e.target.value)}
                                        ></Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            email harus di isi
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col md="4"><label className='text-dark'>Password</label></Col>
                                <Col className="pr-1" md="8">
                                    <Form.Group>
                                        <Form.Control
                                            required
                                            placeholder="Password"
                                            type="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        ></Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            password harus di isi
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col md="4"><label className='text-dark'>Confirm Password</label></Col>
                                <Col className="pr-1" md="8">
                                    <Form.Group>
                                        <Form.Control
                                            required
                                            placeholder="Confirm Password"
                                            type="password"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        ></Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Confirm Password harus di isi
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className='mt-2'>

                                <Col className="pr-1 " sm='12' md="12" lg='12'>

                                    <Button className="btn btn-sm btn-success btn-fill float-end" type="submit">Register</Button>
                                    <Button className="btn btn-sm btn-neutral btn-fill float-end me-2" type="button" onClick={() => toLoginPage()}>Login</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>

                </Card>
            </Container>

        </>
    )
}

export default Register