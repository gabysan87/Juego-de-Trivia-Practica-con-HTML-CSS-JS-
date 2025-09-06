// Normalizar respuestas (ignora mayusculas, acentos y espacios extra)
const normalizar = (texto) => {
  return (texto || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ");
};

// Preguntas con inputs y feedback
const preguntas = [
  {
    input: document.getElementById("q1"),
    feedback: document.getElementById("f1"),
  },
  {
    input: document.getElementById("q2"),
    feedback: document.getElementById("f2"),
  },
  {
    input: document.getElementById("q3"),
    feedback: document.getElementById("f3"),
  },
];

const scoreEl = document.getElementById("score");
const checkBtn = document.getElementById("checkBtn");
const resetBtn = document.getElementById("resetBtn");

//Comprobar respuestas
checkBtn.addEventListener("click", () => {
  let puntos = 0;

  preguntas.forEach(({ input, feedback }) => {
    const correcta = normalizar(input.dataset.answer);
    const usuario = normalizar(input.value);

    feedback.classList.remove("correct", "incorrect");

    if (usuario && usuario === correcta) {
      feedback.textContent = "✅ Correcto";
      feedback.classList.add("correct");
      puntos++;
    } else {
      feedback.textContent = "❌ Incorrecto";
      feedback.classList.add("incorrect");
    }
  });

  scoreEl.textContent = `Tu puntuación es ${puntos}/${preguntas.length}`;
});

//Reiniciar trivia
resetBtn.addEventListener("click", () => {
  preguntas.forEach(({ input, feedback }) => {
    input.value = "";
    feedback.textContent = "";
    feedback.classList.remove("correct", "incorrect");
  });
  scoreEl.textContent = "";
  preguntas[0].input.focus();
});
