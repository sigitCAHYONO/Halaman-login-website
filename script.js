// === ELEMEN PENTING ===
// Halaman
const chatPage = document.getElementById('chat-page');
const settingsPage = document.getElementById('settings-page');
const chatDetailPage = document.getElementById('chat-detail-page');

// Tombol & Link
const menuButton = document.getElementById('menu-button');
const settingsButton = document.getElementById('settings-button');
const backButton = document.getElementById('back-button');
const chatItemLinks = document.querySelectorAll('.chat-item-link');
const backFromChatButton = document.getElementById('back-from-chat-button');
const attachmentButton = document.getElementById('attachment-button');

// Menu
const dropdownMenu = document.getElementById('dropdown-menu');
const attachmentMenu = document.getElementById('attachment-menu');
const attachmentOverlay = document.getElementById('attachment-overlay');

// Elemen Kirim Pesan & File
const messageInput = document.getElementById('message-input');
const sendMessageButton = document.getElementById('send-message-button');
const chatHistory = document.querySelector('#chat-detail-page main');
const imageInput = document.getElementById('image-input');
const galleryButton = document.querySelector('#attachment-menu a[href="#"]:nth-child(3)');

// Elemen untuk Image Viewer
const imageViewer = document.getElementById('image-viewer');
const viewerImage = document.getElementById('viewer-image');
const closeViewerButton = document.getElementById('close-viewer-button');

// Elemen untuk Pembuatan Polling
const openPollCreationButton = document.getElementById('open-poll-creation');
const pollCreationPage = document.getElementById('poll-creation-page');
const backToChatFromPollButton = document.getElementById('back-to-chat-from-poll');
const addPollOptionButton = document.getElementById('add-poll-option');
const pollOptionsContainer = document.getElementById('poll-options');
const sendPollButton = document.getElementById('send-poll-button');
const pollQuestionInput = document.getElementById('poll-question');
const multipleAnswersCheckbox = document.getElementById('multiple-answers');

// Elemen untuk Fitur Lokasi
const locationPage = document.getElementById('location-page');
const locationButton = document.querySelector('#attachment-menu a[href="#"]:nth-child(7)');
const backFromLocationButton = document.getElementById('back-from-location-button');
const shareLiveLocationButton = document.getElementById('share-live-location-button');
const liveLocationConfirmModal = document.getElementById('live-location-confirm-modal');
const cancelLiveLocationButton = document.getElementById('cancel-live-location');
const confirmLiveLocationButton = document.getElementById('confirm-live-location');
const initialLocationOptions = document.getElementById('initial-location-options');
const liveLocationPanel = document.getElementById('live-location-panel');
const durationButtons = document.querySelectorAll('.live-duration-button');
const sendLiveLocationButton = document.getElementById('send-live-location-button');
const locationCaptionInput = document.getElementById('location-caption-input');
const locationViewerPage = document.getElementById('location-viewer-page');
const backFromLocationViewer = document.getElementById('back-from-location-viewer');
const viewerRemainingTime = document.getElementById('viewer-remaining-time');

// === FUNGSI NAVIGASI & MENU ===
menuButton.addEventListener('click', function(event) { event.stopPropagation(); dropdownMenu.classList.toggle('hidden'); });
settingsButton.addEventListener('click', function() { chatPage.classList.add('hidden'); settingsPage.classList.remove('hidden'); dropdownMenu.classList.add('hidden'); });
backButton.addEventListener('click', function() { settingsPage.classList.add('hidden'); chatPage.classList.remove('hidden'); });
chatItemLinks.forEach(link => { link.addEventListener('click', function(event) { event.preventDefault(); chatPage.classList.add('hidden'); chatDetailPage.classList.remove('hidden'); }); });
backFromChatButton.addEventListener('click', function() { chatDetailPage.classList.add('hidden'); chatPage.classList.remove('hidden'); });
attachmentButton.addEventListener('click', function(event) { event.stopPropagation(); attachmentMenu.classList.remove('hidden'); attachmentOverlay.classList.remove('hidden'); });

// Navigasi untuk Polling
openPollCreationButton.addEventListener('click', function(event) {
    event.stopPropagation();
    closeAllMenus();
    pollCreationPage.classList.remove('hidden');
});
backToChatFromPollButton.addEventListener('click', function() {
    pollCreationPage.classList.add('hidden');
});

// Menambah dan Menghapus Pilihan Polling
addPollOptionButton.addEventListener('click', function(event) {
    event.preventDefault();
    const newOptionDiv = document.createElement('div');
    newOptionDiv.className = 'flex items-center mb-2';
    newOptionDiv.innerHTML = `
        <input type="text" class="poll-option-input bg-[#1f2c34] text-white rounded-md px-3 py-2 w-full focus:outline-none" placeholder="Tambahkan pilihan">
        <button class="remove-option-button text-red-500 ml-2 focus:outline-none"><i class="fas fa-trash"></i></button>
    `;
    pollOptionsContainer.appendChild(newOptionDiv);
    
    newOptionDiv.querySelector('.remove-option-button').addEventListener('click', function(e) {
        e.preventDefault();
        newOptionDiv.remove();
    });
});

