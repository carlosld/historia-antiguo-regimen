// Base de datos de tests - Se cargan desde archivos externos
const tests = {};

// Función para registrar un test (será llamada desde cada archivo de test)
function registerTest(id, testData) {
    tests[id] = testData;
}

// Sistema de estadísticas con localStorage
const StatsManager = {
    getStats() {
        const stats = localStorage.getItem('historyTestStats');
        return stats ? JSON.parse(stats) : {};
    },
    
    saveStats(stats) {
        localStorage.setItem('historyTestStats', JSON.stringify(stats));
    },
    
    recordAnswer(testId, questionIndex, isCorrect) {
        const stats = this.getStats();
        
        if (!stats[testId]) {
            stats[testId] = {
                attempts: 0,
                totalCorrect: 0,
                totalIncorrect: 0,
                questions: {}
            };
        }
        
        if (!stats[testId].questions[questionIndex]) {
            stats[testId].questions[questionIndex] = {
                attempts: 0,
                correct: 0,
                incorrect: 0
            };
        }
        
        stats[testId].questions[questionIndex].attempts++;
        if (isCorrect) {
            stats[testId].questions[questionIndex].correct++;
        } else {
            stats[testId].questions[questionIndex].incorrect++;
        }
        
        this.saveStats(stats);
    },
    
    recordTestCompletion(testId, correctAnswers, totalQuestions) {
        const stats = this.getStats();
        
        if (!stats[testId]) {
            stats[testId] = {
                attempts: 0,
                totalCorrect: 0,
                totalIncorrect: 0,
                questions: {}
            };
        }
        
        stats[testId].attempts++;
        stats[testId].totalCorrect += correctAnswers;
        stats[testId].totalIncorrect += (totalQuestions - correctAnswers);
        
        this.saveStats(stats);
    },
    
    clearAllStats() {
        if (confirm('¿Estás segura de que quieres borrar todas las estadísticas? Esta acción no se puede deshacer.')) {
            localStorage.removeItem('historyTestStats');
            displayStats();
        }
    }
};

// Variables del estado del juego
let currentTest = null;
let currentTestId = null;
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// Elementos del DOM
const menuScreen = document.getElementById('menu-screen');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const reviewScreen = document.getElementById('review-screen');
const statsScreen = document.getElementById('stats-screen');

const testCards = document.querySelectorAll('.test-card');
const backToMenuBtn = document.getElementById('back-to-menu-btn');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const reviewBtn = document.getElementById('review-btn');
const backToResultsBtn = document.getElementById('back-to-results-btn');
const restartFromReviewBtn = document.getElementById('restart-from-review-btn');
const menuFromResultsBtn = document.getElementById('menu-from-results-btn');
const menuFromReviewBtn = document.getElementById('menu-from-review-btn');
const statsBtn = document.getElementById('stats-btn');
const clearStatsBtn = document.getElementById('clear-stats-btn');
const backToMenuFromStatsBtn = document.getElementById('back-to-menu-from-stats-btn');
const practiceMistakesBtn = document.getElementById('practice-mistakes-btn');

const testTitle = document.getElementById('test-title');
const testDescription = document.getElementById('test-description');
const testInfo = document.getElementById('test-info');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionNumber = document.getElementById('question-number');
const scoreDisplay = document.getElementById('score-display');
const progressFill = document.getElementById('progress-fill');
const finalScore = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');
const percentage = document.getElementById('percentage');
const reviewContainer = document.getElementById('review-container');

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    // Event Listeners
    document.querySelectorAll('.test-card').forEach(card => {
        card.addEventListener('click', () => selectTest(card.dataset.test));
    });
    backToMenuBtn.addEventListener('click', () => showScreen(menuScreen));
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
    reviewBtn.addEventListener('click', showReview);
    backToResultsBtn.addEventListener('click', backToResults);
    restartFromReviewBtn.addEventListener('click', restartQuiz);
    menuFromResultsBtn.addEventListener('click', () => showScreen(menuScreen));
    menuFromReviewBtn.addEventListener('click', () => showScreen(menuScreen));
    statsBtn.addEventListener('click', () => {
        displayStats();
        showScreen(statsScreen);
    });
    clearStatsBtn.addEventListener('click', () => StatsManager.clearAllStats());
    backToMenuFromStatsBtn.addEventListener('click', () => showScreen(menuScreen));
    practiceMistakesBtn.addEventListener('click', createMistakesTest);
}

