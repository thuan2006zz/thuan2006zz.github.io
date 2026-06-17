/**
 * ModVault - JavaScript static portfolio logic
 * Stores project databases static-side and handles catalog filtering, searches, popup details, and multilingual translation.
 * Features a Web Audio retro sound synthesizer, Canvas spore particles background, and custom Minecraft hover tooltips.
 */

// Project database (Gamer/Modder showcase list with Bilingual support and Rarities)
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
        rarity: 'vip',
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
    },
    {
        id: 'floating-leaderboards',
        type: 'addon',
        size: '180 KB',
        version: 'v1.4.2',
        mcVersion: '1.20.50+',
        downloadPath: 'downloads/floating_leaderboards.mcaddon',
        image: 'images/floating_leaderboards.png',
        icon: 'layers',
        rarity: 'epic',
        title: {
            vi: 'Floating Leaderboards (Bảng Xếp Hạng Lơ Lửng)',
            en: 'Floating Leaderboards & Holograms'
        },
        shortDesc: {
            vi: 'Tạo bảng xếp hạng hologram lơ lửng hiển thị điểm số, số mạng hạ gục, hoặc tiền tệ tự động cập nhật trong thế giới của bạn!',
            en: 'Create floating holographic leaderboards in your world to display player kills, deaths, or custom scoreboards dynamically!'
        },
        desc: {
            vi: 'Floating Leaderboards là addon tuyệt vời cho các thế giới máy chủ (Server/Realm) hoặc các bản đồ thế giới sinh tồn chơi nhiều người. Addon này giúp bạn đặt các dòng chữ nổi 3D đa màu sắc hoặc bảng xếp hạng Top 10 người chơi có điểm số cao nhất (như tiền tệ, số lần chết, thời gian chơi) trực quan ngay giữa không trung.',
            en: 'Floating Leaderboards is the perfect addon for multiplayer servers, Realms, or custom adventure maps. It allows you to place multi-colored 3D floating texts and Top 10 leaderboards displaying scoreboard stats (like money, kills, deaths, or playtime) hovering in the air.'
        },
        features: {
            vi: [
                'Tạo bảng xếp hạng Top 5, Top 10 lơ lửng tự động cập nhật thời gian thực.',
                'Hỗ trợ hiển thị bất kỳ điểm số (Scoreboard Objective) nào trong thế giới.',
                'Menu điều khiển thông minh bằng vật phẩm hoặc lệnh chat tiện lợi.',
                'Độ tương thích cao, hoạt động mượt mà không gây lag máy chủ.'
            ],
            en: [
                'Create dynamic Top 5 or Top 10 floating leaderboards updating in real-time.',
                'Displays any scoreboard objective running in your world (money, kills, etc.).',
                'Intuitive setup menu using a special in-game configuration item or chat commands.',
                'High performance, lightweight design that avoids server or mobile client lag.'
            ]
        },
        installation: {
            vi: [
                'Tải xuống tệp tin `floating_leaderboards.mcaddon`.',
                'Bấm mở tệp tin để tự động nhập vào Minecraft.',
                'Kích hoạt cả Behavior Pack và Resource Pack trong phần cài đặt thế giới.',
                'LƯU Ý: Bắt buộc phải bật tùy chọn "Beta APIs" trong mục Experiments (Thử nghiệm) ở cài đặt thế giới để addon hoạt động.',
                'Vào game, sử dụng lệnh `/tag @s add admin` để cấp quyền thiết lập, sau đó gõ `/function leaderboard_help` để xem hướng dẫn tạo bảng.'
            ],
            en: [
                'Download the `floating_leaderboards.mcaddon` file.',
                'Import the pack by clicking/opening the file in your explorer.',
                'Activate the Resource and Behavior Packs in your world settings.',
                'IMPORTANT: You MUST enable the "Beta APIs" toggle in the world Experiments settings.',
                'In-game, run `/tag @s add admin` to grant yourself config rights, then run `/function leaderboard_help` to see setup steps.'
            ]
        }
    },
    {
        id: 'cyber-tech-addon',
        type: 'addon',
        size: '1.2 MB',
        version: 'v2.1.0',
        mcVersion: '1.20+',
        downloadPath: 'downloads/cyber_tech_addon.mcaddon',
        image: 'images/cyber_tech.png',
        icon: 'layers',
        rarity: 'rare',
        title: {
            vi: 'Cyber-Tech Armor & Tools',
            en: 'Cyber-Tech Armor & Tools'
        },
        shortDesc: {
            vi: 'Thêm giáp neon tương lai, kiếm ánh sáng, máy khoan siêu tốc và drone robot vào thế giới Minecraft của bạn. Động họa đầy đủ!',
            en: 'Adds futuristic neon armor, lightsabers, high-speed drills, and robotic drones to your Minecraft world. Fully animated!'
        },
        desc: {
            vi: 'Nâng cấp trải nghiệm sinh tồn Minecraft của bạn với công nghệ tiên tiến. Addon này giới thiệu các bộ giáp công nghệ cao hoạt động đầy đủ, cung cấp các hiệu ứng trạng thái tùy chỉnh (như nhìn trong bóng tối, tốc độ, tăng máu) và các công cụ bao gồm khiên năng lượng và máy khoan plasma.',
            en: 'Upgrade your Minecraft survival experience with advanced technology. This addon introduces fully functional high-tech armor suits that grant custom status effects (like night vision, speed, and health boost) and tools including energy shields and plasma drillers.'
        },
        features: {
            vi: [
                '5 bộ giáp neon mới với các chỉ số sức mạnh độc đáo.',
                'Máy khoan plasma đào một vùng block 3x3 ngay lập tức.',
                'Kiếm ánh sáng và súng plasma với hoạt họa hạt tùy chỉnh.',
                'Hiệu ứng âm thanh và mô hình kết cấu khối 3D tùy chỉnh hoàn toàn.'
            ],
            en: [
                '5 new neon-colored armor suits with unique power stats.',
                'Plasma drill that mines a 3x3 block area instantly.',
                'Lightsabers and plasma blasters with custom particle animations.',
                'Fully custom sound effects and voxel texture models.'
            ]
        },
        installation: {
            vi: [
                'Tải xuống tệp tin `cyber_tech_addon.mcaddon`.',
                'Nhấp đúp hoặc nhấn vào tệp tin đã tải để tự động nhập vào game Minecraft.',
                'Tạo thế giới mới hoặc chỉnh sửa thế giới hiện tại.',
                'Kích hoạt gói Cyber-Tech ở mục "Behavior Packs" và "Resource Packs".',
                'LƯU Ý: Bật "Holiday Creator Features" (Tính năng nhà sáng tạo ngày lễ) trong cài đặt thử nghiệm.'
            ],
            en: [
                'Download the `cyber_tech_addon.mcaddon` file.',
                'Double-click/tap the downloaded file to automatically import it into Minecraft.',
                'Create a new world or edit an existing one.',
                'Under "Behavior Packs" and "Resource Packs", activate the Cyber-Tech pack.',
                'IMPORTANT: Enable "Holiday Creator Features" in world settings experiments.'
            ]
        }
    },
    {
        id: 'skyblock-expanded',
        type: 'addon',
        size: '2.4 MB',
        version: 'v1.0.4',
        mcVersion: '1.19+',
        downloadPath: 'downloads/skyblock_expanded.mcpack',
        image: 'images/skyblock.png',
        icon: 'layers',
        rarity: 'common',
        title: {
            vi: 'Sinh Tồn SkyBlock Mở Rộng',
            en: 'SkyBlock Survival Expanded'
        },
        shortDesc: {
            vi: 'Bản đồ sinh tồn đảo bay nâng cao với các công thức chế tạo mới, giao dịch thương nhân tùy chỉnh và hệ thống danh hiệu.',
            en: 'An enhanced SkyBlock world template generator with custom recipe modifications, trader options, and achievements.'
        },
        desc: {
            vi: 'Nâng tầm thử thách sinh tồn SkyBlock cổ điển. Gói tài nguyên và hành vi này chỉnh sửa các quy tắc chế tạo cơ bản (cho phép chế tạo các khối khoáng sản từ các nguyên liệu tái tạo), thêm các giao dịch độc đáo cho Thương nhân lang thang và tích hợp hơn 20 danh hiệu trong game.',
            en: 'Take the classic Minecraft Skyblock challenge to the next level. This resource and behavior pack modifies standard crafting rules (enabling block crafting from renewable materials), adds custom Wandering Trader deals, and integrates 20+ custom in-game achievements.'
        },
        features: {
            vi: [
                'Công thức chế tạo cát, đá đỏ, dung nham và quặng từ các vật phẩm nông trại.',
                'Thương nhân lang thang bán thêm các nguyên liệu Địa ngục và cây con quý hiếm.',
                'Dung lượng nhẹ, hoạt động cực kỳ mượt mà trên các dòng điện thoại cấu hình yếu.',
                'Tích hợp tính năng bảo vệ vùng hồi sinh và giới hạn biên thế giới cho máy chủ (Server).'
            ],
            en: [
                'Custom recipes for sand, redstone, lava, and ore blocks using renewable items.',
                'Wandering Traders now sell rare nether materials and biome saplings.',
                'Compact, lightweight pack design that runs smoothly on low-end mobile devices.',
                'Includes custom spawn protection and border options for server setups.'
            ]
        },
        installation: {
            vi: [
                'Tải xuống tệp tin `skyblock_expanded.mcpack`.',
                'Nhập gói vào game bằng cách bấm mở tệp tin trong trình quản lý file.',
                'Tạo thế giới mới, chọn mẫu thế giới "SkyBlock Expanded" và bắt đầu chơi.'
            ],
            en: [
                'Download the `skyblock_expanded.mcpack` file.',
                'Import the pack by clicking/tapping the file in your file explorer.',
                'Create a new world, select the "SkyBlock Expanded" world template, and load the game.'
            ]
        }
    },
    {
        id: 'pixel-knight',
        type: 'game',
        size: '18.5 MB',
        version: 'v1.2.0',
        mcVersion: 'N/A',
        downloadPath: 'downloads/pixel_knight_game.zip',
        image: 'images/pixel_knight.png',
        icon: 'gamepad-2',
        rarity: 'rare',
        title: {
            vi: 'Hiệp Sĩ Pixel: Đi Ngục',
            en: 'Pixel Knight: Dungeon Crawler'
        },
        shortDesc: {
            vi: 'Trò chơi đi cảnh ngục tối 2D cổ điển viết bằng JavaScript. Chiến đấu với quái vật, thu thập kho báu và hạ gục Boss!',
            en: 'A retro-style 2D platformer dungeon crawler built in JavaScript. Fight through monsters, find loot, and defeat the boss!'
        },
        desc: {
            vi: 'Hiệp Sĩ Pixel là game phiêu lưu ngục tối nhịp độ nhanh với đồ họa pixel. Hãy điều khiển chàng hiệp sĩ dũng cảm vượt qua các ngục tối đầy cạm bẫy, chiến đấu với quân đoàn xương khô, chất nhờn slime, pháp sư hắc ám và tìm kiếm những chiếc rương nâng cấp vũ khí.',
            en: 'Pixel Knight is a fast-paced pixel art dungeon crawler. Take control of a brave knight and navigate through trap-filled dungeons, fight hordes of skeletons, slimes, and dark wizards, and find chest boxes containing weapons upgrades.'
        },
        features: {
            vi: [
                '5 màn chơi ngục tối độc đáo với quái vật và trùm cuối riêng biệt.',
                'Hệ thống nâng cấp vũ khí (Kiếm sắt, Kiếm lửa, Kiếm ánh sáng).',
                'Hỗ trợ đầy đủ tay cầm chơi game (Controller) và bàn phím máy tính.',
                'Co giãn màn hình mượt mà trên cả trình duyệt điện thoại và PC.'
            ],
            en: [
                '5 unique dungeon levels with distinct enemy layouts and boss fights.',
                'Weapon upgrade system (Iron Sword, Fire Sword, Light Saber).',
                'Full controller and keyboard bindings support.',
                'Responsive screen scale running on both mobile browsers and desktops.'
            ]
        },
        installation: {
            vi: [
                'Tải xuống tệp tin `pixel_knight_game.zip`.',
                'Giải nén thư mục trên máy tính của bạn.',
                'Mở tệp tin `index.html` bằng bất kỳ trình duyệt web nào để chơi ngay lập tức.'
            ],
            en: [
                'Download the `pixel_knight_game.zip` file.',
                'Extract the zip contents to a folder on your computer.',
                'Open the `index.html` file in any modern web browser to play immediately.'
            ]
        }
    },
    {
        id: 'blocky-runner',
        type: 'game',
        size: '8.2 MB',
        version: 'v1.0.1',
        mcVersion: 'N/A',
        downloadPath: 'downloads/blocky_runner.zip',
        image: 'images/blocky_runner.png',
        icon: 'gamepad-2',
        rarity: 'common',
        title: {
            vi: 'Chạy Đi Blocky: Voxel Run',
            en: 'Blocky Runner: Voxel Run'
        },
        shortDesc: {
            vi: 'Trò chơi chạy vô hạn phong cách khối vuông (voxel). Tránh chướng ngại vật, ăn tiền vàng và mở khóa các trang phục siêu ngầu!',
            en: 'An endless voxel-style runner game. Dodge obstacles, collect coins, and unlock cool character skins!'
        },
        desc: {
            vi: 'Chạy Đi Blocky là game arcade chạy vô hạn gây nghiện. Hãy nhảy né tránh xe lửa, chông gai và các dòng sông dung nham. Tích lũy các khối vàng trên đường chạy để mở khóa các trang phục nhân vật mới như Creeper, Phi hành gia, hay Ninja.',
            en: 'Blocky Runner is a simple yet addictive endless arcade runner. Dodge oncoming trains, spikes, and lava rivers. Collect gold blocks along the way to unlock new custom models like Creepers, Astronauts, or Ninjas.'
        },
        features: {
            vi: [
                'Đường chạy và chướng ngại vật được tạo ngẫu nhiên vô hạn.',
                'Đồ họa khối vuông bắt mắt với hiệu ứng đổ bóng mượt mà.',
                'Mở khóa các nhân vật độc đáo (hơn 10 trang phục có sẵn).',
                'Tự động lưu điểm cao vào bộ nhớ đệm của trình duyệt.'
            ],
            en: [
                'Infinite procedurally generated obstacles and tracks.',
                'Sleek voxel art graphics with responsive shadow rendering.',
                'Unlockable characters (10+ skins available).',
                'Saves high scores automatically to local browser cache.'
            ]
        },
        installation: {
            vi: [
                'Tải xuống tệp tin `blocky_runner.zip`.',
                'Giải nén file lưu trữ.',
                'Nhấp đúp chạy file `blocky_runner.exe` trên Windows (hoặc mở file `index.html` nếu chơi bản Web).'
            ],
            en: [
                'Download the `blocky_runner.zip` archive.',
                'Extract the ZIP file.',
                'Double-click `blocky_runner.exe` on Windows (or open `index.html` if playing the Web version).'
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

// Retro Sound Synthesizer via Web Audio API
class MCRetroAudio {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playClick(pitchMultiplier = 1.0) {
        this.init();
        if (!this.ctx) return;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'triangle';
        const now = this.ctx.currentTime;
        
        // Brief blocky click sound: rapid frequency drop
        osc.frequency.setValueAtTime(130 * pitchMultiplier, now);
        osc.frequency.exponentialRampToValueAtTime(10 * pitchMultiplier, now + 0.045);
        
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(now);
        osc.stop(now + 0.05);
    }

    playHover() {
        // High-pitched soft click
        this.playClick(1.85);
    }

    playChime() {
        this.init();
        if (!this.ctx) return;
        
        const now = this.ctx.currentTime;
        
        // Minecraft XP levels rising chime: E5, G5, E6, G6
        const notes = [659.25, 783.99, 1318.51, 1567.98];
        
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.075);
            
            gain.gain.setValueAtTime(0.0, now + idx * 0.075);
            gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.075 + 0.015);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.075 + 0.14);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(now + idx * 0.075);
            osc.stop(now + idx * 0.075 + 0.16);
        });
    }
}
const audio = new MCRetroAudio();

