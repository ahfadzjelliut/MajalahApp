import React from "react";
import { isiTamu } from "../gambarcontrol/model_control";



class PageIsiTamuPengunjung extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nama : "",
            pekerjaan : "",
            alamat : "",
            tgl_kunjung : ""
        }

        this.inputnama = this.inputnama.bind(this);
        this.inputAlamat = this.inputAlamat.bind(this);
        this.inputPekerjaan = this.inputPekerjaan.bind(this);
        this.tukangTambah = this.tukangTambah.bind(this);
    }

    inputnama (e){
        this.setState(()=>{
            return {
                nama : e.target.value
            };
        });
    }
    inputAlamat (e){
        this.setState(()=>{
            return {
                alamat : e.target.value
            };
        });
    }
    inputPekerjaan(e){
        this.setState(()=>{
            return{
                pekerjaan : e.target.value
            };
        });
    }
    
    tukangTambah = async (e) => {
        e.preventDefault();
        const tgl_kunjung = formatDateToSQL(new Date());
        const { nama, pekerjaan, alamat } = this.state;
    
        try {
            const respon = await isiTamu(nama, pekerjaan, alamat, tgl_kunjung);

            console.log("Respons dari backend:", respon);
            if (respon.success) {
                const idPengunjung = respon.id_pengunjung;
    
                if (!idPengunjung) {
                    throw new Error("ID Pengunjung tidak ditemukan dalam respons backend.");
                }
            sessionStorage.setItem("id_pengunjung", idPengunjung);
            alert('Selamat Datang !');
            document.location.href = "/listMajalah";
        } else {
            alert("Gagal menambahkan data: " + respon.message);
        }
        } catch (error) {
            console.error("Error saat menambahkan data:", error);
            alert("Gagal menambahkan data.");
        }
    };

    render(){
        return(
            <>
            <div className="container mx-auto w-1/2 mt-10">
            
            <div className="mx-auto w-2/3 mt-10 border border-gray-300 shadow-md rounded-lg">
            <img className="m-3 w-1/2 mx-auto"
                 src="/gambar/imgMajal.png" alt="gambar" />
            <h2 className="mt-5 text-center">Isi Kunjungan</h2>
            <form onSubmit={this.tukangTambah} className="max-w-sm mx-auto mt-5 ml-8 mb-6">
                <input type="text" className="m-3 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                 placeholder="Nama anda" value={this.state.nama} onChange={this.inputnama} required/>
                <input type="text" className="m-3 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                 placeholder="Pekerjaan anda" value={this.state.pekerjaan} onChange={this.inputPekerjaan} required/>
                <textarea className="m-3 block p-2.5 w-full text-sm text-gray-900 h-36 resize-none bg-gray-50 rounded-lg border text-base
                border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                 value={this.state.alamat} onChange={this.inputAlamat} placeholder="Alamat"
                required/>
                <button type="submit" className="flex w-full m-2 mt-5 bg-blue-400 p-2 rounded-md text-white justify-center 
                    text-center hover:bg-blue-600 transition-colors duration-300">Masuk</button>
                {/* src={this.state.gambardemo}*/}
            </form>
            </div>
            </div>
            </>
        )
    }
    
}
function formatDateToSQL(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Tambahkan 0 jika bulan < 10
    const day = String(d.getDate()).padStart(2, '0'); // Tambahkan 0 jika tanggal < 10
    return `${year}-${month}-${day}`; // Format: YYYY-MM-DD
  }
export default PageIsiTamuPengunjung;