// Función para mezclar un array (algoritmo Fisher-Yates)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Funciones principales
function selectTest(testId) {
    currentTest = tests[testId];
    currentTestId = testId;
    testTitle.textContent = currentTest.title;
    testDescription.textContent = currentTest.description;
    testInfo.textContent = `${currentTest.questions.length} preguntas • 4 opciones cada una`;
    showScreen(startScreen);
}

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    showScreen(quizScreen);
    displayQuestion();
}

function displayQuestion() {
    const question = currentTest.questions[currentQuestion];
    
    // Actualizar información de la pregunta
    questionText.textContent = question.question;
    questionNumber.textContent = `Pregunta ${currentQuestion + 1} de ${currentTest.questions.length}`;
    scoreDisplay.textContent = `Aciertos: ${score}`;
    
    // Actualizar barra de progreso
    const progress = ((currentQuestion + 1) / currentTest.questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Limpiar opciones anteriores
    optionsContainer.innerHTML = '';
    
    // Crear array de opciones con sus índices originales y si es correcta
    const optionsWithIndex = question.options.map((option, index) => ({
        text: option,
        originalIndex: index,
        isCorrect: index === question.correct
    }));
    
    // Mezclar las opciones aleatoriamente
    const shuffledOptions = shuffleArray(optionsWithIndex);
    
    // Crear opciones
    const letters = ['A', 'B', 'C', 'D'];
    shuffledOptions.forEach((option, displayIndex) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.innerHTML = `
            <span class="option-letter">${letters[displayIndex]}</span>
            <span>${option.text}</span>
        `;
        // Guardar información en el elemento para usarla después
        optionElement.dataset.originalIndex = option.originalIndex;
        optionElement.dataset.isCorrect = option.isCorrect;
        optionElement.addEventListener('click', () => selectOption(option.originalIndex, option.isCorrect, optionElement));
        optionsContainer.appendChild(optionElement);
    });
    
    // Deshabilitar botón siguiente
    nextBtn.disabled = true;
}

