# migrate up
migrate -path db/migration -database "sqlite3://db/pusat_ngoding.db?sslmode=disable" -verbose up
migrate -path db/migration -database "sqlite3://db/pusat_ngoding.db?sslmode=disable" -verbose down

# Structure JSON
- Bisa liat di folder domain


# Api yang tersedia
## Users :
Get All = localhost:8080/api/users <br>
Find by id = localhost:8080/api/users/id contoh : (localhost:8080/api/users/1) <br>
Get by Role = localhost:8080/api/users/role/role contoh : (localhost:8080/api/users/role/admin) <br>
Store = localhost:8080/api/users/ <br>
Update = localhost:8080/api/users/id contoh : (localhost:8080/api/users/4) <br>
Update Role = localhost:8080/api/users/role/id contoh : (localhost:8080/api/users/5) <br>
Delete = localhost:8080/api/users/id contoh : (localhost:8080/api/users/3) <br>

## Auth :
Register = localhost:8080/register <br>
Login = localhost:8080/login <br>

## Kursus :
Get All = localhost:8080/kursus <br>
Get by Id = localhost:8080/kursus/id contoh : (localhost:8080/kursus/2) <br>
Store = localhost:8080/kursus <br>
Update = localhost:8080/kursus/id contoh : (localhost:8080/kursus/2) <br>
Delete = localhost:8080/kursus/id contoh : (localhost:8080/kursus/2) <br>

## Komentar :
Get All = localhost:8080/api/komentar <br>
Get by Id = localhost:8080/api/komentar/id contoh : (localhost:8080/api/komentar/1) <br>
Get by Id KURSUS = localhost:8080/komentar/id contoh : (localhost:8080/komentar/1) <br>
Store = localhost:8080/api/komentar <br>
Update = localhost:8080/api/komentar/id contoh : (localhost:8080/api/komentar/1) <br>
Delete = localhost:8080/api/komentar/id contoh : (localhost:8080/api/komentar/1) <br>

## Transaksi :
Get All = localhost:8080/api/transaksi <br>
Get by Id = localhost:8080/api/transaksi/id contoh : (localhost:8080/api/transaksi/1) <br>
Store = localhost:8080/api/transaksi <br>
Update = localhost:8080/api/transaksi/id contoh : (localhost:8080/api/transaksi/1) <br>
Delete = localhost:8080/api/transaksi/id contoh : (localhost:8080/api/transaksi/1) <br>