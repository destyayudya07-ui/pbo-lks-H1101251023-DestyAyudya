async function renderBooks() {
    const content = document.getElementById("app-content");
    if (!content) return;

    content.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="text-secondary fw-bold m-0">Manajemen Buku</h3>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#bookModal" onclick="openAddBookModal()">
                + Tambah Buku
            </button>
        </div>

        <div class="card shadow-sm border-0">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered table-striped align-middle mb-0">
                        <thead class="table-dark text-center">
                            <tr>
                                <th>ID</th>
                                <th>Judul</th>
                                <th>Penulis</th>
                                <th>Tahun</th>
                                <th>Stok</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="books-table-body">
                            <tr>
                                <td colspan="6" class="text-center text-muted">Memuat data buku...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal Form Buku -->
        <div class="modal fade" id="bookModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold" id="bookModalTitle">Tambah Buku</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="book-form">
                            <input type="hidden" id="book-id">
                            <div class="mb-3">
                                <label for="book-judul" class="form-label">Judul Buku</label>
                                <input type="text" class="form-control" id="book-judul" required>
                            </div>
                            <div class="mb-3">
                                <label for="book-penulis" class="form-label">Penulis</label>
                                <input type="text" class="form-control" id="book-penulis" required>
                            </div>
                            <div class="mb-3">
                                <label for="book-tahun" class="form-label">Tahun</label>
                                <input type="number" class="form-control" id="book-tahun" required>
                            </div>
                            <div class="mb-3">
                                <label for="book-stok" class="form-label">Stok</label>
                                <input type="number" class="form-control" id="book-stok" required>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">Simpan Buku</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    loadBooksTable();
}

async function loadBooksTable() {
    const tbody = document.getElementById("books-table-body");
    if (!tbody) return;

    try {
        const response = typeof getBooks === "function" ? await getBooks() : { data: [] };
        const books = response && response.data ? response.data : [];

        tbody.innerHTML = "";
        if (books.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">Belum ada data buku</td></tr>`;
            return;
        }

        books.forEach((book, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td class="text-center">${book.id || index + 1}</td>
                <td>${book.judul || '-'}</td>
                <td>${book.penulis || '-'}</td>
                <td class="text-center">${book.tahun || '-'}</td>
                <td class="text-center">${book.stok || '0'}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-warning text-white me-1" onclick="editBook(${book.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteBookItem(${book.id})">Hapus</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (e) {
        console.error("Gagal memuat tabel buku:", e);
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-danger">Gagal memuat data dari server</td></tr>`;
    }
}

function openAddBookModal() {
    const form = document.getElementById("book-form");
    if (form) form.reset();
    const idInput = document.getElementById("book-id");
    if (idInput) idInput.value = "";
    const titleEl = document.getElementById("bookModalTitle");
    if (titleEl) titleEl.innerText = "Tambah Buku";
}

// Handler Submit Form Buku (Tambah / Edit)
document.addEventListener("submit", async (e) => {
    if (e.target && e.target.id === "book-form") {
        e.preventDefault();

        const id = document.getElementById("book-id").value;
        const data = {
            judul: document.getElementById("book-judul").value,
            penulis: document.getElementById("book-penulis").value,
            tahun: document.getElementById("book-tahun").value,
            stok: document.getElementById("book-stok").value
        };

        if (id) {
            if (typeof updateBook === "function") await updateBook(id, data);
        } else {
            if (typeof createBook === "function") await createBook(data);
        }

        // Tutup modal Bootstrap
        const modalEl = document.getElementById("bookModal");
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();

        loadBooksTable();
    }
});

async function deleteBookItem(id) {
    if (confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
        if (typeof deleteBook === "function") {
            await deleteBook(id);
            loadBooksTable();
        }
    }
}