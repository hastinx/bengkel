import { formatRupiah } from 'helper';
import React, { useState } from 'react';
import moment from 'moment';
import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

export const TablePenjualan = ({ Data, Header, Field, Menu, Action }) => {
    console.log(Header)
    return (
        <>
            <Table className="table-hover table-striped">
                <thead>
                    <tr>
                        <th className="border-1 text-center">No</th>
                        {Header.map((i) => (
                            <th key={i} className="border-1 text-center">
                                {i}
                            </th>
                        ))}
                        <th className="border-1 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Data && Data.length > 0 ? (
                        Data.map((el, idx, arr) => {
                            return (
                                <tr key={el.id}>
                                    <td className='border-1 text-center'>{idx + 1}</td>
                                    {Field.map((i) =>
                                        i === 'createdAt' ? (
                                            <td className='border-1 text-center' key={i}>{moment(el[i]).format('DD/MM/YYYY')}</td>
                                        ) : i === 'code' ? (<td key={i}><Button
                                            className="btn-simple btn-link p-1 border-1"
                                            type="button"
                                            variant="info"
                                            id={el[i]}
                                            onClick={Action[0]}
                                        >
                                            {el[i]}
                                        </Button></td>) :
                                            <td className='border-1' key={i}>{el[i]}</td>

                                    )}

                                    <td className='border-1'>
                                        <>
                                            {el.statusPembayaran === 'lunas' ? '' : <OverlayTrigger
                                                overlay={<Tooltip id="tooltip-488980961">Bayar</Tooltip>}
                                            >
                                                <Button
                                                    className="btn-simple btn-fill px-2 me-1"
                                                    type="button"
                                                    variant="success"
                                                    id={el.code}
                                                    onClick={Action[2]}
                                                >
                                                    Bayar
                                                </Button>
                                            </OverlayTrigger>}

                                            <OverlayTrigger
                                                overlay={<Tooltip id="tooltip-506045838">Retur</Tooltip>}
                                            >
                                                <Button
                                                    className="btn-simple btn-fill px-2"
                                                    type="button"
                                                    variant="danger"
                                                    id={el.code}
                                                    onClick={Action[1]}
                                                >
                                                    Retur
                                                </Button>
                                            </OverlayTrigger></>

                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td className="text-center" colSpan={Header.length + 2}>
                                Data Not Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    )
}

export const TableRetur = ({ Data, Header, Field, Menu, Action }) => {
    const [qty, setQty] = useState(0)
    const [dataRetur, setDataRetur] = useState([])
    const history = useHistory()
    const insertRetur = (invoice, kodeProduk, qty, harga) => {

        let data = {
            invoice: invoice,
            kodeProduk: kodeProduk,
            qty: qty,
            harga: qty * harga
        }
        console.log(typeof qty)
        if (qty !== '0') setDataRetur(state => [...state, data])
    }

    const createRetur = async () => {

        try {
            const result = await axios.post(process.env.REACT_APP_API + "transaksi/retur", { retur: dataRetur })

            console.log('result', result)
            // Swal.fire(result.data.message)
            Swal.fire({
                title: result.data.message,
                icon: 'Success',
                confirmButtonColor: '#3085d6',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload()
                }
            })

        } catch (error) {
            console.log(error)
            Swal.fire(error.response.data.message)
        }
    }

    return (
        <>
            <Table className="table-hover table-striped table-bordered">
                <thead>
                    <tr>
                        <th className="border-1 text-center">No</th>
                        {Header.map((i) => (
                            <th key={i} className="border-1 text-center">
                                {i}
                            </th>
                        ))}
                        <th className="border-1 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Data && Data.length > 0 ? (
                        Data.map((el, idx, arr) => {
                            return (
                                <tr key={el.id}>
                                    <td className='border-1 text-center'>{idx + 1}</td>
                                    {Field.map((i) =>
                                        i === 'createdAt' ? (
                                            <td className='border-1 text-center' key={i}>{moment(el[i]).format('DD/MM/YYYY')}</td>
                                        ) : i === 'code' ? (<td key={i}><Button
                                            className="btn-simple btn-link p-1 border-1"
                                            type="button"
                                            variant="info"
                                            id={el[i]}
                                            onClick={Action[0]}
                                        >
                                            {el[i]}
                                        </Button></td>) : i === 'harga' || i === 'harga_modal' || i === 'harga_jual' || i === 'ongkos' || i === 'hargaSatuan' || i === 'totalHarga' || i === 'debet' || i === 'kredit' || i === 'piutang' ? (
                                            <td key={i} className='text-end border-1'>{formatRupiah(el[i])}</td>
                                        ) : i === 'qty' ? <td className='border-1' key={i}><input type='number' defaultValue='0' onChange={(e) => setQty(e.target.value)} /> &nbsp; {el[i]}</td> :
                                            <td className='border-1' key={i}>{el[i]}</td>

                                    )}

                                    <td className='border-1 text-end'>
                                        <>
                                            <OverlayTrigger
                                                overlay={<Tooltip id="tooltip-506045838">Retur</Tooltip>}
                                            >
                                                <Button
                                                    className="btn-simple btn-fill px-2"
                                                    type="button"
                                                    variant="danger"
                                                    id={el.code}
                                                    onClick={() => insertRetur(el.codeTransaksi, el.kodeProduk, qty, el.hargaSatuan)}
                                                >
                                                    Retur
                                                </Button>
                                            </OverlayTrigger></>

                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td className="text-center" colSpan={Header.length + 2}>
                                Data Not Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {dataRetur.length > 0 ? <div className='d-flex justify-content-end'>
                <button className='btn-simple btn-fill btn-success' onClick={() => createRetur()}>Buat Retur</button>
            </div> : ''}

        </>
    )
}
