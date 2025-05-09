document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cores-container");
  cores.forEach(cor => {
    const div = document.createElement("div");
    div.className = "cor";
    div.innerHTML = `
      <div class="cor-exemplo" style="background-color: ${cor.hex};"></div>
      <strong>${cor.cor}</strong>
    `;
    div.addEventListener("click", () => mostrarCor(cor));
    container.appendChild(div);
  });
});

function mostrarCor(cor) {
  const modal = document.getElementById("cor-modal");
  document.getElementById("cor-exibida").innerHTML = `<div class="cor-exemplo" style="background-color: ${cor.hex}; margin: auto;"></div>`;
  document.getElementById("cor-nome").innerHTML = `<h2>${cor.cor}</h2>`;
  document.getElementById("cor-translit").innerText = `Transliteração: ${cor.translit}`;
  document.getElementById("cor-traducao").innerText = `Tradução: ${cor.traducao}`;
  modal.style.display = "flex";
}

function fecharModal() {
  const modal = document.getElementById("cor-modal");
  modal.style.animation = "fadeOut 0.2s ease forwards";
  setTimeout(() => {
    modal.style.display = "none";
    modal.style.animation = "";
  }, 200);
}
