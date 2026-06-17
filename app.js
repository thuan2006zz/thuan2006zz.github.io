/**
 * ModVault - JavaScript static portfolio logic
 * Stores project databases static-side and handles catalog filtering, searches, popup details, and multilingual translation.
 */

// Project database (Only containing the user's real Floating Text Addon)
const PROJECTS = [
    {
        id: 'floating-text-addon',
        type: 'addon',
        size: '140 KB',
        version: 'v4.0.0',
        mcVersion: '1.21+',
        downloadPath: 'downloads/floating_text.mcaddon',
        image: 'images/floating_text.png',
        icon: 'layers',
        title: {
            vi: 'Better Floating Text v4 (Chữ Nổi Lơ Lửng)',
            en: 'Better Floating Text v4'
        },
        shortDesc: {
            vi: 'Tạo chữ nổi 3D đa màu sắc bay lơ lửng và bảng xếp hạng 3D thời gian thực trong thế giới Minecraft của bạn!',
            en: 'Create multi-colored 3D floating texts and real-time 3D leaderboards in your Minecraft Bedrock world!'
        },
        desc: {
            vi: 'Better Floating Text v4 là addon tuyệt vời cho các chủ phòng thế giới (Host/Server/Realm) hoặc các nhà làm map phiêu lưu. Addon này giúp bạn đặt các thông báo, bảng chỉ dẫn, tên khu vực hoặc các bảng xếp hạng 3D rực rỡ lơ lửng giữa không trung mà không cần dùng block thường.',
            en: 'Better Floating Text v4 is the ultimate tool for world hosts, server admins, or adventure map creators. It allows you to place floating 3D text notifications, guides, or real-time 3D scoreboard leaderboards anywhere in the air without using solid blocks.'
        },
        features: {
            vi: [
                '**Hệ thống Chữ Nổi 3D chuyên nghiệp**: Tạo không giới hạn số lượng và chiều dài dòng chữ.',
                '**Hệ thống Bảng Xếp Hạng 3D tự động**: Kết nối trực tiếp với Scoreboard để hiển thị TOP người chơi có điểm cao nhất.',
                '**Giao diện Form UI chi tiết**: Người chơi xem bảng xếp hạng cá nhân bằng cách tự thêm tag `lb:<objective>` (ví dụ: `/tag @s add lb:money`).',
                '**Hỗ trợ đa màu sắc**: Hỗ trợ đầy đủ mã màu Minecraft bằng ký hiệu (§) để viết chữ rực rỡ.',
                '**Công cụ trực quan**: Sử dụng các gậy cấu hình chuyên dụng để tạo, di chuyển, đổi tên hoặc xóa nhanh chóng.',
                '**Tối ưu hóa cực tốt**: Chạy mượt mà, không gây lag hay tụt FPS trên các thiết bị di động.'
            ],
            en: [
                '**Professional 3D Holograms**: Create unlimited floating texts with customizable content.',
                '**Real-time 3D Leaderboards**: Automatically sync with scoreboards to show top players.',
                '**Detailed Form UIs**: Players can open detailed rankings simply by adding a tag (e.g. `/tag @s add lb:money`).',
                '**Full Color Formatting**: Complete support for standard (§) section symbol color formatting codes.',
                '**Intuitive Config Wands**: Dedicated management tools to easily spawn, shift, edit, or remove texts.',
                '**Ultra Optimized**: Lightweight code execution with zero performance hit or FPS drops on mobile.'
            ]
        },
        installation: {
            vi: [
                'Tải xuống tệp tin `floating_text.mcaddon`.',
                'Nhấp mở tệp tin để game Minecraft tự động nhập và cài đặt.',
                'Trong phần cài đặt thế giới của bạn, kích hoạt cả Behavior Pack và Resource Pack của addon.',
                '**LƯU Ý QUAN TRỌNG**: Hãy chắc chắn đã bật tùy chọn **Beta APIs** trong mục Experiments (Thử nghiệm) ở cài đặt thế giới.',
                'Vào thế giới game, lấy các gậy quản lý từ mục Sáng tạo (Creative) hoặc gõ lệnh `/give @s ttn:floating_text` để bắt đầu.'
            ],
            en: [
                'Download the `floating_text.mcaddon` file.',
                'Open/tap the file to automatically import and install it into Minecraft.',
                'In your world settings, activate both the Behavior Pack and Resource Pack of the addon.',
                '**IMPORTANT NOTE**: Make sure to enable the **Beta APIs** toggle in the world Experiments settings.',
                'Join the world, grab the config wands from the Creative inventory or run `/give @s ttn:floating_text` in chat.'
            ]
        },
        usage: {
            vi: [
                '**Quản lý Chữ Nổi**: Cầm vật phẩm **Gậy Quản Lý Chữ Nổi** (`ttn:floating_text`) và bấm sử dụng (chuột phải/giữ màn hình) để mở bảng điều khiển. Chọn **Tạo Chữ Nổi Mới**, nhập nội dung (sử dụng ký tự `\\n` để xuống dòng) và nhập tọa độ mong muốn. Bật tùy chọn "Thực thể gốc (Root)" để có thể liên kết thêm các dòng chữ con thẳng hàng bên dưới.',
                '**Chỉnh sửa & Di chuyển Chữ Nổi**: Dùng **Gậy Quản Lý Chữ Nổi** chọn mục **Chỉnh Sửa Chữ Nổi** để xem danh sách chữ nổi xung quanh. Bạn có thể sửa đổi nội dung, dịch chuyển tọa độ nhóm, kéo chữ nổi về phía mình, hoặc thêm/xóa tag admin.',
                '**Quản lý Bảng Xếp Hạng 3D**: Cầm vật phẩm **Gậy Quản Lý Bảng Xếp Hạng** (`ttn:lb_floating_text`) và bấm sử dụng để mở giao diện cấu hình bảng xếp hạng bay. Liên kết chữ nổi với Scoreboard ID mong muốn (ví dụ: `money`). Hệ thống sẽ tự động cập nhật điểm số trực tuyến theo thời gian thực.',
                '**Xem Giao Diện Xếp Hạng dạng Form**: Quản trị viên sử dụng **Gậy Cấu Hình Bảng Xếp Hạng** (`ttn:lb_form`) để thiết lập các biểu đồ xếp hạng dạng hộp thoại (Form UI). Thành viên thường chỉ cần tự thêm tag `lb:<objective>` (ví dụ: `/tag @s add lb:money`) để mở nhanh bảng xếp hạng này. Hệ thống sẽ tự động xóa tag ngay sau đó.'
            ],
            en: [
                '**Create Floating Texts**: Hold the **Hologram Wand** (`ttn:floating_text`) and use it (right-click/tap-and-hold) to open the control panel. Choose **Create Floating Text**, enter the text (use `\\n` for new lines) and coordinates. Check "Designate as Root" to chain child text lines neatly underneath.',
                '**Edit & Shift Holograms**: Use the **Hologram Wand** and choose **Edit Floating Text** to view nearby entries. You can update the text, adjust group coordinates, pull the text to your location, or manage admin tags.',
                '**Create 3D Leaderboards**: Hold the **Floating Leaderboard Wand** (`ttn:lb_floating_text`) and use it. Link it to any scoreboard objective ID (e.g. `money`). The 3D hologram will auto-refresh and display the top players dynamically.',
                '**Form-based Leaderboard UI**: Admins can customize the details panel using the **Leaderboard Form Wand** (`ttn:lb_form`). Standard players can access this popup interface by adding a tag to themselves (e.g., run `/tag @s add lb:money`). The UI opens instantly and the tag is automatically cleared.'
            ]
        }
    }
];