// Navigasi untuk Lokasi
locationButton.addEventListener('click', function(event) {
    event.preventDefault();
    closeAllMenus();
    locationPage.classList.remove('hidden');
    chatDetailPage.classList.add('hidden');
});
backFromLocationButton.addEventListener('click', function() {
    locationPage.classList.add('hidden');
    chatDetailPage.classList.remove('hidden');
    initialLocationOptions.classList.remove('hidden');
    liveLocationPanel.classList.add('hidden');
});
shareLiveLocationButton.addEventListener('click', function() { liveLocationConfirmModal.classList.remove('hidden'); });
cancelLiveLocationButton.addEventListener('click', function() { liveLocationConfirmModal.classList.add('hidden'); });
confirmLiveLocationButton.addEventListener('click', function() {
    liveLocationConfirmModal.classList.add('hidden');
    initialLocationOptions.classList.add('hidden');
    liveLocationPanel.classList.remove('hidden');
});
durationButtons.forEach(button => {
    button.addEventListener('click', function() {
        durationButtons.forEach(btn => {
            btn.classList.remove('bg-green-600');
            btn.classList.add('bg-gray-700');
        });
        this.classList.add('bg-green-600');
        this.classList.remove('bg-gray-700');
    });
});
backFromLocationViewer.addEventListener('click', function() {
    locationViewerPage.classList.add('hidden');
    chatDetailPage.classList.remove('hidden');
});

// === FUNGSI KIRIM PESAN & GAMBAR ===
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText !== '') { createMessageBubble(messageText); messageInput.value = ''; chatHistory.scrollTop = chatHistory.scrollHeight; }
}

function createMessageBubble(text) {
    const messageBubble = document.createElement('div');
    messageBubble.className = 'flex justify-end mb-4';
    const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    messageBubble.innerHTML = `
        <div class="bg-[#005c4b] rounded-lg p-2 max-w-sm">
            <p class="text-white text-sm" style="word-break: break-word;">${text}</p>
            <p class="text-right text-xs text-gray-400 mt-1">${time} <i class="fas fa-check-double text-blue-400"></i></p>
        </div>`;
    chatHistory.appendChild(messageBubble);
}

sendMessageButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', function(event) { if (event.key === 'Enter') { sendMessage(); }});

galleryButton.addEventListener('click', function(event) { event.preventDefault(); imageInput.click(); closeAllMenus(); });

imageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) { createImageBubble(e.target.result); chatHistory.scrollTop = chatHistory.scrollHeight; };
        reader.readAsDataURL(file);
    }
});

function createImageBubble(imageUrl) {
    const messageBubble = document.createElement('div');
    messageBubble.className = 'flex justify-end mb-4';
    const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    messageBubble.innerHTML = `
        <div class="bg-[#005c4b] rounded-lg p-1 max-w-xs cursor-pointer">
            <img src="${imageUrl}" class="chat-image rounded-md max-w-full">
            <p class="text-right text-xs text-gray-400 mt-1 px-1">${time} <i class="fas fa-check-double text-blue-400"></i></p>
        </div>`;
    chatHistory.appendChild(messageBubble);
}

// === FUNGSI KIRIM POLLING ===
function sendPoll() {
    const question = pollQuestionInput.value.trim();
    const optionInputs = pollOptionsContainer.querySelectorAll('.poll-option-input');
    const options = Array.from(optionInputs).map(input => input.value.trim()).filter(text => text !== '');
    if (question && options.length >= 2) {
        const allowMultiple = multipleAnswersCheckbox.checked;
        createPollBubble(question, options, allowMultiple);
        pollCreationPage.classList.add('hidden');
        chatHistory.scrollTop = chatHistory.scrollHeight;
        pollQuestionInput.value = '';
        const allOptions = pollOptionsContainer.querySelectorAll('.flex.items-center.mb-2');
        allOptions.forEach((opt, index) => {
            if (index > 1) { opt.remove(); } 
            else { opt.querySelector('.poll-option-input').value = ''; }
        });
    } else {
        alert('Harap isi pertanyaan dan minimal 2 pilihan polling.');
    }
}

