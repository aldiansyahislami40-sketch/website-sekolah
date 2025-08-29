// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    
    // Change icon based on menu state
    const icon = mobileMenuBtn.querySelector('i');
    if (mainNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Tab Navigation
const tabLinks = document.querySelectorAll('.tab-link');
const sections = document.querySelectorAll('.section');

tabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetTab = link.getAttribute('data-tab');
        
        // Update active tab
        tabLinks.forEach(tab => tab.classList.remove('tab-active'));
        link.classList.add('tab-active');
        
        // Show target section
        sections.forEach(section => section.classList.remove('active'));
        document.getElementById(targetTab).classList.add('active');
        
        // Close mobile menu if open
        if (mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        }
        
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Snake Routine System
const routineTrack = document.getElementById('routineTrack');
const daySelector = document.getElementById('daySelector');
const dayButtons = document.querySelectorAll('.day-btn');
const prevBtn = document.getElementById('prevRoutine');
const nextBtn = document.getElementById('nextRoutine');

// Routine data for different days
const routineData = {
    senin: [
        { time: "07:00 - 07:30", title: "Masuk Sekolah", desc: "Siswa tiba di sekolah dan bersiap untuk pembelajaran" },
        { time: "07:30 - 09:30", title: "Matematika", desc: "Pelajaran matematika dengan Bapak Surya" },
        { time: "09:30 - 10:00", title: "Istirahat Pertama", desc: "Waktu untuk beristirahat dan makan snack" },
        { time: "10:00 - 12:00", title: "Bahasa Indonesia", desc: "Pelajaran bahasa Indonesia dengan Ibu Dewi" },
        { time: "12:00 - 12:30", title: "Istirahat Kedua", desc: "Waktu makan siang dan istirahat" },
        { time: "12:30 - 14:00", title: "IPA", desc: "Pelajaran IPA dengan Ibu Fitriani" },
        { time: "15:00 - 17:00", title: "Ekstrakurikuler", desc: "Aktivitas pengembangan minat dan bakat" }
    ],
    selasa: [
        { time: "07:00 - 07:30", title: "Upacara Bendera", desc: "Upacara bendera setiap hari Selasa" },
        { time: "07:30 - 09:30", title: "Bahasa Inggris", desc: "Pelajaran bahasa Inggris dengan Ibu Diana" },
        { time: "09:30 - 10:00", title: "Istirahat Pertama", desc: "Waktu untuk beristirahat dan makan snack" },
        { time: "10:00 - 12:00", title: "IPS", desc: "Pelajaran IPS dengan Bapak Joko" },
        { time: "12:00 - 12:30", title: "Istirahat Kedua", desc: "Waktu makan siang dan istirahat" },
        { time: "12:30 - 14:00", title: "Seni Budaya", desc: "Pelajaran seni budaya dengan Ibu Rina" },
        { time: "15:00 - 17:00", title: "Klub Sains", desc: "Eksperimen dan penelitian sains" }
    ],
    rabu: [
        { time: "07:00 - 08:30", title: "Pelajaran Agama", desc: "Pelajaran agama sesuai dengan kepercayaan masing-masing" },
        { time: "08:30 - 10:30", title: "PJOK", desc: "Pendidikan jasmani olahraga dan kesehatan" },
        { time: "10:30 - 11:00", title: "Istirahat Pertama", desc: "Waktu untuk beristirahat dan makan snack" },
        { time: "11:00 - 12:30", title: "Bahasa Jawa", desc: "Pelajaran bahasa daerah" },
        { time: "12:30 - 13:00", title: "Istirahat Kedua", desc: "Waktu makan siang dan istirahat" },
        { time: "13:00 - 14:30", title: "Prakarya", desc: "Pelajaran prakarya dan kewirausahaan" },
        { time: "15:00 - 17:00", title: "Ekstrakurikuler", desc: "Aktivitas pengembangan minat dan bakat" }
    ],
    kamis: [
        { time: "07:00 - 09:00", title: "Matematika", desc: "Pelajaran matematika lanjutan" },
        { time: "09:00 - 09:30", title: "Istirahat Pertama", desc: "Waktu untuk beristirahat dan makan snack" },
        { time: "09:30 - 11:30", title: "Fisika", desc: "Pelajaran fisika dengan Prof. Fauzi" },
        { time: "11:30 - 12:00", title: "Istirahat Kedua", desc: "Waktu makan siang and istirahat" },
        { time: "12:00 - 14:00", title: "Kimia", desc: "Pelajaran kimia dengan Ibu Sari" },
        { time: "14:00 - 15:00", title: "Bimbingan Konseling", desc: "Sesi bimbingan dengan guru BK" },
        { time: "15:30 - 17:00", title: "Basket", desc: "Latihan basket ekstrakurikuler" }
    ],
    jumat: [
        { time: "07:00 - 07:30", title: "Pembacaan Ayat Suci", desc: "Pembacaan ayat suci sesuai agama masing-masing" },
        { time: "07:30 - 09:00", title: "Sejarah", desc: "Pelajaran sejarah Indonesia" },
        { time: "09:00 - 09:30", title: "Istirahat Pertama", desc: "Waktu untuk beristirahat dan makan snack" },
        { time: "09:30 - 11:00", title: "Bahasa Inggris", desc: "Percakapan bahasa Inggris" },
        { time: "11:00 - 12:30", title: "Seni Musik", desc: "Pelajaran seni musik" },
        { time: "12:30 - 13:30", title: "Sholat Jumat", desc: "Sholat Jumat bagi siswa muslim" },
        { time: "14:00 - 15:00", title: "Pembersihan Kelas", desc: "Kegiatan kebersihan kelas bersama" }
    ],
    sabtu: [
        { time: "08:00 - 09:30", title: "Pramuka", desc: "Kegiatan kepramukaan" },
        { time: "09:30 - 10:00", title: "Istirahat", desc: "Waktu untuk beristirahat dan makan snack" },
        { time: "10:00 - 11:30", title: "Klub Menulis", desc: "Kegiatan klub menulis kreatif" },
        { time: "11:30 - 12:30", title: "Istirahat", desc: "Waktu makan siang dan istirahat" },
        { time: "12:30 - 14:00", title: "Ekstrakurikuler", desc: "Aktivitas pengembangan minat dan bakat" },
        { time: "14:00 - 15:00", title: "Penutupan", desc: "Pengumuman dan penutupan kegiatan" }
    ]
};

let currentDay = 'senin';
let currentRoutineIndex = 0;
let routineInterval;

// Positions for the snake pattern
const snakePositions = [
    { top: '10%', left: '50%', transform: 'translateX(-50%)' },
    { top: '25%', left: '75%', transform: 'translateX(-50%)' },
    { top: '40%', left: '50%', transform: 'translateX(-50%)' },
    { top: '55%', left: '25%', transform: 'translateX(-50%)' },
    { top: '70%', left: '50%', transform: 'translateX(-50%)' },
    { top: '85%', left: '75%', transform: 'translateX(-50%)' },
    { top: '70%', left: '90%', transform: 'translateX(-50%)' }
];

// Initialize routine display
function initRoutine() {
    clearInterval(routineInterval);
    renderRoutineItems();
    startRoutineAutoSwitch();
}

// Render routine items based on current day
function renderRoutineItems() {
    routineTrack.innerHTML = '';
    const routines = routineData[currentDay];
    
    routines.forEach((routine, index) => {
        const routineItem = document.createElement('div');
        routineItem.className = 'routine-item';
        routineItem.innerHTML = `
            <div class="routine-time">${routine.time}</div>
            <h3 class="routine-title">${routine.title}</h3>
            <p class="routine-desc">${routine.desc}</p>
        `;
        
        // Apply snake pattern positioning
        Object.assign(routineItem.style, snakePositions[index]);
        
        routineTrack.appendChild(routineItem);
    });
    
    // Set the first item as active
    setActiveRoutine(0);
}

// Set active routine item
function setActiveRoutine(index) {
    const items = document.querySelectorAll('.routine-item');
    items.forEach(item => item.classList.remove('active', 'next'));
    
    currentRoutineIndex = index;
    items[index].classList.add('active');
    
    // Set next item for animation
    const nextIndex = (index + 1) % items.length;
    items[nextIndex].classList.add('next');
}

// Navigate to next routine item
function nextRoutine() {
    const items = document.querySelectorAll('.routine-item');
    const nextIndex = (currentRoutineIndex + 1) % items.length;
    setActiveRoutine(nextIndex);
}

// Navigate to previous routine item
function prevRoutine() {
    const items = document.querySelectorAll('.routine-item');
    const prevIndex = (currentRoutineIndex - 1 + items.length) % items.length;
    setActiveRoutine(prevIndex);
}

// Start auto-switching of routine items
function startRoutineAutoSwitch() {
    routineInterval = setInterval(nextRoutine, 10000); // Switch every 10 seconds
}

// Change day and update routine
function changeDay(day) {
    currentDay = day;
    currentRoutineIndex = 0;
    
    // Update active day button
    dayButtons.forEach(btn => {
        if (btn.getAttribute('data-day') === day) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    initRoutine();
}

// Event listeners
dayButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        changeDay(btn.getAttribute('data-day'));
    });
});

prevBtn.addEventListener('click', prevRoutine);
nextBtn.addEventListener('click', nextRoutine);

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Pesan Anda telah terkirim! Kami akan membalasnya segera.');
        contactForm.reset();
    });
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    initRoutine();
    
    // Simple animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item, .activity-card, .map-item, .student-card, .teacher-card, .gallery-item').forEach(item => {
        observer.observe(item);
    });
});