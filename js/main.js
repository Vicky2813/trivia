const sessionGame = {
  points: 0,
  question_number: 0,
  type: '',
  good: 0,
  bad: 0,
};

// DOM OBJECTS
const divGameContainer = document.getElementById('gameContainer');
const btnStartGame = document.getElementById('startGame');
const h2SubTitle = document.getElementById('subtitle');
let inputName;
let categories;
let responseBtn;

let aux = null;

// FRONTEND QUESTIONS

const frontendQuestion = [
  {
    question: '¿Qué es HTML?',
    points: 50,
    type: 'radio',
    answers: [
      {
        id: 1,
        text: 'No es un lenguaje de programación',
        isCorrect: false,
      },
      {
        id: 2,
        text: 'Es un lenguaje de programación',
        isCorrect: true,
      },
      {
        id: 3,
        text: 'Ninguna de las anteriores',
        isCorrect: false,
      }
    ],
  },
  {
    question: '¿En nuestro código HTML, podemos crear secciones de contenido basadas en su funcionalidad?',
    points: 30,
    type: 'radio',
    answers: [
      {
        id: 1,
        text: 'Verdadero',
        isCorrect: true,
      },
      {
        id: 2,
        text: 'Falso',
        isCorrect: false,
      },
    ],
  },
  {
    question: '¿A qué se le llama la base del diseño web?',
    points: 30,
    type: 'radio',
    answers: [
      {
        id: 1,
        text: 'Modelo de cajas',
        isCorrect: true,
      },
      {
        id: 2,
        text: 'CSS inline',
        isCorrect: false,
      },
      {
        id: 2,
        text: 'Flujo del documento',
        isCorrect: false,
      },
      {
        id: 2,
        text: 'Positioning',
        isCorrect: false,
      },
    ],
  },
  {
    question: '¿React es un lenguaje de programación?',
    points: 30,
    type: 'radio',
    answers: [
      {
        id: 1,
        text: 'Verdadero',
        isCorrect: false,
      },
      {
        id: 2,
        text: 'Falso',
        isCorrect: true,
      }
    ],
  },
  {
    question: 'Python, JS y PHP son:',
    points: 30,
    type: 'radio',
    answers: [
      {
        id: 1,
        text: 'Frameworks',
        isCorrect: false,
      },
      {
        id: 2,
        text: 'Lenguajes de programación',
        isCorrect: true,
      },
      {
        id: 3,
        text: 'Librerías',
        isCorrect: false,
      },
      {
        id: 4,
        text: 'Monedas de países',
        isCorrect: false,
      }
    ],
  }
];

// FUNCTIONS

const showResults = () => {
  const template = `
    <div class="resultados mx-auto">
      <h2 class="text-center"><u>Resultados</u></h2>
      <h3 class="text-center"><span id="correctas">${sessionGame.good}</span> <span class="separator">-</span> <span id="incorrectas">${sessionGame.bad}</span></h3>
      <a href="game.html" class="btn btn-success">Volver a jugar</a> 
    </div>
  `
  divGameContainer.innerHTML = '';
  divGameContainer.innerHTML += template;
}

const onResponse = (event) => {
  console.log('onResponse');
  event.preventDefault();

  if (sessionGame.type === 'radio' && sessionGame.question_number < frontendQuestion.length) {
    const answer = document.querySelectorAll('input[name=answers]:checked')[0].value;
    if (parseInt(answer) > 0) {
      sessionGame.good += 1;
    } else {
      sessionGame.bad += 1;
    }
    console.log(`Points: ${parseInt(answer)}`);
    sessionGame.points += frontendQuestion[sessionGame.question_number].points;
    sessionGame.question_number += 1;
    if (sessionGame.question_number === frontendQuestion.length) {
      showResults();
    }
  }

  if (sessionGame.question_number < frontendQuestion.length) {
    renderQuestion(frontendQuestion[sessionGame.question_number]);
  }
}

