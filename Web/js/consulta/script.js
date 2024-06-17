const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNomePaciente = document.querySelector('#m-nomePaciente')
const sNomeMedico = document.querySelector('#m-nomeMedico')
const sData = document.querySelector('#m-data')
const sHora = document.querySelector('#m-hora')
const sStatus = document.querySelector('#m-status')
const sEspecialidade = document.querySelector('#m-especialidade')
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
    sData.value = itens[index].data
    sHora.value = itens[index].hora
    sStatus.value = itens[index].status
    sEspecialidade.value = itens[index].especialidade
    id = index
  } else {
    sNomePaciente.value = ''
    sNomeMedico.value = ''
    sData.value = ''
    sHora.value = ''
    sStatus.value = ''
    sEspecialidade.value = ''
  }
}

function openProntuario() {
  window.location.href = 'prontuario.html';
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
    <td>${item.data}</td>
    <td>${item.hora}</td>
    <td>${item.status}</td>
    <td>${item.especialidade}</td>
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

  if (sNomePaciente.value == '' || sNomeMedico.value == '' || sData.value == '' || sHora.value == '' || sStatus.value == '' || sEspecialidade.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nomePaciente = sNomePaciente.value
    itens[id].nomeMedico = sNomeMedico.value
    itens[id].data = sData.value
    itens[id].hora = sHora.value
    itens[id].status = sStatus.value
    itens[id].especialidade = sEspecialidade.value
  } else {
    itens.push({ 'nome do paciente': sNomePaciente.value, 'nome do medico': sNomeMedico.value, 'data': sData.value, 'hora': sHora.value, 'status': sStatus.value, 'especialidade': sEspecialidade.value })
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

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()


