// Variabel Global
let audio;
let pesanwhatsapp = "";
let ftom = 0; // Status tombol

// Elemen DOM
const stiker1 = document.getElementById('stiker1');
const stiker2 = document.getElementById('stiker2');
const stiker3 = document.getElementById('stiker3');
const stiker4 = document.getElementById('stiker4');

const bodyblur = document.getElementById('bodyblur');
const beneranblur = document.getElementById('beneranblur');
const wallpaper = document.getElementById('wallpaper');
const suratin = document.getElementById('suratin');
const ket = document.getElementById('ket');
const fotoakhir = document.getElementById('fotoakhir');
const Content = document.getElementById('Content');
const bq = document.getElementById('bq');
const kalimat = document.getElementById('kalimat');
const kalimatc = document.getElementById('kalimatc');
const kalimatd = document.getElementById('kalimatd');
const Tombol = document.getElementById('Tombol');
const bklik = document.getElementById('bklik');

// Fungsi-fungsi
function showDiv() {
    Content.style.opacity = "1";
    Content.style.marginTop = "15vh";
    ket.style.marginTop = "30px";
}

function memulai() {
    suratin.style.transition = "all 1s ease";
    suratin.style.transform = "scale(.1)";
    suratin.style.opacity = "0";
    ket.style.transition = "all 1s ease";
    ket.style.transform = "scale(.1)";
    ket.style.opacity = "0";
    setTimeout(pesan, 300);
}

function kpemb() {
    bodyblur.style.opacity = ".7";
    bodyblur.style.animation = "none";
    beneranblur.style.webkitBackdropFilter = "blur(5px)";
    beneranblur.style.backdropFilter = "blur(5px)";
    wallpaper.style.transform = "scale(1.8)";
    suratin.style.display = "none";
    ket.style.display = "none";
    fotoakhir.style.display = "inline-flex";
    fotoakhir.style.transform = "scale(1)";
    Content.style.opacity = "1";
    Content.style.marginTop = "2vh";
    bq.style.opacity = "1";
    bq.style.visibility = "visible";
    bq.style.marginTop = "5px";
    setTimeout(munculya, 50);
}

function tombol() {
    Tombol.style.marginTop = "15px";
    Tombol.style.opacity = "1";
    Tombol.style.transform = "scale(1)";
    ftom = 1;
}

function fakhiran() {
    document.getElementById("akhiran").style.display = "inline-flex";
}

// SweetAlert Config
const swals = Swal.mixin({
    allowOutsideClick: false,
    cancelButtonColor: '#FF0040',
    imageWidth: 100,
    imageHeight: 100,
});
const swalst = Swal.mixin({
    allowOutsideClick: false,
    showConfirmButton: false,
    timerProgressBar: true,
    imageWidth: 100,
    imageHeight: 100,
});
const swalstwal = Swal.mixin({
    timer: 2000,
    allowOutsideClick: false,
    showConfirmButton: false,
    timerProgressBar: true,
    imageWidth: 100,
    imageHeight: 100,
});

// Fungsi untuk tanggal
const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const todayString = dd + ' ' + monthNames[today.getMonth()] + ' ' + yyyy;

function finalakhir() {
    bodyblur.style.opacity = ".5";
    bodyblur.style.animation = "none";
    beneranblur.style.webkitBackdropFilter = "blur(2px)";
    beneranblur.style.backdropFilter = "blur(2px)";
    wallpaper.style.transform = "scale(1)";
    bklik.innerHTML = "Kirim Pesan";
    ftom = 2;
    otomatis();
    kalimatd.innerHTML = "Jawabanmu: " + pesanwhatsapp;
}

function sjawab() {
    if (ftom == 1) {
        jawab();
    }
    if (ftom == 2) {
        menuju();
    }
}

// Animasi Teks
function otomatis() {
    befanimkata();
    setTimeout(animkata, 200);
}

function befanimkata() {
    kalimatd.style.transform = "scale(.3)";
    kalimatd.style.fontSize = "15px";
    kalimatd.style.marginTop = "30px";
}

function animkata() {
    kalimatd.style.transform = "scale(1)";
    kalimatd.style.fontSize = "15px";
    kalimatd.style.marginTop = "30px";
}

function kemunculan() {
    otomatis();
    kalimatc.innerHTML = ktbwh1;
    setTimeout(kemunculan2, 2200);
}

function kemunculan2() {
    otomatis();
    kalimatc.innerHTML = ktbwh2;
    setTimeout(kemunculan3, 2200);
}

function kemunculan3() {
    otomatis();
    kalimatc.innerHTML = ktbwh3;
    setTimeout(kemunculan, 2200);
}

function munculya() {
    kalimat.innerHTML = katamuncul;
    kalimat.style.marginBottom = "30px";
    setTimeout(ngetik2, 100);
    setTimeout(tombol, 7000);
}

let ai = 0;
let katangetik2;

function ngetik2() {
    if (ai < katangetik2.length) {
        kalimatc.innerHTML += katangetik2.charAt(ai);
        ai++;
        setTimeout(ngetik2, 70);
    }
    if (ai == katangetik2.length) {
        setTimeout(tombol, 500);
    }
}

// Fungsi untuk Kirim/Jawab Pesan
async function menuju() {
    await swals.fire('Kirim pesan ke WhatsApp aku, ya!');
    window.location = "https://api.whatsapp.com/send?phone=&text=" + pesanwhatsapp;
}

async function jawab() {
    var {
        value: jawaban
    } = await swals.fire({
        title: 'Isi Pesan Kamu &#128073;&#128072;',
        input: 'text',
        allowOutsideClick: false,
        showCancelButton: false,
    });
    if (jawaban && jawaban.length < 21) {
        window.jawaban = jawaban;
        pesanwhatsapp = jawaban;
        finalakhir();
    } else {
        await swals.fire('Ups!', 'Jawaban tidak boleh kosong atau lebih dari 20 karakter, ya!');
        jawab();
    }
}

// Inisialisasi Audio dan Tampilan Awal
function linkaud() {
  audio = new Audio('https://feeldreams.github.io/cut-yakam