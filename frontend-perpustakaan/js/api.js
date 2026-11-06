async function getCategories() {
    try {
        const response = await fetch(`${BASE_URL}/categories`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Gagal memuat kategori:", error);
        return null;
    }
}

async function createCategory(data) {
    try {
        const response = await fetch(`${BASE_URL}/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error("Gagal menambah kategori:", error);
    }
}

async function updateCategory(id, data) {
    try {
        const response = await fetch(`${BASE_URL}/categories/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error("Gagal mengupdate kategori:", error);
    }
}

async function deleteCategory(id) {
    try {
        const response = await fetch(`${BASE_URL}/categories/${id}`, {
            method: "DELETE"
        });
        return await response.json();
    } catch (error) {
        console.error("Gagal menghapus kategori:", error);
    }
}