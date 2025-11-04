import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const uploadimg = async(nama,deskripsi,pic,jumlahhal,tgl_periode)=>{
    const dataform = new FormData();
    dataform.append('nama',nama);
    dataform.append('deskripsi',deskripsi);
    dataform.append('gambardemo',pic);
    dataform.append('jumlahhal',jumlahhal);
    dataform.append('tgl_periode',tgl_periode)

    const respon = await axios.post(`${API_URL}/tambahMajalah`, dataform,{
        headers: {'Content-Type':'multipart/form-data'},
    });
    return respon.data;
};

export const getpic = async()=>{
    const respon = await axios.get(`${API_URL}/daftarRak`);
    return respon.data
};

export const tampilkanTamu = async()=>{
    const respon = await axios.get(`${API_URL}/kunjunganTamu`);
    return respon.data
};

export const tampilkanHistori = async()=>{
    const respon = await axios.get(`${API_URL}/historiMajalah`);
    return respon.data
};

export const despic = async(id)=>{
    const respon = await axios.get(`${API_URL}/desMajal/${id}`);
    return respon.data
}

export const updateMajalah = async (id, formData) => {
    const respon = await axios.put(`${API_URL}/editMajal/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return respon.data;
};

export const hapusMajalah = async (id) => {
    try {
        const respon = await axios.delete(`${API_URL}/hapusMajalah/${id}`);
        return respon.data;
    } catch (error) {
        console.error("Gagal menghapus data majalah:", error);
        throw error;
    }
};

export const isiTamu = async(nama,pekerjaan,alamat,tgl_kunjung)=>{
    const dataform = new FormData();
    dataform.append('nama_pengunjung',nama);
    dataform.append('pekerjaan',pekerjaan);
    dataform.append('alamat',alamat);
    dataform.append('tgl_kunjung',tgl_kunjung);

    const respon = await axios.post(`${API_URL}/isiTamu`, dataform,{
        headers: {'Content-Type':'multipart/form-data'},
    });
    return respon.data;
};

export const isiHistori = async(id_majalah,id_pengunjung)=>{
    const dataform = new FormData();
    dataform.append('id_majalah',id_majalah);
    dataform.append('id_pengunjung',id_pengunjung);

    const respon = await axios.post(`${API_URL}/isiHistori`, dataform,{
        headers: {'Content-Type':'multipart/form-data'},
    });
    return respon.data;
};

export const getPicUrl = (nm_file)=>{
    return `${API_URL}/daftarRak/${nm_file}`;
};