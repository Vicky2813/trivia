var body = document.getElementsByTagName('body'); //Declaración de variables y uso de DOM
var pName = document.getElementById('name');
var rightTitle = document.getElementById('titleRightAnswers');
var wrongTitle = document.getElementById('titleWrongAnswers');
var correct = document.getElementById('right');
var incorrect = document.getElementById('wrong');
var image1 = document.getElementById("image1"); //variables para mostrar imagenes en el display.
var image2 = document.getElementById("image2");
var showResults = document.getElementById('show-results');
var nombreUsuario = document.getElementById('nombreUsuario');
var button = document.createElement('Ok');
var questionsForm = document.querySelector('#questions')
var totalAnswer = document.getElementById('totalAnswer')
var spanRightAnswer = document.getElementById('rightAnswer')
var spanWrongAnswer = document.getElementById('wrongAnswer')
var triviaQuestions = [
  'HTML es',
  '¿Qué significa CSS?',
  '¿Cuál de estos NO es una estructura de control?',
  '¿if y else pueden encadenarse?',
  '¿Cuál es una buena práctica al escribir código?',
  '¿Quién es el PELÓN más buena onda de Laboratoria?'
]
var globalAnswer = []
var correctAnswer = [
  'Un lenguaje de marcado y modelado semántico',
  'Hojas de estilo en cascada',
  'do if',
  'Verdadero',
  'A y C son correctas',
  'Jonh El Guardián de las laptops'
]

function agregarNombre (event) {
  var readyToPlay = document.getElementById('readyToPlay')
  if (event.keyCode === 13) {
    var inputName = document.getElementById('name')
    var name = inputName.value
    document.getElementById('hola').innerHTML = 'Bienvenid@ ' + name
    inputName.style.display = 'none'
    readyToPlay.style.display = 'block'
  }
}

function listoParaJugar (event) {
  var answer = event.target.value
  var questions = document.getElementById('questions')
  var noPlay = document.getElementById('no-play') 
  var readyToPlay = document.getElementById('readyToPlay')
  if (answer === 'Si') {
    questions.style.display = 'block'
  } else {
    noPlay.style.display = 'block'
  }
  readyToPlay.style.display = 'none'
}

questionsForm.addEventListener('submit', function(event) {
  event.preventDefault()
  console.log(event)

  var rightAnswers = 0
  var wrongAnswers = 0

  // Aqui estamos recorriendo todas las preguntas y verificando las respuestas
  for (var i = 1; i < 7; i++) {
    var answers = document.getElementsByName('question'+i)
    answers.forEach(function(e) {
      if (e.checked) {
        globalAnswer.push(e.value)
        console.log(e.value)
      }
    })
  }

  correctAnswer.forEach(function (currentValue, index) {
    // CREO UN ELEMENTO DE FILA PARA LA TABLA <tr></tr>
    var newRow = document.createElement('tr')
    // CREO LAS COLUMNAS PARA LA FILA DE LA TABLA <td></td>
    var questionTd = document.createElement('td')
    var rightTd = document.createElement('td')
    var wrongTd = document.createElement('td')
    questionTd.innerHTML = triviaQuestions[index]
    
    
    if (currentValue === globalAnswer[index]) {
      rightTd.innerHTML = 'X'
      wrongTd.innerHTML = '-'
      rightAnswers += 1
    } else {
      rightTd.innerHTML = '-'
      wrongTd.innerHTML = 'X'
      wrongAnswers += 1
    }
    newRow.appendChild(questionTd)
    newRow.appendChild(rightTd)
    newRow.appendChild(wrongTd)
    tableAnswer.appendChild(newRow)
  })

  // COLOCO EN HTML CUANTAS RESPUESTAS CORRECTAS E INCORRECTAS
  spanRightAnswer.innerHTML = rightAnswers
  spanWrongAnswer.innerHTML = wrongAnswers

  // OCULTO LA CAJA DE PREGUNTAS
  questionsForm.style.display = 'none'

  // MUESTRO LA TABLE DE RESULTADOS
  totalAnswer.style.display = 'block'

}) 




