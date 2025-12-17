// Smooth Scroll untuk Navigasi
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Ubah style nav saat discroll
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    nav.style.padding = "10px 5%";
    nav.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
  } else {
    nav.style.padding = "15px 5%";
    nav.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  }
});

// --- LOGIKA SIMULASI PREDIKSI (Diset untuk Studi Kasus Gambut) ---
const predictionForm = document.getElementById("predictionForm");
const resultCard = document.getElementById("resultCard");

if (predictionForm) {
  predictionForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Mencegah reload halaman

    // 1. Ambil Nilai Input
    const waterLevel = parseFloat(document.getElementById("waterLevel").value);
    const soilMoisture = parseFloat(document.getElementById("soilMoisture").value);
    const temp = parseFloat(document.getElementById("temperature").value);

    // 2. Logika Inferensi (Rule-based mimicry of the Model)
    // Berdasarkan pola data CSV:
    // Banjir: Water Level > 0 (Positif) & Moisture tinggi (>80)
    // Kebakaran: Water Level < -40 (Sangat rendah) & Moisture rendah (<40) & Suhu panas (>30)
    
    let label = "";
    let desc = "";
    let cssClass = "";
    let iconClass = "";

    if (waterLevel > 0) {
      // Kasus Banjir
      label = "WASPADA BANJIR";
      desc = "Muka air positif terdeteksi. Risiko luapan air tinggi.";
      cssClass = "state-warn"; // Menggunakan warna kuning/orange (sesuai template style.css badge-warn)
      iconClass = "fa-water";
    } else if (waterLevel < -30 && soilMoisture < 45 && temp > 30) {
      // Kasus Kebakaran (Syarat: Air surut jauh, tanah kering, suhu panas)
      label = "WASPADA KEBAKARAN";
      desc = "Terdeteksi kekeringan ekstrem & suhu tinggi. Potensi titik api.";
      cssClass = "state-danger"; // Merah
      iconClass = "fa-fire";
    } else {
      // Kasus Normal
      label = "NORMAL";
      desc = "Parameter lingkungan dalam batas aman.";
      cssClass = "state-safe"; // Hijau
      iconClass = "fa-check-circle";
    }

    // 3. Tampilkan Data Input Kembali
    document.getElementById("resWater").innerText = waterLevel;
    document.getElementById("resMoist").innerText = soilMoisture;
    document.getElementById("resTemp").innerText = temp;

    // 4. Update Tampilan Result Card
    const resultLabel = document.getElementById("resultLabel");
    const resultDesc = document.getElementById("resultDesc");
    const resultIcon = document.getElementById("resultIcon");

    // Reset class lama
    resultCard.className = "sim-card result-card"; 
    
    // Tambah class baru
    resultCard.classList.add(cssClass);
    
    // Update Text & Icon
    resultLabel.innerText = label;
    resultDesc.innerText = desc;
    resultIcon.className = `fas ${iconClass}`;

    // Tampilkan Card dengan animasi fade-in sederhana
    resultCard.style.display = "block";
    resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}