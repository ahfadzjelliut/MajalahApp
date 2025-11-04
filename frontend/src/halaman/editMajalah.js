import React from "react";
import { updateMajalah, despic } from "../gambarcontrol/model_control";
import { Link } from "react-router-dom";


class PageEditMajalah extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : null,
            nama : "",
            deskripsi : "",
            gambardemo : null,
            jumlahhal : "",
            tgl_periode : ""
        }

    }

    componentDidMount(){
        this.viewedit();
    }

    async viewedit() {
        // Ambil ID dari URL menggunakan props router
        const idMajalah = this.props.match?.params?.id || window.location.pathname.split("/").pop();
        this.setState({ id: idMajalah });

        try {
            const dataMajalah = await despic(idMajalah); // Fetch data detail
            const majalah = dataMajalah[0];
            this.setState({
                nama: majalah.nm_majalah,
                deskripsi: majalah.deskripsi,
                jumlahhal: majalah.jml_hal,
                tgl_periode: majalah.tgl_periode,
                gambardemo: majalah.lokasigambar
            });
        } catch (error) {
            console.error("Gagal mendapatkan detail majalah:", error);
        }
    }

    inputnama = (e) => {
        this.setState({ nama: e.target.value });
    };

   
    inputdeskripsi = (e) => {
        this.setState({ deskripsi: e.target.value });
    };

    inputgambar = (e) => {
        this.setState({ gambardemo: e.target.files[0] });
    };

    jmlhal = (e) => {
        this.setState({ jumlahhal: e.target.value });
    };

    tglper = (e) => {
        this.setState({ tgl_periode: e.target.value });
    };
    tukangEdit= async (e) => {
        e.preventDefault();
        const { id, nama, deskripsi, gambardemo, jumlahhal, tgl_periode } = this.state;

        const formData = new FormData();
        formData.append("nama", nama);
        formData.append("deskripsi", deskripsi);
        formData.append("jumlahhal", jumlahhal);
        formData.append("tgl_periode", tgl_periode);

        if (gambardemo) {
            formData.append("gambar", gambardemo); // Hanya tambahkan gambar jika diubah
        }

        try {
            const respon = await updateMajalah(id, formData);
            alert(respon.message);
            document.location.href = "/viewAdmin";
        } catch (error) {
            console.error("Error saat mengupdate data:", error);
            alert("Gagal mengupdate data majalah.");
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
            <h2 className="mt-5 text-center">Ubah Majalah</h2>
            <form onSubmit={this.tukangEdit} className="max-w-sm mx-auto mt-10 ml-8 mb-6">
                <input type="text" className="m-3 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                 placeholder="judul majalah" value={this.state.nama} onChange={this.inputnama}/>
                <input type="text" className="m-3 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                 placeholder="jumlah halaman" value={this.state.jumlahhal} onChange={this.jmlhal}/>
                <input type="text" className="m-3 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                 placeholder="periode tanggal" value={this.state.tgl_periode} onChange={this.tglper}/>
                <textarea className="m-3 block p-2.5 w-full text-sm text-gray-900 h-36 resize-none bg-gray-50 rounded-lg border text-base
                border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                 value={this.state.deskripsi} onChange={this.inputdeskripsi} />
                <input className="m-3 block w-full text-sm text-gray-400 text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50 
                focus:outline-none file:bg-gray-500 hover:file:bg-gray-700 file:text-gray-50 file:border-none file:p-2.5 file:cursor-pointer 
                file:text-sm file:rounded-l" type="file" onChange={this.inputgambar}/>
                <img className="m-3 h-50 w-full object-cover"
                 src={this.state.gambardemo ? `http://localhost:5000${this.state.gambardemo}`: "/gambar/image.png"} alt="gambar" />
                <button type="submit" className="flex w-full m-2 mt-5 bg-blue-400 p-2 rounded-md text-white justify-center 
                    text-center hover:bg-blue-600 transition-colors duration-300">Perbarui</button>
                {/* src={this.state.gambardemo}*/}
            </form>
            </div>
            </div>
            </>
        )
    }
}

export default PageEditMajalah;