// Bilingual Translations Dictionary
const TRANSLATIONS = {
    vi: {
        'dev-bio': 'Nhà phát triển game độc lập & Người sáng tạo Minecraft Addon. Chia sẻ các bản mod, gói hành vi tùy chỉnh và game độc lập.',
        'search-placeholder': 'Tìm kiếm game hoặc addon...',
        'tab-all': 'Tất cả dự án',
        'tab-games': 'Trò chơi',
        'tab-addons': 'Addon Minecraft',
        'empty-title': 'Không tìm thấy dự án',
        'empty-desc': 'Thử tìm kiếm từ khóa khác hoặc chuyển danh mục.',
        'footer-text': '© 2026 TTN VN. Trang web dạng tĩnh chạy trên GitHub Pages. Mọi tệp tin đều an toàn để tải xuống.',
        'file-size': 'Dung lượng',
        'category': 'Thể loại',
        'compatibility': 'Tương thích',
        'license': 'Bản quyền',
        'free': 'Miễn phí',
        'version': 'Phiên bản',
        'view-details': 'Xem chi tiết',
        'key-features': 'Tính năng nổi bật',
        'install-guide': 'Hướng dẫn cài đặt',
        'usage-guide': 'Cách sử dụng chi tiết',
        'download-file': 'Tải xuống dự án',
        'close': 'Đóng',
        'game': 'Trò chơi',
        'addon': 'Addon Minecraft'
    },
    en: {
        'dev-bio': 'Independent Game Developer & Minecraft Addon Creator. Sharing custom mods, behavior packs, and standalone indie games.',
        'search-placeholder': 'Search games or addons...',
        'tab-all': 'All Projects',
        'tab-games': 'Standalone Games',
        'tab-addons': 'Minecraft Addons',
        'empty-title': 'No Projects Found',
        'empty-desc': 'Try searching for different keywords or checking another category.',
        'footer-text': '© 2026 TTN VN. Static website hosted on GitHub Pages. All project files are safe to download.',
        'file-size': 'File Size',
        'category': 'Category',
        'compatibility': 'Compatibility',
        'license': 'License',
        'free': 'Free',
        'version': 'Version',
        'view-details': 'View Details',
        'key-features': 'Key Features',
        'install-guide': 'Installation Guide',
        'usage-guide': 'Detailed Usage Guide',
        'download-file': 'Download Project File',
        'close': 'Close',
        'game': 'Game',
        'addon': 'Minecraft Addon'
    }
};

