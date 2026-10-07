// 1. TANGKAP ELEMEN DOM (jembatan)
// Ngebuat variabel dengan mencari id elemen HTML
const nama = document.getElementById("nama");
const todoInput = document.getElementById("tugas"); // Menangkap kotak tempat masukin tugas baru
const btnAdd = document.getElementById("btnTambah"); // Menangkap tombol hijau "Tambah"
const todoList = document.getElementById("listTugas"); // Menangkap area list
const emptyState = document.getElementById("takde-tugas"); // Menangkap teks kalau ga ada tugas

// Ngebuat variabel dengan mencari class/tag elemen
const statTotal = document.querySelector(".total"); // Menangkap angka 0 di bagian TOTAL
const statCompleted = document.querySelector(".selesai"); // Menangkap angka 0 di bagian SELESAI
const statPending = document.querySelector(".nunda-terusss"); // Menangkap angka 0 di bagian BELUM SELESAI

// Nangkap dropdown prioritas (Urgent, High, Medium)
const selectPrioritas = document.querySelector("select.formulir"); // Ngambil elemen yang punya class "formulir"

// Nangkap 3 tombol filter di atas daftar tugas
const btnAll = document.getElementById("btnAll"); // Nangkap tombol "Total"
const btnSelesai = document.getElementById("btnAktif"); // Nangkap tombol "Selesai"
const btnBelum = document.getElementById("btnDone"); // Nangkap tombol "Belum Selesai"

// Nangkap judul H6 "YEAY! FREE TIME" biar bisa disembunyikan sekalian kalau ada tugas
const judulFreeTime = document.querySelector(".list-nya h6"); // Nangkap tag <h6> yang ada di dalam elemen class "list-nya"



// 2. NGEBUAT VARIABEL PENAMPUNG ANGKA (STATE)
// Pakai 'let' karena angka ini sifatnya bisa diubah-ubah
let totalTugas = 0; // buat hitung semua tugas
let tugasSelesai = 0; // buat hitung tugas yang sudah dicentang



// 3. FUNGSI UNTUK MEMPERBARUI ANGKA STATISTIK & PESAN KOSONG
function perbaruiStatistik() {
  statTotal.innerText = totalTugas; // Ganti teks angka di layar browser dengan isi dari variabel totalTugas
  statCompleted.innerText = tugasSelesai; // Ganti teks angka selesai di layar dengan isi variabel tugasSelesai
  
  let tugasPending = totalTugas - tugasSelesai; // sisa tugas = total tugas - sudah selesai
  statPending.innerText = tugasPending; // hasil hitungan matematika tadi

  // Logika If-Else (Pengkondisian): Mengecek apakah total tugasnya masih nol?
  if (totalTugas === 0) {
    emptyState.style.display = "block"; // Kalau nol, ubah CSS display jadi "block" biar teksnya muncul
    if (judulFreeTime) judulFreeTime.style.display = "block"; // Munculkan juga judul "YEAY! FREE TIME"
  } else {
    emptyState.style.display = "none"; // Kalau ada tugas, ubah CSS display jadi "none" biar pesannya ngilang
    if (judulFreeTime) judulFreeTime.style.display = "none"; // Sembunyikan juga judul H6-nya
  }
}

// Manggil fungsi tadi satu kali pas halaman web pertama kali dibuka biar angkanya sinkron dengan layar
perbaruiStatistik();



