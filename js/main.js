// Tab switching logic
function switchTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('block');
    });
    // Show current tab content
    const activeTab = document.getElementById('content-' + tabId);
    activeTab.classList.remove('hidden');
    activeTab.classList.add('block');

    // Reset tab styles
    document.querySelectorAll('.nav-tab').forEach(el => {
        el.classList.remove('border-emerald-600', 'text-emerald-600');
        el.classList.add('border-transparent', 'text-slate-500');
    });
    // Set active tab styles
    const currentTabBtn = document.getElementById('tab-' + tabId);
    currentTabBtn.classList.add('border-emerald-600', 'text-emerald-600');
    currentTabBtn.classList.remove('border-transparent', 'text-slate-500');
}

// Day switching logic for schedule
function switchDay(dayNum) {
    document.querySelectorAll('.day-view').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('block');
    });
    document.getElementById('day-content-' + dayNum).classList.remove('hidden');
    document.getElementById('day-content-' + dayNum).classList.add('block');

    // Reset buttons
    document.getElementById('day-tab-1').className = "w-1/2 py-2.5 px-4 font-bold text-sm rounded-lg text-slate-600 hover:text-emerald-700 transition-all";
    document.getElementById('day-tab-2').className = "w-1/2 py-2.5 px-4 font-bold text-sm rounded-lg text-slate-600 hover:text-emerald-700 transition-all";

    // Set active button
    document.getElementById('day-tab-' + dayNum).className = "w-1/2 py-2.5 px-4 font-bold text-sm rounded-lg bg-emerald-600 text-white shadow-sm transition-all";
}

// Ban detailed modal control
function openBanModal(title, size, desc) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-size').innerText = size;
    document.getElementById('modal-desc').innerText = desc;
    
    const modal = document.getElementById('ban-modal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.querySelector('div').classList.remove('scale-95');
        modal.querySelector('div').classList.add('scale-100');
    }, 10);
}

function closeBanModal() {
    const modal = document.getElementById('ban-modal');
    modal.querySelector('div').classList.add('scale-95');
    modal.querySelector('div').classList.remove('scale-100');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 150);
}

// Countdown Timer
const targetDate = new Date("July 18, 2026 07:30:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference < 0) {
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
}


// --- LOGIC PHÂN CHIA ĐỘI TƯƠNG TÁC (CẬP NHẬT MỚI) ---
const initialMembers = ["Nguyên 1", "Nguyên 2", "Tuấn Anh", "Duyên", "Uyên 1", "Uyên 2", "Ly", "Thiên", "Yến", "Giao", "Nhi", "Hân", "Ân (nữ)"];

// Khởi tạo trạng thái rỗng cho các đội
let customTeams = {
    1: [], 2: [], 3: [], 4: [], 5: [], 6: []
};

let selectedMember = null;

// Vẽ danh sách 13 bạn lên hồ bốc thăm
function renderUnassignedPool() {
    const poolEl = document.getElementById('unassigned-pool');
    poolEl.innerHTML = '';

    // Lọc ra những bạn chưa có trong bất kỳ đội nào
    const assignedMembers = Object.values(customTeams).flat();
    const unassigned = initialMembers.filter(m => !assignedMembers.includes(m));

    document.getElementById('unassigned-count').innerText = unassigned.length;

    if (unassigned.length === 0) {
        poolEl.innerHTML = '<span class="text-emerald-700 italic text-xs py-1"><i class="fa-solid fa-circle-check"></i> Đã gán hết 13 thành viên vào các đội!</span>';
        return;
    }

    unassigned.forEach(name => {
        const badge = document.createElement('button');
        badge.type = "button";
        badge.onclick = () => selectMemberToAssign(name);
        
        // Class nổi bật nếu đang được chọn
        if (selectedMember === name) {
            badge.className = "bg-amber-400 text-slate-900 px-3 py-1.5 rounded-full border-2 border-amber-500 font-bold text-xs shadow-md transform scale-105 transition-all flex items-center gap-1";
            badge.innerHTML = `<i class="fa-solid fa-square-check"></i> ${name}`;
        } else {
            badge.className = "bg-white text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 font-semibold text-xs shadow-sm transition-all flex items-center gap-1";
            badge.innerHTML = `<i class="fa-regular fa-circle"></i> ${name}`;
        }
        
        poolEl.appendChild(badge);
    });
}

