// Mood Management Utility
const MoodManager = {
    // Get current mood from localStorage
    getCurrentMood: function() {
        return localStorage.getItem('userMood') || null;
    },
    
    // Set mood to localStorage
    setMood: function(mood) {
        if (mood) {
            localStorage.setItem('userMood', mood);
        } else {
            localStorage.removeItem('userMood');
        }
    },
    
    // Clear mood
    clearMood: function() {
        localStorage.removeItem('userMood');
    },
    
    // Get mood display name
    getMoodDisplayName: function(mood) {
        const moodNames = {
            'senang': 'Senang 😊',
            'healing': 'Healing 🌿',
            'galau': 'Galau 🌅',
            'tantangan': 'Tantangan ⛰️',
            'santai': 'Santai 🏖️',
            'kuliner': 'Kuliner 🍜'
        };
        return moodNames[mood] || mood;
    },
    
    // Get mood color
    getMoodColor: function(mood) {
        const moodColors = {
            'senang': '#f9c74f',
            'healing': '#90be6d',
            'galau': '#577590',
            'tantangan': '#f94144',
            'santai': '#277da1',
            'kuliner': '#f3722c'
        };
        return moodColors[mood] || '#43aa8b';
    }
};

// Export if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MoodManager;
}