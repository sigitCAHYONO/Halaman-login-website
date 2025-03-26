const nokosButton = document.getElementById('nokosButton');
const mainPage = document.getElementById('mainPage');
const nokosPage = document.getElementById('nokosPage');
const backToMainButton = document.getElementById('backToMain');
const countrySelect = document.getElementById('country');
const nokosDetails = document.getElementById('nokosDetails');
const telegramLink = document.getElementById('telegramLink');
const premAppsButton = document.getElementById('premAppsButton');
const premiumAppsPage = document.getElementById('premiumAppsPage');
const backToMainFromPremAppsButton = document.getElementById('backToMainFromPremApps');
const youtubeAppItem = document.getElementById('youtubeAppItem');
const youtubePremiumPage = document.getElementById('youtubePremiumPage');
const backToPremAppsButton = document.getElementById('backToPremApps');
const allButtons = document.querySelectorAll('.main-page .category-item');
const suntikManualButtons = Array.from(document.querySelectorAll('.main-page .category-item span')).filter(span => span.textContent === 'Suntik Manual');
const suntikManualPage = document.getElementById('suntikManualPage');
const backToMainFromSuntikManualButton = document.getElementById('backToMainFromSuntikManual');
const saldoInfoDiv = document.querySelector('.main-page .saldo-info');
const viewTTOnlyButton = document.getElementById('viewTTOnlyButton');
const viewTTOnlyPage = document.getElementById('viewTTOnlyPage');
const backToMainFromViewTTOnlyButton = document.getElementById('backToMainFromViewTTOnly');
const productItemsViewTT = document.querySelectorAll('#viewTTOnlyPage .product-item');
const buyViewTTPage = document.getElementById('buyViewTTPage');
const backToViewTTOnlyButton = document.getElementById('backToViewTTOnly');
const linkVideoInput = document.getElementById('linkVideo');
const jumlahInput = document.getElementById('jumlah');
const totalBayarDiv = document.querySelector('#buyViewTTPage .total-bayar');
const deskripsiInput = document.getElementById('deskripsi');
const beliSekarangViewTTButton = document.getElementById('beliSekarangViewTT');
const nokosPriceElement = document.getElementById('nokosPrice');
const panelBotButton = document.getElementById('panelBotButton');
const panelBotPage = document.getElementById('panelBotPage');
const backToMainFromPanelBotButton = document.getElementById('backToMainFromPanelBot');
const beliSekarangPanelBotButton = document.getElementById('beliSekarangPanelBot');
const jumlahPanelInput = document.getElementById('jumlahPanel');
const namaPanelInput = document.getElementById('namaPanel');
const cpuPanelInput = document.getElementById('cpuPanel');
const ramPanelInput = document.getElementById('ramPanel');
const storagePanelInput = document.getElementById('storagePanel');
const bantuanButton = document.getElementById('bantuanButton');
const bantuanPage = document.getElementById('bantuanPage');
const backToMainFromBantuanButton = document.getElementById('backToMainFromBantuan');

let selectedProduct = null;
let pricePer100Views = 0;

const nokosPrices = {
    'malaysia': 'Rp 15.000',
    'indonesia': 'Rp 8.000',
    'philippines': 'Rp 10.000',
    'myanmar': 'Kosong',
    'rusia': 'Rp 20.000',
    'thailand': 'Rp 15.000',
    'colombia': 'Rp 17.000',
    'brazil': 'Rp 30.000'
};

const saldoStrong = saldoInfoDiv.querySelector('strong');
if (saldoStrong) {
    saldoStrong.textContent = '271 Triliun';
}

const saldoInfoChildren = Array.from(saldoInfoDiv.children);
if (saldoInfoChildren.length > 1) {
    saldoInfoDiv.removeChild(saldoInfoChildren[1]);
}

allButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.id !== 'nokosButton' && button.id !== 'premAppsButton' && button.id !== 'viewTTOnlyButton' && button.id !== 'panelBotButton' && !button.querySelector('span').textContent.includes("Suntik Manual") && button.querySelector('span').textContent !== 'Vps') {
            alert(`Tombol "${button.querySelector('span').textContent}" diklik!`);
        }
    });
});

suntikManualButtons.forEach(buttonSpan => {
    const buttonItem = buttonSpan.parentNode;
    buttonItem.addEventListener('click', () => {
        mainPage.style.display = 'none';
        suntikManualPage.style.display = 'block';
    });
});

backToMainFromSuntikManualButton.addEventListener('click', () => {
    suntikManualPage.style.display = 'none';
    mainPage.style.display = 'block';
});

