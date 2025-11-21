// Render cards untuk destinasi wisata
function renderCards(data) {
    const grid = document.getElementById("destinasiGrid");
    const noResults = document.getElementById("noResults");

    // Clear grid
    grid.innerHTML = "";

    // Check if data is empty
    if (data.length === 0) {
        grid.style.display = "none";
        noResults.style.display = "block";
        return;
    }

    grid.style.display = "grid";
    noResults.style.display = "none";

    // Render each card
    data.forEach((item) => {
        const card = createCard(item);
        grid.appendChild(card);
    });
}

// Function untuk create single card
function createCard(item) {
    const card = document.createElement("div");
    card.className = "destinasi-card";

    const moodIndicator =
        item.moodScore > 0 ?
        `
        <span class="mood-indicator" title="Cocok untuk mood Anda">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#43aa8b" stroke="#43aa8b">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            Rekomendasi
        </span>
    ` :
        "";

    card.onclick = function() {
        window.location.href = `detail.html?id=${item.id}`;
    };

    card.innerHTML = `
        <div class="card-image">
            <img src="${item.gambar}" alt="${item.nama}">
            <span class="card-badge badge-${item.kategori}">${item.kategori}</span>
            ${moodIndicator}
        </div>

        <div class="card-content">
            <h3 class="card-title">${item.nama}</h3>

            <div class="card-location">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>${item.lokasi}</span>
            </div>

            <div class="card-footer">
                <div class="card-rating">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#f9844a" stroke="#f9844a">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span>${item.rating}</span>
                </div>

                <a href="detail.html?id=${item.id}" 
                   class="card-link" 
                   onclick="event.stopPropagation();">
                    Lihat Detail
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </a>
            </div>
            `;

    return card;
}

// Initial render jika di halaman wisata
if (document.getElementById("destinasiGrid")) {
    renderCards(wisataData);
}