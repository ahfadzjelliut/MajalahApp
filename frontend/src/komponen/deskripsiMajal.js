import React from "react";

function DeskripsiMajalahCard({nama,deskripsi,halaman,periode,gambar}) {
    return(
        <div className="border border-gray-200 bg-white shadow-md m-5 rounded-lg p-1 w-full">
            <div className="m-5">
            <h2 className="flex m-2 justify-center items-center text-xl">{nama}</h2> 
            <p className="mt-3">Deskripsi : {deskripsi}</p>
            <p className="mt-3">Total : {halaman} Halaman </p> 
            <p className="mt-3">Tanggal Periode : {periode}</p> 
            </div>
            <img src={gambar} alt="gambar" className="h-96 w-full object-cover rounded-b-lg" /> <br/> 
        </div>
    );
}
export default DeskripsiMajalahCard;