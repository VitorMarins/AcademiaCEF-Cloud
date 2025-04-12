let alunos = JSON.parse(localStorage.getItem("alunos") || "[]");
let editIndex = null;

window.onload = () => {
  listarAlunos();
};

function formatarCPF(campo) {
  let valor = campo.value.replace(/\D/g, "").slice(0, 11);
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  campo.value = valor;
}

function salvarAluno() {
  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const nascimento = document.getElementById("nascimento").value;
  const cep = document.getElementById("cep").value.trim();
  const plano = document.getElementById("plano").value;

  if (!nome || !cpf || !nascimento || !cep || plano === "Escolha um plano") {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  if (cpf.length !== 14) {
    alert("CPF inválido. Verifique o formato.");
    return;
  }

  const aluno = { nome, cpf, nascimento, cep, plano };

  if (editIndex !== null) {
    alunos[editIndex] = aluno;
    editIndex = null;
    document.getElementById("btnSalvar").innerText = "Cadastrar";
  } else {
    alunos.push(aluno);
  }

  localStorage.setItem("alunos", JSON.stringify(alunos));
  limparFormulario();
  listarAlunos();
}

function limparFormulario() {
  document.getElementById("nome").value = "";
  document.getElementById("cpf").value = "";
  document.getElementById("nascimento").value = "";
  document.getElementById("cep").value = "";
  document.getElementById("plano").selectedIndex = 0;
}

function listarAlunos() {
  const ul = document.getElementById("listaAlunos");
  ul.innerHTML = "";

  alunos.forEach((aluno, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${aluno.nome} - ${aluno.cpf} - ${formatarData(aluno.nascimento)} - ${aluno.cep} - Plano ${aluno.plano}
      <button onclick="editarAluno(${index})">Editar</button>
      <button onclick="removerAluno(${index})">Remover</button>
    `;
    ul.appendChild(li);
  });
}

function formatarData(data) {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

function editarAluno(index) {
  const aluno = alunos[index];
  document.getElementById("nome").value = aluno.nome;
  document.getElementById("cpf").value = aluno.cpf;
  document.getElementById("nascimento").value = aluno.nascimento;
  document.getElementById("cep").value = aluno.cep;
  document.getElementById("plano").value = aluno.plano;

  editIndex = index;
  document.getElementById("btnSalvar").innerText = "Salvar Edição";
}

function removerAluno(index) {
  if (confirm("Tem certeza que deseja remover este aluno?")) {
    alunos.splice(index, 1);
    localStorage.setItem("alunos", JSON.stringify(alunos));
    listarAlunos();
  }
}
