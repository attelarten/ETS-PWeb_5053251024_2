
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

// Tampilkan halaman berdasarkan hash URL saat memuat halaman
const pageFromUrl = window.location.hash.slice(1);

if (pageFromUrl) {
    showPage(pageFromUrl);
}

window.addEventListener("hashchange", function() {
    const pageFromUrl = window.location.hash.slice(1);

    if (pageFromUrl) {
        showPage(pageFromUrl);
    }
});

// Transactions:

const transactionForm = document.getElementById("transaction-form");
const transactionList = document.getElementById("transaction-list");

let transactions = JSON.parse(
    localStorage.getItem("Myduit_transactions")
) || [];


transactionForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value;
    const nominal = Number(document.getElementById("nominal").value);
    const type = document.getElementById("type").value;
    const date = document.getElementById("date").value;

    const transaction = {
        nama: nama,
        nominal: nominal,
        type: type,
        date: date
    };

    transactions.push(transaction);

    saveTransactions();
    renderTransactions();
    
    transactionForm.reset();
});

function renderTransactions() {
    transactionList.innerHTML = "";

    transactions.forEach(function(transaction) {
        const item = document.createElement("div");
        item.classList.add("transaction-item");

        const details = document.createElement("div");

        const name = document.createElement("strong");
        name.textContent = transaction.nama;

        const date = document.createElement("p");
        date.textContent = transaction.date;

        details.appendChild(name);
        details.appendChild(date);

        const amount = document.createElement("strong");

        if (transaction.type === "income") {
            amount.textContent =
                "+ " + transaction.nominal.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0
                });

            amount.classList.add("income-text");
        } else if (transaction.type === "expense-personal") {
            amount.textContent =
                "- " + transaction.nominal.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0
                });

            amount.classList.add("expense-text");
        } else if (transaction.type === "expense-operational") {
            amount.textContent =
                "- " + transaction.nominal.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0
                });

            amount.classList.add("expense-text");
        }

        item.appendChild(details);
        item.appendChild(amount);
    });
}


function saveTransactions() {
    localStorage.setItem(
        "Myduit_transactions",
        JSON.stringify(transactions)
    );
}

renderTransactions();
updateDashboardBalance();