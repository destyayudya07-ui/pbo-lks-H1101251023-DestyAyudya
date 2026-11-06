async function renderDashboard() {
    const content = document.getElementById("app-content");
    if (!content) return;

    content.innerHTML = `<div class="alert alert-info text-center py-3">Memuat aplikasi...</div>`;

    try {
        // Ambil data buku dan kategori secara paralel dari API
        const [booksRes, categoriesRes] = await Promise.all([
            typeof getBooks === "function" ? getBooks() : Promise.resolve({ data: [] }),
            typeof getCategories === "function" ? getCategories() : Promise.resolve({ data: [] })
        ]);

        const books = booksRes && booksRes.data ? booksRes.data : [];
        const categories = categoriesRes && categoriesRes.data ? categoriesRes.data : [];

        const totalBuku = books.length;
        const totalKategori = categories.length;

        // Ambil 5 buku terbaru
        const latestBooks = books.slice(-5).reverse();

        let booksHtml = latestBooks.length > 0 
            ? latestBooks.map((book, index) => `
                <tr>
                    <td class="text-center">${index + 1}</td>
                    <td>${book.judul || book.title || '-'}</td>
                    <td>${book.penulis || book.author || '-'}</td>
                    <td class="text-center">${book.tahun || book.year || '-'}</td>
                    <td class="text-center">${book.stok || book.stock || '0'}</td>
                </tr>
              `).join('')
            : `<tr><td colspan="5" class="text-center text-muted">Belum ada data buku</td></tr>`;

        content.innerHTML = `
            <h3 class="mb-4 text-secondary fw-bold">Dashboard</h3>
            
            <!-- Kartu Statistik -->
            <div class="row g-4 mb-4">
                <div class="col-md-6">
                    <div class="card text-white bg-primary shadow-sm border-0">
                        <div class="card-body">
                            <h5 class="card-title">Total Buku</h5>
                            <p class="card-text fs-2 fw-bold m-0">${totalBuku}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card text-white bg-warning shadow-sm border-0">
                        <div class="card-body">
                            <h5 class="card-title">Kategori</h5>
                            <p class="card-text fs-2 fw-bold m-0">${totalKategori}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tabel 5 Buku Terbaru -->
            <div class="card shadow-sm border-0">
                <div class="card-header bg-white fw-bold py-3">5 Buku Terbaru</div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped align-middle mb-0">
                            <thead class="table-dark text-center">
                                <tr>
                                    <th>No</th>
                                    <th>Judul</th>
                                    <th>Penulis</th>
                                    <th>Tahun</th>
                                    <th>Stok</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${booksHtml}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Gagal memuat dashboard:", error);
        content.innerHTML = `<div class="alert alert-danger text-center">Gagal memuat data dari server.</div>`;
    }
}