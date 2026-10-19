Prompt: buatkan script js untuk mengganti page
Kode dipakai:
const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");

// Fungsi untuk mengganti halaman
function showPage(pageId) {
    // Sembunyikan semua halaman
    pages.forEach(function(page) {
        page.hidden = true;
    });

    // Tampilkan halaman yang dipilih
    const targetPage = document.getElementById(pageId);

    if (targetPage) {
        targetPage.hidden = false;
    }
}

// Tambahkan event click ke setiap tombol navigasi
navItems.forEach(function(item) {
    item.addEventListener("click", function() {
        const pageId = item.dataset.page;
        showPage(pageId);
    });
});
Kode yang diubah: Meniru html dari AI, namun disesuaikan dengan struktur data saya.
Conversation Link: https://chatgpt.com/share/6ad5e5b7-aa74-83ec-9855-127f1485fa53