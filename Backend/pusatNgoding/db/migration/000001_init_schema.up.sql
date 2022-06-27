CREATE TABLE users(
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   nama_depan VARCHAR(255) NOT NULL,
   nama_belakang VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL,
   no_telp VARCHAR(255) NOT NULL,
   password VARCHAR(255) NOT NULL,
   role VARCHAR CHECK(role IN ('siswa', 'mentor', 'admin')) NOT NULL DEFAULT 'siswa',
   kota VARCHAR DEFAULT '', -- siswa & mentor
   tgl_lahir VARCHAR DEFAULT '', -- siswa & mentor,
   pendidikan VARCHAR DEFAULT '', -- siswa & mentor
   keahlian VARCHAR DEFAULT '', -- mentor
   motivasi VARCHAR DEFAULT '', -- mentor
   status VARCHAR DEFAULT '', -- mentor
   price VARCHAR DEFAULT '', -- mentor
   rating VARCHAR DEFAULT '', -- mentor
   lulusan VARCHAR DEFAULT '', -- mentor
   avatar VARCHAR DEFAULT 'avatar.jpg', -- siswa & mentor
   created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE kursus(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama VARCHAR(255) NOT NULL,
    users_id INTEGER NOT NULL,     
    deskripsi VARCHAR(255) NOT NULL,
    modul VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
);

CREATE TABLE komentar(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rate INTEGER NOT NULL,
    content TEXT,
    users_id INTEGER NOT NULL,
    kursus_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`users_id`) REFERENCES `users` (`id`),
    FOREIGN KEY (`kursus_id`) REFERENCES `kursus` (`id`)
);

CREATE TABLE transaksi(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    users_id INTEGER NOT NULL,
    kursus_id INTEGER NOT NULL,
    status BOOLEAN,
    bukti_transaksi VARCHAR NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    end_at DATETIME,
    FOREIGN KEY (`users_id`) REFERENCES `users` (`id`),
    FOREIGN KEY (`kursus_id`) REFERENCES `kursus` (`id`)
);