function createPollBubble(question, options, allowMultiple) {
    const messageBubble = document.createElement('div');
    messageBubble.className = 'flex justify-end mb-4';
    const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    const pollId = 'poll-' + Date.now();
    const optionsHTML = options.map((optionText, index) => {
        const encodedOptionText = encodeURIComponent(optionText);
        return `
        <div class="poll-vote-option" data-option-text="${encodedOptionText}">
            <div class="relative rounded-md overflow-hidden">
                <div class="poll-progress-bar absolute top-0 left-0 h-full bg-green-700/50" style="width: 0%;"></div>
                <label for="${pollId}-opt-${index}" class="relative flex items-center justify-between p-2 cursor-pointer">
                     <div class="flex items-center z-10">
                         <span class="option-text text-sm">${optionText}</span>
                         <span class="option-check-icon ml-2 text-green-300"><i class="fas fa-check-circle"></i></span>
                     </div>
                    <span class="vote-count text-sm text-gray-300 z-10">0</span>
                </label>
            </div>
            <input type="${allowMultiple ? 'checkbox' : 'radio'}" name="${pollId}" id="${pollId}-opt-${index}" class="poll-input-element">
        </div>
    `}).join('');
    messageBubble.innerHTML = `
        <div class="bg-[#005c4b] rounded-lg p-3 max-w-sm w-full">
            <h3 class="font-bold text-white mb-1">${question}</h3>
            <p class="text-xs text-gray-300 mb-3">${allowMultiple ? 'Pilih satu atau lebih' : 'Pilih satu'}</p>
            <div class="poll-options-display space-y-2" data-total-votes="0" data-poll-question="${encodeURIComponent(question)}">
                ${optionsHTML}
            </div>
            <button class="view-votes-button text-center w-full mt-3 text-sm text-white py-1 hover:bg-white/10 rounded-md">Lihat suara</button>
            <p class="text-right text-xs text-gray-400 mt-2">${time} <i class="fas fa-check-double text-blue-400"></i></p>
        </div>
    `;
    chatHistory.appendChild(messageBubble);
}

sendPollButton.addEventListener('click', sendPoll);

// === FUNGSI KIRIM LOKASI ===
function createLiveLocationBubble(durationInMinutes, caption) {
    const messageBubble = document.createElement('div');
    messageBubble.className = 'flex justify-end mb-4';
    const now = new Date();
    const endTime = new Date(now.getTime() + durationInMinutes * 60000);
    const formattedEndTime = endTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    messageBubble.dataset.endTime = endTime.getTime();
    messageBubble.dataset.caption = caption;
    messageBubble.innerHTML = `
        <div class="location-bubble-content bg-[#005c4b] rounded-lg p-1 max-w-sm w-full">
            <div class="p-3">
                <div class="relative cursor-pointer location-bubble-map">
                    <img src="https://storage.googleapis.com/a1aa/image/map-in-chat.png" class="rounded-t-lg w-full h-auto" alt="Map in chat">
                    <div class="absolute top-2 left-2 bg-white rounded-full p-1">
                        <i class="fas fa-map-marker-alt text-xl text-red-500"></i>
                    </div>
                </div>
                <div class="live-location-details">
                    <p class="font-bold text-white mt-2">Berbagi lokasi terkini</p>
                    <p class="text-sm text-gray-300">Berbagi hingga ${formattedEndTime}</p>
                    ${caption ? `<p class="text-sm text-white pt-2 border-t border-white/20 mt-2">${caption}</p>` : ''}
                    <div class="flex justify-between items-center mt-2">
                         <button class="stop-sharing-button text-red-500 font-semibold text-sm">BERHENTI BERBAGI</button>
                         <p class="text-right text-xs text-gray-400">${time} <i class="fas fa-check-double text-blue-400"></i></p>
                    </div>
                </div>
            </div>
        </div>
    `;
    chatHistory.appendChild(messageBubble);
}

sendLiveLocationButton.addEventListener('click', function() {
    const selectedDurationButton = document.querySelector('.live-duration-button.bg-green-600');
    const duration = selectedDurationButton.dataset.duration;
    const caption = locationCaptionInput.value.trim();
    if (duration) {
        createLiveLocationBubble(parseInt(duration), caption);
        locationPage.classList.add('hidden');
        chatDetailPage.classList.remove('hidden');
        locationCaptionInput.value = '';
        initialLocationOptions.classList.remove('hidden');
        liveLocationPanel.classList.add('hidden');
        chatHistory.scrollTop = chatHistory.scrollHeight;
    } else {
        alert('Pilih durasi terlebih dahulu.');
    }
});

