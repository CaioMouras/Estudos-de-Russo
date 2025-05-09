// Importando os dados das letras
import { letras } from './alfabetoDados.js';

// Selecionando o container onde as letras serão inseridas
const alfabetoContainer = document.getElementById("alfabeto-container");

// Função para gerar as letras dinamicamente na tela
function gerarLetras() {
  letras.forEach(letra => {
    const letraDiv = document.createElement("div");
    letraDiv.classList.add("letra");
    letraDiv.innerHTML = `<span class="cirilico">${letra.letra}</span>`;

    // Evento ao clicar na letra
    letraDiv.addEventListener("click", () => abrirModal(letra));

    alfabetoContainer.appendChild(letraDiv);
  });
}

// Função para abrir o modal com os dados da letra
function abrirModal(letra) {
  const modal = document.getElementById("letra-modal");
  const imagem = document.getElementById("imagem-letra");
  const cirilico = document.getElementById("letra-cirilico");
  const palavra = document.getElementById("palavra-ru");
  const transliteracao = document.getElementById("transliteracao");
  const traducao = document.getElementById("traducao");

  imagem.src = letra.imagem;
  cirilico.textContent = letra.letra;
  palavra.textContent = `Palavra: ${letra.palavra}`;
  transliteracao.textContent = `Transliteração: ${letra.transliteracao}`;
  traducao.textContent = `Tradução: ${letra.traducao}`;

  modal.style.display = "flex"; // Flex para centralizar
}

// Evento para fechar o modal ao clicar no botão (×)
document.getElementById("close-btn").addEventListener("click", () => {
  document.getElementById("letra-modal").style.display = "none";
});

// Evento para fechar ao clicar fora do card
document.getElementById("letra-modal").addEventListener("click", (e) => {
  if (e.target.id === "letra-modal") {
    document.getElementById("letra-modal").style.display = "none";
  }
});

// Iniciando a geração das letras
gerarLetras();

// Função para fechar o modal com animação de saída
function fecharModal() {
  const modal = document.getElementById("letra-modal");
  modal.style.animation = "fadeOut 0.2s ease forwards";
  setTimeout(() => {
    modal.style.display = "none";
    modal.style.animation = ""; // limpa animação para reutilizar
  }, 200);
}

// Botão de fechar
document.getElementById("close-btn").addEventListener("click", fecharModal);

// Clique fora da caixa de info
document.getElementById("letra-modal").addEventListener("click", (e) => {
  if (e.target.id === "letra-modal") {
    fecharModal();
  }
});