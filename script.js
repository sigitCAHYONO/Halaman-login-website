document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // === KONFIGURASI & VARIABEL GLOBAL ===
    // ==========================================

    const USER_PROFILE_KEY = 'userProfileData';
    const TIKTOK_API_KEY = "VintexMD";
    const DEFAULT_FAKESTORY_PP_URL = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
    const DEFAULT_GROUP_AVATAR_URL = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%233A4B53"/><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="50" fill="white">?</text></svg>';
    const WEBSOCKET_URL = 'wss://chat.ravaelstore.my.id';

    // Selektor Elemen DOM
    const appNameTitle = document.getElementById('appName');
    const appStatus = document.getElementById('appStatus');
    const appAvatar = document.getElementById('appAvatar');
    const onlineUserCount = document.getElementById('onlineUserCount');
    const downloaderSection = document.getElementById('downloaderSection');
    const messagesAreaDownloader = document.getElementById('messagesAreaDownloader');
    const commandInput = document.getElementById('commandInput');
    const sendButtonDownloader = document.getElementById('sendButtonDownloader');
    const fakeStorySection = document.getElementById('fakeStorySection');
    const usernameInput = document.getElementById('usernameInput');
    const captionInput = document.getElementById('captionInput');
    const profilePicInputFS = document.getElementById('profilePicInputFS');
    const backgroundPicInputFS = document.getElementById('backgroundPicInputFS');
    const generateStoryButton = document.getElementById('generateStoryButton');
    const backToChatButton = document.getElementById('backToChatButton');
    const loadingMessageStory = document.getElementById('loadingMessageStory');
    const errorDisplayStory = document.getElementById('errorDisplayStory');
    const resultContainerStory = document.getElementById('resultContainerStory');
    const storyImage = document.getElementById('storyImage');
    const downloadLinkStory = document.getElementById('downloadLinkStory');
    const storyCanvas = document.getElementById('storyCanvas');
    const ctx = storyCanvas.getContext('2d');
    const menuButton = document.getElementById('menuButton');
    const attachmentMenu = document.getElementById('attachment-menu');
    const mainInputBar = document.getElementById('mainInputBar');
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
    const emojiPickerButton = document.getElementById('emojiPickerButton');
    const emojiPanel = document.getElementById('emojiPanel');
    const scrollToBottomButton = document.getElementById('scrollToBottomButton');
    const mediaPreviewModal = document.getElementById('mediaPreviewModal');
    const previewImage = document.getElementById('previewImage');
    const previewVideo = document.getElementById('previewVideo');
    const mediaCaptionInput = document.getElementById('mediaCaptionInput');
    const sendMediaButton = document.getElementById('sendMediaButton');
    const cancelMediaButton = document.getElementById('cancelMediaButton');

    // Variabel State Aplikasi
    let currentView = 'downloader';
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
    const emojis = ['😀', '😂', '😊', '😍', '🤔', '😢', '😮', '😎', '😭', '👍', '👎', '❤️', '💔', '🔥', '✨', '🎉', '💯', '🙏', '👀', '👋', '🤔', '🥳', '🤯', '😱', '😇', '😅', '🤣', '😉', '😌', '😋', '😜', '🤨', '🧐', '🙄', '😬', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', ' P', '😕', '😟', '🙁', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😓', '🤗', ' K', '🤝', '🤲', '🙌', '👏', '💪', '🦾', '🖕', ' V', ' L', '🤳', '💃', '🕺', ' L', '👤', '👥', '🗣️', ' L', ' K', ' L'];


    // ==================================
    // === FUNGSI-FUNGSI UTILITAS ===
    // ==================================

    function saveUserProfile(profileData) {
        try {
            localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profileData));
            console.info('Profil pengguna disimpan ke localStorage.');
            return true;
        } catch (e) {
            console.error('Gagal menyimpan profil ke localStorage.', e);
            return false;
        }
    }

    function loadUserProfile() {
        try {
            const storedProfile = localStorage.getItem(USER_PROFILE_KEY);
            if (storedProfile) {
                const profile = JSON.parse(storedProfile);
                console.info('Profil pengguna dimuat dari localStorage.');
                userNickname = profile.nickname || null;
                if (userNickname && profile.profilePicUrl) {
                    userProfilePictures[userNickname] = profile.profilePicUrl;
                }
                return profile;
            }
        } catch (e) {
            console.error('Gagal memuat atau parse profil dari localStorage.', e);
        }
        return null;
    }

    function linkify(text) {
        if (typeof text !== 'string') {
            return '';
        }
        const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(urlRegex, function(url) {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: var(--link-color); text-decoration: underline;">${url}</a>`;
        });
    }

    function loadImageBrowser(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => resolve(img);
            img.onerror = (err) => {
                console.error(`Gagal memuat gambar dari: ${url}`, err);
                reject(new Error(`Gagal memuat gambar dari URL: ${url.substring(0,50)}...`));
            };
            img.src = url;
        });
    }

    // ================================================
    // === FUNGSI UNTUK MENGGANTI TAMPILAN (VIEW) ===
    // ================================================

    function showDownloaderView() {
        downloaderSection.style.display = 'flex';
        fakeStorySection.style.display = 'none';
        groupChatSection.style.display = 'none';
        profileSettingsSection.style.display = 'none';
        mainInputBar.style.display = 'flex';
        groupChatInputBar.style.display = 'none';
        replyContextBar.style.display = 'none';
        appNameTitle.textContent = "Bot Web Multifitur";
        appStatus.textContent = "Mode Downloader";
        if (appAvatar) {
            appAvatar.textContent = "🚀";
            appAvatar.style.backgroundImage = '';
        }
        currentView = 'downloader';
        if (backToChatButton) {
            backToChatButton.textContent = "Kembali ke Downloader";
        }
        if (attachmentMenu.style.display === 'block') {
            attachmentMenu.style.display = 'none';
        }
        if (groupChatAttachmentMenu.style.display === 'block') {
            groupChatAttachmentMenu.style.display = 'none';
        }
        if (emojiPanel) {
            emojiPanel.style.display = 'none';
        }
    }

    function showFakeStoryView() {
        downloaderSection.style.display = 'none';
        fakeStorySection.style.display = 'block';
        groupChatSection.style.display = 'none';
        profileSettingsSection.style.display = 'none';
        mainInputBar.style.display = 'none';
        groupChatInputBar.style.display = 'none';
        replyContextBar.style.display = 'none';
        appNameTitle.textContent = "Fake Story Generator";
        appStatus.textContent = "Mode Buat Story";
        if (appAvatar) {
            appAvatar.textContent = "🖌️";
            appAvatar.style.backgroundImage = '';
        }
        currentView = 'fakestory';
        if (backToChatButton) {
            backToChatButton.textContent = "Kembali";
        }
        if (usernameInput) usernameInput.value = '';
        if (captionInput) captionInput.value = '';
        if (profilePicInputFS) profilePicInputFS.value = null;
        if (backgroundPicInputFS) backgroundPicInputFS.value = null;
        if (resultContainerStory) resultContainerStory.style.display = 'none';
        if (errorDisplayStory) errorDisplayStory.style.display = 'none';
        if (attachmentMenu.style.display === 'block') attachmentMenu.style.display = 'none';
        if (groupChatAttachmentMenu.style.display === 'block') groupChatAttachmentMenu.style.display = 'none';
        if (emojiPanel) emojiPanel.style.display = 'none';
    }

    function showGroupChatView() {
        downloaderSection.style.display = 'none';
        fakeStorySection.style.display = 'none';
        groupChatSection.style.display = 'flex';
        profileSettingsSection.style.display = 'none';
        mainInputBar.style.display = 'none';
        groupChatInputBar.style.display = 'flex';
        appNameTitle.textContent = "Grup Chat Umum";
        appStatus.textContent = "Menghubungkan...";
        const myProfilePic = userProfilePictures[userNickname];
        if (appAvatar && myProfilePic && myProfilePic !== DEFAULT_GROUP_AVATAR_URL) {
            appAvatar.style.backgroundImage = `url('${myProfilePic}')`;
            appAvatar.textContent = '';
        } else if (appAvatar) {
            appAvatar.textContent = "💬";
            appAvatar.style.backgroundImage = '';
        }
        currentView = 'groupchat';
        if (backToChatButton) {
            backToChatButton.textContent = "Kembali";
        }
        if (attachmentMenu.style.display === 'block') {
            attachmentMenu.style.display = 'none';
        }
        connectWebSocket();
        if (messagesAreaGroupChat) {
            messagesAreaGroupChat.scrollTop = messagesAreaGroupChat.scrollHeight;
        }
        checkScrollPosition();
        if (emojiPanel) {
            emojiPanel.style.display = 'none';
        }
    }

    function showProfileSettingsView() {
        downloaderSection.style.display = 'none';
        fakeStorySection.style.display = 'none';
        groupChatSection.style.display = 'none';
        mainInputBar.style.display = 'none';
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
                    appAvatar.style.backgroundImage = `url('${profile.profilePicUrl}')`;
                    appAvatar.textContent = '';
                } else {
                    appAvatar.textContent = "⚙️";
                    appAvatar.style.backgroundImage = '';
                }
            }
        } else {
            profileSettingsNicknameInput.value = userNickname || '';
            profileSettingsStatusInput.value = '';
            profileSettingsPreviewPic.src = userProfilePictures[userNickname] || DEFAULT_GROUP_AVATAR_URL;
            if (appAvatar) {
                appAvatar.textContent = "⚙️";
            }
            if (appAvatar) {
                appAvatar.style.backgroundImage = '';
            }
        }
        profileSettingsMessage.textContent = '';
        newProfilePicDataUrl = null;
        currentView = 'profilesettings';
        if (emojiPanel) {
            emojiPanel.style.display = 'none';
        }
    }

    // =================================
    // === FUNGSI-FUNGSI UTAMA APP ===
    // =================================

    function updateTypingIndicator() {
        if (!typingIndicator) return;

        const currentlyTypingUsers = Object.keys(usersTyping);
        const count = currentlyTypingUsers.length;

        if (count === 0) {
            typingIndicator.textContent = '';
        } else if (count === 1) {
            typingIndicator.textContent = `${currentlyTypingUsers[0]} sedang mengetik...`;
        } else if (count === 2) {
            typingIndicator.textContent = `${currentlyTypingUsers[0]} dan ${currentlyTypingUsers[1]} sedang mengetik...`;
        } else {
            typingIndicator.textContent = 'Beberapa orang sedang mengetik...';
        }
    }

    function initiateReply(messageId, senderName, messageText) {
        isReplying = true;
        replyContext = {
            messageId,
            senderName,
            messageText
        };
        replySender.textContent = senderName;
        replyTextPreview.textContent = messageText;
        replyContextBar.style.display = 'flex';
        groupChatMessageInput.focus();
    }

    function cancelReply() {
        isReplying = false;
        replyContext = null;
        replyContextBar.style.display = 'none';
    }

    function addMessageToChatUI(content, senderType, isHtmlOrMedia = false, targetArea = messagesAreaDownloader, senderName = null, mediaElement = null, messageId = null, messageData = {}) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message-bubble', senderType);
        if (messageId) {
            messageDiv.id = messageId;
        }

        if (senderType === 'user' || senderType === 'group-in') {
            const profilePicImg = document.createElement('img');
            profilePicImg.classList.add('profile-pic-bubble');
            let picUrl = DEFAULT_GROUP_AVATAR_URL;
            if (senderType === 'user' && userProfilePictures[userNickname]) {
                picUrl = userProfilePictures[userNickname];
            } else if (senderType === 'group-in' && userProfilePictures[senderName]) {
                picUrl = userProfilePictures[senderName];
            }
            profilePicImg.src = picUrl;
            const displayNameForAlt = senderName || userNickname;
            profilePicImg.alt = (displayNameForAlt || "US").substring(0, 2);
            messageDiv.appendChild(profilePicImg);
        }

        const innerWrapper = document.createElement('div');
        innerWrapper.classList.add('message-inner-wrapper');

        if (messageData.replyTo) {
            const quoteDiv = document.createElement('div');
            quoteDiv.classList.add('reply-quote');
            const quoteSender = document.createElement('span');
            quoteSender.classList.add('reply-quote-sender');
            quoteSender.textContent = messageData.replyTo.senderName;
            const quoteText = document.createElement('span');
            quoteText.classList.add('reply-quote-text');
            quoteText.textContent = messageData.replyTo.messageText;
            quoteDiv.appendChild(quoteSender);
            quoteDiv.appendChild(quoteText);
            innerWrapper.appendChild(quoteDiv);
        }

        if (senderType === 'group-in' && senderName) {
            const nameSpan = document.createElement('span');
            nameSpan.classList.add('sender-name');
            nameSpan.textContent = senderName;
            innerWrapper.appendChild(nameSpan);
        }

        if (mediaElement) {
            innerWrapper.appendChild(mediaElement);
            if (messageData.caption) {
                const captionP = document.createElement('p');
                captionP.classList.add('media-caption');
                captionP.textContent = messageData.caption;
                innerWrapper.appendChild(captionP);
            }
        } else if (isHtmlOrMedia) {
            const contentDiv = document.createElement('div');
            contentDiv.innerHTML = content;
            innerWrapper.appendChild(contentDiv);
        } else {
            const p = document.createElement('p');
            p.innerHTML = linkify(content);
            innerWrapper.appendChild(p);
        }

        if (senderType === 'user') {
            const statusSpan = document.createElement('span');
            statusSpan.classList.add('message-status');
            statusSpan.innerHTML = '<span class="checkmark">✓</span>';
            innerWrapper.appendChild(statusSpan);
        }

        const isTextMessage = !mediaElement && !isHtmlOrMedia && typeof content === 'string' && content.trim() !== '';
        const isAudioMessage = mediaElement && mediaElement.tagName === 'AUDIO';
        if (isTextMessage || isAudioMessage) {
            innerWrapper.classList.add('flipper-border-active');
        }

        messageDiv.appendChild(innerWrapper);

        if (targetArea === messagesAreaGroupChat && senderType !== 'system-message' && senderType !== 'system-error') {
            applySwipeToReplyHandler(innerWrapper, {
                id: messageId,
                senderName: senderName,
                text: content,
                mediaElement: mediaElement
            });
        }

        if (targetArea) {
            const isScrolledToBottomInitially = targetArea.scrollHeight - targetArea.scrollTop - targetArea.clientHeight < 10;
            targetArea.appendChild(messageDiv);
            if (targetArea === messagesAreaGroupChat) {
                if (!isUserScrolledUp || senderType === 'user' || isScrolledToBottomInitially) {
                    targetArea.scrollTop = targetArea.scrollHeight;
                }
                checkScrollPosition();
            } else {
                targetArea.scrollTop = targetArea.scrollHeight;
            }
        } else {
            console.error("Target area for chat message is null or undefined.");
        }
    }
    
    // ... Sisa fungsi akan ditambahkan di sini
    
    // ==================================
    // === KONEKSI WEBSOCKET & CHAT ===
    // ==================================

    function connectWebSocket() {
        if (websocket && (websocket.readyState === WebSocket.OPEN || websocket.readyState === WebSocket.CONNECTING)) {
            return;
        }

        if (groupChatConnectionStatus) groupChatConnectionStatus.textContent = "Menghubungkan ke server chat...";
        if (appStatus) appStatus.textContent = "Menghubungkan...";

        websocket = new WebSocket(WEBSOCKET_URL);

        websocket.onopen = (event) => {
            console.info("WebSocket Terhubung!");
            if (!userNickname) {
                let promptedNick = `User${Math.floor(Math.random() * 1000)}`;
                const newNick = prompt("Masukkan nama panggilan Anda untuk chat (atau atur di Profil & Pengaturan):", promptedNick);
                if (newNick && newNick.trim() !== "") {
                    userNickname = newNick.trim();
                } else {
                    userNickname = promptedNick;
                }
                const initialProfile = loadUserProfile() || {};
                initialProfile.nickname = userNickname;
                if (!initialProfile.profilePicUrl) {
                    initialProfile.profilePicUrl = DEFAULT_GROUP_AVATAR_URL;
                }
                saveUserProfile(initialProfile);
            }

            if (groupChatConnectionStatus) {
                groupChatConnectionStatus.textContent = `Terhubung sebagai: ${userNickname}`;
                groupChatConnectionStatus.style.color = "var(--accent-green)";
            }
            if (appStatus) appStatus.textContent = `Terhubung sebagai: ${userNickname}`;

            const myCurrentProfilePic = userProfilePictures[userNickname] || DEFAULT_GROUP_AVATAR_URL;
            if (myCurrentProfilePic && myCurrentProfilePic !== DEFAULT_GROUP_AVATAR_URL) {
                websocket.send(JSON.stringify({
                    type: 'profile_picture_update',
                    nickname: userNickname,
                    dataUrl: myCurrentProfilePic
                }));
            }
            if (appAvatar) {
                if (myCurrentProfilePic && myCurrentProfilePic !== DEFAULT_GROUP_AVATAR_URL) {
                    appAvatar.style.backgroundImage = `url('${myCurrentProfilePic}')`;
                    appAvatar.textContent = '';
                } else {
                    appAvatar.textContent = "💬";
                    appAvatar.style.backgroundImage = '';
                }
            }
        };

        websocket.onmessage = async(event) => {
            let messageTextContent = (event.data instanceof Blob) ? await event.data.text() : String(event.data);
            try {
                const messageData = JSON.parse(messageTextContent);

                if (messageData.nickname === userNickname && !messageData.isHistory) {
                    // Ini adalah pesan dari diri sendiri yang sudah ditampilkan, abaikan.
                    // Kecuali jika itu adalah pesan history dari server.
                    return;
                }
                
                let mediaElement = null;

                switch (messageData.type) {
                    case 'message':
                        addMessageToChatUI(messageData.text, 'group-in', false, messagesAreaGroupChat, messageData.nickname, null, messageData.id, messageData);
                        break;
                    
                    case 'file_message':
                        if (messageData.filetype.startsWith('image/')) {
                            mediaElement = document.createElement('img');
                            mediaElement.src = messageData.filecontent;
                            mediaElement.alt = messageData.filename;
                        } else if (messageData.filetype.startsWith('video/')) {
                            mediaElement = document.createElement('video');
                            mediaElement.src = messageData.filecontent;
                            mediaElement.controls = true;
                        } else if (messageData.filetype.startsWith('audio/')) {
                            mediaElement = document.createElement('audio');
                            mediaElement.src = messageData.filecontent;
                            mediaElement.controls = true;
                        } else {
                            mediaElement = document.createElement('a');
                            mediaElement.href = messageData.filecontent;
                            mediaElement.textContent = `Unduh: ${messageData.filename}`;
                            mediaElement.download = messageData.filename;
                        }

                        if (mediaElement) {
                            mediaElement.classList.add('media-attachment');
                        }
                        
                        addMessageToChatUI(null, 'group-in', true, messagesAreaGroupChat, messageData.nickname, mediaElement, messageData.id, messageData);
                        break;
                    
                    case 'profile_picture_update':
                        userProfilePictures[messageData.nickname] = messageData.dataUrl;
                        addMessageToChatUI(`<i>${messageData.nickname} memperbarui foto profil.</i>`, 'system-message', true, messagesAreaGroupChat);
                        document.querySelectorAll('.message-bubble.group-in').forEach(bubble => {
                            const senderNameElem = bubble.querySelector('.sender-name');
                            if (senderNameElem && senderNameElem.textContent === messageData.nickname) {
                                const ppImg = bubble.querySelector('.profile-pic-bubble');
                                if (ppImg) ppImg.src = messageData.dataUrl;
                            }
                        });
                        break;

                    case 'user_join':
                        addMessageToChatUI(`<i>${messageData.nickname} telah bergabung.</i>`, 'system-message', true, messagesAreaGroupChat);
                        break;
                    
                    case 'user_leave':
                        addMessageToChatUI(`<i>${messageData.nickname} telah keluar.</i>`, 'system-message', true, messagesAreaGroupChat);
                        break;
                        
                    case 'user_count_update':
                        if (onlineUserCount) onlineUserCount.textContent = `${messageData.count} Online`;
                        break;
                        
                    case 'typing':
                        if (messageData.isTyping) {
                            usersTyping[messageData.nickname] = true;
                        } else {
                            delete usersTyping[messageData.nickname];
                        }
                        updateTypingIndicator();
                        break;
                        
                    case 'system-message':
                        addMessageToChatUI(messageData.text, 'system-message', true, messagesAreaGroupChat, null, null, null, messageData);
                        break;
                }
                
                // Notifikasi suara jika pesan bukan dari diri sendiri
                if (chatNotificationSound && (document.hidden || currentView !== 'groupchat')) {
                   chatNotificationSound.play().catch(error => console.warn("Gagal memutar suara notifikasi:", error));
                }

            } catch (e) {
                console.error("Error memproses pesan:", e, "Data:", messageTextContent);
            }
        };

        websocket.onerror = (error) => {
            console.error("WebSocket Error:", error);
            if (groupChatConnectionStatus) groupChatConnectionStatus.textContent = "Error koneksi.";
        };

        websocket.onclose = (event) => {
            console.info("WebSocket Terputus:", event.code);
            if (groupChatConnectionStatus) groupChatConnectionStatus.textContent = "Koneksi terputus. Mencoba menyambung lagi...";
            if (onlineUserCount) onlineUserCount.textContent = "0 Online";
            websocket = null;
            if (currentView === 'groupchat') {
                setTimeout(connectWebSocket, 5000);
            }
        };
    }

    function sendGroupMessage(text = null, payloadOverride = null) {
        const messageText = text || (groupChatMessageInput ? groupChatMessageInput.value.trim() : "");
        if ((!messageText && !payloadOverride) || !websocket || websocket.readyState !== WebSocket.OPEN) {
            return;
        }

        clearTimeout(typingTimer);
        websocket.send(JSON.stringify({
            type: 'typing',
            nickname: userNickname,
            isTyping: false
        }));

        const messageId = `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        let finalPayload;

        if (payloadOverride) {
            finalPayload = payloadOverride;
        } else {
            finalPayload = {
                type: 'message',
                nickname: userNickname,
                text: messageText,
                id: messageId
            };
            if (isReplying && replyContext) {
                finalPayload.replyTo = replyContext;
            }
        }

        websocket.send(JSON.stringify(finalPayload));

        if (isReplying) {
            cancelReply();
        }

        // Tampilkan pesan di UI pengirim
        if (finalPayload.type === 'message') {
            addMessageToChatUI(finalPayload.text, 'user', false, messagesAreaGroupChat, userNickname, null, messageId, finalPayload);
        } else if (finalPayload.type === 'file_message') {
            let mediaElement;
            if (finalPayload.filetype.startsWith('image/')) {
                mediaElement = document.createElement('img');
                mediaElement.src = finalPayload.filecontent;
                mediaElement.alt = finalPayload.filename;
            } else if (finalPayload.filetype.startsWith('video/')) {
                mediaElement = document.createElement('video');
                mediaElement.src = finalPayload.filecontent;
                mediaElement.controls = true;
            } else if (finalPayload.filetype.startsWith('audio/')) {
                mediaElement = document.createElement('audio');
                mediaElement.src = finalPayload.filecontent;
                mediaElement.controls = true;
            }
            if (mediaElement) mediaElement.classList.add('media-attachment');
            addMessageToChatUI(null, 'user', true, messagesAreaGroupChat, userNickname, mediaElement, messageId, finalPayload);
        }
        
        if (!text && !payloadOverride && groupChatMessageInput) {
            groupChatMessageInput.value = "";
        }
    }

    // ==================================
    // === EVENT LISTENERS ===
    // ==================================
    if (backToChatButton) {
        backToChatButton.addEventListener('click', showDownloaderView);
    }
    
    if (sendButtonDownloader) {
        sendButtonDownloader.addEventListener('click', handleTikTokDouyinCommand);
    }
    
    if (commandInput) {
        commandInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleTikTokDouyinCommand();
            }
        });
    }

    if (sendGroupChatMessageButton) {
        sendGroupChatMessageButton.addEventListener('click', () => sendGroupMessage());
    }

    if (groupChatMessageInput) {
        groupChatMessageInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                sendGroupMessage();
            }
        });
        groupChatMessageInput.addEventListener('input', () => {
            if (!websocket || websocket.readyState !== WebSocket.OPEN) return;
            clearTimeout(typingTimer);
            websocket.send(JSON.stringify({
                type: 'typing',
                nickname: userNickname,
                isTyping: true
            }));
            typingTimer = setTimeout(() => {
                websocket.send(JSON.stringify({
                    type: 'typing',
                    nickname: userNickname,
                    isTyping: false
                }));
            }, TYPING_TIMER_LENGTH);
        });
    }
    
    if (menuButton) {
        menuButton.addEventListener('click', (event) => {
            event.stopPropagation();
            attachmentMenu.style.display = attachmentMenu.style.display === 'block' ? 'none' : 'block';
            if (emojiPanel) emojiPanel.style.display = 'none';
        });
    }

    if (attachmentMenu) {
        attachmentMenu.querySelectorAll('li').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.getAttribute('data-action');
                attachmentMenu.style.display = 'none';
                switch(action) {
                    case 'show-downloader': showDownloaderView(); break;
                    case 'show-fakestory': showFakeStoryView(); break;
                    case 'show-groupchat': showGroupChatView(); break;
                    case 'show-profile-settings': showProfileSettingsView(); break;
                    case 'info-tiktok':
                        showDownloaderView();
                        addMessageToChatUI("Ketik:<br><code>.tiktok https://url_tiktok_anda</code>", 'bot', true, messagesAreaDownloader);
                        break;
                    case 'info-bot':
                        showDownloaderView();
                        addMessageToChatUI("<strong>Nama:</strong> Bot Web Multifitur Deluxe<br><strong>Owner:</strong> Vintex<br><strong>Versi:</strong> 1.5", 'bot', true, messagesAreaDownloader);
                        break;
                }
            });
        });
    }
    
    // ... Sisa event listener
    
    window.addEventListener('click', (e) => {
        if (attachmentMenu && attachmentMenu.style.display === 'block' && !menuButton.contains(e.target) && !attachmentMenu.contains(e.target)) {
            attachmentMenu.style.display = 'none';
        }
        if (groupChatAttachmentMenu && groupChatAttachmentMenu.style.display === 'block' && !groupChatMenuButton.contains(e.target) && !groupChatAttachmentMenu.contains(e.target)) {
            groupChatAttachmentMenu.style.display = 'none';
        }
        if (emojiPanel && emojiPanel.style.display === 'grid' && !emojiPickerButton.contains(e.target) && !emojiPanel.contains(e.target)) {
            emojiPanel.style.display = 'none';
        }
    });


    // ==================================
    // === INISIALISASI APLIKASI ===
    // ==================================

    loadUserProfile();
    populateEmojiPanel();
    showDownloaderView();
    if (messagesAreaDownloader) {
        addMessageToChatUI("Mode Pengunduh Aktif. Ketik perintah atau klik '⋮' untuk opsi lain.", 'bot', true, messagesAreaDownloader);
    }
});
