const mysql = require('mysql2');
const backend = require('express');
const fileupload = require('express-fileupload');
const cors = require('cors');
const fs = require('fs');
const pathfile = require('path');

const serverapp = backend();
serverapp.use(cors());
serverapp.use(backend.json());
serverapp.use(fileupload());

const upload_dir = pathfile.join(__dirname,'uploads');
if (!fs.existsSync(upload_dir)) {
    fs.mkdirSync(upload_dir);
}
serverapp.use('/uploads', backend.static(upload_dir));
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Aspire5",
    database: "majalahapp"
});

db.connect(err=> {
    if (err) throw err;
    console.log("terhubung ke database");
});

serverapp.post('/isiTamu',(req,res)=>{
    const { nama_pengunjung, pekerjaan, alamat, tgl_kunjung } = req.body;
    const kodesql = `INSERT INTO pengunjung (nm_pengunjung, pekerjaan, alamat, tgl_kunjung) 
                     VALUES (?, ?, ?, ?)`;

    db.query(kodesql, [nama_pengunjung, pekerjaan, alamat, tgl_kunjung], (err, result) => {
        if (err) {
            console.error("Error saat menyimpan data:", err);
            return res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
        }

        const idPengunjung = result.insertId; // Ambil id_pengunjung setelah insert

        // Kirim respons JSON yang berisi id_pengunjung
        res.json({ success: true, message: 'Selamat Datang!', id_pengunjung: idPengunjung });
    });
});

serverapp.post('/isiHistori',(req,res)=>{
    const { id_majalah, id_pengunjung } = req.body;
    const kodesql = `INSERT INTO histori_majalah (id_majalah,id_pengunjung) 
                     VALUES (?, ?)`;

    db.query(kodesql, [id_majalah,id_pengunjung], (err, result) => {
        if (err) {
            console.error("Error saat menyimpan data:", err);
            return res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
        }
        var idPengunjung = null;
        res.json({ success: true, message: 'Terima Kasih !', id_pengunjung: idPengunjung });
    });
});

serverapp.post('/tambahMajalah',(req,res)=>{
    const { nama, deskripsi, jumlahhal, tgl_periode } = req.body;
    const gambar = req.files ? req.files.gambardemo : null;

    if (gambar) {
        const nm_file = `${Date.now()}_${gambar.name}`;
        const lok_file = pathfile.join(upload_dir, nm_file);

        gambar.mv(lok_file, (err) => {
            if (err) return res.status(500).send(err);

            const kodesql = `
                INSERT INTO rakmajalah 
                (nm_majalah, deskripsi, gambar_demo, jml_hal, tgl_periode, lokasigambar) 
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            db.query(
                kodesql,
                [nama, deskripsi, nm_file, jumlahhal, tgl_periode, `/uploads/${nm_file}`],
                (err, result) => {
                    if (err) throw err;
                    res.send({
                        success: true,
                        message: 'Data dan gambar berhasil ditambahkan',
                        data: { id: result.insertId, nm_file },
                    });
                }
            );
        });
    } else {
       
        const kodesql = `
            INSERT INTO rakmajalah 
            (nm_majalah, deskripsi, jml_hal, tgl_periode) 
            VALUES (?, ?, ?, ?)
        `;
        db.query(kodesql, [nama, deskripsi, jumlahhal, tgl_periode], (err, result) => {
            if (err) throw err;
            res.send({
                success: true,
                message: 'Data berhasil ditambahkan tanpa gambar',
                data: { id: result.insertId },
            });
        });
    }
});

serverapp.get('/kunjunganTamu',(req,res)=>{
    const kodesql = 'SELECT * FROM pengunjung';
    db.query(kodesql,(err,result)=>{
        if (err) throw err;
        res.send(result);
    });
});

serverapp.get('/historiMajalah',(req,res)=>{
    const kodesql = `SELECT h.id_histori, p.nm_pengunjung, p.tgl_kunjung, j.nm_majalah
                     FROM histori_majalah h
                     JOIN pengunjung p ON h.id_pengunjung = p.id_pengunjung
                     JOIN rakmajalah j ON h.id_majalah = j.id_majalah
                     `;
    db.query(kodesql,(err,result)=>{
        if (err) throw err;
        res.send(result);
    });
});

serverapp.get('/daftarRak',(req,res)=>{
    const kodesql = 'SELECT * FROM rakmajalah';
    db.query(kodesql,(err,result)=>{
        if (err) throw err;
        res.send(result);
    });
});

serverapp.get('/desMajal/:id',(req,res)=>{
    const id = req.params.id;
    const kodesql = 'SELECT * FROM rakmajalah WHERE id_majalah= ?';
    db.query(kodesql,[id],(err,result)=>{
        if (err) throw err;
        res.send(result);
    });
});

serverapp.put('/editMajal/:id',(req,res)=>{
    const id = req.params.id;
    const { nama, deskripsi, jumlahhal, tgl_periode } = req.body;
    const gambar = req.files ? req.files.gambar : null;


    try {
        let query = `
            UPDATE rakmajalah 
            SET nm_majalah = ?, deskripsi = ?, jml_hal = ?, tgl_periode = ?
        `;
        const params = [nama, deskripsi, jumlahhal, tgl_periode];

        if (gambar) {
            const nm_file = `${Date.now()}_${gambar.name}`;
            const lok_file = pathfile.join(upload_dir, nm_file);
            gambar.mv(lok_file, (err) => {
                if (err) throw err;
            });

            query += `, gambar_demo = ?, lokasigambar = ?`;
            params.push(nm_file, `/uploads/${nm_file}`);
        }

        query += ` WHERE id_majalah = ?`;
        params.push(id);

        db.query(query, params, (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                res.json({ message: "Majalah berhasil diupdate." });
            } else {
                res.status(404).json({ message: "Majalah tidak ditemukan." });
            }
        });
    } catch (error) {
        console.error("Error saat mengupdate majalah:", error);
        res.status(500).json({ message: "Gagal mengupdate data majalah." });
    }
});

serverapp.delete('/hapusMajalah/:id',(req,res)=>{
    const id = req.params.id;
    const getImageQuery = "SELECT gambar_demo, lokasigambar FROM rakmajalah WHERE id_majalah = ?";
    db.query(getImageQuery, [id], (err, result) => {
        if (err) {
            console.error("Gagal mengambil data gambar:", err);
            return res.status(500).send({ success: false, message: 'Error saat mengambil data gambar' });
        }

        if (result.length > 0) {
            const { gambar_demo, lokasigambar } = result[0]; // Ambil data gambar

            const deleteMajalahQuery = "DELETE FROM rakmajalah WHERE id_majalah = ?";
            db.query(deleteMajalahQuery, [id], (err, deleteResult) => {
                if (err) {
                    console.error("Gagal menghapus data majalah:", err);
                    return res.status(500).send({ success: false, message: 'Error saat menghapus data majalah' });
                }

                const filePath = `.${lokasigambar}`;
                fs.unlink(filePath, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error("Gagal menghapus file gambar:", unlinkErr);
                    }
                });

                res.send({ success: true, message: 'Data majalah dan file gambar berhasil dihapus' });
            });
        } else {
            res.status(404).send({ success: false, message: 'Data majalah tidak ditemukan' });
        }
    });
});

const PORT = 5000;
serverapp.listen(PORT,()=>{console.log(`Server Berjalan di http://localhost:${PORT}`);
    
});