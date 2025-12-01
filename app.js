// Основной объект приложения
const MedicalApp = {
    // Конфигурация
    config: {
        fontSize: 'normal',
        currentSession: 'default',
        sessions: {}
    },
    
    // Инициализация приложения
    init: function() {
        this.loadConfig();
        this.setupEventListeners();
        this.applyFontSize();
        this.loadSession('default');
        console.log('Medical App initialized');
    },
    
    // Загрузка конфигурации из localStorage
    loadConfig: function() {
        const savedConfig = localStorage.getItem('medicalAppConfig');
        if (savedConfig) {
            this.config = {...this.config, ...JSON.parse(savedConfig)};
        }
    },
    
    // Сохранение конфигурации в localStorage
    saveConfig: function() {
        localStorage.setItem('medicalAppConfig', JSON.stringify(this.config));
    },
    
    // Настройка обработчиков событий
    setupEventListeners: function() {
        // Кнопки изменения шрифта
        document.getElementById('font-small').addEventListener('click', () => this.changeFontSize('small'));
        document.getElementById('font-normal').addEventListener('click', () => this.changeFontSize('normal'));
        document.getElementById('font-large').addEventListener('click', () => this.changeFontSize('large'));
        
        // Кнопки записи аудио
        document.getElementById('record-btn').addEventListener('click', () => this.startRecording());
        document.getElementById('stop-btn').addEventListener('click', () => this.stopRecording());
        
        // Загрузка аудиофайла
        document.getElementById('upload-btn').addEventListener('click', () => document.getElementById('audio-file').click());
        document.getElementById('audio-file').addEventListener('change', (e) => this.handleAudioUpload(e));
        
        // Копирование текста
        document.getElementById('copy-all').addEventListener('click', () => this.copyToClipboard('transcription'));
        document.querySelectorAll('.copy-section').forEach(button => {
            button.addEventListener('click', (e) => {
                const section = e.target.getAttribute('data-section');
                this.copyToClipboard(section);
            });
        });
        
        // ИИ агенты
        document.getElementById('drug-checker').addEventListener('click', () => this.checkDrugCompatibility());
        document.getElementById('recommendations').addEventListener('click', () => this.generateRecommendations());
        document.getElementById('analyze-conversation').addEventListener('click', () => this.analyzeConversation());
        
        // Шаблоны
        document.getElementById('apply-templates').addEventListener('click', () => this.applyTemplates());
        
        // Сохранение/загрузка сессий
        document.getElementById('save-session').addEventListener('click', () => this.showSessionModal());
        document.getElementById('load-session').addEventListener('click', () => this.showSessionModal());
        
        // Модальное окно
        document.querySelector('.close').addEventListener('click', () => this.hideSessionModal());
        document.getElementById('new-session').addEventListener('click', () => this.createNewSession());
        document.getElementById('save-current').addEventListener('click', () => this.saveCurrentSession());
        
        // Автосохранение при изменении текста
        document.querySelectorAll('.editable-text').forEach(element => {
            element.addEventListener('input', () => this.autoSave());
        });
        
        // Закрытие модального окна при клике вне его
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('session-modal');
            if (e.target === modal) {
                this.hideSessionModal();
            }
        });
    },
    
    // Изменение размера шрифта
    changeFontSize: function(size) {
        document.body.className = '';
        if (size !== 'normal') {
            document.body.classList.add(`${size}-font`);
        }
        this.config.fontSize = size;
        this.saveConfig();
    },
    
    // Применение сохраненного размера шрифта
    applyFontSize: function() {
        this.changeFontSize(this.config.fontSize);
    },
    
    // Начало записи аудио
    startRecording: function() {
        // В реальном приложении здесь будет код для записи аудио
        document.getElementById('record-btn').disabled = true;
        document.getElementById('stop-btn').disabled = false;
        document.getElementById('recording-status').textContent = 'Идет запись...';
        document.getElementById('recording-status').classList.add('recording');
        
        // Имитация записи (в реальном приложении замените на настоящую запись)
        this.recordingSimulation();
    },
    
    // Остановка записи аудио
    stopRecording: function() {
        // В реальном приложении здесь будет код для остановки записи
        document.getElementById('record-btn').disabled = false;
        document.getElementById('stop-btn').disabled = true;
        document.getElementById('recording-status').textContent = 'Запись завершена. Обработка...';
        document.getElementById('recording-status').classList.remove('recording');
        
        // Имитация обработки аудио
        setTimeout(() => {
            this.simulateTranscription();
            document.getElementById('recording-status').textContent = 'Обработка завершена';
        }, 2000);
    },
    
    // Имитация записи (для демонстрации)
    recordingSimulation: function() {
        // В реальном приложении замените на настоящую запись
        console.log('Запись начата...');
    },
    
    // Обработка загруженного аудиофайла
    handleAudioUpload: function(event) {
        const file = event.target.files[0];
        if (file) {
            document.getElementById('recording-status').textContent = 'Обработка аудиофайла...';
            
            // Имитация обработки файла
            setTimeout(() => {
                this.simulateTranscription();
                document.getElementById('recording-status').textContent = 'Файл обработан';
            }, 1500);
        }
    },
    
    // Имитация транскрипции (в реальном приложении замените на вызов Whisper API)
    simulateTranscription: function() {
        const sampleText = `Пациент: Добрый день, доктор. Беспокоят боли в области желудка, особенно после еды. Также есть изжога и отрыжка.
        
Врач: Как давно появились эти симптомы? Принимали ли что-то для облегчения?
        
Пациент: Около двух недель. Пью иногда Ренни, помогает, но ненадолго.`;

        document.getElementById('transcription').textContent = sampleText;
        
        // Автоматическое заполнение разделов на основе транскрипции
        this.autoFillSections();
    },
    
    // Автоматическое заполнение разделов на основе транскрипции
    autoFillSections: function() {
        // В реальном приложении здесь будет вызов ИИ для анализа текста
        // Пока используем демонстрационные данные
        
        const sectionsData = {
            complaints: 'Боли в эпигастральной области после приема пищи, изжога, отрыжка.',
            'life-history': 'Хронических заболеваний не отмечает. Операций не было.',
            allergies: 'Аллергологический анамнез не отягощен.',
            examination: 'Общее состояние удовлетворительное. Кожные покровы чистые. Язык обложен белым налетом. При пальпации живота болезненность в эпигастральной области.',
            diagnosis: 'Острый гастрит. Гастроэзофагеальная рефлюксная болезнь.',
            prescriptions: '1. Омепразол 20 мг 1 раз в день утром за 30 мин до еды - 14 дней\n2. Алмагель по 1 ст.л. 3 раза в день через 1 час после еды - 10 дней',
            examinations: '1. ФГДС\n2. УЗИ органов брюшной полости\n3. Общий анализ крови, биохимический анализ крови',
            'current-meds': 'Ренни по требованию при изжоге.'
        };
        
        for (const [section, content] of Object.entries(sectionsData)) {
            document.getElementById(section).textContent = content;
        }
        
        this.autoSave();
    },
    
    // Копирование текста в буфер обмена
    copyToClipboard: function(sectionId) {
        const element = document.getElementById(sectionId);
        const text = element.textContent || element.innerText;
        
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification(`Раздел "${this.getSectionName(sectionId)}" скопирован в буфер обмена`);
        }).catch(err => {
            console.error('Ошибка при копировании: ', err);
            this.showNotification('Ошибка при копировании', 'error');
        });
    },
    
    // Получение читаемого имени раздела
    getSectionName: function(sectionId) {
        const names = {
            'transcription': 'Транскрипция',
            'complaints': 'Жалобы',
            'life-history': 'Анамнез жизни',
            'allergies': 'Аллергологический',
            'examination': 'Объективный осмотр',
            'diagnosis': 'Диагноз',
            'prescriptions': 'Назначения',
            'examinations': 'Исследования',
            'current-meds': 'Принимаемые препараты'
        };
        
        return names[sectionId] || sectionId;
    },
    
    // Проверка совместимости препаратов
    checkDrugCompatibility: function() {
        const currentMeds = document.getElementById('current-meds').textContent;
        const prescriptions = document.getElementById('prescriptions').textContent;
        
        if (!currentMeds.trim() || currentMeds.trim() === document.getElementById('current-meds').getAttribute('data-placeholder')) {
            this.showNotification('Сначала заполните раздел "Пациент принимает препараты"', 'warning');
            return;
        }
        
        // Имитация проверки совместимости
        this.showNotification('Проверка совместимости препаратов...', 'info');
        
        setTimeout(() => {
            // В реальном приложении здесь будет вызов ИИ для проверки совместимости
            this.showNotification('Проверка завершена. Конфликтов не обнаружено.', 'success');
        }, 2000);
    },
    
    // Генерация рекомендаций
    generateRecommendations: function() {
        // Имитация генерации рекомендаций
        this.showNotification('Генерация рекомендаций...', 'info');
        
        setTimeout(() => {
            // В реальном приложении здесь будет вызов ИИ для генерации рекомендаций
            const recommendations = `Рекомендации для пациента:
1. Соблюдение диеты: исключить острую, жареную, жирную пищу, газированные напитки
2. Питание дробное, 4-5 раз в день небольшими порциями
3. Не ложиться в течение 2 часов после еды
4. Исключить курение и алкоголь
5. Контроль состояния через 2 недели`;

            document.getElementById('prescriptions').textContent += '\n\n' + recommendations;
            this.showNotification('Рекомендации сгенерированы и добавлены в раздел "Назначения"', 'success');
            this.autoSave();
        }, 2000);
    },
    
    // Анализ разговора
    analyzeConversation: function() {
        const transcription = document.getElementById('transcription').textContent;
        
        if (!transcription.trim() || transcription.trim() === document.getElementById('transcription').getAttribute('data-placeholder')) {
            this.showNotification('Сначала выполните транскрипцию разговора', 'warning');
            return;
        }
        
        this.showNotification('Анализ разговора...', 'info');
        
        setTimeout(() => {
            // В реальном приложении здесь будет углубленный анализ ИИ
            this.autoFillSections();
            this.showNotification('Анализ завершен. Разделы заполнены автоматически.', 'success');
        }, 2000);
    },
    
    // Применение шаблонов
    applyTemplates: function() {
        const templates = {
            complaints: 'Жалобы на момент осмотра: ',
            'life-history': 'Анамнез жизни: ',
            allergies: 'Аллергологический анамнез: не отягощен.',
            examination: 'Объективный осмотр: Общее состояние удовлетворительное. ',
            diagnosis: 'Диагноз: ',
            prescriptions: 'Назначения: ',
            examinations: 'Назначенные исследования: ',
            'current-meds': 'Постоянно принимаемые препараты: '
        };
        
        for (const [section, template] of Object.entries(templates)) {
            const element = document.getElementById(section);
            if (!element.textContent.trim() || element.textContent.trim() === element.getAttribute('data-placeholder')) {
                element.textContent = template;
            }
        }
        
        this.showNotification('Шаблоны применены к пустым разделам', 'success');
        this.autoSave();
    },
    
    // Показать модальное окно управления сессиями
    showSessionModal: function() {
        document.getElementById('session-modal').style.display = 'block';
        this.updateSessionsList();
    },
    
    // Скрыть модальное окно
    hideSessionModal: function() {
        document.getElementById('session-modal').style.display = 'none';
    },
    
    // Обновление списка сессий
    updateSessionsList: function() {
        const sessionsList = document.getElementById('sessions-list');
        sessionsList.innerHTML = '';
        
        for (const [name, session] of Object.entries(this.config.sessions)) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${name} (${new Date(session.timestamp).toLocaleString()})</span>
                <div>
                    <button class="load-session-btn" data-session="${name}"><i class="fas fa-folder-open"></i></button>
                    <button class="delete-session-btn" data-session="${name}"><i class="fas fa-trash"></i></button>
                </div>
            `;
            sessionsList.appendChild(li);
        }
        
        // Добавляем обработчики для кнопок загрузки и удаления
        document.querySelectorAll('.load-session-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const sessionName = e.target.closest('button').getAttribute('data-session');
                this.loadSession(sessionName);
                this.hideSessionModal();
            });
        });
        
        document.querySelectorAll('.delete-session-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const sessionName = e.target.closest('button').getAttribute('data-session');
                this.deleteSession(sessionName);
            });
        });
        
        // Обработчики для загрузки по клику на всю строку
        document.querySelectorAll('#sessions-list li').forEach(li => {
            li.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    const sessionName = e.currentTarget.querySelector('.load-session-btn').getAttribute('data-session');
                    this.loadSession(sessionName);
                    this.hideSessionModal();
                }
            });
        });
    },
    
    // Создание новой сессии
    createNewSession: function() {
        const sessionName = prompt('Введите название новой сессии:');
        if (sessionName && sessionName.trim()) {
            this.clearAllSections();
            this.config.currentSession = sessionName.trim();
            this.saveConfig();
            this.showNotification(`Создана новая сессия: ${sessionName}`, 'success');
        }
    },
    
    // Сохранение текущей сессии
    saveCurrentSession: function() {
        const sessionName = prompt('Введите название для сохранения сессии:', this.config.currentSession);
        if (sessionName && sessionName.trim()) {
            this.saveSession(sessionName.trim());
        }
    },
    
    // Сохранение сессии
    saveSession: function(name) {
        const sessionData = {};
        
        // Сохраняем содержимое всех редактируемых полей
        document.querySelectorAll('.editable-text').forEach(element => {
            sessionData[element.id] = element.textContent;
        });
        
        this.config.sessions[name] = {
            data: sessionData,
            timestamp: Date.now()
        };
        
        this.config.currentSession = name;
        this.saveConfig();
        this.updateSessionsList();
        this.showNotification(`Сессия "${name}" сохранена`, 'success');
    },
    
    // Загрузка сессии
    loadSession: function(name) {
        if (this.config.sessions[name]) {
            const sessionData = this.config.sessions[name].data;
            
            // Восстанавливаем содержимое всех редактируемых полей
            for (const [id, content] of Object.entries(sessionData)) {
                const element = document.getElementById(id);
                if (element) {
                    element.textContent = content;
                }
            }
            
            this.config.currentSession = name;
            this.saveConfig();
            this.showNotification(`Сессия "${name}" загружена`, 'success');
        } else if (name === 'default') {
            // Создаем пустую сессию по умолчанию
            this.clearAllSections();
        }
    },
    
    // Удаление сессии
    deleteSession: function(name) {
        if (confirm(`Удалить сессию "${name}"?`)) {
            delete this.config.sessions[name];
            this.saveConfig();
            this.updateSessionsList();
            this.showNotification(`Сессия "${name}" удалена`, 'success');
            
            if (this.config.currentSession === name) {
                this.config.currentSession = 'default';
                this.clearAllSections();
            }
        }
    },
    
    // Очистка всех разделов
    clearAllSections: function() {
        document.querySelectorAll('.editable-text').forEach(element => {
            element.textContent = '';
        });
    },
    
    // Автосохранение
    autoSave: function() {
        // В реальном приложении можно добавить дебаунсинг для оптимизации
        if (this.config.currentSession && this.config.currentSession !== 'default') {
            this.saveSession(this.config.currentSession);
        }
    },
    
    // Показать уведомление
    showNotification: function(message, type = 'info') {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            z-index: 10000;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: opacity 0.3s;
        `;
        
        // Устанавливаем цвет в зависимости от типа
        const colors = {
            info: '#2563EB',
            success: '#10B981',
            warning: '#F59E0B',
            error: '#EF4444'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        
        // Добавляем уведомление на страницу
        document.body.appendChild(notification);
        
        // Удаляем уведомление через 3 секунды
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
};

// Инициализация приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    MedicalApp.init();
});