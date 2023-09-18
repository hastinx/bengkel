import React from 'react'

const Invoice = () => {
    return (
        <>
            <div id='print'>
                <header>
                    <h2>BENGKEL ABC</h2>
                </header>
                <section>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'block' }}>
                            <div style={{ display: 'flex', gap: 4 }}>
                                <div style={{ fontFamily: 'Arial' }}>Nama Customer</div>
                                <div style={{ fontFamily: 'Arial' }}>:</div>
                                <div style={{ fontFamily: 'Arial' }}></div>
                            </div>
                            <div style={{ display: 'flex', gap: 4 }}>
                                <div style={{ fontFamily: 'Arial' }}>No.HP</div>
                                <div style={{ fontFamily: 'Arial' }}>:</div>
                                <div style={{ fontFamily: 'Arial' }}></div>
                            </div>
                            <div style={{ display: 'flex', gap: 4 }}>
                                <div style={{ fontFamily: 'Arial' }}>Alamat</div>
                                <div style={{ fontFamily: 'Arial' }}>:</div>
                                <div style={{ fontFamily: 'Arial' }}></div>
                            </div>
                            <div style={{ display: 'flex', gap: 4 }}>
                                <div style={{ fontFamily: 'Arial' }}>Kendaraan</div>
                                <div style={{ fontFamily: 'Arial' }}>:</div>
                                <div style={{ fontFamily: 'Arial' }}></div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div style={{ display: 'flex', gap: 4 }}>
                                <div style={{ fontFamily: 'Arial' }}>No.Plat</div>
                                <div style={{ fontFamily: 'Arial' }}>:</div>
                                <div style={{ fontFamily: 'Arial' }}></div>
                            </div>
                            <div style={{ display: 'flex', gap: 4 }}>
                                <div style={{ fontFamily: 'Arial' }}>KM Mobil</div>
                                <div style={{ fontFamily: 'Arial' }}>:</div>
                                <div style={{ fontFamily: 'Arial' }}></div>
                            </div>
                            <div style={{ display: 'flex', gap: 4 }}>
                                <div style={{ fontFamily: 'Arial' }}>Tipe Transaksi</div>
                                <div style={{ fontFamily: 'Arial' }}>:</div>
                                <div style={{ fontFamily: 'Arial' }}></div>
                            </div>
                            <div style={{ display: 'flex', gap: 4 }}>
                                <div style={{ fontFamily: 'Arial' }}>Status</div>
                                <div style={{ fontFamily: 'Arial' }}>:</div>
                                <div style={{ fontFamily: 'Arial' }}></div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div style={{ marginTop: '20px', marginBottom: '15px' }}>
                        <table style={{ width: '100%', border: '1px solid #000', borderCollapse: 'collapse' }}>
                            <thead style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                <tr style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                    <th style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial' }}>
                                        Spare Part
                                    </th>
                                    <th style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial' }}>
                                        Qty
                                    </th>
                                    <th style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial' }}>
                                        Harga Satuan
                                    </th>
                                    <th style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial' }}>
                                        Harga Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                <tr style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                    <td style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', fontFamily: 'Arial' }}>
                                        Spare Part
                                    </td>
                                    <td style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', textAlign: 'center', fontFamily: 'Arial' }}>
                                        QTY
                                    </td>
                                    <td style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', textAlign: 'right', fontFamily: 'Arial' }}>
                                        Harga Satuan
                                    </td>
                                    <td style={{ border: '1px solid #000', borderCollapse: 'collapse', padding: '3px', textAlign: 'right', fontFamily: 'Arial' }}>
                                        Harga Total
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <hr />

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <span>Diterima</span>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <span>Customer</span>
                            </div>
                            <div>
                                <span>Tgl, {moment().format('DD/MM/YYYY hh:mm')}</span>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <span>Petugas Bengkel</span>
                            </div>
                        </div>
                    </div>

                </section>
            </div>

        </>
    )
}

export default Invoice