// === FUNGSI INTERAKSI CHAT (POLLING, LOKASI, GAMBAR) ===
chatHistory.addEventListener('click', function(event) {
    // --- Aksi Polling ---
    const pollOptionLabel = event.target.closest('label');
    if (pollOptionLabel && pollOptionLabel.closest('.poll-vote-option')) {
        const pollOptionDiv = pollOptionLabel.closest('.poll-vote-option');
        event.preventDefault();
        const pollContainer = pollOptionDiv.closest('.poll-options-display');
        const input = pollOptionDiv.querySelector('.poll-input-element');
        const isMultiSelect = input.type === 'checkbox';
        if (isMultiSelect) {
            input.checked = !input.checked;
        } else {
            pollContainer.querySelectorAll('.poll-input-element').forEach(radio => radio.checked = false);
            input.checked = true;
        }
        updatePollUI(pollContainer);
        return;
    }

    // --- Aksi Lokasi: Berhenti Berbagi ---
    const stopButton = event.target.closest('.stop-sharing-button');
    if (stopButton) {
        const content = stopButton.closest('.location-bubble-content');
        content.innerHTML = `
            <div class="p-3 flex items-center">
                <i class="fas fa-map-marker-alt text-2xl text-gray-400 mr-4"></i>
                <div><p class="font-bold text-white">Berbagi lokasi terkini telah berakhir</p></div>
            </div>`;
        return;
    }

    // --- Aksi Lokasi: Lihat Peta ---
    const mapInBubble = event.target.closest('.location-bubble-map');
    if (mapInBubble) {
        const bubble = mapInBubble.closest('[data-end-time]');
        const endTime = parseInt(bubble.dataset.endTime);
        const now = new Date().getTime();
        const remainingMinutes = Math.round((endTime - now) / 60000);
        if (remainingMinutes > 0) {
            viewerRemainingTime.textContent = `tersisa ${remainingMinutes} menit`;
        } else {
            viewerRemainingTime.textContent = 'Waktu berbagi telah habis';
        }
        locationViewerPage.classList.remove('hidden');
        chatDetailPage.classList.add('hidden');
        return;
    }

    // --- Aksi Lihat Gambar ---
    if (event.target.classList.contains('chat-image')) {
        viewerImage.src = event.target.src;
        imageViewer.classList.remove('hidden');
    }
});

function updatePollUI(pollContainer) {
    const allOptions = pollContainer.querySelectorAll('.poll-vote-option');
    let totalVotes = 0;
    allOptions.forEach(option => {
        const input = option.querySelector('.poll-input-element');
        const hasVoted = option.hasAttribute('data-voted');
        if (input.checked && !hasVoted) { option.setAttribute('data-voted', 'true'); } 
        else if (!input.checked && hasVoted) { option.removeAttribute('data-voted'); }
        if (option.hasAttribute('data-voted')) { totalVotes++; }
    });
    pollContainer.dataset.totalVotes = totalVotes;
    allOptions.forEach(option => {
        const voteCountEl = option.querySelector('.vote-count');
        const progressBar = option.querySelector('.poll-progress-bar');
        const currentVotes = option.hasAttribute('data-voted') ? 1 : 0;
        voteCountEl.textContent = currentVotes;
        progressBar.style.width = totalVotes > 0 ? `${(currentVotes / totalVotes) * 100}%` : '0%';
    });
}

closeViewerButton.addEventListener('click', function() {
    imageViewer.classList.add('hidden');
    viewerImage.src = "";
});

// --- Fungsi untuk menutup semua menu ---
function closeAllMenus() {
    if (!dropdownMenu.classList.contains('hidden')) { dropdownMenu.classList.add('hidden'); }
    if (!attachmentMenu.classList.contains('hidden')) { attachmentMenu.classList.add('hidden'); attachmentOverlay.classList.add('hidden'); }
}
window.addEventListener('click', closeAllMenus);
attachmentOverlay.addEventListener('click', closeAllMenus);

// === ELEMEN UNTUK FITUR CHAT AI ===
const aiChatLink = document.getElementById('ai-chat-link');
const aiChatDetailPage = document.getElementById('ai-chat-detail-page');
const backFromAiChatButton = document.getElementById('back-from-ai-chat-button');
const aiChatHistory = document.getElementById('ai-chat-history');
const aiMessageInput = document.getElementById('ai-message-input');
const sendAiMessageButton = document.getElementById('send-ai-message-button');
const aiStatus = document.getElementById('ai-status');

// === NAVIGASI UNTUK CHAT AI ===
aiChatLink.addEventListener('click', function(event) {
    event.preventDefault();
    chatPage.classList.add('hidden');
    aiChatDetailPage.classList.remove('hidden');
});

backFromAiChatButton.addEventListener('click', function() {
    aiChatDetailPage.classList.add('hidden');
    chatPage.classList.remove('hidden');
});