function selectOption(selectedIndex, isSelectedCorrect, selectedElement) {
    // Verificar si ya se seleccionó una respuesta
    const options = document.querySelectorAll('.option');
    const alreadyAnswered = Array.from(options).some(opt => opt.classList.contains('disabled'));
    
    if (alreadyAnswered) return;
    
    const question = currentTest.questions[currentQuestion];
    
    // Guardar respuesta del usuario
    userAnswers.push({
        questionIndex: currentQuestion,
        userAnswer: selectedIndex,
        correct: question.correct,
        isCorrect: isSelectedCorrect
    });
    
    // Registrar estadísticas de la respuesta
    StatsManager.recordAnswer(currentTestId, currentQuestion, isSelectedCorrect);
    
    // Actualizar puntuación
    if (isSelectedCorrect) {
        score++;
        scoreDisplay.textContent = `Aciertos: ${score}`;
    }
    
    // Mostrar respuesta correcta/incorrecta
    options.forEach((option) => {
        option.classList.add('disabled');
        const optionIsCorrect = option.dataset.isCorrect === 'true';
        
        if (optionIsCorrect) {
            option.classList.add('correct');
        } else if (option === selectedElement && !isSelectedCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    // Habilitar botón siguiente
    nextBtn.disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < currentTest.questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    showScreen(resultsScreen);
    
    // Registrar finalización del test en estadísticas
    StatsManager.recordTestCompletion(currentTestId, score, currentTest.questions.length);
    
    finalScore.textContent = score;
    document.getElementById('score-total').textContent = `/ ${currentTest.questions.length}`;
    
    const percentageValue = Math.round((score / currentTest.questions.length) * 100);
    percentage.textContent = `${percentageValue}% de respuestas correctas`;
    
    // Mensaje personalizado según el resultado
    let message = '';
    if (percentageValue === 100) {
        message = '¡Perfecto! ¡Eres una experta en historia! 🌟';
    } else if (percentageValue >= 80) {
        message = '¡Excelente trabajo! Dominas muy bien el tema 🎖️';
    } else if (percentageValue >= 60) {
        message = '¡Muy bien! Vas por buen camino 👏';
    } else if (percentageValue >= 40) {
        message = 'Buen intento. Sigue estudiando 📚';
    } else {
        message = 'Necesitas repasar más. ¡Ánimo! 💪';
    }
    
    resultMessage.textContent = message;
}

function showReview() {
    showScreen(reviewScreen);
    reviewContainer.innerHTML = '';
    
    const letters = ['A', 'B', 'C', 'D'];
    
    userAnswers.forEach((answer, index) => {
        const question = currentTest.questions[answer.questionIndex];
        const reviewItem = document.createElement('div');
        reviewItem.className = `review-item ${answer.isCorrect ? 'correct' : 'incorrect'}`;
        
        let html = `
            <div class="review-question">
                ${index + 1}. ${question.question}
            </div>
        `;
        
        if (!answer.isCorrect) {
            html += `
                <div class="review-answer user">
                    <span class="review-label">Tu respuesta:</span>
                    ${letters[answer.userAnswer]}) ${question.options[answer.userAnswer]}
                </div>
            `;
        }
        
        html += `
            <div class="review-answer correct-answer">
                <span class="review-label">Respuesta correcta:</span>
                ${letters[answer.correct]}) ${question.options[answer.correct]}
            </div>
        `;
        
        reviewItem.innerHTML = html;
        reviewContainer.appendChild(reviewItem);
    });
}

function backToResults() {
    showScreen(resultsScreen);
}

function restartQuiz() {
    startQuiz();
}

function showScreen(screen) {
    // Ocultar todas las pantallas
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    // Mostrar la pantalla seleccionada
    screen.classList.add('active');
}

// Función para mostrar estadísticas
function displayStats() {
    const statsContent = document.getElementById('stats-content');
    const stats = StatsManager.getStats();
    
    // Mostrar u ocultar el botón de repaso según haya estadísticas
    const practiceMistakesBtn = document.getElementById('practice-mistakes-btn');
    
    if (Object.keys(stats).length === 0) {
        statsContent.innerHTML = `
            <div class="no-stats">
                <div class="no-stats-icon">📊</div>
                <p>No hay estadísticas disponibles todavía</p>
                <p style="font-size: 0.9em; color: #999;">Completa algunos tests para ver tus estadísticas aquí</p>
            </div>
        `;
        practiceMistakesBtn.style.display = 'none';
        return;
    }
    
    practiceMistakesBtn.style.display = 'inline-block';
    
    // Calcular cuántas preguntas hay para repaso
    let totalQuestionsWithStats = 0;
    Object.keys(stats).forEach(testId => {
        const testStats = stats[testId];
        if (testStats.questions) {
            totalQuestionsWithStats += Object.keys(testStats.questions).length;
        }
    });
    
    const questionsToReview = Math.min(20, totalQuestionsWithStats);
    practiceMistakesBtn.innerHTML = `💡 Repasar Preguntas Más Falladas (${questionsToReview} disponibles)`;
    
    let html = '';
    
    // Recorrer cada test
    Object.keys(stats).forEach(testId => {
        const testStats = stats[testId];
        const testData = tests[testId];
        
        if (!testData) return; // Si el test no existe, saltarlo
        
        const totalAnswers = testStats.totalCorrect + testStats.totalIncorrect;
        const accuracy = totalAnswers > 0 ? Math.round((testStats.totalCorrect / totalAnswers) * 100) : 0;
        
        html += `
            <div class="test-stats">
                <h4>${testData.title}</h4>
                
                <div class="stats-summary">
                    <div class="stat-box attempts">
                        <div class="stat-label">Tests realizados</div>
                        <div class="stat-value">${testStats.attempts}</div>
                    </div>
                    <div class="stat-box success">
                        <div class="stat-label">Respuestas correctas</div>
                        <div class="stat-value">${testStats.totalCorrect}</div>
                    </div>
                    <div class="stat-box error">
                        <div class="stat-label">Respuestas incorrectas</div>
                        <div class="stat-value">${testStats.totalIncorrect}</div>
                    </div>
                    <div class="stat-box accuracy">
                        <div class="stat-label">Precisión</div>
                        <div class="stat-value">${accuracy}%</div>
                    </div>
                </div>
                
                <button class="toggle-questions-btn" onclick="toggleQuestionStats('${testId}')">
                    Ver estadísticas por pregunta ▼
                </button>
                
                <div id="questions-${testId}" class="question-stats hidden">
                    <h5>Estadísticas por pregunta</h5>
                    <div style="display: flex; gap: 15px; margin-bottom: 15px; font-size: 0.85em; flex-wrap: wrap;">
                        <span><span style="display: inline-block; width: 12px; height: 12px; background: #ef4444; border-radius: 2px; margin-right: 5px;"></span>Precisión < 40%</span>
                        <span><span style="display: inline-block; width: 12px; height: 12px; background: #f59e0b; border-radius: 2px; margin-right: 5px;"></span>Precisión 40-69%</span>
                        <span><span style="display: inline-block; width: 12px; height: 12px; background: #10b981; border-radius: 2px; margin-right: 5px;"></span>Precisión ≥ 70%</span>
                    </div>
        `;
        
        // Recorrer las preguntas
        Object.keys(testStats.questions).forEach(questionIndex => {
            const qStats = testStats.questions[questionIndex];
            const question = testData.questions[parseInt(questionIndex)];
            const qAccuracy = qStats.attempts > 0 ? Math.round((qStats.correct / qStats.attempts) * 100) : 0;
            
            // Determinar clase según precisión
            let errorClass = 'low-errors';
            if (qAccuracy < 40) {
                errorClass = 'high-errors';
            } else if (qAccuracy < 70) {
                errorClass = 'medium-errors';
            }
            
            html += `
                <div class="question-item ${errorClass}">
                    <div class="question-text">
                        <strong>P${parseInt(questionIndex) + 1}:</strong> ${question.question.substring(0, 80)}${question.question.length > 80 ? '...' : ''}
                    </div>
                    <div class="question-stats-data">
                        <span class="stat-mini attempts">📝 ${qStats.attempts}</span>
                        <span class="stat-mini correct">✓ ${qStats.correct}</span>
                        <span class="stat-mini incorrect">✗ ${qStats.incorrect}</span>
                        <span class="stat-mini accuracy">${qAccuracy}%</span>
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    });
    
    statsContent.innerHTML = html;
}

// Función para mostrar/ocultar estadísticas por pregunta
function toggleQuestionStats(testId) {
    const questionsDiv = document.getElementById(`questions-${testId}`);
    const button = event.target;
    
    if (questionsDiv.classList.contains('hidden')) {
        questionsDiv.classList.remove('hidden');
        button.textContent = 'Ocultar estadísticas por pregunta ▲';
    } else {
        questionsDiv.classList.add('hidden');
        button.textContent = 'Ver estadísticas por pregunta ▼';
    }
}

// Función para crear un test con las preguntas más falladas
function createMistakesTest() {
    const stats = StatsManager.getStats();
    
    // Recopilar todas las preguntas con sus estadísticas
    const allQuestions = [];
    
    Object.keys(stats).forEach(testId => {
        const testStats = stats[testId];
        const testData = tests[testId];
        
        if (!testData) return;
        
        Object.keys(testStats.questions).forEach(questionIndex => {
            const qStats = testStats.questions[questionIndex];
            const qIndex = parseInt(questionIndex);
            
            // Solo incluir preguntas que se hayan intentado al menos una vez
            if (qStats.attempts > 0) {
                const errorRate = qStats.incorrect / qStats.attempts;
                
                allQuestions.push({
                    testId: testId,
                    questionIndex: qIndex,
                    question: testData.questions[qIndex],
                    errorRate: errorRate,
                    attempts: qStats.attempts,
                    incorrect: qStats.incorrect,
                    correct: qStats.correct
                });
            }
        });
    });
    
    if (allQuestions.length === 0) {
        alert('No hay suficientes datos de estadísticas para crear un test de repaso. Completa algunos tests primero.');
        return;
    }
    
    // Ordenar por tasa de error (de mayor a menor) y luego por número de intentos
    allQuestions.sort((a, b) => {
        if (b.errorRate !== a.errorRate) {
            return b.errorRate - a.errorRate;
        }
        return b.attempts - a.attempts;
    });
    
    // Tomar las 20 preguntas más falladas (o todas si hay menos de 20)
    const mistakesQuestions = allQuestions.slice(0, Math.min(20, allQuestions.length));
    
    // Calcular estadísticas del conjunto
    const avgErrorRate = mistakesQuestions.reduce((sum, q) => sum + q.errorRate, 0) / mistakesQuestions.length;
    const avgAccuracy = Math.round((1 - avgErrorRate) * 100);
    
    // Crear un test temporal con estas preguntas
    const mistakesTest = {
        title: "💡 Repaso: Preguntas Más Falladas",
        description: `Repasa las ${mistakesQuestions.length} preguntas que más dificultad te han dado. Precisión promedio actual: ${avgAccuracy}%`,
        questions: mistakesQuestions.map(q => q.question)
    };
    
    // Registrar el test temporal
    currentTest = mistakesTest;
    currentTestId = 'mistakes-practice'; // ID especial para este test
    
    // Mostrar pantalla de inicio
    testTitle.textContent = mistakesTest.title;
    testDescription.textContent = mistakesTest.description;
    testInfo.textContent = `${mistakesTest.questions.length} preguntas • ¡Mejora tu puntuación!`;
    showScreen(startScreen);
}

