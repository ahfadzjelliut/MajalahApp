import React from "react";
import { Link } from "react-router-dom";
import { isiHistori } from "../gambarcontrol/model_control";

function CardMajalah({imgurl,jdlMajalah,cekAda,detailnya,idnya}) {
    const idPengunjung = sessionStorage.getItem("id_pengunjung");
    return(
        <div className="border border-gray-200 bg-white shadow-md m-5 rounded-lg p-1 w-56 overflow-hidden 
        hover:drop-shadow-lg transition-shadow duration-300">
            <img src={imgurl} alt="gambar" className="h-40 w-full object-cover rounded-t-lg" />
            <h2 className="flex m-2 justify-center items-center text-xl">{jdlMajalah}</h2>
            <div className="flex flex-row col-span-1 justify-center">
                <span className="w-full m-2 bg-green-400 p-3 rounded-md text-white text-center">{cekAda}</span>
                <Link to={detailnya} onClick={()=>AddHistori(idnya,idPengunjung)} className="w-full m-2 bg-blue-400 p-3 rounded-md text-white text-center hover:bg-blue-600 transition-colors duration-300">Detail</Link>
            </div>
        </div>
    );
}

async function AddHistori(majalah,pengunjung) {
    try {
        await isiHistori(majalah,pengunjung);
    }
    catch(error){
        console.error("Error saat menambahkan data:", error);
    }
}
export default CardMajalah;