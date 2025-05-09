import { gerarNumeros } from './geradorNumeros.js';

const dados = gerarNumeros();
const grupoSelect = document.getElementById('grupoSelect');
const intervaloSelect = document.getElementById('intervaloSelect');
const numeroSelect = document.getElementById('numeroSelect');
const pesquisaInput = document.getElementById('pesquisaInput');
const btnPesquisar = document.getElementById('btnPesquisar');
const resultado = document.getElementById('resultado');

grupoSelect.addEventListener("change", () => {
  const grupo = grupoSelect.value;
  intervaloSelect.innerHTML = '<option value="">Selecione o intervalo</option>';
  numeroSelect.innerHTML = '<option value="">Selecione o número</option>';
  resultado.innerHTML = "";
  intervaloSelect.disabled = true;
  numeroSelect.disabled = true;

  if (grupo && dados[grupo]) {
    Object.keys(dados[grupo]).forEach(intervalo => {
      const opt = document.createElement("option");
      opt.value = intervalo;
      opt.textContent = intervalo;
      intervaloSelect.appendChild(opt);
    });
    intervaloSelect.disabled = false;
  }
});

intervaloSelect.addEventListener("change", () => {
  const grupo = grupoSelect.value;
  const intervalo = intervaloSelect.value;
  numeroSelect.innerHTML = '<option value="">Selecione o número</option>';
  resultado.innerHTML = "";
  numeroSelect.disabled = true;

  if (grupo && intervalo && dados[grupo][intervalo]) {
    dados[grupo][intervalo].forEach(item => {
      const opt = document.createElement("option");
      opt.value = item.alg;
      opt.textContent = item.alg;
      numeroSelect.appendChild(opt);
    });
    numeroSelect.disabled = false;
  }
});

numeroSelect.addEventListener("change", () => {
  const grupo = grupoSelect.value;
  const intervalo = intervaloSelect.value;
  const valor = numeroSelect.value;

  if (valor && grupo && intervalo) {
    const item = dados[grupo][intervalo].find(n => n.alg == valor);
    mostrarResultado(item);
  }
});

btnPesquisar.addEventListener("click", () => {
  const valor = parseInt(pesquisaInput.value);
  if (isNaN(valor)) return;

  let itemEncontrado = null;
  for (const grupo in dados) {
    for (const intervalo in dados[grupo]) {
      const encontrado = dados[grupo][intervalo].find(n => n.alg == valor);
      if (encontrado) {
        itemEncontrado = encontrado;
        break;
      }
    }
    if (itemEncontrado) break;
  }

  if (itemEncontrado) {
    mostrarResultado(itemEncontrado);
  } else {
    resultado.innerHTML = "<p>Número não encontrado.</p>";
  }
});

function mostrarResultado(item) {
  resultado.innerHTML = `
    <p><strong>Algarismo:</strong> ${item.alg}</p>
    <p><strong>Russo:</strong> ${item.ext}</p>
    <p><strong>Transliteração:</strong> ${item.trans}</p>
    <p><strong>Tradução:</strong> ${item.trad}</p>
  `;
}
