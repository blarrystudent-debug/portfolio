// Calendar functionality
let currentDate = new Date();
let selectedDate = null;

const calendarDays = document.getElementById('calendarDays');
const currentMonth = document.getElementById('currentMonth');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const selectedDateInput = document.getElementById('selectedDate');
const bookingForm = document.getElementById('bookingForm');
const bookingMessage = document.getElementById('bookingMessage');

const OPEN_HOLIDAY_EXCEPTIONS = new Set([
    'Martin Luther King Jr. Day',
    'Labor Day',
    'Veterans Day',
    'Good Friday',
    'Memorial Day'
]);

function formatDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function isSameDate(dateA, dateB) {
    return formatDateKey(dateA) === formatDateKey(dateB);
}

function getNthWeekdayOfMonth(year, monthIndex, weekday, occurrence) {
    const firstDay = new Date(year, monthIndex, 1);
    const firstWeekday = firstDay.getDay();
    const offset = (weekday - firstWeekday + 7) % 7;
    const day = 1 + offset + (occurrence - 1) * 7;
    return new Date(year, monthIndex, day);
}

function getLastWeekdayOfMonth(year, monthIndex, weekday) {
    const lastDay = new Date(year, monthIndex + 1, 0).getDate();
    const lastOfMonth = new Date(year, monthIndex, lastDay);
    const lastWeekday = lastOfMonth.getDay();
    const offset = (lastWeekday - weekday + 7) % 7;
    const day = lastDay - offset;
    return new Date(year, monthIndex, day);
}

function getEasterSunday(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month, day);
}

function getHolidayNameForDate(date) {
    const year = date.getFullYear();
    const holidays = [
        { name: "New Year's Day", date: new Date(year, 0, 1) },
        { name: 'Martin Luther King Jr. Day', date: getNthWeekdayOfMonth(year, 0, 1, 3) },
        { name: "Washington's Birthday", date: getNthWeekdayOfMonth(year, 1, 1, 3) },
        { name: 'Memorial Day', date: getLastWeekdayOfMonth(year, 4, 1) },
        { name: 'Juneteenth National Independence Day', date: new Date(year, 5, 19) },
        { name: 'Independence Day', date: new Date(year, 6, 4) },
        { name: 'Labor Day', date: getNthWeekdayOfMonth(year, 8, 1, 1) },
        { name: 'Columbus Day', date: getNthWeekdayOfMonth(year, 9, 1, 2) },
        { name: 'Veterans Day', date: new Date(year, 10, 11) },
        { name: 'Thanksgiving Day', date: getNthWeekdayOfMonth(year, 10, 4, 4) },
        { name: 'Christmas Day', date: new Date(year, 11, 25) }
    ];

    const easterSunday = getEasterSunday(year);
    holidays.push({
        name: 'Good Friday',
        date: new Date(easterSunday.getFullYear(), easterSunday.getMonth(), easterSunday.getDate() - 2)
    });

    for (const holiday of holidays) {
        if (isSameDate(date, holiday.date)) {
            return holiday.name;
        }
    }

    return null;
}

function isHolidayBlocked(date) {
    const holidayName = getHolidayNameForDate(date);
    if (!holidayName) {
        return false;
    }

    return !OPEN_HOLIDAY_EXCEPTIONS.has(holidayName);
}

function isDateAvailable(date) {
    if (!date) {
        return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
        return false;
    }

    if (isHolidayBlocked(date)) {
        return false;
    }

    return true;
}

function getAvailableTimesForDate(date) {
    const baseTimes = [
        { value: '07:00', label: '7:00 AM' },
        { value: '08:00', label: '8:00 AM' },
        { value: '09:00', label: '9:00 AM' },
        { value: '10:00', label: '10:00 AM' },
        { value: '11:00', label: '11:00 AM' },
        { value: '12:00', label: '12:00 PM' },
        { value: '13:00', label: '1:00 PM' },
        { value: '14:00', label: '2:00 PM' },
        { value: '15:00', label: '3:00 PM' },
        { value: '16:00', label: '4:00 PM' }
    ];

    if (!date) {
        return baseTimes;
    }

    if (date.getDay() === 0) {
        return baseTimes.filter((time) => Number.parseInt(time.value, 10) <= 13);
    }

    if (date.getDay() === 6) {
        return baseTimes.filter((time) => Number.parseInt(time.value, 10) <= 13);
    }

    return baseTimes.filter((time) => Number.parseInt(time.value, 10) <= 16);
}