nokosButton.addEventListener('click', () => {
    mainPage.style.display = 'none';
    nokosPage.style.display = 'block';
});

backToMainButton.addEventListener('click', () => {
    nokosPage.style.display = 'none';
    mainPage.style.display = 'block';
    countrySelect.value = '';
    nokosDetails.style.display = 'none';
    nokosPriceElement.textContent = 'Harga akan muncul setelah memilih negara';
});

countrySelect.addEventListener('change', () => {
    if (countrySelect.value) {
        nokosDetails.style.display = 'block';
        const selectedCountry = countrySelect.value;
        if (nokosPrices.hasOwnProperty(selectedCountry)) {
            nokosPriceElement.textContent = nokosPrices[selectedCountry];
        } else {
            nokosPriceElement.textContent = 'Harga tidak tersedia untuk negara ini';
        }
    } else {
        nokosDetails.style.display = 'none';
        nokosPriceElement.textContent = 'Harga akan muncul setelah memilih negara';
    }
});

telegramLink.addEventListener('click', (event) => {
    event.preventDefault();

    const selectedCountry = countrySelect.value;
    let telegramMessage = "";
    const premiumEmojis = '💎✨👑'; // Emoji premium

    if (selectedCountry) {
        telegramMessage = `🔥 *PESANAN NOKOS* 🔥 ⭐ ${premiumEmojis}\n\n🌍 *Negara:* ${selectedCountry.toLowerCase()}\n\nTerima kasih telah order di Ravaelstore! 🙏`;
    } else {
        telegramMessage = `🔥 *PESANAN NOKOS* 🔥 ⭐ ${premiumEmojis}\n\n🌍 *Negara:* (belum dipilih)\n\nTerima kasih telah order di Ravaelstore! 🙏`;
    }

    const telegramUrl = `https://t.me/RavaeIStore?text=${encodeURIComponent(telegramMessage)}`;
    window.open(telegramUrl, '_blank');
});

premAppsButton.addEventListener('click', () => {
    mainPage.style.display = 'none';
    premiumAppsPage.style.display = 'block';
});

backToMainFromPremAppsButton.addEventListener('click', () => {
    premiumAppsPage.style.display = 'none';
    mainPage.style.display = 'block';
});

youtubeAppItem.addEventListener('click', () => {
    premiumAppsPage.style.display = 'none';
    youtubePremiumPage.style.display = 'block';
});

backToPremAppsButton.addEventListener('click', () => {
    youtubePremiumPage.style.display = 'none';
    premiumAppsPage.style.display = 'block';
});

const vpsButton = Array.from(document.querySelectorAll('.main-page .category-item span')).find(span => span.textContent === 'Vps');
if (vpsButton) {
    const vpsButtonItem = vpsButton.parentNode;
    vpsButtonItem.addEventListener('click', () => {
        alert('Layanan Sudah Dihapus Silahkan Pakai Layanan Yang Lain');
    });
} else {
    console.error('Tombol Vps tidak ditemukan.');
}

viewTTOnlyButton.addEventListener('click', () => {
    mainPage.style.display = 'none';
    viewTTOnlyPage.style.display = 'block';
});

backToMainFromViewTTOnlyButton.addEventListener('click', () => {
    viewTTOnlyPage.style.display = 'none';
    mainPage.style.display = 'block';
});

productItemsViewTT.forEach(item => {
    item.addEventListener('click', () => {
        selectedProduct = item.dataset.productName;
        pricePer100Views = parseInt(item.dataset.pricePer100);
        deskripsiInput.value = selectedProduct;
        viewTTOnlyPage.style.display = 'none';
        buyViewTTPage.style.display = 'block';
        jumlahInput.value = 0;
        totalBayarDiv.textContent = 'Total Bayar: Rp 0';
        linkVideoInput.value = '';
    });
});

backToViewTTOnlyButton.addEventListener('click', () => {
    buyViewTTPage.style.display = 'none';
    viewTTOnlyPage.style.display = 'block';
});

jumlahInput.addEventListener('input', () => {
    const jumlah = parseInt(jumlahInput.value);
    if (!isNaN(jumlah)) {
        const totalHarga = jumlah * 0.5;
        totalBayarDiv.textContent = `Total Bayar: ${totalHarga} p`;
    } else {
        totalBayarDiv.textContent = 'Total Bayar: Rp 0';
    }
});