// === FUNGSI UNTUK INTERAKSI DENGAN AI ===
async function sendAiMessage() {
    const messageText = aiMessageInput.value.trim();
    if (messageText === '') return;

    createAiMessageBubble(messageText, 'user');
    aiMessageInput.value = '';
    aiChatHistory.scrollTop = aiChatHistory.scrollHeight;
    
    aiStatus.textContent = 'mengetik...';
    const typingIndicator = createTypingIndicator();
    aiChatHistory.appendChild(typingIndicator);
    aiChatHistory.scrollTop = aiChatHistory.scrollHeight;

    try {
        const apiUrl = `https://api.ownblox.my.id/api/blackboxai?message=${encodeURIComponent(messageText)}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const responseText = await response.text();
        
        typingIndicator.remove();
        aiStatus.textContent = 'online';

        let aiReply = '';
        try {
            const data = JSON.parse(responseText);
            if (data && data.message) {
                aiReply = data.message;
            } else {
                aiReply = responseText;
            }
        } catch (e) {
            aiReply = responseText;
        }

        if (aiReply) {
            createAiMessageBubble(aiReply, 'ai');
        } else {
            createAiMessageBubble('Maaf, saya tidak menerima balasan yang valid.', 'ai-error');
        }
        
    } catch (error) {
        console.error("Error fetching AI response:", error);
        typingIndicator.remove();
        aiStatus.textContent = 'online';
        createAiMessageBubble('Waduh, ada masalah saat menghubungi AI. Ini bisa karena masalah jaringan atau CORS. Coba lagi nanti.', 'ai-error');
    }
    
    aiChatHistory.scrollTop = aiChatHistory.scrollHeight;
}

// Fungsi untuk membuat gelembung pesan di chat AI
function createAiMessageBubble(text, sender) {
    const messageBubble = document.createElement('div');
    const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    if (sender === 'user') {
        messageBubble.className = 'flex justify-end mb-4';
        messageBubble.innerHTML = `
            <div class="bg-[#005c4b] rounded-lg p-2 max-w-sm">
                <p class="text-white text-sm" style="word-break: break-word;">${text}</p>
                <p class="text-right text-xs text-gray-400 mt-1">${time} <i class="fas fa-check-double text-blue-400"></i></p>
            </div>`;
    } else if (sender === 'ai-error') {
         messageBubble.className = 'flex justify-start mb-4';
         messageBubble.innerHTML = `
             <div class="bg-[#ff3b30] rounded-lg p-2 max-w-sm">
                 <p class="text-white text-sm" style="word-break: break-word;">${text}</p>
                  <p class="text-left text-xs text-gray-200 mt-1">${time}</p>
             </div>`;
    } 
    else { // sender === 'ai'
        messageBubble.className = 'flex justify-start mb-4';
        messageBubble.innerHTML = `
            <div class="bg-[#1f2c34] rounded-lg p-2 max-w-sm">
                <p class="text-white text-sm" style="word-break: break-word;">${text}</p>
                 <p class="text-left text-xs text-gray-400 mt-1">${time}</p>
            </div>`;
    }
    aiChatHistory.appendChild(messageBubble);
}

// Fungsi untuk membuat indikator "mengetik..."
function createTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'typing-indicator';
    indicator.className = 'flex justify-start mb-4';
    indicator.innerHTML = `
         <div class="bg-[#1f2c34] rounded-lg p-2 max-w-sm">
             <div class="flex items-center space-x-1">
                 <span class="typing-dot animate-bounce w-2 h-2 bg-gray-300 rounded-full"></span>
                 <span class="typing-dot animate-bounce delay-150 w-2 h-2 bg-gray-300 rounded-full" style="animation-delay: 0.1s;"></span>
                 <span class="typing-dot animate-bounce delay-300 w-2 h-2 bg-gray-300 rounded-full" style="animation-delay: 0.2s;"></span>
             </div>
         </div>`;
    return indicator;
}

// Event listener untuk tombol kirim dan tombol Enter
sendAiMessageButton.addEventListener('click', sendAiMessage);
aiMessageInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendAiMessage();
    }
});

// === ELEMEN UNTUK FITUR TIKTOK DOWNLOADER ===
const tiktokDownloaderLink = document.getElementById('tiktok-downloader-link');
const tiktokDownloaderPage = document.getElementById('tiktok-downloader-page');
const backFromTiktokButton = document.getElementById('back-from-tiktok-button');
const tiktokUrlInput = document.getElementById('tiktok-url-input');
const tiktokCustomFilenameInput = document.getElementById('tiktok-custom-filename');
const fetchTiktokVideoButton = document.getElementById('fetch-tiktok-video-button');
const tiktokResultArea = document.getElementById('tiktok-result-area');

// === NAVIGASI UNTUK TIKTOK DOWNLOADER ===
tiktokDownloaderLink.addEventListener('click', function(event) {
    event.preventDefault();
    chatPage.classList.add('hidden');
    tiktokDownloaderPage.classList.remove('hidden');
});

backFromTiktokButton.addEventListener('click', function() {
    tiktokDownloaderPage.classList.add('hidden');
    chatPage.classList.remove('hidden');
});

// GANTI FUNGSI fetchTikTokInfo LAMA DENGAN YANG INI
async function fetchTikTokInfo() {
    const videoUrl = tiktokUrlInput.value.trim();
    if (!videoUrl) {
        tiktokResultArea.innerHTML = `<p class="text-red-500 text-center">URL tidak boleh kosong.</p>`;
        return;
    }

    fetchTiktokVideoButton.disabled = true;
    fetchTiktokVideoButton.textContent = 'Memproses...';
    tiktokResultArea.innerHTML = `<div class="flex justify-center items-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div></div>`;

    try {
        const apiUrl = `https://api.ownblox.my.id/api/ttdl?url=${encodeURIComponent(videoUrl)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === true && data.result) {
            const result = data.result;
            
            // Ambil ukuran file untuk video dan audio secara bersamaan
            fetchTiktokVideoButton.textContent = 'Mengecek ukuran file...';
            const [videoSize, audioSize] = await Promise.all([
                getFileSize(result.video),
                getFileSize(result.audio)
            ]);

            const customNamePart = tiktokCustomFilenameInput.value.trim();
            let finalBaseFilename;
            if (customNamePart) {
                finalBaseFilename = `ByVintex - ${customNamePart}`;
            } else {
                const sanitizedTitle = result.title.replace(/[<>:"/\\|?*]/g, '_').substring(0, 50);
                finalBaseFilename = sanitizedTitle || 'tiktok_video_download'; 
            }

            tiktokResultArea.innerHTML = `
                <div class="bg-[#1f2c34] rounded-lg p-4">
                    <p class="text-white font-semibold mb-2 truncate" title="${result.title}">${result.title}</p>
                    <p class="text-sm text-gray-400 mb-4">by: ${result.author}</p>
                    <video class="w-full rounded-lg mb-4" controls src="${result.video}"></video>
                    <div class="flex space-x-2">
                        <button data-url="${result.video}" data-filename="${finalBaseFilename}.mp4" class="download-button flex-1 text-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700">
                            <i class="fas fa-video mr-2"></i>Download Video ${videoSize ? `(${videoSize})` : ''}
                        </button>
                        <button data-url="${result.audio}" data-filename="${finalBaseFilename}.mp3" class="download-button flex-1 text-center bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700">
                            <i class="fas fa-music mr-2"></i>Download Audio ${audioSize ? `(${audioSize})` : ''}
                        </button>
                    </div>
                </div>
            `;
        } else {
            throw new Error(data.message || 'Gagal mengambil data video.');
        }

    } catch (error) {
        console.error("TikTok Downloader Error:", error);
        tiktokResultArea.innerHTML = `<p class="text-red-500 text-center">Error: ${error.message}</p>`;
    } finally {
        fetchTiktokVideoButton.disabled = false;
        fetchTiktokVideoButton.textContent = 'Download';
    }
}

// TAMBAHKAN FUNGSI BARU INI
async function getFileSize(url) {
    try {
        // Kita gunakan method 'HEAD' untuk hanya meminta header, bukan seluruh file
        const response = await fetch(url, { method: 'HEAD' });
        if (!response.ok) return null;
        
        const totalSize = Number(response.headers.get('Content-Length'));
        if (!totalSize) return null;

        // Format ukuran agar mudah dibaca (B, KB, MB)
        if (totalSize < 1024) return `${totalSize} B`;
        if (totalSize < 1024 * 1024) return `${(totalSize / 1024).toFixed(1)} KB`;
        return `${(totalSize / (1024 * 1024)).toFixed(1)} MB`;

    } catch (error) {
        console.error(`Tidak bisa mendapatkan ukuran file untuk ${url}`, error);
        return null; // Kembalikan null jika ada error
    }
}

// GANTI FUNGSI forceDownload LAMA DENGAN VERSI BARU YANG LEBIH INFORMATIF INI

async function forceDownload(url, filename, buttonElement) {
    const originalText = buttonElement.innerHTML;
    buttonElement.disabled = true;
    buttonElement.innerHTML = `<span>Menyiapkan...</span>`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Gagal memulai unduhan: Status ${response.status}`);

        const totalSize = Number(response.headers.get('Content-Length'));
        const reader = response.body.getReader();
        const chunks = [];
        let receivedSize = 0;

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            chunks.push(value);
            receivedSize += value.length;

            // --- INI BAGIAN YANG DIPERBARUI ---
            if (totalSize) {
                // Jika ukuran total diketahui, tampilkan progress lengkap
                const percentage = Math.round((receivedSize / totalSize) * 100);
                const receivedMB = (receivedSize / (1024 * 1024)).toFixed(1);
                const totalMB = (totalSize / (1024 * 1024)).toFixed(1);
                buttonElement.textContent = `Mengunduh ${percentage}% (${receivedMB}MB / ${totalMB}MB)`;
            } else {
                // Jika tidak, tampilkan jumlah MB yang terunduh saja
                const receivedMB = (receivedSize / (1024 * 1024)).toFixed(1);
                buttonElement.textContent = `Mengunduh ${receivedMB} MB`;
            }
            // --- BATAS PEMBARUAN ---
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
        alert(`Gagal mengunduh file. Kemungkinan karena proteksi CORS dari server. Coba lagi nanti.\nError: ${error.message}`);
    } finally {
        buttonElement.disabled = false;
        buttonElement.innerHTML = originalText;
    }
}

