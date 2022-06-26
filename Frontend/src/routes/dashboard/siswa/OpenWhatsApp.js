export default function OpenWhatsApp(mobileNumber, namaSiswa, transaksiId) {
  const message = `Halo, saya dari pusatngoding
ingin melunasi pembayaran

Nama Siswa: ${namaSiswa}
ID Transaksi: ${transaksiId}

Terima kasih`;
  // Regex expression to remove all characters which are NOT alphanumeric
  let number = mobileNumber.replace(/[^\w\s]/gi, "").replace(/ /g, "");

  // Appending the phone number to the URL
  let url = `https://web.whatsapp.com/send?phone=${number}`;

  // Appending the message to the URL by encoding it
  url += `&text=${encodeURI(message)}&app_absent=0`;

  // Open our newly created URL in a new tab to send the message
  window.open(url);
}
