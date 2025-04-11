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
  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const nascimento = document.getElementById("nascimento").value;
  const cep = document.getElementById("cep").value;
  const plano = document.getElementById("plano").value;

  const novo = { nome, cpf, nascimento, cep, plano };

  if (editIndex !== null) {
    alunos[editIndex] = novo;
    editIndex = null;
  } else {
    alunos.push(novo);
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
  document.getElementById("plano").value = "A";
}

function listarAlunos() {
  const ul = document.getElementById("listaAlunos");
  ul.innerHTML = "";
  alunos.forEach((aluno, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${aluno.nome} - ${aluno.cpf} - ${aluno.nascimento} - ${aluno.cep} - Plano ${aluno.plano}
    <button onclick="editarAluno(${index})">Editar</button>`;
    ul.appendChild(li);
  });
}

function editarAluno(index) {
  const aluno = alunos[index];
  document.getElementById("nome").value = aluno.nome;
  document.getElementById("cpf").value = aluno.cpf;
  document.getElementById("nascimento").value = aluno.nascimento;
  document.getElementById("cep").value = aluno.cep;
  document.getElementById("plano").value = aluno.plano;
  editIndex = index;
}