// Active states
let currentLang = localStorage.getItem('lang') || 'vi';
let activeFilter = 'all';
let activeSearchQuery = '';

// DOM Elements
const catalogGrid = document.getElementById('catalog-grid');
const searchInput = document.getElementById('search-input');
const filterTabs = document.querySelectorAll('.filter-tab');
const emptyState = document.getElementById('empty-state');
const detailModal = document.getElementById('detail-modal');
const modalBodyContent = document.getElementById('modal-body-content');
const modalCloseBtn = document.getElementById('modal-close-btn');

// Language Buttons
const langBtnVi = document.getElementById('lang-btn-vi');
const langBtnEn = document.getElementById('lang-btn-en');

/**
 * Initialize app listeners and initial render
 */
document.addEventListener('DOMContentLoaded', () => {
    // Apply default language translations
    applyLanguage(currentLang);

    // Setup Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Search bar event
    searchInput.addEventListener('input', (e) => {
        activeSearchQuery = e.target.value.toLowerCase().trim();
        renderCatalog();
    });

    // Tab buttons event
    filterTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            // Toggle active state
            filterTabs.forEach((t) => t.classList.remove('active'));
            tab.classList.add('active');
            
            activeFilter = tab.getAttribute('data-filter');
            renderCatalog();
        });
    });

    // Language Toggles
    langBtnVi.addEventListener('click', () => applyLanguage('vi'));
    langBtnEn.addEventListener('click', () => applyLanguage('en'));

    // Close modal actions
    modalCloseBtn.addEventListener('click', closeModal);
    detailModal.addEventListener('click', (e) => {
        if (e.target === detailModal) {
            closeModal();
        }
    });

    // Close modal on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && detailModal.classList.contains('active')) {
            closeModal();
        }
    });
});

/**
 * Switch page language
 */
function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    // Toggle active language button class
    if (lang === 'vi') {
        langBtnVi.classList.add('active');
        langBtnEn.classList.remove('active');
        document.documentElement.lang = 'vi';
    } else {
        langBtnEn.classList.add('active');
        langBtnVi.classList.remove('active');
        document.documentElement.lang = 'en';
    }

    // Translate DOM text contents
    document.querySelectorAll('[data-translate]').forEach((el) => {
        const key = el.getAttribute('data-translate');
        if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
            el.textContent = TRANSLATIONS[lang][key];
        }
    });

    // Translate DOM inputs placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach((el) => {
        const key = el.getAttribute('data-translate-placeholder');
        if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
            el.placeholder = TRANSLATIONS[lang][key];
        }
    });

    // Re-render project catalog
    renderCatalog();
}

/**
 * Filter and Render Project Catalog
 */
function renderCatalog() {
    // 1. Filter list
    const filtered = PROJECTS.filter((project) => {
        // Category check
        const matchCategory = activeFilter === 'all' || project.type === activeFilter;
        
        // Search query check
        const titleText = project.title[currentLang].toLowerCase();
        const shortDescText = project.shortDesc[currentLang].toLowerCase();
        const descText = project.desc[currentLang].toLowerCase();
        const matchSearch = titleText.includes(activeSearchQuery) || 
                            shortDescText.includes(activeSearchQuery) || 
                            descText.includes(activeSearchQuery);
        
        return matchCategory && matchSearch;
    });

    // 2. Clear grid
    catalogGrid.innerHTML = '';

    // 3. Show empty state if nothing matches
    if (filtered.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }
    emptyState.classList.add('hidden');

    // 4. Render cards
    filtered.forEach((project) => {
        const card = document.createElement('div');
        card.className = `project-card type-${project.type}`;
        card.setAttribute('data-id', project.id);
        
        const badgeClass = project.type === 'game' ? 'badge-game' : 'badge-addon';
        const badgeLabel = TRANSLATIONS[currentLang][project.type];

        card.innerHTML = `
            <div class="project-image-placeholder">
                <img src="${project.image}" alt="${escapeHtml(project.title[currentLang])}" class="project-card-image">
            </div>
            <div class="card-body">
                <div class="badge-row">
                    <span class="badge ${badgeClass}">${badgeLabel}</span>
                    ${project.type === 'addon' ? `<span class="badge badge-addon">${project.mcVersion}</span>` : ''}
                </div>
                <h3 class="project-title">${escapeHtml(project.title[currentLang])}</h3>
                <p class="project-desc">${escapeHtml(project.shortDesc[currentLang])}</p>
                <div class="card-footer">
                    <span class="project-size">${project.size}</span>
                    <button class="btn-card-action">
                        ${TRANSLATIONS[currentLang]['view-details']} <i data-lucide="arrow-right"></i>
                    </button>
                </div>
            </div>
        `;

        // Card Click opens details popup modal
        card.addEventListener('click', () => openModal(project.id));
        
        catalogGrid.appendChild(card);
    });

    // Re-create icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

/**
 * Render and Open project Details Modal
 */
/**
 * Helper to escape HTML and format basic markdown tags like bold and code highlights
 */
function formatText(text) {
    return escapeHtml(text)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`(.*?)`/g, '<code>$1</code>');
}

