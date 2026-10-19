
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

// ========================================
// TRANSACTIONS: ELEMENTS & DATA
// ========================================

const transactionForm = document.getElementById("transaction-form");
const transactionList = document.getElementById("transaction-list");

const editModal = document.getElementById("edit-modal");
const editForm = document.getElementById("edit-form");
const deleteModal = document.getElementById("delete-modal");

const cancelEdit = document.getElementById("cancel-edit");
const cancelDelete = document.getElementById("cancel-delete");
const confirmDelete = document.getElementById("confirm-delete");

let transactions = JSON.parse(
    localStorage.getItem("Myduit_transactions")
) || [];

let editingTransaction = null;
let deletingTransaction = null;


// ========================================
// SAVE TRANSACTIONS
// ========================================

function saveTransactions() {
    localStorage.setItem(
        "Myduit_transactions",
        JSON.stringify(transactions)
    );
}


// ========================================
// ADD TRANSACTION
// ========================================

transactionForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const nominal = Number(document.getElementById("nominal").value);
    const type = document.getElementById("type").value;
    const date = document.getElementById("date").value;

    if (!nama) {
        alert("Nama transaksi tidak boleh kosong!");
        return;
    }

    if (!Number.isFinite(nominal) || nominal <= 0) {
        alert("Nominal harus berupa angka lebih dari 0!");
        return;
    }

    const validTypes = [
        "income",
        "expense-personal",
        "expense-operational"
    ];

    if (!validTypes.includes(type)) {
        alert("Jenis transaksi tidak valid!");
        return;
    }

    if (!date || Number.isNaN(Date.parse(date))) {
        alert("Tanggal transaksi tidak valid!");
        return;
    }

    const transaction = {
        id: Date.now(),
        nama: nama,
        nominal: nominal,
        type: type,
        date: date
    };

    transactions.push(transaction);

    saveTransactions();
    renderTransactions();
    updateDashboardBalance();

    transactionForm.reset();
});


// ========================================
// RENDER TRANSACTIONS
// ========================================

function renderTransactions() {
    transactionList.innerHTML = "";

    transactions.forEach(function(transaction) {
        const item = document.createElement("div");
        item.classList.add("transaction-item");

        // Detail transaksi
        const details = document.createElement("div");

        const name = document.createElement("strong");
        name.textContent = transaction.nama;

        const date = document.createElement("p");
        date.textContent = transaction.date;

        details.appendChild(name);
        details.appendChild(date);

        // Format nominal
        const amount = document.createElement("strong");

        amount.textContent =
            (transaction.type === "income" ? "+ " : "- ") +
            transaction.nominal.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0
            });

        amount.classList.add(
            transaction.type === "income"
                ? "income-text"
                : "expense-text"
        );

        // Tombol aksi
        const actions = document.createElement("div");
        actions.classList.add("transaction-actions");

        // Tombol Edit
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit-button");

        editButton.addEventListener("click", function() {
            editingTransaction = transaction;

            document.getElementById("edit-nama").value =
                transaction.nama;

            document.getElementById("edit-nominal").value =
                transaction.nominal;

            document.getElementById("edit-type").value =
                transaction.type;

            document.getElementById("edit-date").value =
                transaction.date;

            editModal.hidden = false;
        });

        // Tombol Hapus
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Hapus";
        deleteButton.classList.add("delete-button");

        deleteButton.addEventListener("click", function() {
            deletingTransaction = transaction;
            deleteModal.hidden = false;
        });

        actions.appendChild(amount);
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        item.appendChild(details);
        item.appendChild(actions);

        transactionList.appendChild(item);
    });
}


// ========================================
// EDIT TRANSACTION
// ========================================

editForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!editingTransaction) {
        return;
    }

    const nama = document.getElementById("edit-nama").value.trim();

    const nominal = Number(
        document.getElementById("edit-nominal").value
    );

    const type = document.getElementById("edit-type").value;
    const date = document.getElementById("edit-date").value;

    // Validasi nama
    if (!nama) {
        alert("Nama transaksi tidak boleh kosong!");
        return;
    }

    // Validasi nominal
    if (!Number.isFinite(nominal) || nominal <= 0) {
        alert("Nominal harus berupa angka lebih dari 0!");
        return;
    }

    // Validasi jenis transaksi
    const validTypes = [
        "income",
        "expense-personal",
        "expense-operational"
    ];

    if (!validTypes.includes(type)) {
        alert("Jenis transaksi tidak valid!");
        return;
    }

    // Validasi tanggal
    if (!date || Number.isNaN(Date.parse(date))) {
        alert("Tanggal transaksi tidak valid!");
        return;
    }

    // Update transaksi yang dipilih
    editingTransaction.nama = nama;
    editingTransaction.nominal = nominal;
    editingTransaction.type = type;
    editingTransaction.date = date;

    saveTransactions();
    renderTransactions();
    updateDashboardBalance();

    editModal.hidden = true;
    editingTransaction = null;
    editForm.reset();
});


// CANCEL EDIT


cancelEdit.addEventListener("click", function() {
    editModal.hidden = true;
    editingTransaction = null;
    editForm.reset();
});


// DELETE TRANSACTION

confirmDelete.addEventListener("click", function(event) {
    event.preventDefault();

    if (!deletingTransaction) {
        return;
    }

    const index = transactions.indexOf(deletingTransaction);

    if (index !== -1) {
        transactions.splice(index, 1);

        saveTransactions();
        renderTransactions();
        updateDashboardBalance();
    }

    deleteModal.hidden = true;
    deletingTransaction = null;
});


// CANCEL DELETE

cancelDelete.addEventListener("click", function() {
    deleteModal.hidden = true;
    deletingTransaction = null;
});


function saveTransactions() {
    localStorage.setItem(
        "Myduit_transactions",
        JSON.stringify(transactions)
    );
}

function updateDashboardBalance() {
    let income = 0;
    let expensePersonal = 0;
    let expenseOperational = 0;

    transactions.forEach(function(transaction) {
        if (transaction.type === "income") {
            income += transaction.nominal;
        } else if (transaction.type === "expense-personal") {
            expensePersonal += transaction.nominal;
        } else if (transaction.type === "expense-operational") {
            expenseOperational += transaction.nominal;
        }
    });
    const cleanIncome = income - expenseOperational;
    const balance = income - expensePersonal - expenseOperational;

    document.getElementById("balance").textContent = formatRupiah(balance);
    document.getElementById("income").textContent = formatRupiah(cleanIncome);
    document.getElementById("expense-personal").textContent = formatRupiah(expensePersonal);
    document.getElementById("expense-operational").textContent = formatRupiah(expenseOperational);
}

function formatRupiah(amount) {
    return amount.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    });
}


renderTransactions();
updateDashboardBalance();