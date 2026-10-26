

const cover = document.getElementById("cover");

const btnBuka = document.getElementById("btnBuka");

const musik = document.getElementById("musikUndangan");

const btnMusik = document.getElementById("btnMusik");

let undanganDibuka = false;

const pengamat = new IntersectionObserver(function (entries, observer) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("terlihat");

            observer.unobserve(entry.target);

        }

    });

}, {

    threshold: 0.15,

    rootMargin: "0px 0px -10% 0px"

});

document.querySelectorAll(".animasi-scroll").forEach(function (elemen) {

    if (!elemen.closest(".judul-galeri")) {

        pengamat.observe(elemen);

    }

});

btnBuka.addEventListener("click", function () {

    if (undanganDibuka) {

        return;

    }

    undanganDibuka = true;

    btnMusik.hidden = false;

    musik.play().then(function () {

        btnMusik.classList.add("berputar");

        btnMusik.textContent = "♫";

    }).catch(function (error) {

        console.log("Musik belum berhasil diputar:", error);

    });

    cover.classList.add("cover-keluar");

    setTimeout(function () {

        document.querySelectorAll(".judul-galeri .animasi-scroll").forEach(function (el) {

            el.classList.add("terlihat");

        });

    }, 600);

    let transisiSelesai = false;

    function selesaikanBuka() {

        if (transisiSelesai) return;

        transisiSelesai = true;

        cover.style.display = "none";

        document.body.classList.add("undangan-dibuka");

        window.scrollTo(0, 0);

        inisialisasiSliderHorizontal(".galeri-slide");

        inisialisasiSliderHorizontal(".doa-slide");

    }

    cover.addEventListener("transitionend", function (event) {

        if (event.propertyName === "transform") {

            selesaikanBuka();

        }

    });

    setTimeout(selesaikanBuka, 2100);

});

function inisialisasiSliderHorizontal(selectorSlide) {

    const slides = document.querySelectorAll(selectorSlide);

    if (!slides || slides.length < 2) return;

    let indexAktif = 0;

    let sedangTransisi = false;

    const DURASI_TRANSISI = 3000;

    const JEDA_TAMPIL = 500;

    slides.forEach(function (slide, i) {

        slide.classList.remove("aktif", "keluar", "geser");

        if (i === 0) {

            slide.classList.add("aktif");

        }

    });

    function putarSlideBerikutnya() {

        if (sedangTransisi) return;

        sedangTransisi = true;

        const slideLama = slides[indexAktif];

        indexAktif = (indexAktif + 1) % slides.length;

        const slideBaru = slides[indexAktif];

        slideBaru.classList.remove("geser", "keluar", "aktif");

        void slideBaru.offsetWidth;

        slideLama.classList.add("geser");

        slideBaru.classList.add("geser");

        slideLama.classList.remove("aktif");

        slideLama.classList.add("keluar");

        slideBaru.classList.add("aktif");

        setTimeout(function () {

            slideLama.classList.remove("geser", "keluar");


            slideBaru.classList.remove("geser");

            sedangTransisi = false;

            setTimeout(putarSlideBerikutnya, JEDA_TAMPIL);

        }, DURASI_TRANSISI);

    }

    setTimeout(putarSlideBerikutnya, JEDA_TAMPIL);

}

btnMusik.addEventListener("click", function () {

    if (musik.paused) {

        musik.play().then(function () {

            btnMusik.classList.add("berputar");

            btnMusik.textContent = "♫";

        }).catch(function (error) {

            console.log("Musik belum berhasil diputar:", error);

        });

    } else {

        musik.pause();

        btnMusik.classList.remove("berputar");

        btnMusik.textContent = "♪";

    }

});

const targetPernikahan = new Date(

    "2026-12-11T09:00:00+07:00"

).getTime();

function perbaruiCountdown() {

    const sekarang = Date.now();

    const selisih = Math.max(

        targetPernikahan - sekarang,

        0

    );

    const jumlahHari = Math.floor(

        selisih / (1000 * 60 * 60 * 24)

    );

    const jumlahJam = Math.floor(

        (selisih / (1000 * 60 * 60)) % 24

    );

    const jumlahMenit = Math.floor(

        (selisih / (1000 * 60)) % 60

    );

    const jumlahDetik = Math.floor(

        (selisih / 1000) % 60

    );

    document.getElementById("hari").textContent =

        String(jumlahHari).padStart(2, "0");

    document.getElementById("jam").textContent =

        String(jumlahJam).padStart(2, "0");

    document.getElementById("menit").textContent =

        String(jumlahMenit).padStart(2, "0");

    document.getElementById("detik").textContent =

        String(jumlahDetik).padStart(2, "0");

}

