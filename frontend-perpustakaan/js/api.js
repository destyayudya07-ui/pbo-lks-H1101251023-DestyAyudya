// --- KATEGORI API ---
async function getCategories() {
    try {
        const response = await fetch(`${BASE_URL}/categories`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Gagal memuat kategori:", error);
        return { data: [] };
    }
}

// --- BUKU API ---
async function getBooks() {
    try {
        const response = await fetch(`${BASE_URL}/books`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Gagal memuat buku:", error);
        return { data: [] };
    }
}

async function createBook(data) {
    try {
        const response = await fetch(`${BASE_URL}/books`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error("Gagal menambah buku:", error);
    }
}

async function deleteBook(id) {
    try {
        const response = await fetch(`${BASE_URL}/books/${id}`, {
            method: "DELETE"
        });
        return await response.json();
    } catch (error) {
        console.error("Gagal menghapus buku:", error);
    }
}