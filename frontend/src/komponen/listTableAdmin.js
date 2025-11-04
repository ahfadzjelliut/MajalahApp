import React from "react";
import { Link } from "react-router-dom";
import { hapusMajalah } from "../gambarcontrol/model_control";

function ListTableAdmin({item,refreshdata}) {
    var nomor = 1;
    const handleHapus = async (id) => {
        const konfirmasi = window.confirm("Apakah Anda yakin ingin menghapus majalah ini?");
        if (konfirmasi) {
            try {
                await hapusMajalah(id);
                alert("Data berhasil dihapus.");
                refreshdata();
            } catch (error) {
                alert("Gagal menghapus data. Periksa koneksi backend.");
            }
        }
    };
    return(
        <table className="m-5 p-2 border-separate border border-gray-300 rounded-lg">
            <thead>
                <tr className="text-center bg-gray-200 text-gray-900">
                    <td className="rounded-tl-lg p-2">nomor</td>
                    <td className=" p-2">judul majalah</td>
                    <td className=" p-2">deskripsi</td>
                    <td className=" p-2">jumlah halaman</td>
                    <td className=" p-2">tanggal periode</td>
                    <td className="rounded-tr-lg p-2">Aksi</td>
                </tr>
            </thead>
            <tbody>
                { item.map((majalah)=>(
                    <tr className="p-3 hover:bg-gray-100" key={majalah.id_majalah}>
                    <td className="text-center">{nomor++}</td>
                    <td className="p-2">{majalah.nm_majalah}</td>
                    <td className="p-2">{majalah.deskripsi}</td>
                    <td className="text-center p-2">{majalah.jml_hal}</td>
                    <td className="p-2">{majalah.tgl_periode}</td>
                    <td className="p-2"><button className="flex w-32 m-2 mt-5 bg-blue-400 p-1 rounded-md text-white justify-center 
                    text-center hover:bg-blue-600 transition-colors duration-300"
                    onClick={() => handleHapus(majalah.id_majalah)}>Hapus</button>
                    <Link className="flex w-32 m-2 mt-5 bg-blue-400 p-1 rounded-md text-white justify-center 
                    text-center hover:bg-blue-600 transition-colors duration-300"
                     to={`/editMajalah/${majalah.id_majalah}`}>edit</Link></td>
                </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ListTableAdmin;