perbaruiCountdown();

setInterval(perbaruiCountdown, 1000);

document.querySelectorAll(".tab-hadiah-btn").forEach(function (tombol) {
    tombol.addEventListener("click", function () {
        document.querySelectorAll(".tab-hadiah-btn").forEach(function (btn) {
            btn.classList.remove("aktif");
        });
        document.querySelectorAll(".tab-konten").forEach(function (konten) {
            konten.classList.remove("aktif");
        });

        tombol.classList.add("aktif");
        const targetId = tombol.dataset.target;
        const targetKonten = document.getElementById(targetId);
        if (targetKonten) {
            targetKonten.classList.add("aktif");
        }
    });
});

function salinNomorCaraLama(nomor) {

    const kotakTeks = document.createElement("textarea");

    kotakTeks.value = nomor;
    kotakTeks.style.position = "fixed";
    kotakTeks.style.opacity = "0";

    document.body.appendChild(kotakTeks);

    kotakTeks.select();

    const berhasil = document.execCommand("copy");

    kotakTeks.remove();

    return berhasil;
}

document.querySelectorAll(".tombol-copy").forEach(function (tombol) {

    tombol.addEventListener("click", function () {

        const nomor = tombol.dataset.nomor;

        function tampilkanBerhasil() {

            const teksAsli = tombol.innerHTML;
            tombol.innerHTML = "✓ Tersalin";

            setTimeout(function () {
                tombol.innerHTML = teksAsli;
            }, 1800);
        }

        function salinDenganFallback() {

            if (salinNomorCaraLama(nomor)) {
                tampilkanBerhasil();
            } else {
                alert("Gagal menyalin. Silakan salin secara manual.");
            }

        }

        if (navigator.clipboard && window.isSecureContext) {

            navigator.clipboard.writeText(nomor)
                .then(function () {
                    tampilkanBerhasil();
                })
                .catch(function () {
                    salinDenganFallback();
                });

        } else {

            salinDenganFallback();

        }

    });

});


const STORAGE_KEY_RSVP = "undangan_pernikahan_rsvp_list";

const rsvpDataAwal = [

    {

        nama: "khiara puspa",

        status: "Tidak Hadir",

        pesan: "Happy weding kakak tersyaangkuu moga selalu langgeng sampai akhir hayat ya 💖 maaf gabisa hadir🥺 🥺 🙏🏻",

        waktu: "1 minggu lalu"

    },

    {

        nama: "nelazrd",

        status: "Tidak Hadir",

        pesan: "Selamat menempuh hidup baru Raden & Ayu! Semoga sakinah mawaddah warahmah, langgeng dan bahagia selalu ya. Mohon maaf belum bisa hadir langsung ✨",

        waktu: "1 minggu lalu"

    },

    {

        nama: "Dimas Pratama",

        status: "Tidak Hadir",

        pesan: "Happy wedding bro! Semoga dilancarkan semua urusannya sampai hari H dan langgeng selalu. Maaf banget belum bisa hadir 🙏",

        waktu: "2 minggu lalu"

    },

    {

        nama: "Budi Santoso",

        status: "Hadir",

        pesan: "Selamat menempuh babak baru kehidupan! Insya Allah kami sekeluarga akan hadir mendoakan langsung kedua mempelai.",

        waktu: "3 hari lalu"

    },

    {

        nama: "Siti Rahmawati",

        status: "Hadir",

        pesan: "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fii khoir. Selamat Ayu & Raden! See you there 💕",

        waktu: "4 hari lalu"

    },

    {

        nama: "Rizky & Fitri",

        status: "Hadir",

        pesan: "Selamat ya kalian berdua! Semoga menjadi keluarga yang sakinah mawaddah warahmah. Pasti hadir dong! 🎉",

        waktu: "5 hari lalu"

    },

    {

        nama: "Aditya Wardhana",

        status: "Hadir",

        pesan: "Selamat menempuh hidup baru sahabatku! Semoga langgeng dan bahagia selamanya bersama istri tercinta.",

        waktu: "1 minggu lalu"

    },

    {

        nama: "Maya Anggraini",

        status: "Hadir",

        pesan: "Cantik banget Ayu! Lancar sampai hari-H ya, insya Allah aku datang bareng teman-teman kantor 🤍",

        waktu: "1 minggu lalu"

    },

    {

        nama: "Fajar Nugraha",

        status: "Hadir",

        pesan: "Selamat atas pernikahannya Raden & Ayu. Semoga senantiasa diberkahi kebahagiaan dan kelapangan rezeki.",

        waktu: "2 minggu lalu"

    }

];