function openModal(id) {
    const project = PROJECTS.find((p) => p.id === id);
    if (!project) return;

    const badgeClass = project.type === 'game' ? 'badge-game' : 'badge-addon';
    const badgeLabel = TRANSLATIONS[currentLang][project.type];

    // Build features, install steps, and usage guide lists
    const featuresList = project.features[currentLang].map(f => `<li>${formatText(f)}</li>`).join('');
    const installSteps = project.installation[currentLang].map(step => `<li>${formatText(step)}</li>`).join('');
    const usageSteps = project.usage && project.usage[currentLang] 
        ? project.usage[currentLang].map(step => `<li>${formatText(step)}</li>`).join('')
        : '';

    // Modal Content template
    modalBodyContent.innerHTML = `
        <div class="modal-hero-placeholder">
            <img src="${project.image}" alt="${escapeHtml(project.title[currentLang])}" class="modal-hero-image">
        </div>
        
        <div class="modal-title-row">
            <h2 class="modal-project-title">${escapeHtml(project.title[currentLang])}</h2>
            <div class="badge-row">
                <span class="badge ${badgeClass}">${badgeLabel}</span>
                <span class="badge badge-secondary">${TRANSLATIONS[currentLang]['version']} ${project.version}</span>
            </div>
        </div>
        
        <div class="modal-meta-grid">
            <div class="meta-item">
                <span class="meta-label">${TRANSLATIONS[currentLang]['file-size']}</span>
                <span class="meta-value">${project.size}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">${TRANSLATIONS[currentLang]['category']}</span>
                <span class="meta-value">${TRANSLATIONS[currentLang][project.type]}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">${TRANSLATIONS[currentLang]['compatibility']}</span>
                <span class="meta-value">${project.mcVersion}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">${TRANSLATIONS[currentLang]['license']}</span>
                <span class="meta-value">${TRANSLATIONS[currentLang]['free']}</span>
            </div>
        </div>
        
        <div class="modal-description">
            <p>${escapeHtml(project.desc[currentLang])}</p>
        </div>
        
        <div class="modal-info-block">
            <h4 class="block-title"><i data-lucide="sparkles"></i> ${TRANSLATIONS[currentLang]['key-features']}</h4>
            <ul class="modal-list">
                ${featuresList}
            </ul>
        </div>
        
        <div class="modal-info-block">
            <h4 class="block-title"><i data-lucide="help-circle"></i> ${TRANSLATIONS[currentLang]['install-guide']}</h4>
            <ol class="modal-list" style="list-style-type: decimal;">
                ${installSteps}
            </ol>
        </div>

        ${usageSteps ? `
        <div class="modal-info-block">
            <h4 class="block-title"><i data-lucide="book-open"></i> ${TRANSLATIONS[currentLang]['usage-guide']}</h4>
            <ul class="modal-list">
                ${usageSteps}
            </ul>
        </div>
        ` : ''}
        
        <div class="modal-actions">
            <a href="${project.downloadPath}" class="btn btn-primary" download>
                <i data-lucide="download"></i> ${TRANSLATIONS[currentLang]['download-file']}
            </a>
            <button class="btn btn-secondary" onclick="closeModal()">
                ${TRANSLATIONS[currentLang]['close']}
            </button>
        </div>
    `;

    // Open Overlay
    detailModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Disable background scroll

    // Render new icons inside modal
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

/**
 * Close Details Modal
 */
function closeModal() {
    detailModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore background scroll
}

/**
 * Escape HTML special chars
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
