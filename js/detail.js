       // Get destination ID from URL parameter
       const urlParams = new URLSearchParams(window.location.search);
       const destinasiId = parseInt(urlParams.get("id"));

       // Find destination data
       const destinasi = wisataData.find((item) => item.id === destinasiId);

       // Render detail content
       const detailContent = document.getElementById("detailContent");
       const notFound = document.getElementById("notFound");

       if (destinasi) {
           detailContent.innerHTML = `
                <div class="detail-image">
                    <img src="${destinasi.gambar}" alt="${destinasi.nama}">
                </div>
                
                <div class="detail-info">
                    <div class="detail-header">
                        <h1 class="detail-title">${destinasi.nama}</h1>
                        <div class="detail-meta">
                            <span class="badge badge-${destinasi.kategori}">${destinasi.kategori}</span>
                            <div class="rating">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="#f9844a" stroke="#f9844a">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                <span>${destinasi.rating}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="detail-body">
                        <div class="info-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#43aa8b" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <div>
                                <strong>Lokasi</strong>
                                <p>${destinasi.lokasi}</p>
                            </div>
                        </div>
                        
                        <div class="info-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#577590" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <div>
                                <strong>Jam Buka</strong>
                                <p>${destinasi.jamBuka}</p>
                            </div>
                        </div>
                        
                        <div class="info-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f9844a" stroke-width="2">
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                            <div>
                                <strong>Harga Tiket</strong>
                                <p>${destinasi.hargaTiket}</p>
                            </div>
                        </div>
                        
                        <div class="detail-description">
                            <h3>Deskripsi</h3>
                            <p>${destinasi.deskripsi}</p>
                        </div>
                        
                        <div class="detail-facilities">
                            <h3>Fasilitas</h3>
                            <ul>
                                ${destinasi.fasilitas.map((f) => `<li>${f}</li>`).join("")}
                            </ul>
                        </div>

                        <div class="info-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#277da1" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <div style="flex: 1;">
                                <strong>Google Maps</strong>
                                <a href="${destinasi.maps}" class="btn-primary" target="_blank" style="margin-top: 0.5rem;">
                                    Buka di Google Maps
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            detailContent.style.display = "none";
            notFound.style.display = "block";
        }