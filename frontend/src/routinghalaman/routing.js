import React from "react";
import { Routes, Route } from "react-router-dom";
import ListMajalah from "../halaman/listMajalah";
import PageTambahMajalah from "../halaman/tambahMajalah";
import ViewAdmin from "../halaman/viewAdmin";
import PageEditMajalah from "../halaman/editMajalah";
import DetailMajalPage from "../halaman/detailMajal";
import PageIsiTamuPengunjung from "../halaman/IsiTamuPengunjung";
import ViewKunjungan from "../halaman/viewKunjungan";
import ViewHistori from "../halaman/viewHistori";


function RouteHalaman() {
    return(
        <Routes>
            <Route path="/listMajalah" exact element={<ListMajalah />} />
            <Route path="/tambahMajalah" exact element={<PageTambahMajalah />} />
            <Route path="/viewAdmin" exact element={<ViewAdmin />} />
            <Route path="/editMajalah/:id" exact element={<PageEditMajalah />} />
            <Route path="/detailMajalah/:id" exact element={<DetailMajalPage />} />
            <Route path="/kunjungan" exact element={<ViewKunjungan />} />
            <Route path="/historiMajalah" exact element={<ViewHistori />} />
            <Route index path="/" exact element={<PageIsiTamuPengunjung />} />
        </Routes>
    );
}
export default RouteHalaman;