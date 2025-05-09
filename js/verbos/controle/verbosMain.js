
import { verbos } from '../dados/verbosDados.js';

const verboSelect = document.getElementById("verboSelect");
const tempoSelect = document.getElementById("tempoSelect");
const pessoaSelect = document.getElementById("pessoaSelect");
const resultadoDiv = document.getElementById("resultado");

Object.keys(verbos).forEach(verbo => {
  const option = document.createElement("option");
  option.value = verbo;
  option.textContent = verbo.charAt(0).toUpperCase() + verbo.slice(1);
  verboSelect.appendChild(option);
});

verboSelect.addEventListener("change", () => {
  tempoSelect.innerHTML = '<option value="">Selecione o tempo verbal</option>';
  pessoaSelect.innerHTML = '<option value="">Selecione a pessoa gramatical</option>';
  resultadoDiv.innerHTML = "";
  tempoSelect.disabled = true;
  pessoaSelect.disabled = true;

  const verbo = verboSelect.value;
  if (!verbo) return;

  const tempos = Object.keys(verbos[verbo]);
  tempos.forEach(tempo => {
    const option = document.createElement("option");
    option.value = tempo;
    option.textContent = tempo;
    tempoSelect.appendChild(option);
  });

  tempoSelect.disabled = false;
});

tempoSelect.addEventListener("change", () => {
  pessoaSelect.innerHTML = '<option value="">Selecione a pessoa gramatical</option>';
  resultadoDiv.innerHTML = "";
  pessoaSelect.disabled = true;

  const verbo = verboSelect.value;
  const tempo = tempoSelect.value;
  if (!tempo || !verbo) return;

  const pessoas = Object.keys(verbos[verbo][tempo]);
  pessoas.forEach(pessoa => {
    const option = document.createElement("option");
    option.value = pessoa;
    option.textContent = pessoa;
    pessoaSelect.appendChild(option);
  });

  pessoaSelect.disabled = false;
});

pessoaSelect.addEventListener("change", () => {
  const verbo = verboSelect.value;
  const tempo = tempoSelect.value;
  const pessoa = pessoaSelect.value;

  if (!pessoa || !tempo || !verbo) return;

  const exemplo = verbos[verbo][tempo][pessoa];
  resultadoDiv.innerHTML = `
    <p><strong>Russo:</strong> ${exemplo.russo}</p>
    <p><strong>Transliteração:</strong> ${exemplo.transliteracao}</p>
    <p><strong>Tradução:</strong> ${exemplo.traducao}</p>
  `;
});
