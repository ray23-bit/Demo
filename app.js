// ========== KODE LENGKAP TANPA DEPENDENSI ========== //
// Config default
const DEFAULT_SETTINGS = {
  model: "premium",
  width: 1024,
  height: 1024,
  steps: 50,
  cfgScale: 12,
  enhance: false,
  safeMode: true,
  upscale: true,
  negativePrompt: "blurry, lowres, bad anatomy, text, watermark"
};

// Fungsi utama: Generate gambar
async function generateImage(prompt, options = {}) {
  // Gabungkan dengan default settings
  const settings = { ...DEFAULT_SETTINGS, ...options };

  if (!prompt) throw new Error("Prompt tidak boleh kosong!");

  // Encode untuk URL
  const encodedPrompt = encodeURIComponent(prompt);
  const encodedNegPrompt = encodeURIComponent(settings.negativePrompt);

  // Parameter dasar
  const baseParams = [
    `width=${settings.width}`,
    `height=${settings.height}`,
    `nologo=true`,
    `seed=${settings.seed || Math.floor(Math.random() * 999999) + 1}`,
    `steps=${settings.steps}`,
    `cfg_scale=${settings.cfgScale}`,
  ];

  // Tambahkan parameter khusus model
  if (settings.model === "turbo") {
    baseParams.push(`enhance=${settings.enhance}`, `safe=${!settings.safeMode}`);
  } else {
    baseParams.push(`upscale=${settings.upscale}`);
  }

  // Bangun URL
  let apiUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?${baseParams.join("&")}`;
  if (settings.model !== "default") apiUrl += `&model=${settings.model}`;
  if (settings.negativePrompt) apiUrl += `&negative_prompt=${encodedNegPrompt}`;
  apiUrl += `&timestamp=${Date.now()}`;

  return apiUrl;
}

// Fungsi download gambar
async function downloadImage(imageUrl, fileName = "ai-image.jpg") {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error("Gagal download:", error);
    return false;
  }
}

// =============================================
// CONTOH PENGGUNAAN (Bisa dihapus jika tidak perlu)
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  // Contoh generate + download otomatis
  const generateBtn = document.getElementById("generate-btn");
  if (generateBtn) {
    generateBtn.addEventListener("click", async () => {
      const prompt = document.getElementById("prompt").value;
      const model = document.getElementById("model").value;
      
      const imageUrl = await generateImage(prompt, { 
        model: model,
        width: 800,
        height: 800,
        enhance: true
      });
      
      await downloadImage(imageUrl, `hasil-${Date.now()}.jpg`);
    });
  }
});
