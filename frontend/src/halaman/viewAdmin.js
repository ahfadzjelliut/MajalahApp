import React from "react";
import ListTableAdmin from "../komponen/listTableAdmin";
import { getpic } from "../gambarcontrol/model_control";
import { Link } from "react-router-dom";

class ViewAdmin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
             //imgurl : "/gambar/image.png",
             //judul : "Judulnya",
             //cek : "ada"
            //majalah : dummydatas()
            majalah: []
        }
    }
    componentDidMount(){
        this.tampilkanMajalah();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.majalah !== this.state.majalah) {
            console.log("State majalah berubah, tabel akan diperbarui.");
            this.tampilkanMajalah();
        }
    }
    async tampilkanMajalah(){
        try{
            const respon = await getpic();
            this.setState({majalah:respon});
        } catch(error){
            console.error("error saat mengambil data", error);
        }
    }
    
    render(){
        return(
            <>
            <div className="container mx-auto w-1/2 mt-10">
            <Link to="/tambahMajalah" className="relative w-32 ml-5 m-2 mt-5 bg-blue-400 p-3 rounded-md text-white justify-center 
            text-center hover:bg-blue-600 transition-colors duration-300">Tambah Majalah</Link>
            <Link to="/historiMajalah" className="relative w-32 m-2 mt-5 bg-blue-400 p-3 rounded-md text-white 
            justify-center text-center hover:bg-blue-600 transition-colors duration-300">Lihat Histori</Link>
            <Link to="/kunjungan" className="relative w-32 m-2 mt-5 bg-blue-400 p-3 rounded-md text-white 
            justify-center text-center hover:bg-blue-600 transition-colors duration-300">Lihat Kunjungan</Link>
            <ListTableAdmin item={this.state.majalah} refreshdata={this.tampilkanMajalah}/>
            </div>
            </>
        );
    }
    
}

export default ViewAdmin;