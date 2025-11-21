// Itinerary Management System
const ItineraryManager = {
    routes: {
        kota: {
            title: "Muter Kota 1 Hari",
            filter: function(data) {
                return data
                    .filter(
                        (item) =>
                        (item.lokasi === "Gresik Kota" || item.kategori === "kuliner") &&
                        item.rating >= 4.5
                    )
                    .slice(0, 5);
            },
        },
        healing: {
            title: "Healing Gresik Utara",
            filter: function(data) {
                return data
                    .filter(
                        (item) =>
                        item.tags &&
                        (item.tags.includes("healing") ||
                            item.tags.includes("alam") ||
                            item.tags.includes("hijau") ||
                            item.tags.includes("sunyi") ||
                            item.tags.includes("taman")) &&
                        (item.lokasi.includes("Gresik kota") ||
                            item.lokasi.includes("Ujungpangkah") ||
                            item.lokasi.includes("Bungah"))
                    )
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 5);
            },
        },
        bawean: {
            title: "Healing Pulau Bawean",
            filter: function(data) {
                return data
                    .filter(
                        (item) =>
                        item.lokasi === "Bawean" &&
                        item.tags &&
                        (item.tags.includes("healing") ||
                            item.tags.includes("alam") ||
                            item.tags.includes("hijau") ||
                            item.tags.includes("pantai") ||
                            item.tags.includes("sunyi"))
                    )
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 5);
            },
        },
        religi: {
            title: "Religi Full Day",
            filter: function(data) {
                return data
                    .filter(
                        (item) => item.kategori === "religi" || item.kategori === "sejarah"
                    )
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 5);
            },
        },
        sunset: {
            title: "Sunset Trip Gresik",
            filter: function(data) {
                return data
                    .filter((item) => item.tags && item.tags.includes("sunset"))
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 5);
            },
        },
        mood: {
            title: "Rute Sesuai Mood Anda",
            filter: function(data) {
                const savedMood = localStorage.getItem("userMood");
                if (savedMood) {
                    const moodMapping = {
                        senang: ["pantai", "kuliner", "spot foto"],
                        healing: ["alam", "sunyi", "hijau"],
                        galau: ["sunset", "perbukitan", "view tinggi"],
                        tantangan: ["trekking", "bukit"],
                        santai: ["taman", "pantai", "santai"],
                        kuliner: ["kuliner", "umkm"],
                    };

                    const moodTags = moodMapping[savedMood] || [];

                    return data
                        .filter((item) => item.tags)
                        .map((item) => {
                            let score = 0;
                            item.tags.forEach((tag) => {
                                if (moodTags.includes(tag)) score++;
                            });
                            return {...item, moodScore: score };
                        })
                        .filter((item) => item.moodScore > 0)
                        .sort((a, b) => b.moodScore - a.moodScore || b.rating - a.rating)
                        .slice(0, 5);
                }
                return data.sort((a, b) => b.rating - a.rating).slice(0, 5);
            },
        },
    },

    generateItinerary: function(routeType) {
        if (!this.routes[routeType]) {
            console.error("Route type not found");
            return;
        }

        const route = this.routes[routeType];
        const filteredData = route.filter(wisataData);

        if (filteredData.length === 0) {
            alert("Tidak ada destinasi yang tersedia untuk rute ini.");
            return;
        }

        this.renderItinerary(route.title, filteredData);
    },

    renderItinerary: function(title, destinations) {
        const itinerarySection = document.getElementById("itinerarySection");
        const itineraryTitle = document.getElementById("itineraryTitle");
        const itineraryDuration = document.getElementById("itineraryDuration");
        const itineraryCount = document.getElementById("itineraryCount");
        const itineraryResult = document.getElementById("itineraryResult");

        // Update title and info
        itineraryTitle.textContent = title;
        const duration = destinations.length * 2;
        itineraryDuration.textContent = `Durasi: ${duration} Jam`;
        itineraryCount.textContent = `${destinations.length} Destinasi`;

        // Clear previous content
        itineraryResult.innerHTML = "";

        // Generate timeline
        let currentHour = 9; // Start at 09:00
        destinations.forEach((destination, index) => {
            const timeString = this.formatTime(currentHour);
            const timelineItem = this.createTimelineItem(
                destination,
                timeString,
                index + 1
            );
            itineraryResult.appendChild(timelineItem);
            currentHour += 2; // Add 2 hours per destination
        });

        // Show itinerary section
        document.querySelector(".route-selection").style.display = "none";
        itinerarySection.style.display = "block";

        // Scroll to itinerary
        itinerarySection.scrollIntoView({ behavior: "smooth", block: "start" });
    },

    createTimelineItem: function(destination, time, index) {
        const item = document.createElement("div");
        item.className = "timeline-item";

        item.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <span class="timeline-time">${time}</span>
                <div class="timeline-header">
                    <div>
                        <h3 class="timeline-title">${index}. ${destination.nama}</h3>
                        <div class="timeline-location">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>${destination.lokasi}</span>
                        </div>
                    </div>
                    <div class="timeline-rating">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#f9844a" stroke="#f9844a">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        <span>${destination.rating}</span>
                    </div>
                </div>
                <div class="timeline-actions">
                    <a href="${destination.maps}" target="_blank" class="btn-maps">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        Buka Maps
                    </a>
                    <a href="detail.html?id=${destination.id}" class="btn-detail">Lihat Detail</a>
                </div>
            </div>
        `;

        return item;
    },

    formatTime: function(hour) {
        const endHour = hour + 2;
        return `${this.padZero(hour)}:00 - ${this.padZero(endHour)}:00`;
    },

    padZero: function(num) {
        return num.toString().padStart(2, "0");
    },

    resetView: function() {
        document.querySelector(".route-selection").style.display = "block";
        document.getElementById("itinerarySection").style.display = "none";
        window.scrollTo({ top: 0, behavior: "smooth" });
    },
};

// Event Listeners
document.addEventListener("DOMContentLoaded", function() {
    // Route card click handlers
    const routeCards = document.querySelectorAll(".route-card");
    routeCards.forEach((card) => {
        card.addEventListener("click", function() {
            const routeType = this.getAttribute("data-route");
            ItineraryManager.generateItinerary(routeType);
        });
    });

    // Back button handler
    const btnBack = document.getElementById("btnBack");
    if (btnBack) {
        btnBack.addEventListener("click", function() {
            ItineraryManager.resetView();
        });
    }

    // Print button handler
    const btnPrint = document.getElementById("btnPrint");
    if (btnPrint) {
        btnPrint.addEventListener("click", function() {
            window.print();
        });
    }
    // Mood selection handler
    document.addEventListener("DOMContentLoaded", function() {
        const moodCards = document.querySelectorAll(".mood-card");

        moodCards.forEach((card) => {
            card.addEventListener("click", function() {
                const selectedMood = this.getAttribute("data-mood");

                // Remove active class from all cards
                moodCards.forEach((c) => c.classList.remove("active"));

                // Add active class to selected card
                this.classList.add("active");

                // Save mood to localStorage
                localStorage.setItem("userMood", selectedMood);

                // Redirect to wisata page after short delay
                setTimeout(() => {
                    window.location.href = "wisata.html";
                }, 300);
            });
        });

        // Highlight saved mood if exists
        const savedMood = localStorage.getItem("userMood");
        if (savedMood) {
            const savedCard = document.querySelector(
                `.mood-card[data-mood="${savedMood}"]`
            );
            if (savedCard) {
                savedCard.classList.add("active");
            }
        }
    });
});