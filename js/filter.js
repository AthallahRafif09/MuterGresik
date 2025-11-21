// Mapping mood ke tags destinasi
const moodMapping = {
    "senang": ["pantai", "kuliner", "spot foto"],
    "healing": ["alam", "sunyi", "hijau"],
    "galau": ["sunset", "perbukitan", "view tinggi"],
    "tantangan": ["trekking", "bukit"],
    "santai": ["taman", "pantai", "santai"],
    "kuliner": ["kuliner", "umkm"]
};

// Filter functionality untuk halaman wisata
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const locationFilter = document.getElementById('locationFilter');
    const moodFilter = document.getElementById('moodFilter');
    const resetButton = document.getElementById('resetFilter');
    const resultCount = document.getElementById('resultCount');
    const moodInfo = document.getElementById('moodInfo');

    // Load saved mood from localStorage
    const savedMood = localStorage.getItem('userMood');
    if (savedMood && moodFilter) {
        moodFilter.value = savedMood;
        applyMoodTheme(savedMood);
        showMoodInfo(savedMood);
    }

    // Function untuk apply mood theme ke body
    function applyMoodTheme(mood) {
        // Remove all mood classes
        document.body.classList.remove('mood-senang', 'mood-healing', 'mood-galau', 'mood-tantangan', 'mood-santai', 'mood-kuliner');
        
        // Add selected mood class
        if (mood) {
            document.body.classList.add(`mood-${mood}`);
        }
    }

    // Function untuk show mood info
    function showMoodInfo(mood) {
        if (mood && moodInfo) {
            const moodEmojis = {
                'senang': '😊',
                'healing': '🌿',
                'galau': '🌅',
                'tantangan': '⛰️',
                'santai': '🏖️',
                'kuliner': '🍜'
            };
            moodInfo.innerHTML = `<p>${moodEmojis[mood]} Menampilkan rekomendasi sesuai mood: <strong>${mood}</strong></p>`;
            moodInfo.style.display = 'block';
        } else {
            moodInfo.style.display = 'none';
        }
    }

    // Function untuk calculate mood score
    function calculateMoodScore(item, selectedMood) {
        if (!selectedMood || !item.tags) return 0;
        
        const moodTags = moodMapping[selectedMood] || [];
        let score = 0;
        
        // Count matching tags
        item.tags.forEach(tag => {
            if (moodTags.includes(tag)) {
                score++;
            }
        });
        
        return score;
    }

    // Function untuk filter dan sort data
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedCategory = categoryFilter.value.toLowerCase();
        const selectedLocation = locationFilter.value;
        const selectedMood = moodFilter.value;

        // Filter data berdasarkan kriteria
        let filteredData = wisataData.filter(item => {
            const matchSearch = item.nama.toLowerCase().includes(searchTerm) || 
                              item.deskripsi.toLowerCase().includes(searchTerm);
            const matchCategory = selectedCategory === '' || item.kategori === selectedCategory;
            const matchLocation = selectedLocation === '' || item.lokasi === selectedLocation;

            return matchSearch && matchCategory && matchLocation;
        });

        // Sort by mood score if mood is selected
        if (selectedMood) {
            filteredData = filteredData.map(item => ({
                ...item,
                moodScore: calculateMoodScore(item, selectedMood)
            })).sort((a, b) => {
                // Sort by mood score descending, then by rating
                if (b.moodScore !== a.moodScore) {
                    return b.moodScore - a.moodScore;
                }
                return b.rating - a.rating;
            });
        } else {
            // Default sort by rating
            filteredData.sort((a, b) => b.rating - a.rating);
        }

        // Render hasil filter
        renderCards(filteredData);

        // Update result count
        updateResultCount(filteredData.length, selectedMood);

        // Apply mood theme
        applyMoodTheme(selectedMood);

        // Show mood info
        showMoodInfo(selectedMood);
    }

    // Function untuk update jumlah hasil
    function updateResultCount(count, mood) {
        if (count === 0) {
            resultCount.textContent = 'Tidak ada destinasi yang ditemukan';
        } else if (count === wisataData.length && !mood) {
            resultCount.textContent = 'Menampilkan semua destinasi';
        } else if (mood) {
            resultCount.textContent = `Menampilkan ${count} destinasi untuk mood ${mood}`;
        } else {
            resultCount.textContent = `Menampilkan ${count} destinasi`;
        }
    }

    // Event listeners
    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
    if (locationFilter) locationFilter.addEventListener('change', applyFilters);
    if (moodFilter) {
        moodFilter.addEventListener('change', function() {
            const selectedMood = this.value;
            if (selectedMood) {
                localStorage.setItem('userMood', selectedMood);
            }
            applyFilters();
        });
    }

    // Reset filter
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            searchInput.value = '';
            categoryFilter.value = '';
            locationFilter.value = '';
            moodFilter.value = '';
            localStorage.removeItem('userMood');
            applyFilters();
        });
    }

    // Initial render with filters applied
    applyFilters();
});