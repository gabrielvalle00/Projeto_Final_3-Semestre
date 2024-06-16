const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNomePaciente = document.querySelector('#m-nomePaciente')
const sNomeMedico = document.querySelector('#m-nomeMedico')
const sDiagnostico = document.querySelector('#m-diagnostico')
const sMedicacao = document.querySelector('#m-medicacao')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNomePaciente.value = itens[index].nomePaciente
    sNomeMedico.value = itens[index].nomeMedico
    sDiagnostico.value = itens[index].diagnostico
    sMedicacao.value = itens[index].medicacao
    id = index
  } else {
    sNomePaciente.value = ''
    sNomeMedico.value = ''
    sDiagnostico.value = ''
    sMedicacao.value = ''
  }
}

function openConsulta() {
  window.location.href = 'consulta.html';
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nomePaciente}</td>
    <td>${item.nomeMedico}</td>
    <td>${item.diagnostico}</td>
    <td>${item.medicacao}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {

  if (sNomePaciente.value == '' || sNomeMedico.value == '' || sDiagnostico.value == '' || sMedicacao.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nomePaciente = sNomePaciente.value
    itens[id].nomeMedico = sNomeMedico.value
    itens[id].diagnostico = sDiagnostico.value
    itens[id].medicacao = sMedicacao.value
  } else {
    itens.push({ 'nome do paciente': sNomePaciente.value, 'nome do medico': sNomeMedico.value, 'diagnostico': sDiagnostico.value, 'medicacao': sMedicacao.value })
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc_prontuario')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc_prontuario', JSON.stringify(itens))

loadItens()

