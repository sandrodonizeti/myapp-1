// Função para ocultar o ícone ao digitar
function toggleIconVisibility() {
  var mensagem = document.getElementById("mensagem");
  var icon = document.getElementById("icon-upload");
  if (mensagem.value.trim() !== "") {
    icon.classList.add("hidden");
  } else {
    icon.classList.remove("hidden");
  }
}

// Função para abrir o modal
function openModal() {
  document.getElementById("upload-modal").style.display = "block";
}

// Função para fechar o modal
function closeModal() {
  document.getElementById("upload-modal").style.display = "none";
}

const textarea = document.getElementById("textiaria");
textarea.scrollTop = textarea.scrollHeight;

const uploadButton = document.getElementById("upload-button");
const imagePreview = document.getElementById("image-preview");

uploadButton.addEventListener("change", function () {
  const selectedFile = uploadButton.files[0];
  if (selectedFile) {
    const imageUrl = URL.createObjectURL(selectedFile);
    imagePreview.src = imageUrl;
    imagePreview.style.display = "block";
  }
});

function validateMessage() {
  const mensagemInput = document.getElementById("mensagem");
  const mensagemValue = mensagemInput.value.trim();
  if (mensagemValue.length === 0) {
    alert("Por favor, digite uma mensagem antes de enviar.");
    return false;
  }
  return true;
}

function atualizarConteudo() {
  fetch("/pratica1")
    .then((response) => response.text())
    .then((data) => {
      const textiaria = document.getElementById("textiaria");
      const isScrolledToBottom =
        textiaria.scrollHeight - textiaria.clientHeight <=
        textiaria.scrollTop + 1;
      textiaria.innerHTML = data;
      if (isScrolledToBottom) {
        textiaria.scrollTop = textiaria.scrollHeight;
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar novo conteúdo:", error);
    });
}

function abrirModal(filename) {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");

  if (filename.endsWith(".mp3")) {
    modalContent.innerHTML = `<audio controls><source src="${filename}" type="audio/mpeg">Your browser does not support the audio element.</audio> <button> Fechar </button>`;
    modal.style.display = "block";
  }
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("modal-content").innerHTML = "";
}

function abrirVideoEmNovaAba(filename) {
  window.open(filename, "_blank");
}

function expandirFoto(photoId) {
  var foto = document.getElementById(photoId);
  if (!foto.classList.contains("expanded")) {
    // Expandir a foto
    foto.classList.add("expanded");
    foto.style.position = "fixed";
    foto.style.top = "0";
    foto.style.left = "0";
    foto.style.width = "100%";
    foto.style.height = "100%";
    foto.style.zIndex = "9999";
    foto.onclick = function () {
      fecharFoto(photoId);
    };

    // Adicionar o link para download da foto
    var downloadLink = document.createElement("a");
    downloadLink.href = foto.src; // Define o URL de download como o URL da imagem
    downloadLink.download = "foto"; // Define o nome do arquivo para download
    document.body.appendChild(downloadLink); // Adiciona o link ao corpo do documento
    downloadLink.click(); // Simula o clique no link de download
    document.body.removeChild(downloadLink); // Remove o link após o download
  }
}

function fecharFoto(photoId) {
  var foto = document.getElementById(photoId);
  // Fechar a foto
  foto.classList.remove("expanded");
  foto.style.position = "static";
  foto.style.width = "auto";
  foto.style.height = "auto";
  foto.style.zIndex = "initial";
  foto.onclick = function () {
    expandirFoto(photoId);
  };
}

function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  input.type === "password"
    ? (input.type = "text")
    : (input.type = "password");
  input.type === "password"
    ? (input.nextElementSibling.textContent = "👁️")
    : (input.nextElementSibling.textContent = "🙈");
}

function validatePassword() {
  const passwordInput = document.getElementById("password").value;

  // Selecionando os elementos da mensagem
  const lowercase = document.getElementById("lowercase");
  const uppercase = document.getElementById("uppercase");
  const number = document.getElementById("number");
  const special = document.getElementById("special");
  const length = document.getElementById("length");

  // Validação de cada critério
  const hasLowercase = /[a-z]/.test(passwordInput);
  const hasUppercase = /[A-Z]/.test(passwordInput);
  const hasNumber = /\d/.test(passwordInput);
  const hasSpecialChar = /[@$!%*?&]/.test(passwordInput);
  const hasMinLength = passwordInput.length >= 6;

  // Alterando a cor com base nos critérios atendidos
  lowercase.style.color = hasLowercase ? "LawnGreen" : "blue";
  uppercase.style.color = hasUppercase ? "LawnGreen" : "blue";
  number.style.color = hasNumber ? "LawnGreen" : "blue";
  special.style.color = hasSpecialChar ? "LawnGreen" : "blue";
  length.style.color = hasMinLength ? "LawnGreen" : "blue";
}

document.getElementById('photo').addEventListener('blur', function() {
  if (this.value.trim() === '') {
    this.value = '👼';
  }
});

document.getElementById('photo').addEventListener('focus', function() {
  if (this.value === '👼') {
    this.value = '';
  }
});

setInterval(atualizarConteudo, 5000);