// Chọn một thành viên để chuẩn bị gán
function selectMemberToAssign(name) {
    if (selectedMember === name) {
        selectedMember = null; // Bỏ chọn nếu bấm lại
    } else {
        selectedMember = name;
    }
    renderUnassignedPool();
}

// Gán thành viên đã chọn vào đội trưởng chỉ định
function assignToTeam(teamId) {
    if (!selectedMember) {
        // Nhắc nhở thân thiện nếu chưa chọn thành viên
        alert("Vui lòng chọn 1 bạn ở phần 'Danh Sách 13 Bạn Chưa Chia Đội' trước, sau đó bấm nút Gán nhé!");
        return;
    }

    // Đưa thành viên vào đội
    customTeams[teamId].push(selectedMember);
    selectedMember = null; // Reset lựa chọn

    // Vẽ lại giao diện
    renderUnassignedPool();
    renderTeamMembers();
}

// Xóa một thành viên khỏi đội và đưa về danh sách chờ
function removeFromTeam(teamId, memberName) {
    customTeams[teamId] = customTeams[teamId].filter(m => m !== memberName);
    renderUnassignedPool();
    renderTeamMembers();
}

// Vẽ danh sách thành viên cho 6 đội
function renderTeamMembers() {
    for (let i = 1; i <= 6; i++) {
        const listEl = document.getElementById(`team-list-${i}`);
        listEl.innerHTML = '';

        const members = customTeams[i];
        if (members.length === 0) {
            listEl.innerHTML = '<span class="text-[11px] text-slate-400 italic block py-1">Chưa có thành viên nào...</span>';
            continue;
        }

        members.forEach(member => {
            const row = document.createElement('div');
            row.className = "flex items-center justify-between bg-emerald-50/50 border border-emerald-100 py-1 px-2 rounded-md text-xs animate-fadeIn";
            row.innerHTML = `
                <span class="font-medium text-slate-700">${member}</span>
                <button onclick="removeFromTeam(${i}, '${member}')" class="text-slate-400 hover:text-red-500 transition-colors p-0.5">
                    <i class="fa-solid fa-xmark text-[10px]"></i>
                </button>
            `;
            listEl.appendChild(row);
        });
    }
}

// Trả lại trạng thái ban đầu
function resetCustomAssignment() {
    customTeams = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
    selectedMember = null;
    renderUnassignedPool();
    renderTeamMembers();
}

// Load các phần HTML nhỏ vào index.html
async function loadComponent(containerId, filePath) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error("Không tìm thấy container:", containerId);
        return;
    }

    const response = await fetch(filePath);

    if (!response.ok) {
        throw new Error("Không tải được file: " + filePath);
    }

    container.innerHTML = await response.text();
}

// Khởi chạy website sau khi load xong HTML
async function initWebsite() {
    try {
        await Promise.all([
            loadComponent("header-container", "./components/header.html"),
            loadComponent("nav-container", "./components/nav.html"),
            loadComponent("tong-quan-container", "./sections/tong-quan.html"),
            loadComponent("chuan-bi-container", "./sections/chuan-bi.html"),
            loadComponent("nhan-su-container", "./sections/nhan-su.html"),
            loadComponent("lich-trinh-container", "./sections/lich-trinh.html"),
            loadComponent("footer-container", "./components/footer.html"),
            loadComponent("modal-container", "./components/modal.html")
        ]);

        // Sau khi HTML đã được load xong thì mới chạy các chức năng
        updateCountdown();
        setInterval(updateCountdown, 1000);

        resetCustomAssignment();

    } catch (error) {
        console.error("Lỗi khi load giao diện:", error);
    }
}

document.addEventListener("DOMContentLoaded", initWebsite);