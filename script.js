// 1. Fetch NASA APOD
async function getAPOD() {
    const apiKey = 1mqbq8LmvqitV1YcJ2C10O4OqDZMo31aAum8EwsO ; // Ganti dengan API Key NASA milikmu
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
        const data = await response.json();
        document.getElementById('apod-content').innerHTML = `
            <h3>${data.title}</h3>
            <img id="apod-img" src="${data.url}" alt="APOD">
            <p style="font-size: 0.8rem; margin-top: 10px;">${data.explanation.substring(0, 200)}...</p>
        `;
    } catch (error) {
        console.log("Error loading APOD");
    }
}

// 2. Fetch ISS Position
async function getISS() {
    try {
        const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
        const data = await response.json();
        document.getElementById('iss-pos').innerText = 
            `Lat: ${data.latitude.toFixed(2)} | Lon: ${data.longitude.toFixed(2)}`;
    } catch (error) {
        console.log("ISS data error");
    }
}

// 3. Countdown Fenomena (Contoh: Gerhana)
function startCountdown() {
    const targetDate = new Date("March 3, 2026 23:00:00").getTime();
    
    setInterval(() => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        document.getElementById('countdown-gerhana').innerText = `${d} Hari ${h} Jam lagi`;
    }, 1000);
}

// Run functions
getAPOD();
setInterval(getISS, 5000); // Update ISS tiap 5 detik
startCountdown();
getISS();

// Fase Bulan Sederhana (Statik untuk contoh)
document.getElementById('moon-phase').innerText = "Bulan Sabit Awal (Waxing Crescent)";
