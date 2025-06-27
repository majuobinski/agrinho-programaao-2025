let perguntas = [
 {
    pergunta: "Qual é a principal cultura agrícola do Brasil?",
    opcoes: ["Milho","Soja","Trigo"],
    correta: 1,
 },
 {
    pergunta: "Qual animal é mais criado na pecuária brasileira?",

    opcoes: ["Porco", "Gado", "Galinha"],

    correta: 1,

  },

  {

    pergunta: "O que é agronegócio?",

    opcoes: [

      "Venda de produtos agrícolas",

      "Conjunto de atividades da cadeia produtiva do campo",

      "Exportação de alimentos"

    ],

    correta: 1,

  },

];

let indice = 0;

let pontuacao = 0;

let estado = "inicio";

let respostaSelecionada = -1;

let feedback = "";

let pontuacaoMaxima = 0;

let tempoMaximo = 10;

let tempoRestante = tempoMaximo;

let tempoAnterior;

let somTocado = false;

let alertaSom;

function setup() {

  let canvas = createCanvas(windowWidth, windowHeight);

  textFont("Arial");

  if (getItem("pontuacaoMaxima")) {

    pontuacaoMaxima = int(getItem("pontuacaoMaxima"));

  }

  alertaSom = new p5.Oscillator('sine');

  alertaSom.freq(880);

  alertaSom.amp(0);

  alertaSom.start();

}

function draw() {

  background(250);

  if (estado === "inicio") {

    mostrarCapa();

  } else if (estado === "quiz") {

    atualizarTempo();

    mostrarPergunta();

    mostrarBarraTempo();

  } else if (estado === "fim") {

    mostrarResultadoFinal();

  }

}

function mostrarCapa() {

  background("#fce4dc");

  fill("#880e4f");

  textSize(28);

  textAlign(CENTER, CENTER);

  text("Quiz de Agropecuária", width / 2, 180);

  fill("#f06292");

  rect(width / 2 - 80, 300, 160, 50, 10);

  fill(0);

  textSize(20);

  text("Começar", width / 2, 325);

}

function mousePressed() {

  if (estado === "inicio") {

    if (mouseX > width / 2 - 80 && mouseX < width / 2 + 80 &&

        mouseY > 300 && mouseY < 350) {

      iniciarQuiz();

    }

  } else if (estado === "quiz") {

    let q = perguntas[indice];

    for (let i = 0; i < q.opcoes.length; i++) {

      let y = 180 + i * 60;

      if (mouseX > 30 && mouseX < 330 && mouseY > y && mouseY < y + 40) {

        respostaSelecionada = i;

        if (respostaSelecionada === q.correta) {

          pontuacao++;

          feedback = "Correta!";

        } else {

          feedback = "Errada!";

        }

        setTimeout(() => {

          proximaPergunta();

        }, 1000);

      }

    }

  }

}

function iniciarQuiz() {

  estado = "quiz";

  indice = 0;

  pontuacao = 0;

  tempoRestante = tempoMaximo;

  tempoAnterior = millis();

  somTocado = false;

}

function atualizarTempo() {

  let agora = millis();

  let decorrido = (agora - tempoAnterior) / 1000;

  tempoRestante -= decorrido;

  tempoAnterior = agora;

  if (tempoRestante < 3 && !somTocado) {

    tocarAlerta();

    somTocado = true;

  }

  if (tempoRestante <= 0) {

    respostaSelecionada = -1;

    feedback = "Tempo esgotado!";

    setTimeout(() => {

      proximaPergunta();

    }, 1000);

  }

}

function tocarAlerta() {

  alertaSom.amp(0.3, 0.05);

  setTimeout(() => alertaSom.amp(0, 0.2), 300);

}

function mostrarBarraTempo() {

  let larguraMax = 300;

  let barra = map(tempoRestante, 0, tempoMaximo, 0, larguraMax);

  fill("#fce4ec");

  rect(30, 580, barra, 15, 5);

  stroke(0);

  noFill();

  rect(30, 580, larguraMax, 15, 5);

  noStroke();

  fill(0);

  textSize(14);

  textAlign(CENTER, CENTER);

  text("Tempo restante: " + max(0, tempoRestante.toFixed(1)) + "s", width / 2, 555);

}

function mostrarPergunta() {

  let q = perguntas[indice];

  fill(0);

  textSize(18);

  textAlign(LEFT, TOP);

  text("Pergunta " + (indice + 1) + " de " + perguntas.length, 30, 30);

  textSize(18);

  text(q.pergunta, 30, 80);

  for (let i = 0; i < q.opcoes.length; i++) {

    let y = 180 + i * 60;

    fill(220);

    rect(30, y, 300, 40, 8);

    fill(0);

    textAlign(LEFT, CENTER);

    text(q.opcoes[i], 40, y + 20);

  }

  if (feedback !== "") {

    textSize(16);

    fill(feedback === "Correta!" ? "green" : "red");

    text(feedback, 30, 420);

  }

}

function proximaPergunta() {

  indice++;

  respostaSelecionada = -1;

  feedback = "";

  tempoRestante = tempoMaximo;

  tempoAnterior = millis();

  somTocado = false;

  if (indice >= perguntas.length) {

    if (pontuacao > pontuacaoMaxima) {

      pontuacaoMaxima = pontuacao;

      storeItem("pontuacaoMaxima", pontuacao);

    }

    estado = "fim";

  }

}

function mostrarResultadoFinal() {

  background("#f06292");

  fill("#fce4ec");

  textSize(26);

  textAlign(CENTER, CENTER);

  text("Quiz Finalizado!", width / 2, 140);

  textSize(20);

  fill(0);

  text("Você acertou " + pontuacao + " de " + perguntas.length + ".", width / 2, 200);

  fill("#333");

  text("Maior pontuação: " + pontuacaoMaxima, width / 2, 250);

}




