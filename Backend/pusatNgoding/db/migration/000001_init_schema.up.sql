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
   avatar VARCHAR DEFAULT '', -- siswa & mentor
   created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE kursus(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama VARCHAR(255) NOT NULL,
    users_id INTEGER NOT NULL,     
    deskripsi TEXT NOT NULL,
    modul TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
);

-- CREATE TABLE transaksi(
--     ID INTEGER PRIMARY KEY AUTOINCREMENT,
--     users_id INTEGER,
--     kursus_id INTEGER,
--     status BOOLEAN,
--     createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
--     endAt DATETIME,
--     FOREIGN KEY (`users_id`) REFERENCES `users` (`id`),
--     FOREIGN KEY (`kursus_id`) REFERENCES `kursus` (`id`)
-- );

-- CREATE TABLE rating(
--     ID INTEGER PRIMARY KEY AUTOINCREMENT,
--     users_id INTEGER,
--     kursus_id INTEGER,
--     createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (`siswa_id`) REFERENCES `users` (`id`),
--     FOREIGN KEY (`kursus_id`) REFERENCES `kursus` (`id`)             
-- );

-- CREATE TABLE admin(
--    id INTEGER PRIMARY KEY AUTOINCREMENT,
--    nama TEXT NOT NULL,
--    email VARCHAR NOT NULL,
--    password VARCHAR NOT NULL,
--    role VARCHAR DEFAULT 'admin',
--    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE kursus(
--     ID                   INTEGER PRIMARY KEY    AUTOINCREMENT,
--     nama                 TEXT                   NOT NULL,
--     mentor_id            INTEGER,                
--     deskripsi            TEXT,
--     modul                TEXT,
--     createdAt            DATETIME DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (`mentor_id`) REFERENCES `users` (`id`)
-- );

-- CREATE TABLE rating(
--     ID                   INTEGER PRIMARY KEY    AUTOINCREMENT,
--     siswa_id             INTEGER,
--     kursus_id            INTEGER,
--     createdAt            DATETIME DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (`siswa_id`) REFERENCES `users` (`id`),
--     FOREIGN KEY (`kursus_id`) REFERENCES `kursus` (`id`)             
-- );

-- CREATE TABLE transaksi(
--     ID                   INTEGER PRIMARY KEY    AUTOINCREMENT,
--     siswa_id             INTEGER,
--     kursus_id            INTEGER,
--     status               BOOLEAN,
--     createdAt            DATETIME DEFAULT CURRENT_TIMESTAMP,
--     endAt                DATETIME,
--     FOREIGN KEY (`siswa_id`) REFERENCES `users` (`id`),
--     FOREIGN KEY (`kursus_id`) REFERENCES `kursus` (`id`)
-- );

-- CREATE TABLE komentar(
--     ID                   INTEGER PRIMARY KEY    AUTOINCREMENT,
--     content              TEXT,
--     siswa_id             INTEGER,
--     kursus_id            INTEGER,
--     createdAt            DATETIME DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (`siswa_id`) REFERENCES `users` (`id`),
--     FOREIGN KEY (`kursus_id`) REFERENCES `kursus` (`id`)
-- );