function muatDataRsvp() {

    try {

        const tersimpan = localStorage.getItem(STORAGE_KEY_RSVP);

        if (tersimpan) {

            const data = JSON.parse(tersimpan);

            if (Array.isArray(data) && data.length > 0) {

                return data;

            }

        }

    } catch (e) {

        console.error("Gagal membaca data RSVP dari localStorage:", e);

    }

    return [...rsvpDataAwal];

}

function simpanDataRsvp(data) {

    try {

        localStorage.setItem(STORAGE_KEY_RSVP, JSON.stringify(data));

    } catch (e) {

        console.error("Gagal menyimpan data RSVP ke localStorage:", e);

    }

}

function perbaruiRekapRsvp(daftar) {

    const elHadir = document.getElementById("totalHadir");

    const elTidakHadir = document.getElementById("totalTidakHadir");

    if (!elHadir || !elTidakHadir) return;

    let hadir = 0;

    let tidakHadir = 0;

    daftar.forEach(function (item) {

        if (item.status === "Hadir") {

            hadir++;

        } else if (item.status === "Tidak Hadir") {

            tidakHadir++;

        }

    });

    elHadir.textContent = hadir;

    elTidakHadir.textContent = tidakHadir;

}

function escapeHtml(string) {

    const div = document.createElement("div");

    div.textContent = string;

    return div.innerHTML;

}

function renderDaftarRsvp(daftar) {

    const wadah = document.getElementById("daftarUcapan");

    if (!wadah) return;

    wadah.innerHTML = "";

    daftar.forEach(function (item) {

        const kartu = document.createElement("div");

        kartu.className = "kartu-ucapan";

        const adalahHadir = item.status === "Hadir";

        const badgeClass = adalahHadir ? "badge-hadir" : "badge-tidak-hadir";

        const ikonStatus = adalahHadir

            ? `<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#16a34a"/><path d="M4.5 8.2L7 10.7L11.5 5.5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`

            : `<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#e53e3e"/><path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="white" stroke-width="1.8" stroke-linecap="round"/></svg>`;

        kartu.innerHTML = `

            <div class="kartu-ucapan-header">

                <span class="nama-pengirim">${escapeHtml(item.nama)}</span>

                <span class="badge-status ${badgeClass}">

                    ${ikonStatus}

                    <span>${escapeHtml(item.status)}</span>

                </span>

            </div>

            <div class="isi-ucapan">${escapeHtml(item.pesan)}</div>

            <div class="waktu-ucapan">

                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>

                <span>${escapeHtml(item.waktu || "Baru saja")}</span>

            </div>

        `;

        wadah.appendChild(kartu);

    });

    perbaruiRekapRsvp(daftar);

}

const rsvpForm = document.getElementById("rsvpForm");

let daftarRsvp = muatDataRsvp();

if (rsvpForm) {

    renderDaftarRsvp(daftarRsvp);

    rsvpForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const inputNama = document.getElementById("rsvpNama");

        const inputUcapan = document.getElementById("rsvpUcapan");

        const selectStatus = document.getElementById("rsvpStatus");

        const pesanStatus = document.getElementById("rsvpPesanStatus");

        const nama = inputNama ? inputNama.value.trim() : "";

        const ucapan = inputUcapan ? inputUcapan.value.trim() : "";

        const status = selectStatus ? selectStatus.value : "";

        if (!nama || !ucapan || !status) {

            alert("Silakan lengkapi semua data formulir.");

            return;

        }

        const itemBaru = {

            nama: nama,

            pesan: ucapan,

            status: status,

            waktu: "Baru saja"

        };

        daftarRsvp.unshift(itemBaru);

        simpanDataRsvp(daftarRsvp);

        renderDaftarRsvp(daftarRsvp);

        rsvpForm.reset();

        if (pesanStatus) {

            pesanStatus.textContent = "Terima kasih atas doa dan konfirmasi kehadiran Anda!";

            pesanStatus.style.display = "block";

            setTimeout(function () {

                pesanStatus.style.display = "none";

            }, 4000);

        }

    });

}

