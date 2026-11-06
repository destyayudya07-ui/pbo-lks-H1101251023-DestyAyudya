async function renderCategories() {
    const content = document.getElementById("app-content");
    if (!content) return;

    content.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="text-secondary fw-bold m-0">Manajemen Kategori</h3>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#categoryModal" onclick="openAddCategoryModal()">
                + Tambah Kategori
            </button>
        </div>

        <div class="card shadow-sm border-0">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered table-striped align-middle mb-0">
                        <thead class="table-dark text-center">
                            <tr>
                                <th style="width: 10%;">No</th>
                                <th style="width: 35%;">Nama Kategori</th>
                                <th style="width: 35%;">Deskripsi</th>
                                <th style="width: 20%;">Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="categories-table-body">
                            <tr>
                                <td colspan="4" class="text-center text-muted">Memuat data kategori...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal Form Kategori -->
        <div class="modal fade" id="categoryModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold" id="categoryModalTitle">Tambah Kategori</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="category-form">
                            <input type="hidden" id="category-id">
                            <div class="mb-3">
                                <label for="category-nama" class="form-label">Nama Kategori</label>
                                <input type="text" class="form-control" id="category-nama" required>
                            </div>
                            <div class="mb-3">
                                <label for="category-deskripsi" class="form-label">Deskripsi</label>
                                <textarea class="form-control" id="category-deskripsi" rows="3"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">Simpan Kategori</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Toast Container (Kanan Atas) -->
        <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1055;">
            <div id="liveToast" class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body" id="toast-message">
                        Operasi berhasil!
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>
    `;

    loadCategoriesTable();
}

async function loadCategoriesTable() {
    const tbody = document.getElementById("categories-table-body");
    if (!tbody) return;

    try {
        const response = typeof getCategories === "function" ? await getCategories() : { data: [] };
        const categories = response && response.data ? response.data : [];

        tbody.innerHTML = "";
        if (categories.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">Belum ada data kategori</td></tr>`;
            return;
        }

        categories.forEach((cat, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td class="text-center">${index + 1}</td>
                <td>${cat.nama_kategori || cat.nama || '-'}</td>
                <td>${cat.deskripsi || '-'}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-warning text-white me-1" onclick='editCategory(${cat.id}, ${JSON.stringify(cat.nama_kategori || cat.nama || "")}, ${JSON.stringify(cat.deskripsi || "")})'>Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteCategoryItem(${cat.id})">Hapus</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (e) {
        console.error("Gagal memuat tabel kategori:", e);
        tbody.innerHTML = `<tr><td colspan="4" class="text-center text-danger">Gagal memuat data dari server</td></tr>`;
    }
}

function openAddCategoryModal() {
    const form = document.getElementById("category-form");
    if (form) form.reset();
    document.getElementById("category-id").value = "";
    document.getElementById("categoryModalTitle").innerText = "Tambah Kategori";
}

function editCategory(id, nama, deskripsi) {
    document.getElementById("category-id").value = id;
    document.getElementById("category-nama").value = nama;
    document.getElementById("category-deskripsi").value = deskripsi;
    document.getElementById("categoryModalTitle").innerText = "Edit Kategori";

    const modal = new bootstrap.Modal(document.getElementById("categoryModal"));
    modal.show();
}

// Handler Submit Form Kategori (Tambah & Edit)
document.addEventListener("submit", async (e) => {
    if (e.target && e.target.id === "category-form") {
        e.preventDefault();

        const id = document.getElementById("category-id").value;
        const data = {
            nama: document.getElementById("category-nama").value,
            deskripsi: document.getElementById("category-deskripsi").value
        };

        if (id) {
            if (typeof updateCategory === "function") {
                await updateCategory(id, data);
                showToast("Kategori berhasil diperbarui!");
            }
        } else {
            if (typeof createCategory === "function") {
                await createCategory(data);
                showToast("Kategori berhasil ditambahkan!");
            }
        }

        const modalEl = document.getElementById("categoryModal");
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();

        loadCategoriesTable();
    }
});

async function deleteCategoryItem(id) {
    if (confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
        if (typeof deleteCategory === "function") {
            await deleteCategory(id);
            showToast("Kategori berhasil dihapus!");
            loadCategoriesTable();
        }
    }
}

// Fungsi Menampilkan Toast Notifikasi di Kanan Atas
function showToast(message) {
    const toastMessage = document.getElementById("toast-message");
    const toastEl = document.getElementById("liveToast");
    if (toastMessage && toastEl) {
        toastMessage.innerText = message;
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }
}