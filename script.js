document.addEventListener('DOMContentLoaded', () => {
    const USER_PROFILE_KEY = 'userProfileData';
    const DEFAULT_GROUP_AVATAR_URL = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%233A4B53"/><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="50" fill="white">?</text></svg>';

    // Elemen UI
    const mainHeader = document.getElementById('mainHeader');
    const appNameTitle = document.getElementById('appName');
    const appStatus = document.getElementById('appStatus');
    const appAvatar = document.getElementById('appAvatar');
    const onlineUserCount = document.getElementById('onlineUserCount'); 
    
    const homeSection = document.getElementById('homeSection');
    const enterChatButton = document.getElementById('enterChatButton');
    const backToHomeButton = document.getElementById('backToHomeButton');

    const groupChatInputBar = document.getElementById('groupChatInputBar');
    const groupChatSection = document.getElementById('groupChatSection');
    const groupChatConnectionStatus = document.getElementById('groupChatConnectionStatus');
    const messagesAreaGroupChat = document.getElementById('messagesAreaGroupChat');
    const groupChatMessageInput = document.getElementById('groupChatMessageInput');
    const sendGroupChatMessageButton = document.getElementById('sendGroupChatMessageButton');
    const groupChatMenuButton = document.getElementById('groupChatMenuButton');
    const groupChatAttachmentMenu = document.getElementById('group-chat-attachment-menu');
    const groupAttachmentInput = document.getElementById('groupAttachmentInput');
    const profilePicInput = document.getElementById('profilePicInput');
    const replyContextBar = document.getElementById('replyContextBar');
    const replySender = document.getElementById('replySender');
    const replyTextPreview = document.getElementById('replyTextPreview');
    const cancelReplyButton = document.getElementById('cancelReplyButton');
    const chatNotificationSound = document.getElementById('chatNotificationSound');
    const profileSettingsSection = document.getElementById('profileSettingsSection');
    const profileSettingsPreviewPic = document.getElementById('profileSettingsPreviewPic');
    const profileSettingsPicInput = document.getElementById('profileSettingsPicInput');
    const profileSettingsNicknameInput = document.getElementById('profileSettingsNicknameInput');
    const profileSettingsStatusInput = document.getElementById('profileSettingsStatusInput');
    const profileSettingsBackButton = document.getElementById('profileSettingsBackButton');
    const profileSettingsSaveButton = document.getElementById('profileSettingsSaveButton');
    const profileSettingsMessage = document.getElementById('profileSettingsMessage');
    const scrollToBottomButton = document.getElementById('scrollToBottomButton');
    const mediaPreviewModal = document.getElementById('mediaPreviewModal');
    const previewImage = document.getElementById('previewImage');
    const previewVideo = document.getElementById('previewVideo');
    const mediaCaptionInput = document.getElementById('mediaCaptionInput');
    const sendMediaButton = document.getElementById('sendMediaButton');
    const cancelMediaButton = document.getElementById('cancelMediaButton');

    // State Aplikasi
    let currentView = 'home';
    let websocket = null;
    let userNickname = null; 
    let userProfilePictures = {};
    let isReplying = false;
    let replyContext = null;
    let typingTimer;
    const TYPING_TIMER_LENGTH = 2500;
    const usersTyping = {};
    let newProfilePicDataUrl = null;
    let isUserScrolledUp = false;
    let pendingMediaFile = null;
    let pendingMediaDataURL = null;

    function saveUserProfile(profileData) { try { localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profileData)); console.info('Profil pengguna disimpan ke localStorage.'); return true; } catch (e) { console.error('Gagal menyimpan profil ke localStorage.', e); return false; } }
    function loadUserProfile() { try { const storedProfile = localStorage.getItem(USER_PROFILE_KEY); if (storedProfile) { const profile = JSON.parse(storedProfile); console.info('Profil pengguna dimuat dari localStorage.'); userNickname = profile.nickname || null; if (userNickname && profile.profilePicUrl) { userProfilePictures[userNickname] = profile.profilePicUrl; } return profile; } } catch (e) { console.error('Gagal memuat atau parse profil dari localStorage.', e); } return null; }
    
    loadUserProfile(); 

    function showHomeView() {
        homeSection.style.display = 'flex';
        mainHeader.style.display = 'none';
        groupChatSection.style.display = 'none'; 
        profileSettingsSection.style.display = 'none';
        groupChatInputBar.style.display = 'none'; 
        replyContextBar.style.display = 'none';
        currentView = 'home';
        // Putuskan koneksi jika kembali ke home
        if (websocket && websocket.readyState === WebSocket.OPEN) {
            websocket.close();
        }
    }

    function showGroupChatView() {
        homeSection.style.display = 'none';
        mainHeader.style.display = 'flex';
        groupChatSection.style.display = 'flex';
        profileSettingsSection.style.display = 'none';
        groupChatInputBar.style.display = 'flex'; 
        replyContextBar.style.display = isReplying ? 'flex' : 'none'; 
        
        const myProfilePic = userProfilePictures[userNickname];
        if(appAvatar && myProfilePic && myProfilePic !== DEFAULT_GROUP_AVATAR_URL) {
            appAvatar.style.backgroundImage = `url('${myProfilePic}')`;
            appAvatar.textContent = '';
        } else if (appAvatar) {
            appAvatar.textContent = "💬";
            appAvatar.style.backgroundImage = '';
        }
        currentView = 'groupchat'; 
        if (groupChatAttachmentMenu.style.display === 'block') groupChatAttachmentMenu.style.display = 'none';
        connectWebSocket(); 
        if(messagesAreaGroupChat) messagesAreaGroupChat.scrollTop = messagesAreaGroupChat.scrollHeight; 
        checkScrollPosition();
    }

    function showProfileSettingsView() {
        homeSection.style.display = 'none';
        mainHeader.style.display = 'flex'; // Header tetap tampil
        groupChatSection.style.display = 'none';
        groupChatInputBar.style.display = 'none';
        replyContextBar.style.display = 'none';
        profileSettingsSection.style.display = 'block';

        appNameTitle.textContent = "Profil & Pengaturan";
        appStatus.textContent = "Kelola informasi Anda";
        const profile = loadUserProfile();
        if (profile) {
            profileSettingsNicknameInput.value = profile.nickname || '';
            profileSettingsStatusInput.value = profile.status || '';
            profileSettingsPreviewPic.src = profile.profilePicUrl || DEFAULT_GROUP_AVATAR_URL;
            if (appAvatar) {
                if (profile.profilePicUrl && profile.profilePicUrl !== DEFAULT_GROUP_AVATAR_URL) {
                    appAvatar.style.backgroundImage = `url('${profile.profilePicUrl}')`; appAvatar.textContent = '';
                } else {
                    appAvatar.textContent = "⚙️"; appAvatar.style.backgroundImage = '';
                }
            }
        } else {
            profileSettingsNicknameInput.value = userNickname || '';
            profileSettingsStatusInput.value = '';
            profileSettingsPreviewPic.src = userProfilePictures[userNickname] || DEFAULT_GROUP_AVATAR_URL;
            if(appAvatar) appAvatar.textContent = "⚙️";
            if(appAvatar) appAvatar.style.backgroundImage = '';
        }
        profileSettingsMessage.textContent = '';
        newProfilePicDataUrl = null;
        currentView = 'profilesettings';
    }

    function linkify(text) { if (typeof text !== 'string') return ''; const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig; return text.replace(urlRegex, function(url) { return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: var(--link-color); text-decoration: underline;">${url}</a>`; }); }
    function updateTypingIndicator() { const typingIndicator = document.getElementById('typingIndicator'); if (!typingIndicator) return; const currentlyTypingUsers = Object.keys(usersTyping); const count = currentlyTypingUsers.length; if (count === 0) { typingIndicator.textContent = ''; return; } if (count === 1) { typingIndicator.textContent = `${currentlyTypingUsers[0]} sedang mengetik...`; return; } if (count === 2) { typingIndicator.textContent = `${currentlyTypingUsers[0]} dan ${currentlyTypingUsers[1]} sedang mengetik...`; return; } typingIndicator.textContent = 'Beberapa orang sedang mengetik...'; }
    function initiateReply(messageId, senderName, messageText) { isReplying = true; replyContext = { messageId, senderName, messageText }; replySender.textContent = senderName; replyTextPreview.textContent = messageText; replyContextBar.style.display = 'flex'; groupChatMessageInput.focus(); }
    function cancelReply() { isReplying = false; replyContext = null; replyContextBar.style.display = 'none'; }
    function applySwipeToReplyHandler(element, messageData) { let startX = 0; let currentX = 0; let isDragging = false; const threshold = 60; function onDragStart(e) { if (e.target.tagName === 'A') return; startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX; isDragging = true; element.style.transition = 'none'; document.body.style.cursor = 'grabbing'; } function onDragMove(e) { if (!isDragging) return; currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX; let deltaX = currentX - startX; if (deltaX < 0) deltaX = 0; if (deltaX > 100) deltaX = 100; element.style.transform = `translateX(${deltaX}px)`; } function onDragEnd() { if (!isDragging) return; isDragging = false; document.body.style.cursor = 'default'; element.style.transition = 'transform 0.3s ease'; const finalX = Math.abs(parseFloat(element.style.transform.replace('translateX(', '').replace('px)', '')) || 0); if (finalX > threshold) { const textForReply = messageData.text || (messageData.mediaElement ? messageData.mediaElement.tagName : 'Media'); initiateReply(messageData.id, messageData.senderName, textForReply.length > 50 ? textForReply.substring(0, 47) + '...' : textForReply); } element.style.transform = 'translateX(0px)'; } element.addEventListener('mousedown', onDragStart); element.addEventListener('touchstart', onDragStart, { passive: true }); document.addEventListener('mousemove', onDragMove); document.addEventListener('mouseup', onDragEnd); document.addEventListener('touchmove', onDragMove, { passive: true }); document.addEventListener('touchend', onDragEnd); }
    
    function checkScrollPosition() { if (!messagesAreaGroupChat || !scrollToBottomButton) return; const threshold = 100; const isScrolledToBottom = messagesAreaGroupChat.scrollHeight - messagesAreaGroupChat.scrollTop - messagesAreaGroupChat.clientHeight < threshold; isUserScrolledUp = !isScrolledToBottom; if (isUserScrolledUp && messagesAreaGroupChat.scrollHeight > messagesAreaGroupChat.clientHeight + threshold) { scrollToBottomButton.style.display = 'flex'; } else { scrollToBottomButton.style.display = 'none'; } }
    function showMediaPreview(file) { pendingMediaFile = file; const reader = new FileReader(); reader.onload = (e) => { pendingMediaDataURL = e.target.result; mediaCaptionInput.value = ''; if (file.type.startsWith('image/')) { previewImage.src = pendingMediaDataURL; previewImage.style.display = 'block'; previewVideo.style.display = 'none'; } else if (file.type.startsWith('video/')) { previewVideo.src = pendingMediaDataURL; previewVideo.style.display = 'block'; previewImage.style.display = 'none'; } mediaPreviewModal.style.display = 'flex'; }; reader.readAsDataURL(file); }
    function hideMediaPreview() { mediaPreviewModal.style.display = 'none'; previewImage.src = '#'; previewVideo.src = ''; previewImage.style.display = 'none'; previewVideo.style.display = 'none'; pendingMediaFile = null; pendingMediaDataURL = null; mediaCaptionInput.value = ''; if(groupAttachmentInput) groupAttachmentInput.value = null; }

    function addMessageToChatUI(content, senderType, isHtmlOrMedia = false, targetArea = messagesAreaGroupChat, senderName = null, mediaElement = null, messageId = null, messageData = {}) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message-bubble', senderType);
        if(messageId) messageDiv.id = messageId;
        if (senderType === 'user' || senderType === 'group-in') { const profilePicImg = document.createElement('img'); profilePicImg.classList.add('profile-pic-bubble'); let picUrl = DEFAULT_GROUP_AVATAR_URL; if (senderType === 'user' && userProfilePictures[userNickname]) { picUrl = userProfilePictures[userNickname]; } else if (senderType === 'group-in' && userProfilePictures[senderName]) { picUrl = userProfilePictures[senderName]; } profilePicImg.src = picUrl; const displayNameForAlt = senderName || userNickname; profilePicImg.alt = (displayNameForAlt || "US").substring(0, 2); messageDiv.appendChild(profilePicImg); }
        const innerWrapper = document.createElement('div');
        innerWrapper.classList.add('message-inner-wrapper');
        if (messageData.replyTo) { const quoteDiv = document.createElement('div'); quoteDiv.classList.add('reply-quote'); const quoteSender = document.createElement('span'); quoteSender.classList.add('reply-quote-sender'); quoteSender.textContent = messageData.replyTo.senderName; const quoteText = document.createElement('span'); quoteText.classList.add('reply-quote-text'); quoteText.textContent = messageData.replyTo.messageText; quoteDiv.appendChild(quoteSender); quoteDiv.appendChild(quoteText); innerWrapper.appendChild(quoteDiv); }
        if (senderType === 'group-in' && senderName) { const nameSpan = document.createElement('span'); nameSpan.classList.add('sender-name'); nameSpan.textContent = senderName; innerWrapper.appendChild(nameSpan); }
        if (mediaElement) { innerWrapper.appendChild(mediaElement); if (messageData.caption) { const captionP = document.createElement('p'); captionP.classList.add('media-caption'); captionP.textContent = messageData.caption; innerWrapper.appendChild(captionP);}}
        else if (isHtmlOrMedia) { const contentDiv = document.createElement('div'); contentDiv.innerHTML = content; innerWrapper.appendChild(contentDiv); } 
        else { const p = document.createElement('p'); p.innerHTML = linkify(content); innerWrapper.appendChild(p); }
        if (senderType === 'user') { const statusSpan = document.createElement('span'); statusSpan.classList.add('message-status'); statusSpan.innerHTML = '<span class="checkmark">✓</span>'; innerWrapper.appendChild(statusSpan); }
        const isTextMessage = !mediaElement && !isHtmlOrMedia && typeof content === 'string' && content.trim() !== '';
        const isAudioMessage = mediaElement && mediaElement.tagName === 'AUDIO';
        if (isTextMessage || isAudioMessage) { innerWrapper.classList.add('flipper-border-active'); }
        messageDiv.appendChild(innerWrapper);
        if (targetArea === messagesAreaGroupChat && senderType !== 'system-message' && senderType !== 'system-error') { applySwipeToReplyHandler(innerWrapper, { id: messageId, senderName: senderName, text: content, mediaElement: mediaElement }); }
        if (targetArea) { 
            const isScrolledToBottomInitially = targetArea.scrollHeight - targetArea.scrollTop - targetArea.clientHeight < 10;
            targetArea.appendChild(messageDiv); 
            if (targetArea === messagesAreaGroupChat) { if (!isUserScrolledUp || senderType === 'user' || isScrolledToBottomInitially) { targetArea.scrollTop = targetArea.scrollHeight; } checkScrollPosition(); } 
            else { targetArea.scrollTop = targetArea.scrollHeight; }
        } else { console.error("Target area for chat message is null or undefined."); }
    }

    function connectWebSocket() { if (websocket && (websocket.readyState === WebSocket.OPEN || websocket.readyState === WebSocket.CONNECTING)) { return; } const WEBSOCKET_URL = 'wss://chat.ravaelstore.my.id'; if(groupChatConnectionStatus) groupChatConnectionStatus.textContent = "Menghubungkan ke server chat..."; if(appStatus) appStatus.textContent = "Menghubungkan..."; websocket = new WebSocket(WEBSOCKET_URL); websocket.onopen = (event) => { console.info("WebSocket Terhubung!"); if (!userNickname) { let promptedNick = `User${Math.floor(Math.random() * 1000)}`; const newNick = prompt("Masukkan nama panggilan Anda untuk chat (atau atur di Profil & Pengaturan):", promptedNick); if (newNick && newNick.trim() !== "") { userNickname = newNick.trim(); } else { userNickname = promptedNick; } const initialProfile = loadUserProfile() || {}; initialProfile.nickname = userNickname; if (!initialProfile.profilePicUrl) initialProfile.profilePicUrl = DEFAULT_GROUP_AVATAR_URL; saveUserProfile(initialProfile); } if(groupChatConnectionStatus) groupChatConnectionStatus.textContent = `Terhubung sebagai: ${userNickname}`; if(appStatus) appStatus.textContent = `Terhubung sebagai: ${userNickname}`; if(groupChatConnectionStatus) groupChatConnectionStatus.style.color = "var(--accent-green)"; const myCurrentProfilePic = userProfilePictures[userNickname] || DEFAULT_GROUP_AVATAR_URL; if (myCurrentProfilePic && myCurrentProfilePic !== DEFAULT_GROUP_AVATAR_URL) { websocket.send(JSON.stringify({ type: 'profile_picture_update', nickname: userNickname, dataUrl: myCurrentProfilePic })); } if(appAvatar){ if (myCurrentProfilePic && myCurrentProfilePic !== DEFAULT_GROUP_AVATAR_URL) { appAvatar.style.backgroundImage = `url('${myCurrentProfilePic}')`; appAvatar.textContent = ''; } else { appAvatar.textContent = "💬"; appAvatar.style.backgroundImage = ''; } } }; websocket.onmessage = async (event) => { let messageTextContent = (event.data instanceof Blob) ? await event.data.text() : String(event.data); try { const messageData = JSON.parse(messageTextContent); if (messageData.type === 'message') { if (messageData.nickname !== userNickname) { addMessageToChatUI(messageData.text, 'group-in', false, messagesAreaGroupChat, messageData.nickname, null, messageData.id, messageData); if (chatNotificationSound && (document.hidden || currentView !== 'groupchat')) { chatNotificationSound.play().catch(error => { console.warn("Gagal memutar suara notifikasi:", error); }); } } } else if (messageData.type === 'file_message' && messageData.nickname !== userNickname) { let mediaElement; if (messageData.filetype.startsWith('image/')) { mediaElement = document.createElement('img'); mediaElement.src = messageData.filecontent; mediaElement.alt = messageData.filename; } else if (messageData.filetype.startsWith('video/')) { mediaElement = document.createElement('video'); mediaElement.src = messageData.filecontent; mediaElement.controls = true; } else if (messageData.filetype.startsWith('audio/')) { mediaElement = document.createElement('audio'); mediaElement.src = messageData.filecontent; mediaElement.controls = true; } else { mediaElement = document.createElement('a'); mediaElement.href = messageData.filecontent; mediaElement.textContent = `Unduh: ${messageData.filename}`; mediaElement.download = messageData.filename; } if(mediaElement) mediaElement.classList.add('media-attachment'); addMessageToChatUI(null, 'group-in', true, messagesAreaGroupChat, messageData.nickname, mediaElement, messageData.id, messageData); if (chatNotificationSound && (document.hidden || currentView !== 'groupchat')) { chatNotificationSound.play().catch(error => { console.warn("Gagal memutar suara notifikasi:", error); }); } } else if (messageData.type === 'profile_picture_update') { userProfilePictures[messageData.nickname] = messageData.dataUrl; if (messageData.nickname !== userNickname) { addMessageToChatUI(`<i>${messageData.nickname} memperbarui foto profil.</i>`, 'system-message', true, messagesAreaGroupChat); document.querySelectorAll('.message-bubble.group-in').forEach(bubble => { const senderNameElem = bubble.querySelector('.sender-name'); if (senderNameElem && senderNameElem.textContent === messageData.nickname) { const ppImg = bubble.querySelector('.profile-pic-bubble'); if (ppImg) ppImg.src = messageData.dataUrl; } }); } else { if(currentView === 'groupchat' && appAvatar){ appAvatar.style.backgroundImage = `url('${messageData.dataUrl}')`; appAvatar.textContent = ''; } } } else if (messageData.type === 'user_join') { addMessageToChatUI(`<i>${messageData.nickname} telah bergabung.</i>`, 'system-message', true, messagesAreaGroupChat); } else if (messageData.type === 'user_leave') { addMessageToChatUI(`<i>${messageData.nickname} telah keluar.</i>`, 'system-message', true, messagesAreaGroupChat); } else if (messageData.type === 'user_count_update') { if(onlineUserCount) onlineUserCount.textContent = `${messageData.count} Online`; } else if (messageData.type === 'typing' && messageData.nickname !== userNickname) { if (messageData.isTyping) { usersTyping[messageData.nickname] = true; } else { delete usersTyping[messageData.nickname]; } updateTypingIndicator(); } else if (messageData.type === 'system-message') { addMessageToChatUI(messageData.text, 'system-message', true, messagesAreaGroupChat, null, null, null, messageData); } } catch (e) { console.error("Error memproses pesan:", e, "Data:", messageTextContent); } if(messagesAreaGroupChat) messagesAreaGroupChat.scrollTop = messagesAreaGroupChat.scrollHeight; }; websocket.onerror = (error) => { console.error("WebSocket Error:", error); if(groupChatConnectionStatus) groupChatConnectionStatus.textContent = "Error koneksi."; }; websocket.onclose = (event) => { console.info("WebSocket Terputus:", event.code); if(groupChatConnectionStatus) groupChatConnectionStatus.textContent = "Koneksi terputus."; if(onlineUserCount) onlineUserCount.textContent = "0 Online"; websocket = null; if (currentView === 'groupchat') { setTimeout(connectWebSocket, 5000); } }; }
    function sendGroupMessage(text = null, payloadOverride = null) { const messageText = text || (groupChatMessageInput ? groupChatMessageInput.value.trim() : ""); if ((!messageText && !payloadOverride) || !websocket || websocket.readyState !== WebSocket.OPEN) return; clearTimeout(typingTimer); websocket.send(JSON.stringify({ type: 'typing', nickname: userNickname, isTyping: false })); const messageId = `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`; let finalPayload; if (payloadOverride) { finalPayload = payloadOverride; } else { finalPayload = { type: 'message', nickname: userNickname, text: messageText, id: messageId }; if (isReplying && replyContext) { finalPayload.replyTo = replyContext; } } websocket.send(JSON.stringify(finalPayload)); if (isReplying) { cancelReply(); } if (finalPayload.type === 'message') { addMessageToChatUI(finalPayload.text, 'user', false, messagesAreaGroupChat, userNickname, null, messageId, finalPayload); } else if (finalPayload.type === 'file_message') { let mediaElement; if (finalPayload.filetype.startsWith('image/')) { mediaElement = document.createElement('img'); mediaElement.src = finalPayload.filecontent; mediaElement.alt = finalPayload.filename; } else if (finalPayload.filetype.startsWith('video/')) { mediaElement = document.createElement('video'); mediaElement.src = finalPayload.filecontent; mediaElement.controls = true; } else if (finalPayload.filetype.startsWith('audio/')) { mediaElement = document.createElement('audio'); mediaElement.src = finalPayload.filecontent; mediaElement.controls = true; } else { mediaElement = document.createElement('p'); mediaElement.textContent = `Anda mengirim file: ${finalPayload.filename}`; } if(mediaElement) mediaElement.classList.add('media-attachment'); addMessageToChatUI(null, 'user', true, messagesAreaGroupChat, userNickname, mediaElement, messageId, finalPayload); } if(!text && !payloadOverride && groupChatMessageInput) groupChatMessageInput.value = ""; if(messagesAreaGroupChat) messagesAreaGroupChat.scrollTop = messagesAreaGroupChat.scrollHeight; }
    
    // Event Listeners
    if (enterChatButton) { enterChatButton.addEventListener('click', showGroupChatView); }
    if (backToHomeButton) { backToHomeButton.addEventListener('click', showHomeView); }
    if (sendGroupChatMessageButton) { sendGroupChatMessageButton.addEventListener('click', () => sendGroupMessage()); }
    if (groupChatMessageInput) { groupChatMessageInput.addEventListener('keypress', (event) => { if (event.key === 'Enter') { event.preventDefault(); sendGroupMessage(); } }); }
    if(profileSettingsPreviewPic) { profileSettingsPreviewPic.addEventListener('click', () => { if(profileSettingsPicInput) profileSettingsPicInput.click(); }); }
    if(profileSettingsPicInput) { profileSettingsPicInput.addEventListener('change', (event) => { const file = event.target.files[0]; if (file) { if (file.size > 2 * 1024 * 1024) { alert("Ukuran foto profil terlalu besar! Maksimum 2MB."); profileSettingsPicInput.value = null; return; } const reader = new FileReader(); reader.onload = (e) => { profileSettingsPreviewPic.src = e.target.result; newProfilePicDataUrl = e.target.result; }; reader.readAsDataURL(file); } }); }
    if(profileSettingsSaveButton) { profileSettingsSaveButton.addEventListener('click', () => { const newNickname = profileSettingsNicknameInput.value.trim(); const newStatus = profileSettingsStatusInput.value.trim(); if (!newNickname) { alert("Nama panggilan tidak boleh kosong!"); return; } let oldProfile = loadUserProfile() || {}; let oldNicknameForServer = userNickname; const profileToSave = { nickname: newNickname, status: newStatus, profilePicUrl: newProfilePicDataUrl || oldProfile.profilePicUrl || userProfilePictures[oldNicknameForServer] || DEFAULT_GROUP_AVATAR_URL }; if (saveUserProfile(profileToSave)) { userNickname = newNickname; if (profileToSave.profilePicUrl) { userProfilePictures[userNickname] = profileToSave.profilePicUrl; } if (currentView === 'groupchat' && appAvatar) { if (profileToSave.profilePicUrl && profileToSave.profilePicUrl !== DEFAULT_GROUP_AVATAR_URL) { appAvatar.style.backgroundImage = `url('${profileToSave.profilePicUrl}')`; appAvatar.textContent = ''; } else { appAvatar.style.backgroundImage = ''; appAvatar.textContent = '💬';} appNameTitle.textContent = "Grup Chat Umum"; appStatus.textContent = `Terhubung sebagai: ${userNickname}`; } else if (appAvatar && currentView === 'profilesettings') { if (profileToSave.profilePicUrl && profileToSave.profilePicUrl !== DEFAULT_GROUP_AVATAR_URL) { appAvatar.style.backgroundImage = `url('${profileToSave.profilePicUrl}')`; appAvatar.textContent = ''; } else { appAvatar.style.backgroundImage = ''; appAvatar.textContent = '⚙️';} } if (websocket && websocket.readyState === WebSocket.OPEN) { if (oldNicknameForServer !== newNickname && newNickname) { websocket.send(JSON.stringify({ type: 'nickname_update', oldNickname: oldNicknameForServer || "PenggunaLama", newNickname: newNickname })); } if (newProfilePicDataUrl) { websocket.send(JSON.stringify({ type: 'profile_picture_update', nickname: newNickname, dataUrl: newProfilePicDataUrl })); } } newProfilePicDataUrl = null; profileSettingsPicInput.value = null; profileSettingsMessage.textContent = 'Profil berhasil disimpan!'; setTimeout(() => { profileSettingsMessage.textContent = ''; }, 3000); } else { profileSettingsMessage.textContent = 'Gagal menyimpan profil.'; } }); }
    if(profileSettingsBackButton) { profileSettingsBackButton.addEventListener('click', () => { showGroupChatView(); }); }
    if(groupChatMenuButton) { groupChatMenuButton.addEventListener('click', (event) => { event.stopPropagation(); groupChatAttachmentMenu.style.display = groupChatAttachmentMenu.style.display === 'block' ? 'none' : 'block'; }); }
    if(cancelReplyButton) { cancelReplyButton.addEventListener('click', cancelReply); }
    if(groupChatAttachmentMenu) { groupChatAttachmentMenu.querySelectorAll('li').forEach(item => { item.addEventListener('click', () => { const action = item.getAttribute('data-gaction'); groupChatAttachmentMenu.style.display = 'none'; if (action === 'send-image' || action === 'send-video') { groupAttachmentInput.accept = action === 'send-image' ? "image/*" : "video/*"; groupAttachmentInput.onchange = (event) => { const file = event.target.files[0]; if (file) { let maxSizeMB = action === 'send-image' ? 5 : 10; if (file.size > maxSizeMB * 1024 * 1024) { alert(`Ukuran file terlalu besar! Maksimum ${maxSizeMB}MB.`); groupAttachmentInput.value = null; return; } showMediaPreview(file); } }; groupAttachmentInput.click(); } else if (action === 'send-audio') { groupAttachmentInput.accept = "audio/*"; groupAttachmentInput.onchange = handleGroupFileSend; groupAttachmentInput.click(); } else if (action === 'change-profile-settings') { showProfileSettingsView(); } }); }); }
    
    function handleGroupFileSend(event) { const file = event.target.files[0]; if (!file || !userNickname) return; let maxSizeMB = 5; let fileTypeCategory = 'file'; if (file.type.startsWith('image/')) { maxSizeMB = 5; fileTypeCategory = 'gambar'; } else if (file.type.startsWith('video/')) { maxSizeMB = 10; fileTypeCategory = 'video'; } else if (file.type.startsWith('audio/')) { maxSizeMB = 10; fileTypeCategory = 'audio'; } if (file.size > maxSizeMB * 1024 * 1024) { alert(`Ukuran ${fileTypeCategory} terlalu besar! Maksimum ${maxSizeMB}MB.`); if (groupAttachmentInput) groupAttachmentInput.value = null; return; } const loadingMessageId = `loading-${Date.now()}`; const loadingText = `<i>⏳ Mengirim ${fileTypeCategory}: ${file.name}...</i>`; addMessageToChatUI(loadingText, 'system-message', true, messagesAreaGroupChat, null, null, loadingMessageId); const reader = new FileReader(); reader.onload = (e_reader) => { const loadingMessageElement = document.getElementById(loadingMessageId); if (loadingMessageElement) { loadingMessageElement.remove(); } const filePayload = { type: 'file_message', nickname: userNickname, filename: file.name, filetype: file.type, filecontent: e_reader.target.result }; sendGroupMessage(null, filePayload); }; reader.onerror = (error) => { const loadingMessageElement = document.getElementById(loadingMessageId); if (loadingMessageElement) { loadingMessageElement.remove(); } console.error("Error membaca file:", error); addMessageToChatUI("Gagal memproses file.", 'system-error', true, messagesAreaGroupChat); }; reader.readAsDataURL(file); if (groupAttachmentInput) groupAttachmentInput.value = null; }
    
    if(scrollToBottomButton) { scrollToBottomButton.addEventListener('click', () => { if(messagesAreaGroupChat) messagesAreaGroupChat.scrollTop = messagesAreaGroupChat.scrollHeight; }); }
    if(messagesAreaGroupChat) { messagesAreaGroupChat.addEventListener('scroll', checkScrollPosition); }
    if(sendMediaButton) { sendMediaButton.addEventListener('click', () => { if (pendingMediaFile && pendingMediaDataURL) { const caption = mediaCaptionInput.value.trim(); const filePayload = { type: 'file_message', nickname: userNickname, filename: pendingMediaFile.name, filetype: pendingMediaFile.type, filecontent: pendingMediaDataURL, caption: caption || null }; sendGroupMessage(null, filePayload); hideMediaPreview(); } }); }
    if(cancelMediaButton) { cancelMediaButton.addEventListener('click', hideMediaPreview); }

    window.addEventListener('click', (e) => { if (groupChatAttachmentMenu && groupChatAttachmentMenu.style.display === 'block' && !groupChatMenuButton.contains(e.target) && !groupChatAttachmentMenu.contains(e.target)) { groupChatAttachmentMenu.style.display = 'none'; } });
    if(groupChatMessageInput) { groupChatMessageInput.addEventListener('input', () => { if (!websocket || websocket.readyState !== WebSocket.OPEN) return; clearTimeout(typingTimer); websocket.send(JSON.stringify({ type: 'typing', nickname: userNickname, isTyping: true })); typingTimer = setTimeout(() => { websocket.send(JSON.stringify({ type: 'typing', nickname: userNickname, isTyping: false })); }, TYPING_TIMER_LENGTH); }); }
    
    // Inisialisasi Aplikasi
    showHomeView(); 
});