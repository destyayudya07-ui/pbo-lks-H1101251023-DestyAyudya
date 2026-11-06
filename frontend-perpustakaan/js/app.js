document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("hashchange", handleRouting);
    handleRouting(); // Jalankan router saat pertama kali dibuka
});

function handleRouting() {
    const hash = window.location.hash || "#dashboard";
    setActiveNav(hash);

    const content = document.getElementById("app-content") || document.body;

    if (hash === "#dashboard") {
        if (typeof renderDashboard === "function") renderDashboard();
    } else if (hash === "#books") {
        if (typeof renderBooks === "function") renderBooks();
    } else if (hash === "#categories") {
        if (typeof renderCategories === "function") renderCategories();
    } else {
        if (typeof renderDashboard === "function") renderDashboard();
    }
}

function setActiveNav(hash) {
    document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
        link.classList.remove("active", "fw-semibold");
        if (link.getAttribute("href") === hash) {
            link.classList.add("active", "fw-semibold");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("hashchange", handleRouting);
    handleRouting();
});

function handleRouting() {
    const hash = window.location.hash || "#dashboard";
    setActiveNav(hash);

    const content = document.getElementById("app-content");
    if (!content) return;

    if (hash === "#dashboard") {
        if (typeof renderDashboard === "function") renderDashboard();
    } else if (hash === "#books") {
        if (typeof renderBooks === "function") renderBooks();
    } else if (hash === "#categories") {
        if (typeof renderCategories === "function") renderCategories();
    } else {
        if (typeof renderDashboard === "function") renderDashboard();
    }
}

function setActiveNav(hash) {
    document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
        link.classList.remove("active", "fw-semibold");
        if (link.getAttribute("href") === hash) {
            link.classList.add("active", "fw-semibold");
        }
    });
}