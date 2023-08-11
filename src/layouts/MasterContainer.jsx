import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'

const MasterContainer = ({ children, title, action, actionTItle, Menu }) => {
  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <div className='d-flex align-items-center justify-content-between'>
                <Card.Title as="h4">{title}</Card.Title>
                {Menu === 'Transaksi' ? "" : <Button
                  className="btn-fill pull-right"
                  type="submit"
                  variant="success"
                  onClick={action}
                >
                  {actionTItle}
                </Button>}

              </div>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              {children}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default MasterContainer