fetchTiktokVideoButton.addEventListener('click', fetchTikTokInfo);

tiktokResultArea.addEventListener('click', function(event) {
    const button = event.target.closest('.download-button');
    if (button) {
        const url = button.dataset.url;
        const filename = button.dataset.filename;
        forceDownload(url, filename, button);
    }
});

// === ELEMEN UNTUK FITUR YOUTUBE DOWNLOADER ===
const youtubeDownloaderLink = document.getElementById('youtube-downloader-link');
const youtubeDownloaderPage = document.getElementById('youtube-downloader-page');
const backFromYoutubeButton = document.getElementById('back-from-youtube-button');
const youtubeUrlInput = document.getElementById('youtube-url-input');
const youtubeCustomFilenameInput = document.getElementById('youtube-custom-filename');
const fetchYoutubeMp4Button = document.getElementById('fetch-youtube-mp4-button');
const fetchYoutubeMp3Button = document.getElementById('fetch-youtube-mp3-button');
const youtubeResultArea = document.getElementById('youtube-result-area');

// === ELEMEN UNTUK FITUR INSTAGRAM DOWNLOADER ===
const instagramDownloaderLink = document.getElementById('instagram-downloader-link');
const instagramDownloaderPage = document.getElementById('instagram-downloader-page');
const backFromInstagramButton = document.getElementById('back-from-instagram-button');
const instagramUrlInput = document.getElementById('instagram-url-input');
const instagramCustomFilenameInput = document.getElementById('instagram-custom-filename');
const fetchInstagramMediaButton = document.getElementById('fetch-instagram-media-button');
const instagramResultArea = document.getElementById('instagram-result-area');

