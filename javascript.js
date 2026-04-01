document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valido = true;

    // Campos
    const nome = document.getElementById("nome");
    const sobrenome = document.getElementById("sobrenome");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const cep = document.getElementById("cep");
    const assunto = document.getElementById("assunto");
    const mensagem = document.getElementById("mensagem");
    const aceite = document.getElementById("aceite");

    const radiosSexo = document.querySelectorAll('input[name="sexo"]');

    // Limpa erros anteriores
    limparErro(nome, "erro-nome");
    limparErro(sobrenome, "erro-sobrenome");
    limparErro(email, "erro-email");
    limparErro(phone, "erro-phone");
    limparErro(cep, "erro-cep");
    limparErro(assunto, "erro-assunto");
    limparErro(mensagem, "erro-mensagem");
    limparErro(aceite, "erro-aceite");
    limparErroRadio(radiosSexo, "erro-sexo");

    // Validação nome
    if (!nome.value.trim()) {
      mostrarErro(nome, "erro-nome", "O primeiro nome é obrigatório.");
      valido = false;
    } else if (nome.value.trim().length < 2) {
      mostrarErro(nome, "erro-nome", "O primeiro nome deve ter ao menos 2 caracteres.");
      valido = false;
    }

    // Validação sobrenome
    if (!sobrenome.value.trim()) {
      mostrarErro(sobrenome, "erro-sobrenome", "O sobrenome é obrigatório.");
      valido = false;
    } else if (sobrenome.value.trim().length < 2) {
      mostrarErro(sobrenome, "erro-sobrenome", "O sobrenome deve ter ao menos 2 caracteres.");
      valido = false;
    }

    // Validação sexo
    const sexoSelecionado = document.querySelector('input[name="sexo"]:checked');
    if (!sexoSelecionado) {
      mostrarErroRadio(radiosSexo, "erro-sexo", "Selecione uma opção de sexo.");
      valido = false;
    }

    // Validação email
    if (!email.value.trim()) {
      mostrarErro(email, "erro-email", "O e-mail é obrigatório.");
      valido = false;
    } else if (!validarEmail(email.value.trim())) {
      mostrarErro(email, "erro-email", "Digite um e-mail válido.");
      valido = false;
    }

    // Validação telefone
    if (!phone.value.trim()) {
      mostrarErro(phone, "erro-phone", "O telefone é obrigatório.");
      valido = false;
    } else {
      const telefoneLimpo = phone.value.replace(/\D/g, "");
      if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
        mostrarErro(phone, "erro-phone", "Digite um telefone com DDD válido.");
        valido = false;
      }
    }

    // Validação CEP
    if (!cep.value.trim()) {
      mostrarErro(cep, "erro-cep", "O CEP é obrigatório.");
      valido = false;
    } else if (!validarCEP(cep.value.trim())) {
      mostrarErro(cep, "erro-cep", "Digite um CEP válido no formato 00000-000.");
      valido = false;
    }

    // Validação assunto
    if (!assunto.value.trim()) {
      mostrarErro(assunto, "erro-assunto", "Selecione um assunto.");
      valido = false;
    }

    // Validação mensagem
    if (!mensagem.value.trim()) {
      mostrarErro(mensagem, "erro-mensagem", "A mensagem é obrigatória.");
      valido = false;
    } else if (mensagem.value.trim().length < 10) {
      mostrarErro(mensagem, "erro-mensagem", "A mensagem deve ter pelo menos 10 caracteres.");
      valido = false;
    }

    // Validação aceite
    if (!aceite.checked) {
      mostrarErro(aceite, "erro-aceite", "Você precisa concordar com o envio dos dados.");
      valido = false;
    }

    // Foca no primeiro erro
    if (!valido) {
      const primeiroErro = form.querySelector("[aria-invalid='true']");
      if (primeiroErro) {
        primeiroErro.focus();
      } else if (radiosSexo.length > 0) {
        const erroSexo = document.getElementById("erro-sexo");
        if (erroSexo && erroSexo.textContent.trim() !== "") {
          radiosSexo[0].focus();
        }
      }
      return;
    }

    alert("Formulário enviado com sucesso!");
    form.reset();
    limparTodosOsErros();
  });

  function mostrarErro(campo, idErro, mensagem) {
    campo.setAttribute("aria-invalid", "true");

    const erro = document.getElementById(idErro);
    if (erro) {
      erro.textContent = mensagem;
    }
  }

  function limparErro(campo, idErro) {
    if (campo) {
      campo.removeAttribute("aria-invalid");
    }

    const erro = document.getElementById(idErro);
    if (erro) {
      erro.textContent = "";
    }
  }

  function mostrarErroRadio(radios, idErro, mensagem) {
    radios.forEach((radio) => {
      radio.setAttribute("aria-invalid", "true");
    });

    const erro = document.getElementById(idErro);
    if (erro) {
      erro.textContent = mensagem;
    }
  }

  function limparErroRadio(radios, idErro) {
    radios.forEach((radio) => {
      radio.removeAttribute("aria-invalid");
    });

    const erro = document.getElementById(idErro);
    if (erro) {
      erro.textContent = "";
    }
  }

  function validarEmail(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
  }

  function validarCEP(valor) {
    return /^\d{5}-?\d{3}$/.test(valor);
  }

  function limparTodosOsErros() {
    const mensagensErro = document.querySelectorAll(".error");
    mensagensErro.forEach((erro) => {
      erro.textContent = "";
    });

    const camposInvalidos = document.querySelectorAll("[aria-invalid='true']");
    camposInvalidos.forEach((campo) => {
      campo.removeAttribute("aria-invalid");
    });
  }
});
