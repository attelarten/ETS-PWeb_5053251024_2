Persona nomor 2 adalah Driver Ojek Online, pendapatan harian ojek online sangat tidak menentu, kadang banyak, kadang sedikit. Servis motor dan bensin menghabiskan pendapatan. Maka, dengan masalah seperti ini, perlu menandai pengeluaran sebagai operasional dan pribadi.

Struktur data transaksi:
{
  nama: "Servis Motor"
  tanggal: "2026-10-12",
  type: "pengeluaran-personal",
  nominal: 200000,
}

Keputusan desain yang dibuat:

Perlu type pengeluaran jadi dua menjadi pengeluaran operasional dan pribadi

Proses:
Checkpoint 1: W1: Tambah transaksi, W4: Data persisten, Fitur Khas, Fitur Bonus2
Checkpoint 2: W2: Daftar transaksi(bug di Checkpoint 1), W5: Ringkasan(Dashboard)
Checkpoint 3: W3: Hapus transaksi, W6: Validasi Form, Fitur Bonus1(Edit)

Saat pengerjaan terdapat 2 bug, yang pertama adalah di daftar transaksi, dan penyelesaiannya adalah di script js, penggunaan nama dari AI berbeda dengan code. Yang kedua adalah di script.js, tombol edit delete di css belum ditambahkan, solusinya adalah menambahkan di css.

