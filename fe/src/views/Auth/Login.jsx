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

const Login = () => {
    let history = useHistory()
    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')
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
            handleLogin()
        }
    };
    const handleLogin = async () => {
        try {
            await axios.post(process.env.REACT_APP_API + 'auth/login', {
                account: account,
                password: password
            }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
            history.push('/admin/dashboard')
        } catch (error) {
            if (error.response) setMsg(error.response.data.message)
        }
    }

    const toRegisterPage = () => {
        history.push('/register')
    }
    return (
        <>
            <Container fluid className='d-flex justify-content-center align-items-center bg-dark vw-100 vh-100'>
                <Card className="p-3">
                    <Card.Header className='text-center border-2'><img src={logo} alt='' className='avatar border-gray' /> {" "}Bengkel - Login <br /><span className='text-danger'>{msg}</span></Card.Header>
                    <Card.Body>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className='mt-2'>
                                <Col md="4"><label className='text-dark'>Nama / Email</label></Col>
                                <Col className="pr-1" md="8">
                                    <Form.Group controlId="validationCustom01">
                                        <Form.Control
                                            required
                                            placeholder="Nama/email"
                                            type="text"
                                            onChange={(e) => { setAccount(e.target.value); setMsg('') }}
                                        ></Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            nama/email harus di isi
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col md="4"><label className='text-dark'>Password</label></Col>
                                <Col className="pr-1" md="8">
                                    <Form.Group controlId="validationCustom02">
                                        <Form.Control
                                            required
                                            placeholder="Password"
                                            type="password"
                                            onChange={(e) => { setPassword(e.target.value); setMsg('') }}
                                        ></Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            password harus di isi
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className='mt-2'>

                                <Col className="pr-1 " sm='12' md="12" lg='12'>

                                    <Button className="btn btn-sm btn-success btn-fill float-end" type="submit">Login</Button>
                                    <Button className="btn btn-sm btn-neutral btn-fill float-end me-2" type="button" onClick={() => toRegisterPage()}>Register</Button>
                                </Col>
                            </Row>
                        </Form>

                    </Card.Body>

                </Card>
            </Container>

        </>
    )
}

export default Login