// 4. FUNGSI UTAMA UNTUK MERAKIT DAN MENAMBAHKAN TUGAS BARU
function tambahTugas() {
  const isiTeks = todoInput.value.trim(); // Ambil ketikan dari kotak input (.value), lalu bersihkan spasi kosong berlebih (.trim)
  
  // Ngambil teks dari dropdown prioritas yang lagi dipilih user
  // selectedIndex itu nyari urutan ke berapa yang dipilih, lalu .text mengambil tulisannya (misal: "URGENT")
  const teksPrioritas = selectPrioritas.options[selectPrioritas.selectedIndex].text;

  // Percabangan: Ngecek kalau user cuma klik tambah tapi belum ngetik apa-apa (string kosong)
  if (isiTeks === "") {
    alert("Deskripsi Singkat Tugas Harus Diisi yaa!", <br>, "~grace"); // Munculkan pop-up peringatan di atas browser
    return; // Stop fungsi di sini
  }

  const liBaru = document.createElement("li"); // Bikin elemen <li> baru di memori js
  liBaru.className = "todo-item"; // class "todo-item" ke <li> biar sesuai CSS yang udah dibuat

  // Isian <li> kosong tadi sama checkbox, teks tugas, label prioritasnya, dan tombol hapus)
  // Tanda backtick (`) buat nulis HTML panjang ke bawah dan nyelipin variabel pakai ${nama_variabel}
  liBaru.innerHTML = `
    <div class="todo-content" style="display: flex; align-items: center; gap: 10px;">
      <input type="checkbox" class="todo-checkbox">
      <span class="todo-text">${isiTeks}</span>

      <!-- Elemen label buat nampilin tingkat prioritas -->
      <span style="font-size: 11px; background-color: #00237c; color: white; padding: 3px 8px; border-radius: 12px; font-weight: bold;">
        ${teksPrioritas}
      </span>
    </div>

    <!-- Elemen button buat hapus list -->
    <button class="btn-delete">Hapus</button>
  `;

  // --- BAGIAN CHECKBOX ---
  const checkbox = liBaru.querySelector(".todo-checkbox"); // BIar kotak centang yang dicari HANYA ada di dalam <li> ini aja
  
  // .addEventListener("click") -> Nunggu sampai checkbox diklik sama user...
  checkbox.addEventListener("click", function() {
    liBaru.classList.toggle("completed"); // Kalau diklik, pasang class "completed", kalau diklik lagi ya lepas lagi class-nya
    
    if (checkbox.checked === true) { // Ngecek: apakah kotak ini lagi dalam posisi tercentang?
      tugasSelesai++; // Kalau iya, isi tugasSelesai ditambah 1
    } else {
      tugasSelesai--; // Kalau centangnya dilepas, isi tugasSelesai dikurangi 1
    }
    perbaruiStatistik(); // Buat perbarui tulisan angka di layar
  });

  // --- BAGIAN INTERAKSI TOMBOL HAPUS ---
  const btnHapus = liBaru.querySelector(".btn-delete"); // Cari tombol "Hapus" yang HANYA ada di dalam <li> ini aja
  
  // .addEventListener("click") -> Nunggu sampai tombol hapusnya diklik sama user...
  btnHapus.addEventListener("click", function() {
    if (checkbox.checked === true) { // Sebelum beneran dihapus, sistem cek dulu: apakah tugas ini udah pernah dicentang?
      tugasSelesai--; // Kalau keadaannya udah dicentang, krangin dulu angka di statistik "selesai"
    }
    liBaru.remove(); // Hapus baris <li> ini sepenuhnya dari layar browser secara permanen
    totalTugas--; // Karena ada satu tugas yang dihapus, angka total keseluruhan tugas dikurangi 1
    perbaruiStatistik(); // Buat perbarui angka statostok tugas
  });

  // .appendChild buat ngenempelin <li> baru ke dalam <ul> todoList
  todoList.appendChild(liBaru);

  totalTugas++; // Karena berasil nambah satu tugas baru ke daftar, angka total tugas ditambah 1
  perbaruiStatistik(); // Buat nge-update statistik tugas
  
  todoInput.value = ""; // Buat kosongin balik kotak input tugas biar bisa nambahin tugas lain
}


// 5. EVENT LISTENER UNTUK TOMBOL TAMBAH DAN TOMBOL ENTER
// Ketika tombol tambah diklik, jalankan fungsi tanbahTugas
btnAdd.addEventListener("click", function() {
  tambahTugas(); // fungsi yang udah di buat sebelumnya
});

