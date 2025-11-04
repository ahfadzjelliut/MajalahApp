import React from "react";
import { uploadimg } from "../gambarcontrol/model_control";
import { Link } from "react-router-dom";



class PageTambahMajalah extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nama : "",
            deskripsi : "",
            gambardemo : "",
            jumlahhal : "",
            tgl_periode : ""
        }

        this.inputnama = this.inputnama.bind(this);
        this.inputdeskripsi = this.inputdeskripsi.bind(this);
        this.inputgambar = this.inputgambar.bind(this);
        this.jmlhal = this.jmlhal.bind(this);
        this.tglper = this.tglper.bind(this);
        this.tukangTambah = this.tukangTambah.bind(this);
    }

    inputnama (e){
        this.setState(()=>{
            return {
                nama : e.target.value
            };
        });
    }
    inputdeskripsi (e){
        this.setState(()=>{
            return {
                deskripsi : e.target.value
            };
        });
    }
    inputgambar (e){
        this.setState(()=>{
            return{
                gambardemo : e.target.files[0]
            };
        });
    }
    jmlhal(e){
        this.setState(()=>{
            return{
                jumlahhal : e.target.value
            };
        });
    }
    tglper(e){
        this.setState(()=>{
            return{
                tgl_periode : e.target.value
            };
        });
    }
    tukangTambah = async (e) => {
        e.preventDefault();
        const { nama, deskripsi, gambardemo, jumlahhal, tgl_periode } = this.state;
    
        try {
            if (gambardemo) {
                await uploadimg(nama, deskripsi, gambardemo, jumlahhal, tgl_periode);
                alert("Berhasil Menambah Data dan Mengunggah gambar");
            } else {
                await uploadimg(nama, deskripsi, null, jumlahhal, tgl_periode);
                alert("Berhasil Menambah Data tanpa gambar");
            }
            document.location.href = "/viewAdmin";
        } catch (error) {
            console.error("Error saat menambahkan data:", error);
            alert("Gagal menambahkan data.");
        }
    };

    render(){
        return(
            <>
            <div className="container mx-auto w-1/2 mt-10">
            <Link to="/viewAdmin" className="ml-28 flex w-24 ml-5 m-2 mt-5 bg-blue-400 p-2 rounded-md text-white 
            justify-center text-center hover:bg-blue-600 
            transition-colors duration-300">Kembali</Link>
            <div className="mx-auto w-2/3 mt-10 border border-gray-300 shadow-md rounded-lg">
            <h2 className="mt-5 text-center">Tambah Majalah</h2>
            <form onSubmit={this.tukangTambah} className="max-w-sm mx-auto mt-10 ml-8 mb-6">
                <input type="text" className="m-3 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                 placeholder="Judul majalah" value={this.state.nama} onChange={this.inputnama} required/>
                <input type="number" className="m-3 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                 placeholder="Jumlah halaman" value={this.state.jumlahhal} onChange={this.jmlhal} required/>
                <input type="text" className="m-3 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                 placeholder="Periode tanggal" value={this.state.tgl_periode} onChange={this.tglper} required/>
                <textarea className="m-3 block p-2.5 w-full text-sm text-gray-900 h-36 resize-none bg-gray-50 rounded-lg border text-base
                border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                 value={this.state.deskripsi} onChange={this.inputdeskripsi} placeholder="Deskripsi ..."
                required/>
                <input className="m-3 block w-full text-sm text-gray-400 text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50 
                focus:outline-none file:bg-gray-500 hover:file:bg-gray-700 file:text-gray-50 file:border-none file:p-2.5 file:cursor-pointer 
                file:text-sm file:rounded-l"
                type="file" onChange={this.inputgambar}/>
                <button type="submit" className="flex w-full m-2 mt-5 bg-blue-400 p-2 rounded-md text-white justify-center 
                    text-center hover:bg-blue-600 transition-colors duration-300">Tambahkan</button>
                {/* src={this.state.gambardemo}*/}
            </form>
            </div>
            </div>
            </>
        )
    }
}

export default PageTambahMajalah;