// Canvas Background Drifting Spore Particles
function initBackgroundParticles() {
    const canvas = document.getElementById('bg-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
    
    let mouse = { x: -1000, y: -1000 };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    class Particle {
        constructor() {
            this.reset(true);
        }
        
        reset(randomY = false) {
            this.x = Math.random() * width;
            this.y = randomY ? Math.random() * height : height + 10;
            this.size = Math.random() * 5 + 2; // blocky square sizes
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 + 0.15; // float upwards
            // Random green or blue particle colors
            this.color = Math.random() > 0.45 
                ? `rgba(16, 185, 129, ${Math.random() * 0.22 + 0.1})` // Emerald Green
                : `rgba(56, 189, 248, ${Math.random() * 0.22 + 0.1})`; // Cyan Blue
        }
        
        update() {
            this.x += this.speedX;
            this.y -= this.speedY;
            
            if (this.y < -this.size || this.x < -this.size || this.x > width + this.size) {
                this.reset(false);
            }
            
            // Push particles away slightly when cursor gets close
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 110) {
                const force = (110 - dist) / 110;
                this.x += (dx / dist) * force * 2.5;
                this.y += (dy / dist) * force * 2.5;
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }
    
    // Spawn particles density
    const count = Math.min(50, Math.floor((width * height) / 25000));
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Minecraft Custom Floating Tooltip Controller
function initMCTooltip() {
    const tooltip = document.getElementById('mc-tooltip');
    if (!tooltip) return;
    
    document.addEventListener('mousemove', (e) => {
        if (tooltip.style.display === 'block') {
            const xOffset = 15;
            const yOffset = 15;
            
            let x = e.pageX + xOffset;
            let y = e.pageY + yOffset;
            
            const tooltipWidth = tooltip.offsetWidth;
            const tooltipHeight = tooltip.offsetHeight;
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;
            const viewWidth = window.innerWidth;
            const viewHeight = window.innerHeight;
            
            // Boundary checks (prevent tooltips flying outside the screen)
            if (x + tooltipWidth > viewWidth + scrollX) {
                x = e.pageX - tooltipWidth - 10;
            }
            if (y + tooltipHeight > viewHeight + scrollY) {
                y = e.pageY - tooltipHeight - 10;
            }
            
            tooltip.style.left = `${x}px`;
            tooltip.style.top = `${y}px`;
        }
    });
}

function showTooltip(projectId) {
    const project = PROJECTS.find(p => p.id === projectId);
    if (!project) return;
    
    const tooltip = document.getElementById('mc-tooltip');
    if (!tooltip) return;
    
    const rarityClass = `rarity-${project.rarity || 'common'}`;
    const rarityLabel = {
        vi: { common: 'Thường', rare: 'Hiếm', epic: 'Sử Thi', vip: 'Huyền Thoại VIP' },
        en: { common: 'Common', rare: 'Rare', epic: 'Epic', vip: 'Legendary VIP' }
    }[currentLang][project.rarity || 'common'];
    
    const typeLabel = TRANSLATIONS[currentLang][project.type];
    const footerText = {
        vi: 'Nhấp để xem chi tiết',
        en: 'Click to view details'
    }[currentLang];

    tooltip.innerHTML = `
        <div class="mc-tooltip-title ${rarityClass}">${escapeHtml(project.title[currentLang])}</div>
        <div class="mc-tooltip-rarity ${rarityClass}">${rarityLabel}</div>
        <div class="mc-tooltip-meta">
            <span>${typeLabel}</span>
            <span>${project.size}</span>
        </div>
        <div class="mc-tooltip-desc">${escapeHtml(project.shortDesc[currentLang])}</div>
        <div class="mc-tooltip-footer">${footerText}</div>
    `;
    
    tooltip.style.display = 'block';
}

function hideTooltip() {
    const tooltip = document.getElementById('mc-tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

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
    // Initialize graphics & particle loops
    initBackgroundParticles();
    initMCTooltip();

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

    // Tab buttons events
    filterTabs.forEach((tab) => {
        // Play hover sound
        tab.addEventListener('mouseenter', () => audio.playHover());
        
        tab.addEventListener('click', () => {
            audio.playClick(1.0); // Solid click sound
            
            filterTabs.forEach((t) => t.classList.remove('active'));
            tab.classList.add('active');
            
            activeFilter = tab.getAttribute('data-filter');
            renderCatalog();
        });
    });

    // Language Toggles
    langBtnVi.addEventListener('mouseenter', () => audio.playHover());
    langBtnVi.addEventListener('click', () => {
        audio.playClick(1.1);
        applyLanguage('vi');
    });

    langBtnEn.addEventListener('mouseenter', () => audio.playHover());
    langBtnEn.addEventListener('click', () => {
        audio.playClick(1.1);
        applyLanguage('en');
    });

    // Close modal actions
    modalCloseBtn.addEventListener('mouseenter', () => audio.playHover());
    modalCloseBtn.addEventListener('click', () => {
        audio.playClick(0.9);
        closeModal();
    });
    
    detailModal.addEventListener('click', (e) => {
        if (e.target === detailModal) {
            audio.playClick(0.9);
            closeModal();
        }
    });

    // Close modal on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && detailModal.classList.contains('active')) {
            audio.playClick(0.9);
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
        const matchCategory = activeFilter === 'all' || project.type === activeFilter;
        
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
        const rarityClass = `rarity-${project.rarity || 'common'}`;
        card.className = `project-card type-${project.type} ${rarityClass}`;
        card.setAttribute('data-id', project.id);
        
        const badgeClass = project.type === 'game' ? 'badge-game' : 'badge-addon';
        const badgeLabel = TRANSLATIONS[currentLang][project.type];
        const titleColorClass = project.rarity === 'vip' ? 'enchanted-text' : '';

        card.innerHTML = `
            <div class="project-image-placeholder">
                <img src="${project.image}" alt="${escapeHtml(project.title[currentLang])}" class="project-card-image">
            </div>
            <div class="card-body">
                <div class="badge-row">
                    <span class="badge ${badgeClass}">${badgeLabel}</span>
                    ${project.type === 'addon' ? `<span class="badge badge-addon">${project.mcVersion}</span>` : ''}
                </div>
                <h3 class="project-title ${titleColorClass}">${escapeHtml(project.title[currentLang])}</h3>
                <p class="project-desc">${escapeHtml(project.shortDesc[currentLang])}</p>
                <div class="card-footer">
                    <span class="project-size">${project.size}</span>
                    <button class="btn-card-action">
                        ${TRANSLATIONS[currentLang]['view-details']} <i data-lucide="arrow-right"></i>
                    </button>
                </div>
            </div>
        `;

        // Card mouse listeners (Audio Click + Floating Tooltip triggers)
        card.addEventListener('mouseenter', () => {
            audio.playHover();
            showTooltip(project.id);
        });
        
        card.addEventListener('mouseleave', () => {
            hideTooltip();
        });
        
        card.addEventListener('click', () => {
            hideTooltip();
            audio.playChime(); // XP Level Up chime sound
            openModal(project.id);
        });
        
        catalogGrid.appendChild(card);
    });

    // Re-create icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

/**
 * Helper to escape HTML and format basic markdown tags like bold and code highlights
 */
function formatText(text) {
    return escapeHtml(text)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`(.*?)`/g, '<code>$1</code>');
}

/**
 * Render and Open project Details Modal
 */
function openModal(id) {
    const project = PROJECTS.find((p) => p.id === id);
    if (!project) return;

    const badgeClass = project.type === 'game' ? 'badge-game' : 'badge-addon';
    const badgeLabel = TRANSLATIONS[currentLang][project.type];
    const titleColorClass = project.rarity === 'vip' ? 'enchanted-text' : '';

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
            <h2 class="modal-project-title ${titleColorClass}">${escapeHtml(project.title[currentLang])}</h2>
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
            <a href="${project.downloadPath}" class="btn btn-primary" id="download-trigger-btn" download>
                <i data-lucide="download"></i> ${TRANSLATIONS[currentLang]['download-file']}
            </a>
            <button class="btn btn-secondary" id="modal-cancel-btn">
                ${TRANSLATIONS[currentLang]['close']}
            </button>
        </div>
    `;

    // Modal buttons sound bindings
    const dlBtn = document.getElementById('download-trigger-btn');
    const cnBtn = document.getElementById('modal-cancel-btn');

    dlBtn.addEventListener('mouseenter', () => audio.playHover());
    dlBtn.addEventListener('click', () => {
        audio.playChime(); // Play XP level up chime on download
    });

    cnBtn.addEventListener('mouseenter', () => audio.playHover());
    cnBtn.addEventListener('click', () => {
        audio.playClick(0.9);
        closeModal();
    });

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
