import React from "react";
import CardMajalah from "../komponen/cardMajalah";
import SearchItemNavbar from "../komponen/navbar";
import { getpic } from "../gambarcontrol/model_control";
import { Link } from "react-router-dom";

class ListMajalah extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            majalah: [], // Data asli dari server
            filteredMajalah: [], // Data yang difilter berdasarkan pencarian
            query: "", // Query pencarian
        };
        this.pencarianFungsi = this.pencarianFungsi.bind(this);
    }

    componentDidMount() {
        this.tampilkanMajalah();
    }

    async tampilkanMajalah() {
        try {
            const respon = await getpic();
            this.setState({
                majalah: respon,
                filteredMajalah: respon // Set awal untuk menampilkan semua data
            });
        } catch (error) {
            console.error("Error saat mengambil data:", error);
        }
    }

    resetSesi(){
        sessionStorage.removeItem("id_pengunjung");
    }

    pencarianFungsi(cariin) {
        const query = cariin.toLowerCase();
        const filtered = this.state.majalah.filter((item) =>
            item.nm_majalah.toLowerCase().includes(query) // Filter data berdasarkan input pencarian
        );
        this.setState({ query, filteredMajalah: filtered });
    }
    render() {
        return (
            <>
                <Link to="/" className="flex w-32 ml-5 m-2 mt-5 bg-red-400 p-3 rounded-md text-white 
                justify-center text-center hover:bg-red-600 transition-colors duration-300" 
                onclick={this.resetSesi}>Keluar</Link>
                {/* Komponen pencarian */}
                <SearchItemNavbar pencarian={this.pencarianFungsi} />

                {/* Daftar majalah */}
                <div className="container mx-auto px-4 md:px-8 mt-4 lg:w-3/5 md:w-2/3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 md:gap-6">
                        {this.state.filteredMajalah.map((item) => (
                            <CardMajalah
                                key={item.id_majalah}
                                imgurl={
                                    item.lokasigambar
                                        ? `http://localhost:5000${item.lokasigambar}`
                                        : "/gambar/image.png"
                                }
                                jdlMajalah={item.nm_majalah}
                                cekAda={"Ada"}
                                detailnya={`/detailMajalah/${item.id_majalah}`}
                                idnya={item.id_majalah}
                            />
                        ))}
                    </div>
                </div>
            </>
        );
    }
}

export default ListMajalah;
