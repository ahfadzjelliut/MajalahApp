import React from "react";

function ListTableHistori({item}) {
    var nomor = 1;
    function formatDateForDisplay(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tambahkan 0 jika bulan < 10
        const day = String(date.getDate()).padStart(2, '0'); // Tambahkan 0 jika tanggal < 10
        return `${day}-${month}-${year}`; // Format hasil: DD-MM-YYYY
      }
    return(
        <table className="m-5 p-2 border-separate border border-gray-300 rounded-lg">
            <thead>
                <tr className="text-center bg-gray-200 text-gray-900">
                    <td className="rounded-tl-lg p-2">nomor</td>
                    <td className=" p-2">Nama Pengunjung</td>
                    <td className=" p-2">Majalah Yang Dicek</td>
                    <td className=" p-2">Tanggal Kunjungan</td>
                </tr>
            </thead>
            <tbody>
                { item.map((tamu)=>(
                    <tr className="p-3 hover:bg-gray-100" key={tamu.id_pengunjung}>
                    <td className="text-center">{nomor++}</td>
                    <td className="p-2">{tamu.nm_pengunjung}</td>
                    <td className="p-2">{tamu.nm_majalah}</td>
                    <td className="p-2">{formatDateForDisplay(tamu.tgl_kunjung)}</td>
                </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ListTableHistori;