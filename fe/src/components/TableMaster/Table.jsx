import { formatRupiah } from 'helper';
import React from 'react';
import moment from 'moment';
import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';

const TableData = ({ Data, Header, Field, Menu, Action }) => {

  return (
    <Table className="table-hover table-striped table-bordered">
      <thead>
        <tr>
          <th className="border-1 text-center">No</th>
          {Header.map((i) => (
            <th key={i} className="border-1 text-center">
              {i}
            </th>
          ))}

          {Menu === 'Detail Transaksi Mekanik' || Menu === 'Detail Transaksi Produk' || Menu === 'Report' ? '' : <th className="border-0">Action</th>}

        </tr>
      </thead>
      <tbody>
        {Data && Data.length > 0 ? (
          Data.map((el, idx, arr) => {
            return (
              <tr key={el.id}>
                <td className='border-1 text-center'>{idx + 1}</td>
                {Field.map((i) =>
                  i === 'harga' || i === 'harga_modal' || i === 'harga_jual' || i === 'ongkos' || i === 'hargaSatuan' || i === 'totalHarga' || i === 'debet' || i === 'kredit' || i === 'piutang' ? (
                    <td key={i} className='text-end border-1'>{formatRupiah(el[i])}</td>
                  ) : i === 'createdAt' && Menu === 'Master Spare Part' ? (
                    <td className='border-1 text-center' key={i}>{moment(el[i]).format('MM/YYYY')}</td>
                  ) : (i === 'createdAt' || i === 'tanggal' || i === 'log_createdAt') && Menu !== 'Master Spare Part' ? (
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
                    i === 'qty_awal' ? (
                      <td className='border-1' key={i}>{Number(el['qty']) + Number(el['qtyTerjual'])}</td>
                    ) :
                      i === 'total_modal' ? (
                        <td key={i} className='text-end border-1'>{formatRupiah((Number(el['qty']) + Number(el['qtyTerjual'])) * Number(el['harga_modal']))}</td>
                      ) :
                        i === 'total_terjual' ? (
                          <td key={i} className='text-end border-1'>{formatRupiah(Number(el['qtyTerjual']) * Number(el['harga_jual']))}</td>
                        ) :
                          i === 'total_jual' || i === 'modal' || i === 'keuntungan' ? (
                            <td key={i} className='text-end border-1'>{formatRupiah(Number(el[i]))}</td>
                          ) : (
                            <td className='border-1 text-center' key={i}>{el[i]}</td>
                          )
                )}

                <td className='border-1'>
                  {Menu === 'Data Transaksi' ? <><OverlayTrigger
                    overlay={<Tooltip id="tooltip-488980961">Edit</Tooltip>}
                  >

                    <Button
                      className="btn-simple btn-fill px-2 me-1"
                      type="button"
                      variant="success"
                      id={el.id}
                      onClick={Action[0]}
                    >
                      Bayar
                    </Button>
                  </OverlayTrigger>
                    <OverlayTrigger
                      overlay={<Tooltip id="tooltip-506045838">Remove..</Tooltip>}
                    >
                      <Button
                        className="btn-simple btn-fill px-2"
                        type="button"
                        variant="danger"
                        id={el.id}
                        onClick={Action[1]}
                      >
                        Retur
                      </Button>
                    </OverlayTrigger></> : Menu === 'Detail Transaksi Mekanik' || Menu === 'Detail Transaksi Produk' || Menu === 'Report' ? '' : <><OverlayTrigger
                      overlay={<Tooltip id="tooltip-488980961">Edit</Tooltip>}
                    >
                      <Button
                        className="btn-simple btn-link p-1"
                        type="button"
                        variant="info"
                        id={el.id}
                        onClick={Action[0]}
                      >
                        <i className="fas fa-edit" id={el.id}></i>
                      </Button>
                    </OverlayTrigger>
                      <OverlayTrigger
                        overlay={<Tooltip id="tooltip-506045838">Remove..</Tooltip>}
                      >
                        <Button
                          className="btn-simple btn-link p-1"
                          type="button"
                          variant="danger"
                          id={el.id}
                          onClick={Action[1]}
                        >
                          <i className="fas fa-times" id={el.id}></i>
                        </Button>
                      </OverlayTrigger></>}

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
  );
};

export default TableData;
