document.addEventListener("DOMContentLoaded", () => {
    loadCategories();

    const form = document.getElementById("category-form");
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const id = document.getElementById("category-id").value;
            const nama = document.getElementById("nama").value;
            const deskripsi = document.getElementById("deskripsi").value;

            const data = { nama, deskripsi };

            if (id) {
                await updateCategory(id, data);
            } else {
                await createCategory(data);
            }

            form.reset();
            document.getElementById("category-id").value = "";
            loadCategories();
        });
    }
});

async function loadCategories() {
    const loadingStatus = document.getElementById("loading-status");
    const tbody = document.getElementById("category-table-body");
    if (!tbody) return;

    const response = await getCategories();
    
    // Sembunyikan status memuat setelah data merespons
    if (loadingStatus) {
        loadingStatus.style.display = "none";
    }

    tbody.innerHTML = "";
    if (response && response.success && response.data) {
        let nomor = 1;
        response.data.forEach(category => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td class="text-center">${nomor++}</td>
                <td>${category.nama_kategori}</td>
                <td>${category.deskripsi || '-'}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-warning text-white me-1" onclick="editCategoryForm(${category.id}, '${category.nama_kategori}', '${category.deskripsi || ''}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="hapusCategoryData(${category.id})">Hapus</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
}

function editCategoryForm(id, nama, deskripsi) {
    document.getElementById("category-id").value = id;
    document.getElementById("nama").value = nama;
    document.getElementById("deskripsi").value = deskripsi;
}

async function hapusCategoryData(id) {
    if (confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
        await deleteCategory(id);
        loadCategories();
    }
}