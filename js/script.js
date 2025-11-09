document.addEventListener('DOMContentLoaded', function() {

    // --- Package Filter ---
    const packageTabs = document.querySelectorAll('.package-tabs .tab');
    const packageCards = document.querySelectorAll('.package-grid .package-card');

    if (packageTabs.length > 0 && packageCards.length > 0) {
        packageTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                packageTabs.forEach(item => item.classList.remove('active'));
                tab.classList.add('active');
                const targetPackage = tab.getAttribute('data-package');

                packageCards.forEach(card => {
                    // Menggunakan display 'flex' karena package-card adalah flex container
                    card.style.display = targetPackage === card.getAttribute('data-package') ? 'flex' : 'none';
                });
            });
        });
    }

    // --- Testimonial Slider ---
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    const wrapper = document.querySelector('.testimonials-wrapper');
    const allCards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;

    function updateSlider() {
        if (allCards.length > 0) {
            const cardWidth = wrapper.querySelector('.testimonial-card').offsetWidth;
            const gap = 30; // Sesuaikan dengan gap di CSS
            wrapper.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
        }
    }
    
    if (nextButton && prevButton && wrapper && allCards.length > 0) {
        nextButton.addEventListener('click', () => {
            const cardsPerView = Math.round(wrapper.parentElement.clientWidth / (allCards[0].offsetWidth + 30));
            if (currentIndex < allCards.length - cardsPerView) {
                currentIndex++;
            } else {
                currentIndex = 0; // Kembali ke awal jika di akhir
            }
            updateSlider();
        });

        prevButton.addEventListener('click', () => {
             const cardsPerView = Math.round(wrapper.parentElement.clientWidth / (allCards[0].offsetWidth + 30));
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = allCards.length - cardsPerView; // Lompat ke akhir
            }
            updateSlider();
        });
        
        // Update slider saat ukuran window berubah
        window.addEventListener('resize', () => {
            currentIndex = 0;
            updateSlider();
        });
    }

    // --- Calendar Integration ---
    const calendarCells = document.querySelectorAll('.calendar-table td:not(.empty)');
    const dateInput = document.getElementById('wedding-date');
    const calendarMonthYear = document.getElementById('calendar-month-year');
    const currentYear = new Date().getFullYear(); 

    const monthMap = {
        'Januari': '01', 'Februari': '02', 'Maret': '03', 'April': '04', 'Mei': '05', 'Juni': '06',
        'Juli': '07', 'Agustus': '08', 'September': '09', 'Oktober': '10', 'November': '11', 'Desember': '12'
    };

    if (calendarCells.length > 0 && dateInput && calendarMonthYear) {
        calendarCells.forEach(cell => {
            cell.addEventListener('click', () => {
                calendarCells.forEach(c => c.classList.remove('active'));
                cell.classList.add('active');

                const day = cell.textContent.trim().padStart(2, '0');
                const [monthName, yearText] = calendarMonthYear.textContent.split(' ');
                const year = yearText || currentYear;
                const month = monthMap[monthName];

                if (day && month && year) {
                    const formattedDate = `${year}-${month}-${day}`;
                    dateInput.value = formattedDate;
                }
            });
        });
    }

});