// Kalau user ngetik terus tekan Enter di keyboard (.addEventListener("keyup"))
todoInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") { // Dicek, apakah tombol yang ditekan di keyboard itu tombol Enter?
    tambahTugas(); // Kalau iya, jalanin fungsi tambahTugas
  }
});


// 6. FITUR FILTER DAFTAR TUGAS (Nampilin bagian Total, Selesai, atau Belum Selesai)
function filterTugas(mode) { // Fungsi ini butuh dilempar kata kunci "mode" ("semua", "selesai", atau "belum")
  const semuaTugas = document.querySelectorAll(".todo-item"); // Buat ngambil semua (<li>) yang ada

  // .forEach() -> Buat perulangan: ngecek tiap baris tugas satu per satu
  semuaTugas.forEach(function(tugas) {
    // Buat ngecek apakah di baris tugas ini ada yang class "completed"
    const sudahSelesai = tugas.classList.contains("completed"); // Bakal nyimpan nilai true (kalau ada) atau false (tidak ada)

    if (mode === "semua") { // Kalau filternya "semua"
      tugas.style.display = "flex"; // Munculkan semua baris tugas
    } 
    else if (mode === "selesai") { // Kalau filternya "selesai"
      if (sudahSelesai === true) { // Kalau status tugasnya udah dicentang...
        tugas.style.display = "flex"; // maka dimunculin tugasnya
      } else {
        tugas.style.display = "none"; // kalau belum selesai, tigasnya disembunyiin
      }
    } 
    else if (mode === "belum") { // Kalau filternya "belum selesai"
      if (sudahSelesai === false) { // Kalau status tugasnya emang belum dicentang...
        tugas.style.display = "flex"; // maka dimunculin tugasnya
      } else {
        tugas.style.display = "none"; // kalau udah kecentang, tugasnnya disembunyiin
      }
    }
  });
}


// 7. FUNGSI GAYA TOMBOL FILTER
function aturTombolAktif(tombolTerpilih) { // Fungsi ini menerima info tombol mana yang barusan diklik
  // Tahap 1: Warna ketiga tombol di-set jadi abu-abu pudar semua biar netral
  btnAll.style.background = "#e0e0e0"; btnAll.style.color = "#ccc"; // Tombol 'Total' diset jadi latar abu-abu teks pudar
  btnSelesai.style.background = "#e0e0e0"; btnSelesai.style.color = "#ccc"; // Tombol 'Selesai' dibikin pudar
  btnBelum.style.background = "#e0e0e0"; btnBelum.style.color = "#ccc"; // Tombol 'Belum Selesai' dibikin pudar
  
  // Tahap 2: BIar tombol yang barusan diklik mencolok
  tombolTerpilih.style.background = "white"; // latar belakangnyajadi putih
  tombolTerpilih.style.color = "#00237c"; // teks tombolnya jadi navy
}


// 8. EVENT LISTENER KETIGA TOMBOL FILTER
btnAll.addEventListener("click", function() { // Kalau tombol filter "Total" diklik jalanin fungsi filterTugas "semua"
  filterTugas("semua");
  aturTombolAktif(btnAll); // Biar tombol 'Total' kelihatan lagi dipencet
});

btnSelesai.addEventListener("click", function() { // Kalau tombol filter "Selesai" diklik jalanin fungsi filterTugas "selesai"
  filterTugas("selesai");
  aturTombolAktif(btnSelesai); // Biar tombol 'Total' kelihatan lagi dipencet
});

btnBelum.addEventListener("click", function() { // Kalau tombol filter "Belum Selesai" diklik jalanin fungsi filterTugas "belum"
  filterTugas("belum");
  aturTombolAktif(btnBelum); // Biar tombol 'Belum Selesai' kelihatan lagi dipencet
});