// === NAVIGASI UNTUK YOUTUBE DOWNLOADER ===
youtubeDownloaderLink.addEventListener('click', function(event) {
    event.preventDefault();
    chatPage.classList.add('hidden');
    youtubeDownloaderPage.classList.remove('hidden');
});

backFromYoutubeButton.addEventListener('click', function() {
    youtubeDownloaderPage.classList.add('hidden');
    chatPage.classList.remove('hidden');
});

// === NAVIGASI UNTUK INSTAGRAM DOWNLOADER ===
instagramDownloaderLink.addEventListener('click', function(event) {
    event.preventDefault();
    chatPage.classList.add('hidden');
    instagramDownloaderPage.classList.remove('hidden');
});

backFromInstagramButton.addEventListener('click', function() {
    instagramDownloaderPage.classList.add('hidden');
    chatPage.classList.remove('hidden');
});

// GANTI FUNGSI fetchYouTubeMedia LAMA DENGAN YANG INI
async function fetchYouTubeMedia(type, buttonElement) {
    const videoUrl = youtubeUrlInput.value.trim();
    if (!videoUrl) {
        youtubeResultArea.innerHTML = `<p class="text-red-500 text-center">URL tidak boleh kosong.</p>`;
        return;
    }

    const originalButtonText = buttonElement.innerHTML;
    buttonElement.disabled = true;
    buttonElement.textContent = 'Memproses...';
    // Nonaktifkan tombol lainnya
    document.querySelectorAll('.get-media-button').forEach(btn => btn.disabled = true);
    
    youtubeResultArea.innerHTML = `<div class="flex justify-center items-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div></div>`;

    try {
        const apiUrl = `https://api.ownblox.my.id/api/ytdl?url=${encodeURIComponent(videoUrl)}&type=${type}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === true && data.result) {
            const result = data.result;
            
            let downloadUrl = '';
            if (type === 'mp4') {
                downloadUrl = result.video_download;
            } else if (type === 'mp3') {
                downloadUrl = result.audio_download;
            }

            if (!downloadUrl) {
                throw new Error(`Link download untuk tipe '${type}' tidak ditemukan.`);
            }

            buttonElement.textContent = 'Mengecek ukuran file...';
            const fileSize = await getFileSize(downloadUrl);

            const customNamePart = youtubeCustomFilenameInput.value.trim();
            let finalBaseFilename;
            if (customNamePart) {
                finalBaseFilename = `ByVintex - ${customNamePart}`;
            } else {
                const sanitizedTitle = result.title.replace(/[<>:"/\\|?*]/g, '_').substring(0, 50);
                finalBaseFilename = sanitizedTitle || `youtube_media_${type}`;
            }

            youtubeResultArea.innerHTML = `
                <div class="bg-[#1f2c34] rounded-lg p-4">
                    <p class="text-white font-semibold mb-2 truncate" title="${result.title}">${result.title}</p>
                    <img src="${result.thumbnail}" alt="Thumbnail" class="w-full rounded-lg mb-4">
                    <p class="text-sm text-gray-400 mb-1">Kualitas: ${result.quality || 'Audio'}</p>
                    
                    <button data-url="${downloadUrl}" data-filename="${finalBaseFilename}.${type}" class="download-button-yt w-full mt-2 text-center bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700">
                        <i class="fas fa-download mr-2"></i>Download File (.${type}) ${fileSize ? `(${fileSize})` : ''}
                    </button>
                </div>
            `;
        } else {
            throw new Error(data.message || `Gagal mengambil data YouTube untuk tipe ${type}.`);
        }

    } catch (error) {
        console.error("YouTube Downloader Error:", error);
        youtubeResultArea.innerHTML = `<p class="text-red-500 text-center">Error: ${error.message}</p>`;
    } finally {
        buttonElement.disabled = false;
        buttonElement.innerHTML = originalButtonText;
        // Aktifkan kembali semua tombol
        document.querySelectorAll('.get-media-button').forEach(btn => btn.disabled = false);
    }
}



// === EVENT LISTENER UNTUK TOMBOL BARU ===
fetchYoutubeMp4Button.addEventListener('click', function() {
    fetchYouTubeMedia('mp4', this);
});

fetchYoutubeMp3Button.addEventListener('click', function() {
    fetchYouTubeMedia('mp3', this);
});

youtubeResultArea.addEventListener('click', function(event) {
    const button = event.target.closest('.download-button-yt');
    if (button) {
        const url = button.dataset.url;
        const filename = button.dataset.filename;
        forceDownload(url, filename, button);
    }
});

// === FUNGSI INTI UNTUK INSTAGRAM DOWNLOADER ===
async function fetchInstagramMedia() {
    const postUrl = instagramUrlInput.value.trim();
    if (!postUrl) {
        instagramResultArea.innerHTML = `<p class="text-red-500 text-center">URL tidak boleh kosong.</p>`;
        return;
    }

    fetchInstagramMediaButton.disabled = true;
    fetchInstagramMediaButton.textContent = 'Memproses...';
    instagramResultArea.innerHTML = `<div class="flex justify-center items-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div></div>`;

    try {
        const apiUrl = `https://api.ownblox.my.id/api/igdl?url=${encodeURIComponent(postUrl)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === true && data.result) {
            const result = data.result;
            
            // API mungkin mengembalikan satu URL atau array URL
            const downloadItems = Array.isArray(result) ? result : [result];

            let resultHTML = '';

            for (const item of downloadItems) {
                const downloadUrl = item.download_url || item.url;
                if (!downloadUrl) continue;
                
                const fileType = item.type === 'mp4' ? 'mp4' : 'jpg'; // Asumsi default adalah jpg jika bukan mp4
                const customNamePart = instagramCustomFilenameInput.value.trim();
                let finalBaseFilename;

                if (customNamePart) {
                    finalBaseFilename = `ByVintex - ${customNamePart}`;
                } else {
                    const sanitizedCaption = (item.caption || `instagram_${Date.now()}`).replace(/[<>:"/\\|?*]/g, '_').substring(0, 50);
                    finalBaseFilename = sanitizedCaption;
                }
                
                // Tambahkan nomor jika ada beberapa file dari satu post
                if(downloadItems.length > 1) {
                    finalBaseFilename += `_${downloadItems.indexOf(item) + 1}`;
                }

                const finalFilename = `${finalBaseFilename}.${fileType}`;
                
                // Membuat card untuk setiap item (video/gambar)
                resultHTML += `
                    <div class="bg-[#1f2c34] rounded-lg p-4 mb-4">
                        <p class="text-sm text-gray-400 mb-2">by: ${item.username || 'Unknown'}</p>
                        ${fileType === 'mp4' 
                            ? `<video class="w-full rounded-lg mb-4" controls src="${downloadUrl}"></video>`
                            : `<img src="${item.thumbnail || downloadUrl}" alt="Instagram media" class="w-full rounded-lg mb-4">`
                        }
                        <p class="text-white text-sm mb-4">${item.caption || ''}</p>
                        <button data-url="${downloadUrl}" data-filename="${finalFilename}" class="download-button-ig w-full mt-2 text-center bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-pink-700">
                            <i class="fas fa-download mr-2"></i>Download (.${fileType})
                        </button>
                    </div>
                `;
            }

            instagramResultArea.innerHTML = resultHTML;

        } else {
            throw new Error(data.message || 'Gagal mengambil data dari Instagram.');
        }

    } catch (error) {
        console.error("Instagram Downloader Error:", error);
        instagramResultArea.innerHTML = `<p class="text-red-500 text-center">Error: ${error.message}</p>`;
    } finally {
        fetchInstagramMediaButton.disabled = false;
        fetchInstagramMediaButton.textContent = 'Download';
    }
}

// === EVENT LISTENER UNTUK TOMBOL & HASIL INSTAGRAM ===
fetchInstagramMediaButton.addEventListener('click', fetchInstagramMedia);

instagramResultArea.addEventListener('click', function(event) {
    const button = event.target.closest('.download-button-ig');
    if (button) {
        const url = button.dataset.url;
        const filename = button.dataset.filename;
        // Kita gunakan lagi fungsi forceDownload yang sudah ada!
        forceDownload(url, filename, button);
    }
});
