import React from "react";
import { Link } from "react-router-dom";
import ListTableKunjungan from "../komponen/listTableKunjungan";
import { tampilkanTamu } from "../gambarcontrol/model_control";

class ViewKunjungan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pengunjung: []
        }
    }
    componentDidMount(){
        this.tampilkanPengunjung();
    }
    async tampilkanPengunjung(){
        try{
            const respon = await tampilkanTamu();
            this.setState({pengunjung:respon});
        } catch(error){
            console.error("error saat mengambil data", error);
        }
    }
    
    render(){
        return(
            <>
            <div className="container mx-auto w-1/2 mt-10">
            <Link to="/viewAdmin" className="relative w-32 ml-5 m-2 mt-5 bg-blue-400 p-3 rounded-md text-white justify-center 
            text-center hover:bg-blue-600 transition-colors duration-300">Kembali</Link>
            <ListTableKunjungan item={this.state.pengunjung} />
            </div>
            </>
        );
    }
    
}

export default ViewKunjungan;