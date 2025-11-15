// Base de datos de preguntas
const questions = [
    {
        question: "El Antiguo Régimen se caracteriza principalmente por:",
        options: [
            "Democracia y libertad de expresión",
            "Sociedad igualitaria",
            "Monarquía absoluta y sociedad estamental",
            "Sufragio universal"
        ],
        correct: 2
    },
    {
        question: "¿Qué grupos formaban los estamentos privilegiados?",
        options: [
            "Clero y campesinos",
            "Nobleza y burguesía",
            "Clero y nobleza",
            "Burguesía y campesinado"
        ],
        correct: 2
    },
    {
        question: "El pensamiento ilustrado defendía principalmente:",
        options: [
            "La fe y la tradición",
            "La razón, la ciencia y el progreso",
            "El poder absoluto de los reyes",
            "El sometimiento a la religión"
        ],
        correct: 1
    },
    {
        question: "El lema de los monarcas ilustrados era:",
        options: [
            "Todo por el rey y con el rey",
            "Nada para el pueblo, todo para el rey",
            "Todo para el pueblo, pero sin el pueblo",
            "El pueblo manda sobre el rey"
        ],
        correct: 2
    },
    {
        question: "¿Qué pensador propuso la separación de poderes?",
        options: [
            "Voltaire",
            "Rousseau",
            "Montesquieu",
            "Adam Smith"
        ],
        correct: 2
    },
    {
        question: "¿Cuál fue una consecuencia de las ideas ilustradas?",
        options: [
            "El fortalecimiento del absolutismo",
            "El nacimiento de las revoluciones burguesas",
            "El dominio del clero",
            "El fin de la burguesía"
        ],
        correct: 1
    },
    {
        question: "La principal causa de la Revolución Americana fue:",
        options: [
            "El descontento por los impuestos y la falta de representación",
            "La invasión francesa de las colonias",
            "La abolición de la esclavitud",
            "Las malas cosechas"
        ],
        correct: 0
    },
    {
        question: "El Motín del Té ocurrió porque:",
        options: [
            "Los colonos querían subir el precio del té",
            "Los colonos protestaban contra los impuestos británicos",
            "Los británicos se negaban a comprar té americano",
            "Las colonias prohibieron el comercio"
        ],
        correct: 1
    },
    {
        question: "¿En qué año se firmó la Declaración de Independencia de Estados Unidos?",
        options: [
            "1773",
            "1775",
            "1776",
            "1789"
        ],
        correct: 2
    },
    {
        question: "La Revolución Americana fue importante para Europa porque:",
        options: [
            "Fortaleció a los monarcas absolutos",
            "Inspiró otras revoluciones con ideas ilustradas",
            "Terminó con el comercio atlántico",
            "Aumentó el poder británico"
        ],
        correct: 1
    },
    {
        question: "¿Cuál fue la causa inmediata de la Revolución Francesa?",
        options: [
            "Las malas cosechas y la crisis financiera del Estado",
            "El descubrimiento de América",
            "El aumento del comercio",
            "La independencia de Italia"
        ],
        correct: 0
    },
    {
        question: "Los Estados Generales estaban formados por:",
        options: [
            "Nobleza, burguesía y campesinado",
            "Clero, nobleza y Tercer Estado",
            "Clero, campesinos y obreros",
            "Burguesía, artesanos y campesinos"
        ],
        correct: 1
    },
    {
        question: "El Juramento del Juego de la Pelota significó:",
        options: [
            "La rendición del Tercer Estado",
            "La unión del pueblo con el rey",
            "La promesa de crear una constitución",
            "El regreso del absolutismo"
        ],
        correct: 2
    },
    {
        question: "¿Qué ocurrió el 14 de julio de 1789?",
        options: [
            "Se proclamó la República",
            "La toma de la Bastilla",
            "La coronación de Napoleón",
            "La ejecución del rey"
        ],
        correct: 1
    },
    {
        question: "La Declaración de los Derechos del Hombre y del Ciudadano defendía:",
        options: [
            "Privilegios para la nobleza",
            "Igualdad y libertad ante la ley",
            "Poder absoluto del rey",
            "Supremacía del clero"
        ],
        correct: 1
    },
    {
        question: "La Constitución de 1791 estableció:",
        options: [
            "Una república democrática",
            "La monarquía absoluta",
            "Una monarquía constitucional",
            "El comunismo"
        ],
        correct: 2
    },
    {
        question: "Los girondinos representaban a:",
        options: [
            "La alta burguesía moderada",
            "Los campesinos pobres",
            "Los obreros de París",
            "El ejército realista"
        ],
        correct: 0
    },
    {
        question: "Los jacobinos, liderados por Robespierre, eran:",
        options: [
            "Defensores del rey",
            "Moderados y conservadores",
            "Radicales que querían una república e igualdad",
            "Extranjeros aliados"
        ],
        correct: 2
    },
    {
        question: "¿Qué institución sustituyó a la Asamblea Legislativa?",
        options: [
            "El Directorio",
            "El Senado",
            "La Convención Nacional",
            "El Parlamento Europeo"
        ],
        correct: 2
    },
    {
        question: "¿Cómo terminó el reinado de Luis XVI?",
        options: [
            "Fue exiliado a Inglaterra",
            "Abdicó voluntariamente",
            "Fue ejecutado en la guillotina",
            "Murió en batalla"
        ],
        correct: 2
    },
    {
        question: "El Directorio era:",
        options: [
            "Un gobierno formado por cinco miembros",
            "Una república gobernada por Robespierre",
            "Un parlamento elegido por el pueblo",
            "Un régimen absolutista"
        ],
        correct: 0
    },
    {
        question: "Napoleón llegó al poder en:",
        options: [
            "1789",
            "1795",
            "1799",
            "1804"
        ],
        correct: 2
    },
    {
        question: "Como emperador, Napoleón realizó reformas en:",
        options: [
            "Educación, leyes y economía",
            "Agricultura y religión",
            "Comercio marítimo",
            "Cultura y nobleza"
        ],
        correct: 0
    },
    {
        question: "Napoleón fue derrotado definitivamente en:",
        options: [
            "París",
            "Elba",
            "Moscú",
            "Waterloo"
        ],
        correct: 3
    },
    {
        question: "¿Qué estableció el Congreso de Viena?",
        options: [
            "La independencia de Francia",
            "La restauración de las monarquías absolutas",
            "La proclamación de la república",
            "La división de América"
        ],
        correct: 1
    },
    {
        question: "La Santa Alianza fue creada para:",
        options: [
            "Defender los derechos humanos",
            "Impedir nuevas revoluciones",
            "Expandir el comercio",
            "Apoyar la independencia americana"
        ],
        correct: 1
    },
    {
        question: "Las revoluciones de 1830 tuvieron como resultado:",
        options: [
            "El fin de Napoleón",
            "La independencia de Bélgica",
            "La unificación de Alemania",
            "La abdicación de Luis XVI"
        ],
        correct: 1
    },
    {
        question: "En las revoluciones de 1848, Francia proclamó:",
        options: [
            "La Primera República",
            "La Segunda República",
            "La Tercera República",
            "El Imperio Napoleónico"
        ],
        correct: 1
    },
    {
        question: "¿Qué países iniciaron procesos de unificación tras 1848?",
        options: [
            "Inglaterra y Francia",
            "Italia y Alemania",
            "Bélgica y Holanda",
            "Austria y Rusia"
        ],
        correct: 1
    },
    {
        question: "Una consecuencia general de las revoluciones del siglo XIX fue:",
        options: [
            "El regreso del feudalismo",
            "La expansión de las ideas liberales y nacionales",
            "La victoria definitiva del absolutismo",
            "La desaparición de la burguesía"
        ],
        correct: 1
    }
];

