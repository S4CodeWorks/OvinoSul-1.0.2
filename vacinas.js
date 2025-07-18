// Vaccines page functionality
document.addEventListener('DOMContentLoaded', function() {
    const vaccineData = {
        brucelose: {
            name: 'Brucelose',
            keywords: ['brucelose', 'aborto', 'infertilidade', 'obrigatória', 'fêmeas', 'dose única'],
            description: 'Vacina obrigatória contra brucelose, previne abortos e infertilidade',
            schedule: [
                { month: 'Todo o ano', age: '3-8 meses', note: 'Fêmeas apenas' }
            ],
            type: 'obrigatory'
        },
        clostridioses: {
            name: 'Clostridioses',
            keywords: ['clostridiose', 'clostridium', 'carbúnculo', 'gangrena', 'enterotoxemia'],
            description: 'Previne doenças clostridiais fatais como carbúnculo e gangrena',
            schedule: [
                { month: 'Março-Abril', age: 'Maternal', note: 'Primeira dose' },
                { month: 'Abril-Maio', age: 'Maternal', note: 'Segunda dose' },
                { month: 'Janeiro', age: 'Todos', note: 'Reforço anual' }
            ],
            type: 'recommended'
        },
        diarreia: {
            name: 'Diarreia Neonatal',
            keywords: ['diarreia', 'neonatal', 'cordeiros', 'recém-nascidos', 'desidratação'],
            description: 'Protege cordeiros contra diarreia neonatal e desidratação',
            schedule: [
                { month: 'Junho', age: 'Novilhas', note: '60 dias pré-parto' },
                { month: 'Julho', age: 'Novilhas', note: '30 dias pré-parto' },
                { month: 'Janeiro', age: 'Matrizes', note: 'Reforço anual' }
            ],
            type: 'recommended'
        },
        leptospirose: {
            name: 'Leptospirose',
            keywords: ['leptospirose', 'leptospira', 'aborto', 'natimorto', 'renal'],
            description: 'Previne leptospirose, causa de abortos e problemas renais',
            schedule: [
                { month: 'Março-Abril', age: 'Maternal', note: 'Primeira dose' },
                { month: 'Abril-Maio', age: 'Maternal', note: 'Segunda dose' },
                { month: 'Julho', age: 'Todos', note: 'Reforço semestral' }
            ],
            type: 'recommended'
        },
        raiva: {
            name: 'Raiva',
            keywords: ['raiva', 'zoonose', 'sistema nervoso', 'morcego', 'obrigatória'],
            description: 'Vacina obrigatória contra raiva, doença fatal transmissível ao homem',
            schedule: [
                { month: 'Maio', age: '4+ meses', note: 'Primeira dose' },
                { month: 'Janeiro', age: 'Todos', note: 'Reforço anual' }
            ],
            type: 'obligatory'
        },
        'ibr-bvd': {
            name: 'IBR e BVD',
            keywords: ['ibr', 'bvd', 'reprodutiva', 'respiratória', 'gestacional'],
            description: 'Previne doenças reprodutivas e respiratórias, reduz perdas gestacionais',
            schedule: [
                { month: 'Março-Abril', age: 'Maternal', note: 'Primeira dose' },
                { month: 'Abril-Maio', age: 'Maternal', note: 'Segunda dose' },
                { month: 'Janeiro', age: 'Todos', note: 'Reforço anual' }
            ],
            type: 'recommended'
        }
    };

    // Initialize calendar
    initializeCalendar();
    
    // Setup controls
    setupCalendarControls();
    
    // Setup download functionality
    setupDownloadFunctionality();
    
    // Setup search integration
    setupSearchIntegration();

    function initializeCalendar() {
        const monthlyCalendar = document.getElementById('monthlyCalendar');
        const annualCalendar = document.getElementById('annualCalendar');
        
        // Generate monthly calendar
        generateMonthlyCalendar(monthlyCalendar);
        
        // Generate annual overview
        generateAnnualOverview(annualCalendar);
    }

    function generateMonthlyCalendar(container) {
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        const monthData = generateMonthData(currentYear, currentMonth);
        
        container.innerHTML = `
            <div class="calendar-header">
                <h3 class="calendar-month-title">${months[currentMonth]} ${currentYear}</h3>
                <div class="calendar-nav">
                    <button class="nav-btn prev-month">‹</button>
                    <button class="nav-btn next-month">›</button>
                </div>
            </div>
            <div class="monthly-calendar">
                <div class="calendar-header">
                    <div class="calendar-day-header">Dom</div>
                    <div class="calendar-day-header">Seg</div>
                    <div class="calendar-day-header">Ter</div>
                    <div class="calendar-day-header">Qua</div>
                    <div class="calendar-day-header">Qui</div>
                    <div class="calendar-day-header">Sex</div>
                    <div class="calendar-day-header">Sáb</div>
                </div>
                ${monthData.map(day => `
                    <div class="calendar-day ${day.otherMonth ? 'other-month' : ''}">
                        <div class="calendar-day-number">${day.date}</div>
                        ${day.events.map(event => `
                            <div class="vaccine-event ${event.type}" title="${event.name} - ${event.note}">
                                ${event.name}
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
        `;
        
        // Add navigation listeners
        container.querySelector('.prev-month').addEventListener('click', () => {
            // Previous month logic
            console.log('Previous month');
        });
        
        container.querySelector('.next-month').addEventListener('click', () => {
            // Next month logic
            console.log('Next month');
        });
    }

    function generateMonthData(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        const days = [];
        
        // Add previous month days
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            const prevMonthDay = new Date(year, month, -i);
            days.push({
                date: prevMonthDay.getDate(),
                otherMonth: true,
                events: []
            });
        }
        
        // Add current month days
        for (let day = 1; day <= daysInMonth; day++) {
            const events = getEventsForDay(month + 1, day);
            days.push({
                date: day,
                otherMonth: false,
                events: events
            });
        }
        
        // Add next month days to complete the grid
        const remainingDays = 42 - days.length;
        for (let day = 1; day <= remainingDays; day++) {
            days.push({
                date: day,
                otherMonth: true,
                events: []
            });
        }
        
        return days;
    }

    function getEventsForDay(month, day) {
        const events = [];
        
        // Check each vaccine's schedule
        Object.values(vaccineData).forEach(vaccine => {
            vaccine.schedule.forEach(schedule => {
                if (matchesSchedule(schedule.month, month, day)) {
                    events.push({
                        name: vaccine.name,
                        note: schedule.note,
                        type: vaccine.type
                    });
                }
            });
        });
        
        return events;
    }

    function matchesSchedule(scheduleMonth, month, day) {
        // Simple matching logic - in real app, this would be more sophisticated
        const monthNames = {
            'Janeiro': 1, 'Fevereiro': 2, 'Março': 3, 'Abril': 4,
            'Maio': 5, 'Junho': 6, 'Julho': 7, 'Agosto': 8,
            'Setembro': 9, 'Outubro': 10, 'Novembro': 11, 'Dezembro': 12
        };
        
        if (scheduleMonth === 'Todo o ano') {
            return day === 15; // Show on 15th of each month
        }
        
        if (scheduleMonth.includes('-')) {
            const [startMonth, endMonth] = scheduleMonth.split('-');
            const startNum = monthNames[startMonth];
            const endNum = monthNames[endMonth];
            return month >= startNum && month <= endNum && day === 15;
        }
        
        return monthNames[scheduleMonth] === month && day === 15;
    }

    function generateAnnualOverview(container) {
        const months = [
            'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
            'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ];
        
        container.innerHTML = `
            <div class="annual-overview">
                <h3>Cronograma Anual 2025</h3>
                <div class="annual-grid">
                    ${months.map((month, index) => `
                        <div class="annual-month">
                            <h4>${month}</h4>
                            <div class="month-vaccines">
                                ${getMonthVaccines(index + 1).map(vaccine => `
                                    <div class="vaccine-item ${vaccine.type}">
                                        <span class="vaccine-name">${vaccine.name}</span>
                                        <span class="vaccine-note">${vaccine.note}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    function getMonthVaccines(month) {
        const vaccines = [];
        
        Object.values(vaccineData).forEach(vaccine => {
            vaccine.schedule.forEach(schedule => {
                if (matchesSchedule(schedule.month, month, 15)) {
                    vaccines.push({
                        name: vaccine.name,
                        note: schedule.note,
                        type: vaccine.type
                    });
                }
            });
        });
        
        return vaccines;
    }

    function setupCalendarControls() {
        const toggleBtns = document.querySelectorAll('.toggle-btn');
        const monthlyView = document.querySelector('.monthly-view');
        const annualView = document.querySelector('.annual-view');
        const categoryFilter = document.getElementById('categoryFilter');
        
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const view = btn.dataset.view;
                
                if (view === 'monthly') {
                    monthlyView.classList.add('active');
                    annualView.classList.remove('active');
                } else {
                    annualView.classList.add('active');
                    monthlyView.classList.remove('active');
                }
            });
        });
        
        categoryFilter.addEventListener('change', (e) => {
            const filter = e.target.value;
            filterVaccines(filter);
        });
    }

    function filterVaccines(filter) {
        const vaccineCards = document.querySelectorAll('.vaccine-card');
        const vaccineEvents = document.querySelectorAll('.vaccine-event');
        
        vaccineCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                const isVisible = card.classList.contains(filter);
                card.style.display = isVisible ? 'block' : 'none';
            }
        });
        
        vaccineEvents.forEach(event => {
            if (filter === 'all') {
                event.style.display = 'block';
            } else {
                const isVisible = event.classList.contains(filter);
                event.style.display = isVisible ? 'block' : 'none';
            }
        });
    }

    function setupDownloadFunctionality() {
        const downloadBtn = document.getElementById('downloadCalendar');
        
        downloadBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            // Show loading state
            const originalText = downloadBtn.textContent;
            downloadBtn.textContent = 'Gerando PDF...';
            downloadBtn.disabled = true;
            
            try {
                // Generate PDF content
                const pdfContent = generatePDFContent();
                
                // Create blob and download
                const blob = new Blob([pdfContent], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'calendario-vacinacao-ovinos-rs-2025.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
            } catch (error) {
                console.error('Error generating PDF:', error);
                alert('Erro ao gerar PDF. Tente novamente.');
            } finally {
                downloadBtn.textContent = originalText;
                downloadBtn.disabled = false;
            }
        });
    }

    function generatePDFContent() {
        // Simple PDF content - in real app, use a PDF library
        return `
            CALENDÁRIO DE VACINAÇÃO PARA OVINOS - RIO GRANDE DO SUL 2025
            
            VACINAS OBRIGATÓRIAS:
            - Brucelose: Fêmeas de 3-8 meses (dose única)
            - Raiva: A partir dos 4 meses (reforço anual)
            
            VACINAS RECOMENDADAS:
            - Clostridioses: Maternal + reforço após 30 dias + reforço anual
            - Leptospirose: Maternal + reforço após 30 dias + reforço semestral
            - Diarreia Neonatal: Novilhas 60 e 30 dias pré-parto + reforço anual
            - IBR e BVD: Maternal + reforço após 30 dias + reforço anual
            
            IMPORTANTE: Consulte sempre um médico veterinário.
        `;
    }

    function setupSearchIntegration() {
        // Add vaccine data to global search
        if (window.vaccineSearchData) {
            window.vaccineSearchData = vaccineData;
        }
        
        // Make vaccine data available globally for search
        window.getVaccineData = function() {
            return Object.values(vaccineData).map(vaccine => ({
                ...vaccine,
                type: 'vaccine',
                category: 'Vacina',
                url: `vacinas.html#${vaccine.name.toLowerCase().replace(/\s+/g, '-')}`
            }));
        };
    }

    // Add CSS for annual overview
    const style = document.createElement('style');
    style.textContent = `
        .annual-overview {
            padding: 2rem;
        }
        
        .annual-overview h3 {
            text-align: center;
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 2rem;
        }
        
        .annual-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
        }
        
        .annual-month {
            background: var(--surface);
            border-radius: 0.75rem;
            padding: 1.5rem;
            border: 1px solid var(--border);
        }
        
        .annual-month h4 {
            font-size: 1.125rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 1rem;
            text-align: center;
        }
        
        .month-vaccines {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .vaccine-item {
            padding: 0.5rem;
            border-radius: 0.5rem;
            color: white;
            font-size: 0.875rem;
        }
        
        .vaccine-item.obligatory {
            background: linear-gradient(135deg, #DC2626, #B91C1C);
        }
        
        .vaccine-item.recommended {
            background: linear-gradient(135deg, #059669, #047857);
        }
        
        .vaccine-name {
            font-weight: 600;
            display: block;
        }
        
        .vaccine-note {
            font-size: 0.75rem;
            opacity: 0.9;
            display: block;
            margin-top: 0.25rem;
        }
        
        .calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding: 0 1rem;
        }
        
        .calendar-month-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--text-primary);
            margin: 0;
        }
        
        .calendar-nav {
            display: flex;
            gap: 0.5rem;
        }
        
        .nav-btn {
            width: 2.5rem;
            height: 2.5rem;
            border: 1px solid var(--border);
            background: var(--background);
            border-radius: 0.5rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
            color: var(--text-primary);
            transition: all 0.3s ease;
        }
        
        .nav-btn:hover {
            background: var(--earthy-color);
            color: white;
            border-color: var(--earthy-color);
        }
        
        @media (max-width: 768px) {
            .annual-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .calendar-header {
                flex-direction: column;
                gap: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
});