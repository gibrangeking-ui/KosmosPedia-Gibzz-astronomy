// 1. Fetch NASA APOD
async function getAPOD() {
    // === TUGAS PENTING GIBZZ: GANTI 'DEMO_KEY' DI BAWAH DENGAN KEY ASLI DARI NASA ===
    const apiKey = '1mqbq8LmvqitV1YcJ2C10O4OqDZMo31aAum8EwsO'; 
    // Jika tidak punya key asli, NASA akan memblokir websitemu jika terlalu sering direfresh.

    const contentDiv = document.getElementById('apod-content');

    try {
        contentDiv.innerHTML = '<p style="color: #9333ea;">Sedang menghubungi satelit NASA...</p>';

        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=1mqbq8LmvqitV1YcJ2C10O4OqDZMo31aAum8EwsO`);
        
        // Cek jika respon dari NASA error (misal: 403 Forbidden)
        if (!response.ok) {
            throw new Error(`NASA Menolak Akses (${response.status}). <br> <span style="font-size:0.8rem; color:#e0d0f0;">Kemungkinan API Key 'DEMO_KEY' sudah habis limitnya. <br> Segera ganti dengan API Key asli dari api.nasa.gov</span>`);
        }

        const data = await response.json();
        
        // Tampilkan data jika berhasil
        contentDiv.innerHTML = `
            <h3 style="color: #e0d0f0; margin-bottom: 10px;">${data.title}</h3>
            <img id="apod-img" src="${data.url}" alt="Astronomy Picture of the Day" style="width: 100%; max-width: 600px; border-radius: 10px; border: 2px solid #7c3aed;">
            <p style="font-size: 0.9rem; margin-top: 15px; text-align: justify; opacity: 0.8;">${data.explanation.substring(0, 300)}...</p>
        `;

    } catch (error) {
        // Tampilkan pesan error berwarna merah GARANG di layar websitemu
        contentDiv.innerHTML = `
            <div style="background: #4c1d95; padding: 20px; border-radius: 10px; border: 1px solid red; color: #ffcccc;">
                <h4 style="color:red; margin-top:0;">🚀 Waduh, Koneksi Terputus! 🚀</h4>
                <p style="font-size:0.9rem;">Web tidak bisa mengambil data real-time NASA.</p>
                <p style="font-weight:bold; font-size:1rem; border-top:1px solid red; padding-top:10px;">Masalah: ${error.message}</p>
            </div>
        `;
        console.error("Detail Error Teknis:", error);
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