// Variables del estado del juego
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// Elementos del DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const reviewScreen = document.getElementById('review-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const reviewBtn = document.getElementById('review-btn');
const backToResultsBtn = document.getElementById('back-to-results-btn');
const restartFromReviewBtn = document.getElementById('restart-from-review-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionNumber = document.getElementById('question-number');
const scoreDisplay = document.getElementById('score-display');
const progressFill = document.getElementById('progress-fill');
const finalScore = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');
const percentage = document.getElementById('percentage');
const reviewContainer = document.getElementById('review-container');

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
reviewBtn.addEventListener('click', showReview);
backToResultsBtn.addEventListener('click', backToResults);
restartFromReviewBtn.addEventListener('click', restartQuiz);

// Funciones principales
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    showScreen(quizScreen);
    displayQuestion();
}

function displayQuestion() {
    const question = questions[currentQuestion];
    
    // Actualizar información de la pregunta
    questionText.textContent = question.question;
    questionNumber.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
    scoreDisplay.textContent = `Aciertos: ${score}`;
    
    // Actualizar barra de progreso
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Limpiar opciones anteriores
    optionsContainer.innerHTML = '';
    
    // Crear opciones
    const letters = ['A', 'B', 'C', 'D'];
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.innerHTML = `
            <span class="option-letter">${letters[index]}</span>
            <span>${option}</span>
        `;
        optionElement.addEventListener('click', () => selectOption(index, optionElement));
        optionsContainer.appendChild(optionElement);
    });
    
    // Deshabilitar botón siguiente
    nextBtn.disabled = true;
}

function selectOption(selectedIndex, selectedElement) {
    // Verificar si ya se seleccionó una respuesta
    const options = document.querySelectorAll('.option');
    const alreadyAnswered = Array.from(options).some(opt => opt.classList.contains('disabled'));
    
    if (alreadyAnswered) return;
    
    const question = questions[currentQuestion];
    const isCorrect = selectedIndex === question.correct;
    
    // Guardar respuesta del usuario
    userAnswers.push({
        questionIndex: currentQuestion,
        userAnswer: selectedIndex,
        correct: question.correct,
        isCorrect: isCorrect
    });
    
    // Actualizar puntuación
    if (isCorrect) {
        score++;
        scoreDisplay.textContent = `Aciertos: ${score}`;
    }
    
    // Mostrar respuesta correcta/incorrecta
    options.forEach((option, index) => {
        option.classList.add('disabled');
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    // Habilitar botón siguiente
    nextBtn.disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    showScreen(resultsScreen);
    
    finalScore.textContent = score;
    
    const percentageValue = Math.round((score / questions.length) * 100);
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
        const question = questions[answer.questionIndex];
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
