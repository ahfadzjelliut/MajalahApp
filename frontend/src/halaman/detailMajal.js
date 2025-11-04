import React from "react";
import { Link, useParams } from "react-router-dom";
import DeskripsiMajalahCard from "../komponen/deskripsiMajal";
import { despic } from "../gambarcontrol/model_control";

class DetailMajal extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            majalah:null
        };
    
    }
    componentDidMount(){
        this.tampilkanDeskripsi();
    }
    async tampilkanDeskripsi(){
        const {id} = this.props;
            try{
                const respon = await despic(id);
                this.setState({majalah:respon[0]});
            } catch(error){
                console.error("error saat mengambil data", error);
            }
        }
    render(){
        const {majalah} = this.state
        if (!majalah) {
            return <p>ga ada tampilan</p>
        }
        return(
            <>
            <div className="container mx-auto w-1/2">
            <Link to="/listMajalah" className="flex w-32 ml-5 m-2 mt-5 bg-blue-400 p-3 rounded-md text-white justify-center 
            text-center hover:bg-blue-600 
            transition-colors duration-300">Kembali</Link>
            <DeskripsiMajalahCard nama={majalah.nm_majalah} deskripsi={majalah.deskripsi} 
            halaman={majalah.jml_hal} periode={majalah.tgl_periode} gambar={majalah.lokasigambar
                ? `http://localhost:5000${majalah.lokasigambar}` : "/gambar/image.png"
            } />
            </div>
            </>
        )
    }
}


export default function DetailMajalPage(){
    const {id} = useParams();
    return <DetailMajal id={id} />;
}