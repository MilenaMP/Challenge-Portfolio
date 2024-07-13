const $form = document.querySelector("#form");
const inputs = document.querySelectorAll("#form input");
const inputa = document.querySelectorAll("#form textarea");

const expressoes = {
    nome: /^[a-zA-ZÀ-ÿ\s]{1,50}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    asunto: /^[a-zA-ZÀ-ÿ\s]{1,20}$/,
    mensagem: /^[a-zA-ZÀ-ÿ0-9\s]{1,200}$/,
};

const campos = {
    nome: false,
    email: false,
    asunto: false,
    mensagem: false,
};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nome":
            validarCampo(expressoes.nome, e.target, "nome");
            break;
        case "email":
            validarCampo(expressoes.email, e.target, "email");
            break;
        case "assunto":
            validarCampo(expressoes.asunto, e.target, "assunto");
            break;
        case "mensagem":
            textArea(expressoes.mensagem, e.target, "mensagem");
            break;
    }
};

const validarCampo = (expressao, input, campo) => {
    if (expressao.test(input.value)) {
        marcarCampoValido(campo);
        campos[campo] = true;
    } else {
        marcarCampoInvalido(campo);
        campos[campo] = false;
    }
};

const textArea = (expressao, textarea, campo) => {
    if (expressao.test(textarea.value)) {
        marcarCampoValido(campo);
        campos[campo] = true;
    } else {
        marcarCampoInvalido(campo);
        campos[campo] = false;
    }
};

const marcarCampoValido = (campo) => {
    document.getElementById(`input_${campo}`).classList.remove("incorreto");
    document.getElementById(`input_${campo}`).classList.add("correto");
    document.querySelector(`#input_${campo} i`).classList.remove("fa-times-circle");
    document.querySelector(`#input_${campo} i`).classList.add("fa-check-circle");
};

const marcarCampoInvalido = (campo) => {
    document.getElementById(`input_${campo}`).classList.add("incorreto");
    document.getElementById(`input_${campo}`).classList.remove("correto");
    document.querySelector(`#input_${campo} i`).classList.add("fa-times-circle");
    document.querySelector(`#input_${campo} i`).classList.remove("fa-check-circle");
};

inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});

inputa.forEach((textarea) => {
    textarea.addEventListener("keyup", validarFormulario);
    textarea.addEventListener("blur", validarFormulario);
});

$form.addEventListener("submit", enviarEmail);

function enviarEmail(e) {
    e.preventDefault();
    if (campos.nome && campos.email && campos.assunto && campos.mensagem) {
        emailjs.send("service_b8sxa5d", "template_r2fwhlj", {
            from_name: $form.nome.value,
            reply_to: $form.email.value,
            to_name: "Milena", // Replace with the name of the recipient
            subject: $form.assunto.value,
            message_html: $form.mensagem.value
        }).then(function(response) {
            alert("E-mail enviado com sucesso!");
            $form.reset(); 
        }, function(error) {
            alert("Ocorreu um erro ao enviar o e-mail. Por favor, tente novamente mais tarde.");
            console.error("Erro ao enviar o e-mail:", error);
        });
    } else {
        alert("Por favor, preencha corretamente todos os campos antes de enviar.");
    }
}