//
// if(isReadyToPlay) { //Si el usuario desea jugar se desplegarán los prompts de las preguntas
//   var question1 = prompt('HTML es: \n a) Un lenguaje de programación \n b) Un lenguaje de marcado \n c) Un lenguaje de marcado y modelado semántico'); //Prompts para responder cada una de las preguntas
//   var question2 = prompt('¿Qué significa CSS? \n a) Hojas de estilo en escalera \n b) Hojas de estilo en cascada \n c) Hojas de estilo en acordeón');
//   var question3 = prompt('¿Cuál de estos NO es una estructura de control? \n a) if \n b) else \n c) do while');
//   var question4 = prompt('¿if y else pueden encadenarse? \n a) Verdadero \n b) Falso');
//   var question5 = prompt('¿Cuál es una buena práctica al escribir código? \n a) Buena indentación \n b) Nunca utilizar inglés \n c) Comentar tu código \n d) A y C son correctas');
//   var question6 = prompt('¿Quién es el PELÓN más buena onda de Laboratoria? \n a) Mike El Formal \n b) Manu El Relajado \n c) Jonh El Guardián de las laptops');
//
//   console.log(question1, question2, question3, question4, question5, question6); //Comparación entre respuestas correctas e incorrectas
// }else {
// //   var notStart = document.getElementById('no-Play'); //Si decide no jugar llevará a una nueva pantalla
// //   notStart.style.display = 'block';
// // }
//
//
//
// var correct1 =''; //Declaración de variables como strings vacios que llenaremos con la información de las respuestas correctas del usuario
// var correct2 ='';
// var correct3 ='';
// var correct4 ='';
// var correct5 ='';
// var correct6 ='';
// var incorrect1 ='';
// var incorrect2 ='';
// var incorrect3 ='';
// var incorrect4 ='';
// var incorrect5 ='';
// var incorrect6 ='';
//
// if (question1 == 'c') { //Condicionales para conocer el resultado del juego
//   console.log('respuestacorrecta');
//   correct1 = '1.HTML es: c) Un lenguaje de marcado y modelado semántico.';
// }
// else {
//   console.log('respuestaincorrecta');
//   incorrect1 = '1.Upss...te falló. La respuesta correcta es: C. HTML es un lenguaje de marcado y modelado semántico';
// }
//
// if (question2 == 'b') {
//   console.log('respuestacorrecta');
//   correct2 = '2.¿Qué significa CSS? b) Hojas de estilo en cascada.';
// }
// else {
//   console.log('respuestaincorrecta');
//   incorrect2 = '2.Será para la próxima. la respuesta correcta es: B. CSS significa hojas de estilo en cascada.';
// }
//
// if (question3 == 'c') {
//   console.log('respuestacorrecta');
//   correct3 = '3.¿Cuál de estas no es una estructura de control? c) do while.';
// }
// else {
//   console.log('respuestaincorrecta');
//   incorrect3 = '3.¡Oh! No acertaste, la respuesta correcta es: C. do while no es una estructura de control.';
// }
//
// if (question4 == 'a') {
//   console.log('respuestacorrecta');
//   correct4 = '4.¿if y else pueden encadenarse? a)Verdadero.';
// }
// else {
//   console.log('respuestaincorrecta');
//   incorrect4 = '4.La respuesta correcta es: A. if y else sí pueden encadenarse.';
// }
//
// if (question5 == 'd') {
//   console.log('respuestacorrecta');
//   correct5 = '5.¿Cuál es una buena práctica al escribir código? d) A y C son correctas';
// }
// else {
//   console.log('respuestaincorrecta');
//   incorrect5 = '5.¡Ups! La respuesta correcta era: D. Una buena indentación y comentar tu código es esencial.';
// }
//
// if (question6 == 'c') {
//   console.log('respuestacorrecta');
//   correct6 = '6.¿Quién es El Pelón más buena onda de Laboratoria? c) Jonh El Guardián de las laptops.';
// }
// else {
//   console.log('respuestaincorrecta');
//   incorrect6 = '6.Tu respuesta ha sido incorrecta. Claramente Jonh El Guardián de las laptops era la respuesta correcta, es decir el inciso C.';
// }
// //
// // console.log(isReadyToPlay)
// // if (isReadyToPlay) {  //Si se cumple se desplegarán los resultados del juego que ha llevado a cabo la usuaria
//   showResults.style.display = 'block';
//   titleRightAnswers.innerHTML = 'Respuestas Correctas:' ; //Impresión de resultados en la pantalla final del juego
//   titleWrongAnswers.innerHTML = 'Respuestas Incorrectas:';
//   right.innerHTML = '</br>' + correct1 + '</br>' + correct2 + '</br>'+ correct3 +'</br>'+ correct4 +'</br>'+ correct5 + '</br>' + correct6 ;
//   wrong.innerHTML ='</br>' + incorrect1 + '</br>' + incorrect2 + '</br>' + incorrect3 +'</br>'+ incorrect4 +'</br>'+ incorrect5 +'</br>'+ incorrect6;
// }