function updateTimeOptions() {
    const timeSelect = document.getElementById('time');
    if (!timeSelect) {
        return;
    }

    const currentValue = timeSelect.value;
    const availableTimes = getAvailableTimesForDate(selectedDate);

    timeSelect.innerHTML = '<option value="">Select a time</option>' + availableTimes.map((time) => {
        return `<option value="${time.value}">${time.label}</option>`;
    }).join('');

    if (currentValue && availableTimes.some((time) => time.value === currentValue)) {
        timeSelect.value = currentValue;
    }
}

// Initialize calendar on page load
document.addEventListener('DOMContentLoaded', function() {
    if (calendarDays && currentMonth && prevMonthBtn && nextMonthBtn) {
        renderCalendar();
    }
    setupEventListeners();
    updateTimeOptions();
});

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    currentMonth.textContent = `${monthNames[month]} ${year}`;

    calendarDays.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    for (let i = firstDay - 1; i >= 0; i--) {
        const dayDiv = createDayElement(daysInPrevMonth - i, true);
        calendarDays.appendChild(dayDiv);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = createDayElement(day, false, year, month);
        calendarDays.appendChild(dayDiv);
    }

    const totalCells = calendarDays.children.length;
    const remainingCells = 42 - totalCells;
    for (let day = 1; day <= remainingCells; day++) {
        const dayDiv = createDayElement(day, true);
        calendarDays.appendChild(dayDiv);
    }
}

function createDayElement(day, isOtherMonth, year, month) {
    const dayDiv = document.createElement('div');
    dayDiv.textContent = day;
    dayDiv.className = 'day';

    if (isOtherMonth) {
        dayDiv.classList.add('other-month');
        return dayDiv;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateObj = new Date(year, month, day);

    if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
        dayDiv.style.fontWeight = 'bold';
    }

    if (dateObj < today || isHolidayBlocked(dateObj)) {
        dayDiv.classList.add('blocked');
        dayDiv.style.opacity = '0.55';
        dayDiv.style.cursor = 'not-allowed';
        dayDiv.style.pointerEvents = 'none';
        dayDiv.title = 'Not available for appointments';
        return dayDiv;
    }

    dayDiv.classList.add('available');
    dayDiv.onclick = () => selectDate(day, year, month, dayDiv);
    dayDiv.style.cursor = 'pointer';
    dayDiv.title = 'Available for appointments';
    return dayDiv;
}

function selectDate(day, year, month, clickedDay) {
    const targetDate = new Date(year, month, day);
    if (!isDateAvailable(targetDate)) {
        return;
    }

    document.querySelectorAll('.day.selected').forEach((el) => {
        el.classList.remove('selected');
    });

    if (clickedDay) {
        clickedDay.classList.add('selected');
    }

    selectedDate = targetDate;
    const dateString = selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    selectedDateInput.value = dateString;
    updateTimeOptions();
}

function setupEventListeners() {
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const date = selectedDateInput.value;
    const time = document.getElementById('time').value;
    const notes = document.getElementById('notes').value;

    if (!selectedDate) {
        showMessage('Please select an available appointment date.', 'error');
        return;
    }

    if (!time) {
        showMessage('Please choose a time for your appointment.', 'error');
        return;
    }

    if (selectedDate.getDay() === 0 && Number.parseInt(time, 10) > 13) {
        showMessage('Sunday appointments are available only until 1:00 PM.', 'error');
        return;
    }

    const bookingData = {
        name,
        email,
        phone,
        service,
        date,
        time,
        notes,
        bookingTime: new Date().toISOString()
    };

    let bookings = JSON.parse(localStorage.getItem('cosmetologyBookings')) || [];
    bookings.push(bookingData);
    localStorage.setItem('cosmetologyBookings', JSON.stringify(bookings));

    showMessage(`Thank you, ${name}! Your appointment has been booked for ${date} at ${time}. We'll send a confirmation to ${email}.`, 'success');

    bookingForm.reset();
    selectedDateInput.value = '';
    document.querySelectorAll('.day.selected').forEach((el) => {
        el.classList.remove('selected');
    });
    selectedDate = null;
    updateTimeOptions();
}

function showMessage(message, type) {
    bookingMessage.textContent = message;
    bookingMessage.className = `booking-message ${type}`;

    setTimeout(() => {
        bookingMessage.className = 'booking-message';
    }, 5000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.style.display = 'none';
            hamburger.classList.remove('active');
        });
    });
}

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50 && navbar) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else if (navbar) {
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for fade-in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    document.querySelectorAll('.contact-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}