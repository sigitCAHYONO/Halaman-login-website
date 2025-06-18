document.addEventListener('DOMContentLoaded', function() {
        
    const mainHubPage = document.getElementById('main-hub-page');
    // Kita ambil semua page yang akan disembunyikan/ditampilkan, kecuali main-hub-page itu sendiri.
    const allContentPages = document.querySelectorAll('body > div:not(#main-hub-page)'); 
    const backButtons = document.querySelectorAll('.back-button');
    const API_BASE_URL = 'https://flowfalcon.dpdns.org/download';

    function showPage(pageToShow, callback = null) {
        // Sembunyikan semua halaman konten, lalu tampilkan yang diminta
        allContentPages.forEach(page => {
            if (page) page.classList.add('hidden');
        });
        if (mainHubPage) mainHubPage.classList.add('hidden'); // Pastikan main-hub juga disembunyikan
        if (pageToShow) {
            pageToShow.classList.remove('hidden');
            if (callback && typeof callback === 'function') {
                callback(); // Jalankan callback setelah halaman ditampilkan
            }
        }
    }

    function showHub() {
        // Sembunyikan semua halaman konten, lalu tampilkan main-hub-page
        allContentPages.forEach(page => {
            if (page) page.classList.add('hidden');
        });
        if (mainHubPage) mainHubPage.classList.remove('hidden');
    }

    backButtons.forEach(button => { button.addEventListener('click', showHub); });

    // --- Navigasi ---
    document.getElementById('show-tts-page').addEventListener('click', (e) => { e.preventDefault(); showPage(document.getElementById('tts-page')); });
    document.getElementById('show-tiktok-v2-downloader').addEventListener('click', (e) => { e.preventDefault(); showPage(document.getElementById('tiktok-v2-downloader-page')); });
    document.getElementById('show-instagram-v2-downloader').addEventListener('click', (e) => { e.preventDefault(); showPage(document.getElementById('instagram-v2-downloader-page')); });
    document.getElementById('show-pinterest-v2-downloader').addEventListener('click', (e) => { e.preventDefault(); showPage(document.getElementById('pinterest-v2-downloader-page')); });
    document.getElementById('show-snackvideo-downloader').addEventListener('click', (e) => { e.preventDefault(); showPage(document.getElementById('snackvideo-downloader-page')); });
    document.getElementById('show-youtube-v2-downloader').addEventListener('click', (e) => { e.preventDefault(); showPage(document.getElementById('youtube-v2-downloader-page')); });
    document.getElementById('show-tiktok-downloader').addEventListener('click', (e) => { e.preventDefault(); showPage(document.getElementById('tiktok-downloader-page')); });
    document.getElementById('show-youtube-downloader').addEventListener('click', (e) => { e.preventDefault(); showPage(document.getElementById('youtube-downloader-page')); });
    document.getElementById('show-instagram-downloader').addEventListener('click', (e) => { e.preventDefault(); showPage(document.getElementById('instagram-downloader-page')); });
    document.getElementById('show-pinterest-downloader').addEventListener('click', (e) => { e.preventDefault(); showPage(document.getElementById('pinterest-downloader-page')); });
    // Navigasi Baru
    document.getElementById('show-ssweb-page').addEventListener('click', (e) => { e.preventDefault(); showPage(document.getElementById('ssweb-page')); });
    document.getElementById('show-hostinfo-page').addEventListener('click', (e) => { e.preventDefault(); showPage(document.getElementById('hostinfo-page')); });
    document.getElementById('show-toghibli-page').addEventListener('click', (e) => { e.preventDefault(); showPage(document.getElementById('toghibli-page')); });
    document.getElementById('show-remini-page').addEventListener('click', (e) => { e.preventDefault(); showPage(document.getElementById('remini-page')); });
    document.getElementById('show-upscale-page').addEventListener('click', (e) => { e.preventDefault(); showPage(document.getElementById('upscale-page')); });
    // Navigasi Fitur Random Baru
    document.getElementById('show-random-waifu-page').addEventListener('click', (e) => { e.preventDefault(); showPage(document.getElementById('random-waifu-page'), fetchRandomWaifu); });
    document.getElementById('show-random-nsfw-page').addEventListener('click', (e) => { e.preventDefault(); showPage(document.getElementById('random-nsfw-page'), fetchRandomNsfw); });
    document.getElementById('show-random-papayang-page').addEventListener('click', (e) => { e.preventDefault(); showPage(document.getElementById('random-papayang-page'), fetchRandomPapayang); });
    
    // --- Selektor Elemen ---
    const ttsTextInput = document.getElementById('tts-text-input');
    const fetchTtsButton = document.getElementById('fetch-tts-button');
    const ttsResultArea = document.getElementById('tts-result-area');
    const tiktokV2UrlInput = document.getElementById('tiktok-v2-url-input');
    const fetchTiktokV2Button = document.getElementById('fetch-tiktok-v2-button');
    const tiktokV2ResultArea = document.getElementById('tiktok-v2-result-area');
    const instagramV2UrlInput = document.getElementById('instagram-v2-url-input');
    const fetchInstagramV2Button = document.getElementById('fetch-instagram-v2-button');
    const instagramV2ResultArea = document.getElementById('instagram-v2-result-area');
    const pinterestV2UrlInput = document.getElementById('pinterest-v2-url-input');
    const fetchPinterestV2Button = document.getElementById('fetch-pinterest-v2-button');
    const pinterestV2ResultArea = document.getElementById('pinterest-v2-result-area');
    const snackvideoUrlInput = document.getElementById('snackvideo-url-input');
    const fetchSnackvideoButton = document.getElementById('fetch-snackvideo-button');
    const snackvideoResultArea = document.getElementById('snackvideo-result-area');
    const youtubeV2UrlInput = document.getElementById('youtube-v2-url-input');
    const youtubeV2CustomFilenameInput = document.getElementById('youtube-v2-custom-filename');
    const fetchYoutubeV2OptionsButton = document.getElementById('fetch-youtube-v2-options-button');
    const youtubeV2OptionsArea = document.getElementById('youtube-v2-options-area');
    const youtubeV2ResultArea = document.getElementById('youtube-v2-result-area');
    const tiktokUrlInput = document.getElementById('tiktok-url-input');
    const tiktokCustomFilenameInput = document.getElementById('tiktok-custom-filename');
    const fetchTiktokVideoButton = document.getElementById('fetch-tiktok-video-button');
    const tiktokResultArea = document.getElementById('tiktok-result-area');
    const youtubeUrlInput = document.getElementById('youtube-url-input');
    const youtubeCustomFilenameInput = document.getElementById('youtube-custom-filename');
    const fetchYoutubeMp4Button = document.getElementById('fetch-youtube-mp4-button');
    const fetchYoutubeMp3Button = document.getElementById('fetch-youtube-mp3-button');
    const youtubeResultArea = document.getElementById('youtube-result-area');
    const instagramUrlInput = document.getElementById('instagram-url-input');
    const instagramCustomFilenameInput = document.getElementById('instagram-custom-filename');
    const fetchInstagramMediaButton = document.getElementById('fetch-instagram-media-button');
    const instagramResultArea = document.getElementById('instagram-result-area');
    const pinterestUrlInput = document.getElementById('pinterest-url-input');
    const pinterestCustomFilenameInput = document.getElementById('pinterest-custom-filename');
    const fetchPinterestMediaButton = document.getElementById('fetch-pinterest-media-button');
    const pinterestResultArea = document.getElementById('pinterest-result-area');
    // Selektor Elemen Baru
    const sswebUrlInput = document.getElementById('ssweb-url-input');
    const fetchSswebButton = document.getElementById('fetch-ssweb-button');
    const sswebResultArea = document.getElementById('ssweb-result-area');

    const hostinfoUrlInput = document.getElementById('hostinfo-url-input');
    const fetchHostinfoButton = document.getElementById('fetch-hostinfo-button');
    const hostinfoResultArea = document.getElementById('hostinfo-result-area');

    const toghibliUrlInput = document.getElementById('toghibli-url-input');
    const toghibliPromptInput = document.getElementById('toghibli-prompt-input');
    const fetchToghibliButton = document.getElementById('fetch-toghibli-button');
    const toghibliResultArea = document.getElementById('toghibli-result-area');

    const reminiUrlInput = document.getElementById('remini-url-input');
    const fetchReminiButton = document.getElementById('fetch-remini-button');
    const reminiResultArea = document.getElementById('remini-result-area');

    const upscaleUrlInput = document.getElementById('upscale-url-input');
    const fetchUpscaleButton = document.getElementById('fetch-upscale-button');
    const upscaleResultArea = document.getElementById('upscale-result-area');

    // Selektor Elemen Random Baru
    const randomWaifuResultArea = document.getElementById('random-waifu-result-area');
    const fetchRandomWaifuButton = document.getElementById('fetch-random-waifu-button');
    const randomNsfwResultArea = document.getElementById('random-nsfw-result-area');
    const fetchRandomNsfwButton = document.getElementById('fetch-random-nsfw-button');
    const randomPapayangResultArea = document.getElementById('random-papayang-result-area');
    const fetchRandomPapayangButton = document.getElementById('fetch-random-papayang-button');


    // --- Fungsi Utama ---
    async function forceDownload(url, filename, buttonElement) {
        const originalText = buttonElement.innerHTML;
        buttonElement.disabled = true;
        buttonElement.innerHTML = `<span>Menyiapkan...</span>`;
        try {
            const proxiedUrl = 'https://api.codetabs.com/v1/proxy?quest=' + url;
            const response = await fetch(proxiedUrl);
            if (!response.ok) throw new Error(`Gagal memulai unduhan: Status ${response.status}`);
            const totalSize = Number(response.headers.get('Content-Length'));
            const reader = response.body.getReader();
            const chunks = [];
            let receivedSize = 0;
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                chunks.push(value);
                receivedSize += value.length;
                if (totalSize) {
                    const percentage = Math.round((receivedSize / totalSize) * 100);
                    const receivedMB = (receivedSize / (1024 * 1024)).toFixed(1);
                    const totalMB = (totalSize / (1024 * 1024)).toFixed(1);
                    buttonElement.textContent = `Mengunduh ${percentage}% (${receivedMB}MB / ${totalMB}MB)`;
                } else {
                    const receivedMB = (receivedSize / (1024 * 1024)).toFixed(1);
                    buttonElement.textContent = `Mengunduh ${receivedMB} MB`;
                }
            }
            buttonElement.textContent = `Menyusun file...`;
            const blob = new Blob(chunks);
            const objectUrl = URL.createObjectURL(blob);
            const tempLink = document.createElement('a');
            tempLink.href = objectUrl;
            tempLink.download = filename;
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
            URL.revokeObjectURL(objectUrl);
        } catch (error) {
            console.error("Force Download Error:", error);
            alert(`Gagal mengunduh file. Coba lagi nanti.\nError: ${error.message}`);
        } finally {
            buttonElement.disabled = false;
            buttonElement.innerHTML = originalText;
        }
    }

    function displayLoading(area, button) {
        if(button) {
            button.disabled = true;
            button.innerHTML = `<div class="flex justify-center items-center"><div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div></div>`;
        }
        area.innerHTML = `<div class="flex justify-center items-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div></div>`;
    }

    function displayError(area, error) {
         area.innerHTML = `<p class="text-red-500 text-center">Error: ${error.message}</p>`;
    }
    
    // --- Fitur Baru (V2 & Snack Video) ---
    
    async function fetchTikTokInfoV2() {
        const url = tiktokV2UrlInput.value.trim();
        if (!url) return;
        displayLoading(tiktokV2ResultArea, fetchTiktokV2Button);
        try {
            const response = await fetch(`${API_BASE_URL}/tiktok?url=${encodeURIComponent(url)}`);
            const json = await response.json();
            if (!json.status || json.result.code !== 0) throw new Error(json.result.msg || 'Gagal mengambil data TikTok.');
            
            const data = json.result.data;
            const baseFilename = (data.title || `tiktok_v2_${data.id}`).replace(/[<>:"/\\|?*]/g, '_').substring(0, 50);
            
            let buttonsHTML = '';
            if(data.play) buttonsHTML += `<button data-url="${data.play}" data-filename="${baseFilename}_NoWM.mp4" class="new-dl-button flex-1 text-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700"><i class="fas fa-video mr-2"></i>Video (No WM)</button>`;
            if(data.hdplay) buttonsHTML += `<button data-url="${data.hdplay}" data-filename="${baseFilename}_HD.mp4" class="new-dl-button flex-1 text-center bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700"><i class="fas fa-high-definition mr-2"></i>Video (HD)</button>`;
            if(data.wmplay) buttonsHTML += `<button data-url="${data.wmplay}" data-filename="${baseFilename}_WM.mp4" class="new-dl-button flex-1 text-center bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700"><i class="fas fa-tint mr-2"></i>Video (WM)</button>`;
            if(data.music) buttonsHTML += `<button data-url="${data.music}" data-filename="${baseFilename}_Music.mp3" class="new-dl-button flex-1 text-center bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700"><i class="fas fa-music mr-2"></i>Audio (MP3)</button>`;

            tiktokV2ResultArea.innerHTML = `
                <div class="bg-[#1f2c34] rounded-lg p-4">
                    <p class="text-white font-semibold mb-1 truncate" title="${data.title}">${data.title || 'Video TikTok'}</p>
                    <p class="text-sm text-gray-400 mb-4">by: ${data.author.nickname}</p>
                    <video class="w-full rounded-lg mb-4" controls poster="${data.cover}" src="${data.play}"></video>
                    <div class="grid grid-cols-2 gap-2">${buttonsHTML}</div>
                </div>`;

        } catch (error) {
            displayError(tiktokV2ResultArea, error);
        } finally {
            fetchTiktokV2Button.disabled = false;
            fetchTiktokV2Button.textContent = 'Download';
        }
    }
    fetchTiktokV2Button.addEventListener('click', fetchTikTokInfoV2);
    tiktokV2ResultArea.addEventListener('click', (e) => {
        const button = e.target.closest('.new-dl-button');
        if (button) forceDownload(button.dataset.url, button.dataset.filename, button);
    });

    async function fetchInstagramMediaV2() {
        const url = instagramV2UrlInput.value.trim();
        if (!url) return;
        displayLoading(instagramV2ResultArea, fetchInstagramV2Button);
        try {
            const response = await fetch(`${API_BASE_URL}/instagram?url=${encodeURIComponent(url)}`);
            const json = await response.json();
            if (!json.status || !json.result.downloadUrls) throw new Error(json.message || 'Gagal mengambil data Instagram.');

            const data = json.result;
            let resultHTML = `<h3 class="text-white font-semibold mb-2 truncate">${data.title || 'Postingan Instagram'}</h3>`;
            
            data.downloadUrls.forEach((dlUrl, index) => {
                const filename = `${(data.title || `instagram_v2_${Date.now()}`).replace(/[<>:"/\\|?*]/g, '_').substring(0, 40)}_${index + 1}.mp4`;
                resultHTML += `
                    <div class="bg-[#1f2c34] rounded-lg p-4 mb-3">
                        <p class="text-gray-400 mb-2">Media ${index + 1}</p>
                        <video class="w-full rounded-lg mb-4" controls src="${dlUrl}"></video>
                        <button data-url="${dlUrl}" data-filename="${filename}" class="new-dl-button w-full text-center bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-pink-700"><i class="fas fa-download mr-2"></i>Download Media ${index + 1}</button>
                    </div>`;
            });
            instagramV2ResultArea.innerHTML = resultHTML;

        } catch (error) {
            displayError(instagramV2ResultArea, error);
        } finally {
            fetchInstagramV2Button.disabled = false;
            fetchInstagramV2Button.textContent = 'Download';
        }
    }
    fetchInstagramV2Button.addEventListener('click', fetchInstagramMediaV2);
    instagramV2ResultArea.addEventListener('click', (e) => {
        const button = e.target.closest('.new-dl-button');
        if (button) forceDownload(button.dataset.url, button.dataset.filename, button);
    });
    
    async function fetchPinterestMediaV2() {
        const url = pinterestV2UrlInput.value.trim();
        if (!url) return;
        displayLoading(pinterestV2ResultArea, fetchPinterestV2Button);
        try {
            const response = await fetch(`${API_BASE_URL}/pinterest?url=${encodeURIComponent(url)}`);
            const json = await response.json();
            if (!json.status || !json.results) throw new Error(json.message || 'Gagal mengambil data Pinterest.');

            let resultHTML = '';
            json.results.forEach((item, index) => {
                const filename = `pinterest_v2_${Date.now()}_${index + 1}.${item.tag === 'video' ? 'mp4' : 'jpg'}`;
                const mediaHTML = item.tag === 'video'
                    ? `<video class="w-full h-48 object-cover rounded-lg mb-2" controls src="${item.direct}"></video>`
                    : `<img src="${item.direct}" alt="Pinterest media" class="w-full h-48 object-cover rounded-lg mb-2">`;
                
                resultHTML += `
                    <div class="bg-[#1f2c34] rounded-lg p-2 flex flex-col">
                        ${mediaHTML}
                        <p class="text-white text-xs mb-2 flex-1 capitalize">${item.tag} ${index + 1}</p>
                        <button data-url="${item.direct}" data-filename="${filename}" class="new-dl-button w-full mt-auto text-center bg-red-600 text-white font-semibold py-1 px-2 rounded-lg hover:bg-red-700 text-sm"><i class="fas fa-download mr-1"></i>Download</button>
                    </div>`;
            });
            pinterestV2ResultArea.innerHTML = `<div class="grid grid-cols-2 md:grid-cols-3 gap-4">${resultHTML}</div>`;

        } catch (error) {
            displayError(pinterestV2ResultArea, error);
        } finally {
            fetchPinterestV2Button.disabled = false;
            fetchPinterestV2Button.textContent = 'Download';
        }
    }
    fetchPinterestV2Button.addEventListener('click', fetchPinterestMediaV2);
    pinterestV2ResultArea.addEventListener('click', (e) => {
        const button = e.target.closest('.new-dl-button');
        if (button) forceDownload(button.dataset.url, button.dataset.filename, button);
    });
    
    async function fetchSnackVideo() {
        const url = snackvideoUrlInput.value.trim();
        if (!url) return;
        displayLoading(snackvideoResultArea, fetchSnackvideoButton);
        try {
            const response = await fetch(`${API_BASE_URL}/snackvideo?url=${encodeURIComponent(url)}`);
            const json = await response.json();
            if (!json.status || !json.result.downloadUrl) throw new Error(json.message || 'Gagal mengambil data Snack Video.');
            
            const data = json.result;
            const filename = `snackvideo_${Date.now()}.mp4`;
            
            snackvideoResultArea.innerHTML = `
                <div class="bg-[#1f2c34] rounded-lg p-4">
                    <video class="w-full rounded-lg mb-4" controls poster="${data.thumbnail}" src="${data.downloadUrl}"></video>
                    <button data-url="${data.downloadUrl}" data-filename="${filename}" class="new-dl-button w-full text-center font-bold py-2 px-4 rounded-lg" style="background-color: #FFC400; color: black;"><i class="fas fa-download mr-2"></i>Download Video</button>
                </div>`;

        } catch (error) {
            displayError(snackvideoResultArea, error);
        } finally {
            fetchSnackvideoButton.disabled = false;
            fetchSnackvideoButton.textContent = 'Download';
        }
    }
    fetchSnackvideoButton.addEventListener('click', fetchSnackVideo);
    snackvideoResultArea.addEventListener('click', (e) => {
        const button = e.target.closest('.new-dl-button');
        if (button) forceDownload(button.dataset.url, button.dataset.filename, button);
    });
    

    // --- Fitur TTS ---
    async function fetchTTS() {
        const text = ttsTextInput.value.trim();
        if (!text) { ttsResultArea.innerHTML = `<p class="text-red-500 text-center">Teks tidak boleh kosong.</p>`; return; }
        displayLoading(ttsResultArea, fetchTtsButton);
        try {
            const apiUrl = `https://flowfalcon.dpdns.org/tools/text-to-speech?text=${encodeURIComponent(text)}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.status !== true || !Array.isArray(data.result) || data.result.length === 0) { throw new Error('Gagal mendapatkan data suara dari API.'); }
            let resultHTML = '';
            data.result.forEach(voice => {
                const voiceName = voice.voice_name;
                let audioUrl = null;
                for (const key in voice) {
                    if (typeof voice[key] === 'string' && voice[key].endsWith('.wav')) {
                        audioUrl = voice[key];
                        break;
                    }
                }
                if (voiceName && audioUrl) {
                    const filename = `${voiceName.replace(/ /g, '_')}_TTS.wav`;
                    resultHTML += `<div class="bg-[#1f2c34] rounded-lg p-3"><p class="text-white font-semibold mb-2">${voiceName}</p><audio controls class="w-full mb-3" src="${audioUrl}">Browser Anda tidak support.</audio><a href="${audioUrl}" download="${filename}" class="w-full block text-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 text-sm"><i class="fas fa-download mr-2"></i>Download</a></div>`;
                }
            });
            ttsResultArea.innerHTML = resultHTML;
        } catch (error) { displayError(ttsResultArea, error);
        } finally {
            fetchTtsButton.disabled = false;
            fetchTtsButton.textContent = 'Ubah ke Suara';
        }
    }
    fetchTtsButton.addEventListener('click', fetchTTS);

    // --- Fitur BY VINTEX (Tidak Diubah) ---
    async function fetchTikTokInfo() {
        const videoUrl = tiktokUrlInput.value.trim();
        if (!videoUrl) { tiktokResultArea.innerHTML = `<p class="text-red-500 text-center">URL tidak boleh kosong.</p>`; return; }
        displayLoading(tiktokResultArea, fetchTiktokVideoButton);
        try {
            const apiUrl = `https://api.ownblox.my.id/api/ttdl?url=${encodeURIComponent(videoUrl)}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.status === true && data.result) {
                const result = data.result;
                const customNamePart = tiktokCustomFilenameInput.value.trim();
                let finalBaseFilename = customNamePart ? `ByVintex - ${customNamePart}` : (result.title.replace(/[<>:"/\\|?*]/g, '_').substring(0, 50) || 'tiktok_video_download');
                tiktokResultArea.innerHTML = `<div class="bg-[#1f2c34] rounded-lg p-4"><p class="text-white font-semibold mb-2 truncate" title="${result.title}">${result.title}</p><p class="text-sm text-gray-400 mb-4">by: ${result.author}</p><video class="w-full rounded-lg mb-4" controls src="${result.video}"></video><div class="flex space-x-2"><button data-url="${result.video}" data-filename="${finalBaseFilename}.mp4" class="download-button flex-1 text-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700"><i class="fas fa-video mr-2"></i>Download Video</button><button data-url="${result.audio}" data-filename="${finalBaseFilename}.mp3" class="download-button flex-1 text-center bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700"><i class="fas fa-music mr-2"></i>Download Audio</button></div></div>`;
            } else { throw new Error(data.message || 'Gagal mengambil data video.'); }
        } catch (error) { displayError(tiktokResultArea, error);
        } finally {
            fetchTiktokVideoButton.disabled = false;
            fetchTiktokVideoButton.textContent = 'Download';
        }
    }
    fetchTiktokVideoButton.addEventListener('click', fetchTikTokInfo);
    tiktokResultArea.addEventListener('click', function(event) {
        const button = event.target.closest('.download-button');
        if (button) { forceDownload(button.dataset.url, button.dataset.filename, button); }
    });

    async function fetchYouTubeMedia(type, buttonElement) {
        const videoUrl = youtubeUrlInput.value.trim();
        if (!videoUrl) { youtubeResultArea.innerHTML = `<p class="text-red-500 text-center">URL tidak boleh kosong.</p>`; return; }
        displayLoading(youtubeResultArea, buttonElement)
        document.querySelectorAll('.get-media-button').forEach(btn => btn.disabled = true);
        try {
            const apiUrl = `https://api.ownblox.my.id/api/ytdl?url=${encodeURIComponent(videoUrl)}&type=${type}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.status === true && data.result) {
                const result = data.result;
                const downloadUrl = (type === 'mp4') ? result.video_download : result.audio_download;
                if (!downloadUrl) throw new Error(`Link download untuk tipe '${type}' tidak ditemukan.`);
                const customNamePart = youtubeCustomFilenameInput.value.trim();
                let finalBaseFilename = customNamePart ? `ByVintex - ${customNamePart}` : (result.title.replace(/[<>:"/\\|?*]/g, '_').substring(0, 50) || `youtube_media_${type}`);
                youtubeResultArea.innerHTML = `<div class="bg-[#1f2c34] rounded-lg p-4"><p class="text-white font-semibold mb-2 truncate" title="${result.title}">${result.title}</p><img src="${result.thumbnail}" alt="Thumbnail" class="w-full rounded-lg mb-4"><p class="text-sm text-gray-400 mb-1">Kualitas: ${result.quality || 'Audio'}</p><button data-url="${downloadUrl}" data-filename="${finalBaseFilename}.${type}" class="download-button-yt w-full mt-2 text-center bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700"><i class="fas fa-download mr-2"></i>Download File (.${type})</button></div>`;
            } else { throw new Error(data.message || `Gagal mengambil data YouTube untuk tipe ${type}.`); }
        } catch (error) { displayError(youtubeResultArea, error);
        } finally {
                document.querySelectorAll('.get-media-button').forEach(btn => {
                    btn.disabled = false;
                    if(btn.dataset.type === 'mp4') btn.innerHTML = 'Get Video (MP4)';
                    else btn.innerHTML = 'Get Audio (MP3)';
                });
        }
    }
    fetchYoutubeMp4Button.addEventListener('click', function() { fetchYouTubeMedia('mp4', this); });
    fetchYoutubeMp3Button.addEventListener('click', function() { fetchYouTubeMedia('mp3', this); });
    youtubeResultArea.addEventListener('click', function(event) {
        const button = event.target.closest('.download-button-yt');
        if (button) { forceDownload(button.dataset.url, button.dataset.filename, button); }
    });

    async function fetchInstagramMedia() {
        const postUrl = instagramUrlInput.value.trim();
        if (!postUrl) { instagramResultArea.innerHTML = `<p class="text-red-500 text-center">URL tidak boleh kosong.</p>`; return; }
        displayLoading(instagramResultArea, fetchInstagramMediaButton);
        try {
            const apiUrl = `https://api.ownblox.my.id/api/igdl?url=${encodeURIComponent(postUrl)}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.status === true && data.result) {
                const downloadItems = Array.isArray(data.result) ? data.result : [data.result];
                let resultHTML = '';
                for (const [index, item] of downloadItems.entries()) {
                    const downloadUrl = item.download_url || item.url;
                    if (!downloadUrl) continue;
                    const fileType = item.type === 'mp4' ? 'mp4' : 'jpg';
                    const customNamePart = instagramCustomFilenameInput.value.trim();
                    let finalBaseFilename = customNamePart ? `ByVintex - ${customNamePart}` : ((item.caption || `instagram_${Date.now()}`).replace(/[<>:"/\\|?*]/g, '_').substring(0, 50));
                    if (downloadItems.length > 1) { finalBaseFilename += `_${index + 1}`; }
                    const finalFilename = `${finalBaseFilename}.${fileType}`;
                    resultHTML += `<div class="bg-[#1f2c34] rounded-lg p-4 mb-4"><p class="text-sm text-gray-400 mb-2">by: ${item.username || 'Unknown'}</p>${fileType === 'mp4' ? `<video class="w-full rounded-lg mb-4" controls src="${downloadUrl}"></video>` : `<img src="${item.thumbnail || downloadUrl}" alt="Instagram media" class="w-full rounded-lg mb-4">`}<p class="text-white text-sm mb-4">${item.caption || ''}</p><button data-url="${downloadUrl}" data-filename="${finalFilename}" class="download-button-ig w-full mt-2 text-center bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-pink-700"><i class="fas fa-download mr-2"></i>Download (.${fileType})</button></div>`;
                }
                instagramResultArea.innerHTML = resultHTML;
            } else { throw new Error(data.message || 'Gagal mengambil data dari Instagram.'); }
        } catch (error) { displayError(instagramResultArea, error);
        } finally {
            fetchInstagramMediaButton.disabled = false;
            fetchInstagramMediaButton.textContent = 'Download';
        }
    }
    fetchInstagramMediaButton.addEventListener('click', fetchInstagramMedia);
    instagramResultArea.addEventListener('click', function(event) {
        const button = event.target.closest('.download-button-ig');
        if (button) { forceDownload(button.dataset.url, button.dataset.filename, button); }
    });

    async function fetchPinterestMedia() {
        const query = pinterestUrlInput.value.trim();
        if (!query) { pinterestResultArea.innerHTML = `<p class="text-red-500 text-center">URL atau kata kunci tidak boleh kosong.</p>`; return; }
        displayLoading(pinterestResultArea, fetchPinterestMediaButton);
        try {
            const apiUrl = `https://api.ownblox.my.id/api/pinterest?q=${encodeURIComponent(query)}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.status !== 200 || !Array.isArray(data.results) || data.results.length === 0) { throw new Error('Tidak ada hasil yang ditemukan atau terjadi kesalahan pada API.'); }
            let resultHTML = '<div class="grid grid-cols-2 md:grid-cols-3 gap-4">';
            data.results.forEach((item, index) => {
                const downloadUrl = item.image;
                if (!downloadUrl) return;
                const description = item.caption || `Pinterest Image ${index + 1}`;
                const customNamePart = pinterestCustomFilenameInput.value.trim();
                let finalBaseFilename = customNamePart ? `${customNamePart}_${index + 1}` : (description.replace(/[<>:"/\\|?*]/g, '_').substring(0, 40) || `pinterest_media_${Date.now()}_${index + 1}`);
                const finalFilename = `ByVintex - ${finalBaseFilename}.jpg`;
                resultHTML += `<div class="bg-[#1f2c34] rounded-lg p-2 flex flex-col"><img src="${downloadUrl}" alt="${description}" class="w-full h-48 object-cover rounded-lg mb-2"><p class="text-white text-xs mb-2 flex-1 truncate" title="${description}">${description}</p><button data-url="${downloadUrl}" data-filename="${finalFilename}" class="download-button-pin w-full mt-auto text-center bg-red-600 text-white font-semibold py-1 px-2 rounded-lg hover:bg-red-700 text-sm"><i class="fas fa-download mr-1"></i>Download</button></div>`;
            });
            resultHTML += '</div>';
            pinterestResultArea.innerHTML = resultHTML;
        } catch (error) { displayError(pinterestResultArea, error);
        } finally {
            fetchPinterestMediaButton.disabled = false;
            fetchPinterestMediaButton.textContent = 'Download';
        }
    }
    fetchPinterestMediaButton.addEventListener('click', fetchPinterestMedia);
    pinterestResultArea.addEventListener('click', function(event) {
        const button = event.target.closest('.download-button-pin');
        if (button) { forceDownload(button.dataset.url, button.dataset.filename, button); }
    });
    
    function displayYouTubeV2Options() {
        const videoUrl = youtubeV2UrlInput.value.trim();
        if (!videoUrl) {
            youtubeV2OptionsArea.innerHTML = `<p class="text-red-500 text-center">URL tidak boleh kosong.</p>`;
            youtubeV2ResultArea.innerHTML = '';
            return;
        }
        
        youtubeV2ResultArea.innerHTML = '';
        
        const formats = [
            { label: 'Audio (MP3)', value: 'mp3', icon: 'fa-music', color: 'bg-green-600 hover:bg-green-700' },
            { label: '144p', value: '144', icon: 'fa-video', color: 'bg-gray-600 hover:bg-gray-700' },
            { label: '360p', value: '360', icon: 'fa-video', color: 'bg-blue-600 hover:bg-blue-700' },
            { label: '480p', value: '480', icon: 'fa-video', color: 'bg-blue-600 hover:bg-blue-700' },
            { label: '720p HD', value: '720', icon: 'fa-video', color: 'bg-red-600 hover:bg-red-700' },
            { label: '1080p FHD', value: '1080', icon: 'fa-video', color: 'bg-red-600 hover:bg-red-700' },
            { label: '1440p 2K', value: '1440', icon: 'fa-video', color: 'bg-purple-600 hover:bg-purple-700' },
            { label: '2160p 4K', value: '4k', icon: 'fa-video', color: 'bg-purple-600 hover:bg-purple-700' },
        ];
        
        let optionsHTML = '<p class="text-white text-center mb-3">Silakan pilih format yang diinginkan:</p><div class="grid grid-cols-2 md:grid-cols-4 gap-3">';
        
        formats.forEach(format => {
            optionsHTML += `<button data-format="${format.value}" class="format-button-yt-v2 w-full text-white font-bold py-2 px-4 rounded-lg focus:outline-none ${format.color}"><i class="fas ${format.icon} mr-2"></i>${format.label}</button>`;
        });
        
        optionsHTML += '</div>';
        youtubeV2OptionsArea.innerHTML = optionsHTML;
    }

    async function fetchYouTubeMediaV2(format, buttonElement) {
        const videoUrl = youtubeV2UrlInput.value.trim();
        if (!videoUrl) {
            youtubeV2ResultArea.innerHTML = `<p class="text-red-500 text-center">URL tidak boleh kosong.</p>`;
            return;
        }
        
        document.querySelectorAll('.format-button-yt-v2').forEach(btn => btn.disabled = true);
        const originalButtonText = buttonElement.innerHTML;
        displayLoading(youtubeV2ResultArea, buttonElement)
        
        try {
            const apiUrl = `https://flowfalcon.dpdns.org/download/savetube?link=${encodeURIComponent(videoUrl)}&format=${format}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            if (data.status === true && data.result && data.result.download) {
                const result = data.result;
                const customNamePart = youtubeV2CustomFilenameInput.value.trim();
                const fileExtension = format === 'mp3' ? 'mp3' : 'mp4';
                
                let finalBaseFilename = customNamePart 
                    ? `ByVintex - ${customNamePart}` 
                    : (result.title.replace(/[<>:"/\\|?*]/g, '_').substring(0, 50) || `youtube_media_${format}`);

                youtubeV2ResultArea.innerHTML = `
                    <div class="bg-[#1f2c34] rounded-lg p-4">
                        <p class="text-white font-semibold mb-2 truncate" title="${result.title}">${result.title}</p>
                        <img src="${result.thumbnail}" alt="Thumbnail" class="w-full rounded-lg mb-4">
                        <p class="text-sm text-gray-400 mb-1">Kualitas Terpilih: ${result.quality || format}</p>
                        <button data-url="${result.download}" data-filename="${finalBaseFilename}.${fileExtension}" class="download-button-yt-v2 w-full mt-2 text-center bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700">
                            <i class="fas fa-download mr-2"></i>Download File (.${fileExtension})
                        </button>
                    </div>`;
            } else {
                throw new Error(data.message || `Gagal mengambil data untuk format ${format}. Mungkin format ini tidak tersedia untuk video tersebut.`);
            }
        } catch (error) {
            displayError(youtubeV2ResultArea, error);
        } finally {
            document.querySelectorAll('.format-button-yt-v2').forEach(btn => {
                btn.disabled = false;
                if(btn === buttonElement) {
                    btn.innerHTML = originalButtonText;
                }
            });
        }
    }

    fetchYoutubeV2OptionsButton.addEventListener('click', displayYouTubeV2Options);

    youtubeV2OptionsArea.addEventListener('click', function(event) {
        const button = event.target.closest('.format-button-yt-v2');
        if (button) {
            const format = button.dataset.format;
            fetchYouTubeMediaV2(format, button);
        }
    });

    youtubeV2ResultArea.addEventListener('click', function(event) {
        const button = event.target.closest('.download-button-yt-v2');
        if (button) {
            forceDownload(button.dataset.url, button.dataset.filename, button);
        }
    });

    // --- Fitur SSWeb ---
    async function fetchSsweb() {
        const url = sswebUrlInput.value.trim();
        if (!url) { sswebResultArea.innerHTML = `<p class="text-red-500 text-center">URL website tidak boleh kosong.</p>`; return; }
        displayLoading(sswebResultArea, fetchSswebButton);
        try {
            const apiUrl = `${API_BASE_URL.replace('/download', '/tools')}/ssweb?url=${encodeURIComponent(url)}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.status === true && data.result) {
                const pcImgUrl = data.result.pc;
                const mobileImgUrl = data.result.mobile;
                const baseFilename = (new URL(url).hostname).replace(/[<>:"/\\|?*]/g, '_').substring(0, 40);

                sswebResultArea.innerHTML = `
                    <div class="bg-[#1f2c34] rounded-lg p-4 mb-4">
                        <h3 class="text-white font-semibold mb-2">Screenshot PC</h3>
                        <img src="${pcImgUrl}" alt="PC Screenshot" class="w-full rounded-lg mb-4 border border-gray-700">
                        <button data-url="${pcImgUrl}" data-filename="${baseFilename}_PC.jpg" class="dl-image-button w-full text-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700"><i class="fas fa-download mr-2"></i>Download PC Screenshot</button>
                    </div>
                    <div class="bg-[#1f2c34] rounded-lg p-4">
                        <h3 class="text-white font-semibold mb-2">Screenshot Mobile</h3>
                        <img src="${mobileImgUrl}" alt="Mobile Screenshot" class="w-full rounded-lg mb-4 border border-gray-700">
                        <button data-url="${mobileImgUrl}" data-filename="${baseFilename}_Mobile.jpg" class="dl-image-button w-full text-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700"><i class="fas fa-download mr-2"></i>Download Mobile Screenshot</button>
                    </div>
                `;
            } else {
                throw new Error(data.message || 'Gagal mengambil screenshot website.');
            }
        } catch (error) {
            displayError(sswebResultArea, error);
        } finally {
            fetchSswebButton.disabled = false;
            fetchSswebButton.textContent = 'Ambil Screenshot';
        }
    }
    fetchSswebButton.addEventListener('click', fetchSsweb);
    sswebResultArea.addEventListener('click', (e) => {
        const button = e.target.closest('.dl-image-button');
        if (button) forceDownload(button.dataset.url, button.dataset.filename, button);
    });

    // --- Fitur Host Info ---
    async function fetchHostInfo() {
        const host = hostinfoUrlInput.value.trim();
        if (!host) { hostinfoResultArea.innerHTML = `<p class="text-red-500 text-center">URL atau domain tidak boleh kosong.</p>`; hostinfoResultArea.classList.remove('hidden'); return; }
        displayLoading(hostinfoResultArea, fetchHostinfoButton);
        hostinfoResultArea.classList.remove('hidden');
        try {
            const apiUrl = `${API_BASE_URL.replace('/download', '/tools')}/hostinfo?host=${encodeURIComponent(host)}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.status === true && data.result) {
                const result = data.result;
                let resultHTML = `
                    <p class="text-white mb-2"><strong class="text-gray-400">IP:</strong> ${result.ip || '-'}</p>
                    <p class="text-white mb-2"><strong class="text-gray-400">Nama Host:</strong> ${result.name || '-'}</p>
                    <p class="text-white mb-2"><strong class="text-gray-400">ISP:</strong> ${result.isp || '-'}</p>
                    <p class="text-white mb-2"><strong class="text-gray-400">Organisasi:</strong> ${result.organisation || '-'}</p>
                    <p class="text-white mb-2"><strong class="text-gray-400">Wilayah:</strong> ${result.region || '-'}</p>
                    <p class="text-white mb-2"><strong class="text-gray-400">Kota:</strong> ${result.city || '-'}</p>
                    <p class="text-white mb-2"><strong class="text-gray-400">Zona Waktu:</strong> ${result.timezone || '-'}</p>
                    <p class="text-white mb-2"><strong class="text-gray-400">Kode Pos:</strong> ${result.postalcode || '-'}</p>
                `;
                if (result.range && result.range.trim().length > 0) {
                    resultHTML += `<p class="text-white mb-2"><strong class="text-gray-400">Rentang IP:</strong> <pre class="whitespace-pre-wrap">${result.range.trim()}</pre></p>`;
                }
                hostinfoResultArea.innerHTML = resultHTML;
            } else {
                throw new Error(data.message || 'Gagal mendapatkan info host. Pastikan URL/domain benar.');
            }
        } catch (error) {
            displayError(hostinfoResultArea, error);
        } finally {
            fetchHostinfoButton.disabled = false;
            fetchHostinfoButton.textContent = 'Dapatkan Info Host';
        }
    }
    fetchHostinfoButton.addEventListener('click', fetchHostInfo);

    // --- Fitur To Ghibli ---
    async function fetchToGhibli() {
        const imageUrl = toghibliUrlInput.value.trim();
        const prompt = toghibliPromptInput.value.trim();
        if (!imageUrl) { toghibliResultArea.innerHTML = `<p class="text-red-500 text-center">URL gambar tidak boleh kosong.</p>`; return; }
        displayLoading(toghibliResultArea, fetchToghibliButton);
        try {
            let apiUrl = `${API_BASE_URL.replace('/download', '/tools')}/toghibli?url=${encodeURIComponent(imageUrl)}`;
            if (prompt) {
                apiUrl += `&prompt=${encodeURIComponent(prompt)}`;
            }
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.status === true && data.result && data.result.data && data.result.data.length > 0) {
                const ghibliImgUrl = data.result.data[0].url;
                const filename = `ghibli_style_${Date.now()}.png`;
                toghibliResultArea.innerHTML = `
                    <div class="bg-[#1f2c34] rounded-lg p-4">
                        <img src="${ghibliImgUrl}" alt="Ghibli Style Image" class="w-full rounded-lg mb-4 border border-gray-700">
                        <button data-url="${ghibliImgUrl}" data-filename="${filename}" class="dl-image-button w-full text-center bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700"><i class="fas fa-download mr-2"></i>Download Gambar Ghibli</button>
                    </div>
                `;
            } else {
                throw new Error(data.message || 'Gagal mengubah gambar ke gaya Ghibli.');
            }
        } catch (error) {
            displayError(toghibliResultArea, error);
        } finally {
            fetchToghibliButton.disabled = false;
            fetchToghibliButton.textContent = 'Ubah ke Ghibli';
        }
    }
    fetchToghibliButton.addEventListener('click', fetchToGhibli);
    toghibliResultArea.addEventListener('click', (e) => {
        const button = e.target.closest('.dl-image-button');
        if (button) forceDownload(button.dataset.url, button.dataset.filename, button);
    });

    // --- Fitur Remini (Image Enhance) ---
    async function fetchRemini() {
        const imageUrl = reminiUrlInput.value.trim();
        if (!imageUrl) { reminiResultArea.innerHTML = `<p class="text-red-500 text-center">URL gambar tidak boleh kosong.</p>`; return; }
        displayLoading(reminiResultArea, fetchReminiButton);
        try {
            const apiUrl = `${API_BASE_URL.replace('/download', '/imagecreator')}/remini?url=${encodeURIComponent(imageUrl)}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.status === true && data.result) {
                const enhancedImgUrl = data.result;
                const filename = `remini_enhanced_${Date.now()}.png`;
                reminiResultArea.innerHTML = `
                    <div class="bg-[#1f2c34] rounded-lg p-4">
                        <img src="${enhancedImgUrl}" alt="Enhanced Image" class="w-full rounded-lg mb-4 border border-gray-700">
                        <button data-url="${enhancedImgUrl}" data-filename="${filename}" class="dl-image-button w-full text-center bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700"><i class="fas fa-download mr-2"></i>Download Gambar Enhanced</button>
                    </div>
                `;
            } else {
                throw new Error(data.message || 'Gagal meningkatkan kualitas gambar dengan Remini.');
            }
        } catch (error) {
            displayError(reminiResultArea, error);
        } finally {
            fetchReminiButton.disabled = false;
            fetchReminiButton.textContent = 'Enhance Gambar';
        }
    }
    fetchReminiButton.addEventListener('click', fetchRemini);
    reminiResultArea.addEventListener('click', (e) => {
        const button = e.target.closest('.dl-image-button');
        if (button) forceDownload(button.dataset.url, button.dataset.filename, button);
    });

    // --- Fitur Upscale ---
    async function fetchUpscale() {
        const imageUrl = upscaleUrlInput.value.trim();
        if (!imageUrl) { upscaleResultArea.innerHTML = `<p class="text-red-500 text-center">URL gambar tidak boleh kosong.</p>`; return; }
        displayLoading(upscaleResultArea, fetchUpscaleButton);
        try {
            const apiUrl = `${API_BASE_URL.replace('/download', '/imagecreator')}/upscale?url=${encodeURIComponent(imageUrl)}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.status === true && data.result) {
                const upscaledImgUrl = data.result;
                const filename = `upscaled_image_${Date.now()}.png`;
                upscaleResultArea.innerHTML = `
                    <div class="bg-[#1f2c34] rounded-lg p-4">
                        <img src="${upscaledImgUrl}" alt="Upscaled Image" class="w-full rounded-lg mb-4 border border-gray-700">
                        <button data-url="${upscaledImgUrl}" data-filename="${filename}" class="dl-image-button w-full text-center bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-700"><i class="fas fa-download mr-2"></i>Download Gambar Upscale</button>
                    </div>
                `;
            } else {
                throw new Error(data.message || 'Gagal memperbesar resolusi gambar.');
            }
        } catch (error) {
            displayError(upscaleResultArea, error);
        } finally {
            fetchUpscaleButton.disabled = false;
            fetchUpscaleButton.textContent = 'Upscale Gambar';
        }
    }
    fetchUpscaleButton.addEventListener('click', fetchUpscale);
    upscaleResultArea.addEventListener('click', (e) => {
        const button = e.target.closest('.dl-image-button');
        if (button) forceDownload(button.dataset.url, button.dataset.filename, button);
    });

    // --- Fitur Random Gambar (Waifu, NSFW, Papayang) ---
    async function fetchRandomImage(apiEndpoint, resultArea, buttonElement) {
        const originalButtonText = buttonElement.innerHTML; // Simpan teks asli tombol
        displayLoading(resultArea, buttonElement); // Tampilkan loading
        try {
            const apiUrl = `https://flowfalcon.dpdns.org/random/${apiEndpoint}`; 
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Gagal memuat gambar. Status: ${response.status}`);
            }

            // API langsung mengembalikan gambar, jadi URL respons adalah URL gambar
            // Tidak perlu parsing JSON karena responsnya adalah biner gambar langsung
            const imageUrl = response.url; 
            const filename = `${apiEndpoint}_${Date.now()}.jpg`; // Asumsi format .jpg, bisa disesuaikan jika API return format lain

            resultArea.innerHTML = `
                <div class="bg-[#1f2c34] rounded-lg p-4">
                    <img src="${imageUrl}" alt="Random Image" class="w-full rounded-lg mb-4 border border-gray-700 object-contain max-h-96">
                    <button data-url="${imageUrl}" data-filename="${filename}" class="dl-image-button w-full text-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700"><i class="fas fa-download mr-2"></i>Download Gambar</button>
                </div>
            `;
        } catch (error) {
            displayError(resultArea, error);
        } finally {
            buttonElement.disabled = false;
            buttonElement.innerHTML = originalButtonText; // Kembalikan teks asli tombol
        }
    }

    // Fungsi khusus untuk setiap kategori random
    const fetchRandomWaifu = () => fetchRandomImage('waifu', randomWaifuResultArea, fetchRandomWaifuButton);
    const fetchRandomNsfw = () => fetchRandomImage('nsfw', randomNsfwResultArea, fetchRandomNsfwButton);
    const fetchRandomPapayang = () => fetchRandomImage('papayang', randomPapayangResultArea, fetchRandomPapayangButton);

    // Event Listeners untuk tombol random
    fetchRandomWaifuButton.addEventListener('click', fetchRandomWaifu);
    fetchRandomNsfwButton.addEventListener('click', fetchRandomNsfw);
    fetchRandomPapayangButton.addEventListener('click', fetchRandomPapayang);

    // Event Listener untuk tombol download di halaman random
    randomWaifuResultArea.addEventListener('click', (e) => {
        const button = e.target.closest('.dl-image-button');
        if (button) forceDownload(button.dataset.url, button.dataset.filename, button);
    });
    randomNsfwResultArea.addEventListener('click', (e) => {
        const button = e.target.closest('.dl-image-button');
        if (button) forceDownload(button.dataset.url, button.dataset.filename, button);
    });
    randomPapayangResultArea.addEventListener('click', (e) => {
        const button = e.target.closest('.dl-image-button');
        if (button) forceDownload(button.dataset.url, button.dataset.filename, button);
    });

});