const renderQuestion = (question) => {
  console.log('renderQuestion');

  h2SubTitle.innerHTML = '';

  const questionHtml = `<p class="question">${question.question}</p>`;

  let answersHtml = '';

  console.log(question.answers);
  sessionGame.type = question.type;
  question.answers.forEach(e => {
    answersHtml += `
      <div class="form-check">
        <input name="answers" class="form-check-input ${question.type}_question" type="${question.type}" value="${e.isCorrect ? question.points : '0'}" id="a${e.id}">
        <label class="form-check-label" for="defaultCheck1">
          ${e.text}
        </label>
      </div>
    `
  });

  const questionTemplate = `
    <div class="card mx-auto questions">
      <div class="card-body">
        ${questionHtml}
        <div id="answers">
          ${answersHtml}
        </div>
        <br />
        <a id="response" href="#" class="btn btn-primary">Siguiente</a>
      </div>
    </div>
  `

  divGameContainer.innerHTML = '';
  divGameContainer.innerHTML += questionTemplate;

  responseBtn = document.getElementById('response');
  responseBtn.addEventListener('click', onResponse);
}

const showQuestion = (event) => {
  console.log('showQuestion');
  console.log(event);
  
  if (sessionGame.category === 'frontend' && (sessionGame.question_number + 1) < frontendQuestion.length) {
    const question = frontendQuestion[sessionGame.question_number];
    renderQuestion(question);
  } else {
    console.log('No hay mas preguntas que mostrar');
  }
}

const getCategory = (event) => {
  console.log('getCategory');

  for (let i = 0; i < event.path.length; ++i) {
    if (event.path[i].dataset && event.path[i].dataset.category) {
      console.log(event.path[i].dataset);
      sessionGame.category = event.path[i].dataset.category
    }
  }
  console.log(sessionGame);
  showQuestion();
}
const inputGetName = (event) => {
  console.log('inputGetName');
  // console.log(event.key);
  if (event.key === 'Enter') {
    sessionGame.name = inputName.value;
    console.log(sessionGame);
    showCategories();
  }
}

const formToGetName = (event) => {
  console.log('formToGetName');
  event.preventDefault();

  const template = `
    <div id="formToGetName" class="mx-auto hide">
      <div class="form-group">
        <label style="text-align: center; font-size: 36px;" for="name" class="text-center">¿Cuál es tu nombre?</label>
        <input id="inputName" class="form-control text-center" id="name" type="text" />
      </div>
    </div>
  `;
  
  btnStartGame.remove();
  divGameContainer.innerHTML += template;
  
  const formToGetNameHtml = document.getElementById('formToGetName');
  
  setTimeout(function () {
    formToGetNameHtml.classList.remove('hide');
    formToGetNameHtml.classList.add('show');
  }, 500);

  inputName = document.getElementById('inputName');
  inputName.addEventListener('keypress', inputGetName);
}

const showCategories = () => {
  const template = `
    <div class="col-sm col-md col-lg">
      <a class="category" href="#" data-category="frontend">
        <div class="card">
          <div class="card-body">
            <h2 class="text-center">Frontend Developer</h2>
            <figure>
              <img class="main-logos" src="img/frontend-icon.png" alt="">
            </figure>
          </div>
        </div>
      </a>
    </div>
    <div class="col-sm col-md col-lg">
      <a class="category" href="#" data-category="ux/ui">
        <div class="card">
          <div class="card-body">
            <h2 class="text-center">UX/UI Designer</h2>
            <figure>
              <img class="main-logos" src="img/ux-icon.png" alt="">
            </figure>
          </div>
        </div>
      </a>
    </div>
  `;

  divGameContainer.innerHTML = '';
  divGameContainer.innerHTML += template;

  categories = document.getElementsByClassName('category');
  h2SubTitle.innerHTML = 'Escoge una categoria:'

  for (let i = 0; i < categories.length; ++i) {
    categories[i].addEventListener('click', getCategory);
  }
}

// EVENTS

btnStartGame.addEventListener('click', formToGetName);