beliSekarangViewTTButton.addEventListener('click', (event) => {
    event.preventDefault();

    const linkVideo = linkVideoInput.value.trim();
    const jumlah = jumlahInput.value.trim();
    const deskripsi = deskripsiInput.value.trim();
    const totalBayarText = totalBayarDiv.textContent;
    const totalHarga = totalBayarText.includes(':') ? totalBayarText.split(': ')[1] : totalBayarText;
    const premiumEmojis = '💎✨👑'; // Contoh emoji premium

    if (!linkVideo) {
        alert('Link Video TikTok harus diisi.');
        return;
    }

    if (!jumlah || parseInt(jumlah) <= 0) {
        alert('Jumlah harus diisi dan lebih dari 0.');
        return;
    }

    const orderText = `🔥 *PESANAN VIEW TIKTOK* 🔥 ⭐ ${premiumEmojis}\n\n🔗 *Link Video:* ${linkVideo}\n🔢 *Jumlah:* ${jumlah}\n📝 *Deskripsi:* ${deskripsi}\n💰 *Total Bayar:* ${totalHarga}\n\nTerima kasih telah order di Ravaelstore! 🙏`;

    const whatsappNumber = '6282118257071';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderText)}`;

    navigator.clipboard.writeText(orderText).then(() => {
        window.location.href = whatsappUrl;
    }).catch(err => {
        console.error('Gagal menyalin teks: ', err);
        alert('❌ Gagal mengarahkan ke WhatsApp. Silakan coba lagi.');
    });
});

if (panelBotButton) {
    panelBotButton.addEventListener('click', () => {
        mainPage.style.display = 'none';
        panelBotPage.style.display = 'block';
    });
} else {
    console.error('Tombol Panel Bot tidak ditemukan.');
}

backToMainFromPanelBotButton.addEventListener('click', () => {
    panelBotPage.style.display = 'none';
    mainPage.style.display = 'block';
    jumlahPanelInput.value = 0;
    namaPanelInput.value = '';
    cpuPanelInput.value = '';
    ramPanelInput.value = '';
    storagePanelInput.value = '';
});

beliSekarangPanelBotButton.addEventListener('click', (event) => {
    event.preventDefault();

    const jumlah = jumlahPanelInput.value.trim();
    const namaPanel = namaPanelInput.value.trim();
    const cpuPanel = cpuPanelInput.value.trim();
    const ramPanel = ramPanelInput.value.trim();
    const storagePanel = storagePanelInput.value.trim();
    const premiumEmojis = '💎✨👑'; // Emoji premium untuk Panel Bot

    if (!jumlah || parseInt(jumlah) <= 0) {
        alert('Jumlah harus diisi dan lebih dari 0.');
        return;
    }

    const whatsappMessage = `🔥 *PESANAN PANEL BOT* 🔥 ⭐ ${premiumEmojis}\n\n📦 *Jumlah:* ${jumlah}\n🏷️ *Nama Panel:* ${namaPanel}\n⚙️ *CPU Panel:* ${cpuPanel}\n💾 *RAM Panel:* ${ramPanel}\n💾 *Storage Panel:* ${storagePanel}\n\nTerima kasih telah order di Ravaelstore! 🙏`;
    const whatsappNumber = '6282118257071';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
});

// Perbarui teks dan hapus tombol di main page
const userInfoDiv = document.querySelector('.main-page .user-info .user-details');
if (userInfoDiv) {
    const h1Element = userInfoDiv.querySelector('h1');
    const pElement = userInfoDiv.querySelector('p');
    if (h1Element) {
        h1Element.textContent = 'Halo Sobat Ravaelstore';
    }
    if (pElement) {
        pElement.textContent = ''; // Mengosongkan nomor
    }
}

const headerActionsDiv = document.querySelector('.main-page .header-actions');
if (headerActionsDiv) {
    const links = headerActionsDiv.querySelectorAll('a');
    links.forEach(link => {
        if (link.textContent.trim() === 'Refresh Saldo' || link.textContent.trim() === 'Mutasi Saldo') {
            link.remove();
        }
    });
}

const quickActionsDiv = document.querySelector('.main-page .quick-actions');
if (quickActionsDiv) {
    const links = quickActionsDiv.querySelectorAll('a');
    links.forEach(link => {
        if (link.textContent.trim() === 'Mutasi Saldo') {
            link.remove();
        }
    });
}

bantuanButton.addEventListener('click', () => {
    mainPage.style.display = 'none';
    bantuanPage.style.display = 'block';
});

backToMainFromBantuanButton.addEventListener('click', () => {
    bantuanPage.style.display = 'none';
    mainPage.style.display = 'block';
});