export default function OpenWhatsApp(props) {
  const message = `Halo, saya dari Pusat Ngoding,
Ingin melunasi pembayaran
  
ID Transaksi: ${props.transaksiId}
Nama Siswa: ${props.namaSiswa}
Nama Mentor: ${props.namaMentor}
Nama Kursus: ${props.namaKursus}
Modul: ${props.modul}
Biaya Kursus: ${props.price}

Terima kasih`;
  let number = props.mobileNumber.replace(/[^\w\s]/gi, "").replace(/ /g, "");
  let url = `https://web.whatsapp.com/send?phone=${number}`;
  url += `&text=${encodeURI(message)}&app_absent=0`;
  window.open(url);
}
