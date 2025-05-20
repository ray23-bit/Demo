
// === Style Presets ===
const stylePresets = {
    realistic: "photo-realistic, skin texture, true lighting, depth of field, high resolution, natural tones",
    fantasy: "ethereal, epic fantasy, glowing runes, mystical landscapes, high detail, enchanted atmosphere",
    anime: "clean lines, cel shading, anime eyes, dynamic pose, colorful background, high detail",
    painting: "oil on canvas, painterly brush strokes, impasto technique, expressive texture, museum style",
    cyberpunk: "futuristic cityscape, neon lights, glowing eyes, chrome finish, tech aesthetics, rain ambiance",
    watercolor: "soft gradient, pigment spread, canvas texture, light wash, hand-painted feel",
    photography: "DSLR photo, bokeh, high dynamic range, true-to-life, cinematic composition",
    surrealism: "dream logic, paradox elements, floating objects, hyper realism, dali inspired",
    fractal: "recursive geometry, luminous fractals, complex patterns, glowing symmetry, kaleidoscopic effect",
    macabre: "dark fantasy, gothic horror, decayed beauty, intricate bones, shadow play, expressive gloom",
    tensorlora: "biomechanical horror, alien goddess, H.R. Giger style, hyper intricate, glowing eyes, tentacles, skulls, cosmic energy, surreal horror, sacred geometry, ultra detail, dark fantasy, high resolution, volumetric lighting"
};

// === Generate Image Function ===
function generateImage() {
    const promptInput = document.getElementById('prompt');
    const modelSelect = document.getElementById('model');
    const artStyleOptions = document.querySelectorAll('.art-style-option');
    const aspectRatio = document.getElementById('aspect-ratio');
    const styleKeywordsInput = document.getElementById('style-keywords');
    const enhance = document.getElementById('quality-enhancer');

    let prompt = promptInput.value.trim();
    if (!prompt) {
        alert('Masukkan prompt terlebih dahulu.');
        return;
    }

    // Ambil gaya yang dipilih
    let selectedStyle = 'realistic';
    const selectedStyleOption = document.querySelector('.art-style-option.selected');
    if (selectedStyleOption) {
        selectedStyle = selectedStyleOption.dataset.style;
    }

    // Ganti ke premium jika tensorlora
    if (selectedStyle === 'tensorlora') {
        modelSelect.value = 'premium';
        alert('Tensor LoRA style dipilih. Model Premium diaktifkan otomatis.');
    }

    // Tambah kualitas dan preset gaya
    let fullPrompt = prompt;
    if (enhance.checked) {
        fullPrompt += ', 8k, ultra HD, intricate details, sharp focus, cinematic lighting';
    }

    if (stylePresets[selectedStyle]) {
        fullPrompt += ', ' + stylePresets[selectedStyle];
    }

    if (styleKeywordsInput.value.trim()) {
        fullPrompt += ', ' + styleKeywordsInput.value.trim();
    }

    // Tampilkan prompt akhir di console (simulasi generate)
    console.log("Full prompt:", fullPrompt);
}
