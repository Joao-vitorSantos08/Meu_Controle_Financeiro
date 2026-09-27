const renda = document.getElementById("renda")
const conteiner = document.querySelector(".conteiner")
const closeModalRenda = document.getElementById("closeModalRenda")

const nomeRenda = document.getElementById("nomeRenda")
const salvarRenda = document.getElementById("salvarRenda")
const valorRenda = document.getElementById("valorRenda")
const dateRenda = document.getElementById("dateRenda")

const listamovimentacao = document.getElementById("listamovimentacao")
let saldoConta = document.getElementById("saldo")

const somaMesEntrada = document.getElementById("somames")
const somaMesSaida = document.getElementById("saidames")

let menu = document.getElementById("menu-toggle")
let navegation = document.getElementById("navegation-mobile")

const deleteData = document.getElementById("deleteData")
const deleteDataMobile = document.getElementById("deleteDataMobile")

menu.addEventListener("click", function () {
    navegation.classList.toggle("show")
    menu.classList.toggle("active")
})

renda.addEventListener("click", function () {
    conteiner.classList.add("activeRenda")
})

closeModalRenda.addEventListener("click", function () {
    conteiner.classList.remove("activeRenda")
})


let listaRenda = JSON.parse(localStorage.getItem("@rendas")) || []
salvarRenda.addEventListener("click", function (e) {

    e.preventDefault()

    let rendaNome = nomeRenda.value.trim()
    let rendaValor = valorRenda.value.replace(",", ".")
    let rendaDate = dateRenda.value

    if (rendaNome === "") {
        alert("Informe a origem da renda.")
        return
    }

    if (rendaValor === "" || isNaN(rendaValor) || Number(rendaValor) <= 0) {
        alert("Informe um valor válido.")
        return
    }

    if (rendaDate === "") {
        alert("Informe a data.")
        return
    }

    let novaRenda = {
        nome: rendaNome,
        valor: rendaValor,
        data: rendaDate
    }

    listaRenda.push(novaRenda)

    localStorage.setItem("@rendas", JSON.stringify(listaRenda))

    conteiner.classList.remove("activeRenda")

    nomeRenda.value = ""
    valorRenda.value = ""
    dateRenda.value = ""

    renderizarMovimentacoes()
})
function deletarRenda(index) {
    listaRenda.splice(index, 1)
    localStorage.setItem("@rendas", JSON.stringify(listaRenda))
    renderizarMovimentacoes()
}

const btnDespesa = document.getElementById("despesa")
const btnCloseDespesa = document.getElementById("closeModalDespesas")
const conteinerDespesa = document.querySelector(".conteiner_despesas")
const salvarDespesa = document.getElementById("salvarDespesa")
const nomeDespesa = document.getElementById("nomeDespesa")
const valorDespesa = document.getElementById("valorDespesa")
const dateDespesa = document.getElementById("dateDespesa")

btnDespesa.addEventListener("click", function () {
    conteinerDespesa.classList.add("activeDespesa")
})

btnCloseDespesa.addEventListener("click", function () {
    conteinerDespesa.classList.remove("activeDespesa")
})

let listaDespesas = JSON.parse(localStorage.getItem("@despesas")) || []

salvarDespesa.addEventListener("click", function (e) {

    e.preventDefault()

    let despesaNome = nomeDespesa.value.trim()
    let despesaValor = valorDespesa.value.replace(",", ".")
    let despesaDate = dateDespesa.value

    if (despesaNome === "") {
        alert("Informe a origem da despesa.")
        return
    }

    if (
        despesaValor === "" ||
        isNaN(despesaValor) ||
        Number(despesaValor) <= 0
    ) {
        alert("Informe um valor válido.")
        return
    }

    if (despesaDate === "") {
        alert("Informe a data.")
        return
    }

    let novaDespesa = {
        nome: despesaNome,
        valor: despesaValor,
        data: despesaDate
    }

    listaDespesas.push(novaDespesa)

    localStorage.setItem("@despesas", JSON.stringify(listaDespesas))

    conteinerDespesa.classList.remove("activeDespesa")

    nomeDespesa.value = ""
    valorDespesa.value = ""
    dateDespesa.value = ""

    renderizarMovimentacoes()
})
function deletarDespesa(index) {
    listaDespesas.splice(index, 1)
    localStorage.setItem("@despesas", JSON.stringify(listaDespesas))
    renderizarMovimentacoes()
}

function formatarData(dataString) {
    if (!dataString) return "";
    const partes = dataString.split("-");
    if (partes.length !== 3) return dataString;
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

let somarSaldo = () => {
    let total = 0
    let totalEntradasMes = 0
    let totalSaidasMes = 0

    const hoje = new Date()
    const anoAtual = hoje.getFullYear()
    const mesAtual = String(hoje.getMonth() + 1).padStart(2, '0')
    const anoMesAtual = `${anoAtual}-${mesAtual}`

    listaRenda.forEach((renda) => {
        const valorNum = parseFloat(renda.valor) || 0
        total += valorNum

        if (renda.data && renda.data.startsWith(anoMesAtual)) {
            totalEntradasMes += valorNum
        }
    })

    listaDespesas.forEach((despesa) => {
        const valorNum = parseFloat(despesa.valor) || 0
        total -= valorNum

        if (despesa.data && despesa.data.startsWith(anoMesAtual)) {
            totalSaidasMes += valorNum
        }
    })

    saldoConta.textContent = `R$ ${total.toFixed(2)}`
    somaMesEntrada.textContent = `+ R$ ${totalEntradasMes.toFixed(2)}`

    if (somaMesSaida) {
        somaMesSaida.textContent = `- R$ ${totalSaidasMes.toFixed(2)}`
    }
}


const filtroTodos = document.getElementById("filtroTodos")
const filtroRendas = document.getElementById("filtroRendas")
const filtroDespesas = document.getElementById("filtroDespesas")

let renderizarMovimentacoes = (filtro = "todos") => {
    listamovimentacao.innerHTML = ""

    if (filtro === "todos" || filtro === "rendas") {
        listaRenda.forEach((renda, index) => {
            let li = document.createElement("li")
            li.innerHTML = `
                <div class="item-esquerdo">
                    <h3>${renda.nome}</h3>
                    <p>${formatarData(renda.data)}</p>
                </div>
                <div class="item-direito">
                     <span class="valor-renda"> + R$ ${renda.valor}</span>
                    <button class="btn-deletar" onclick="deletarRenda(${index})">
                        Deletar
                    </button>
                </div>
            `
            listamovimentacao.appendChild(li)
        })
    }

    if (filtro === "todos" || filtro === "despesas") {
        listaDespesas.forEach((despesa, index) => {
            let li = document.createElement("li")
            li.className = "card-despesa"
            li.innerHTML = `
                 <div class="item-esquerdo">
                    <h3>${despesa.nome}</h3>
                    <p>${formatarData(despesa.data)}</p>
                </div>
                <div class="item-direito">
                     <span class="valor-despesa"> - R$ ${despesa.valor}</span>
                    <button class="btn-deletar" onclick="deletarDespesa(${index})">
                        Deletar
                    </button>
                </div>
               
            `
            listamovimentacao.appendChild(li)
        })
    }

    somarSaldo()
}

filtroTodos.addEventListener("click", function () {
    renderizarMovimentacoes("todos")
})

filtroRendas.addEventListener("click", function () {
    renderizarMovimentacoes("rendas")
})


filtroDespesas.addEventListener("click", function () {
    renderizarMovimentacoes("despesas")
})

function limparDados() {
    const confirmar = confirm(
        "Tem certeza que deseja apagar todas as movimentações?"
    )

    if (!confirmar) {
        return
    }

    listaRenda = []
    listaDespesas = []

    localStorage.removeItem("@rendas")
    localStorage.removeItem("@despesas")

    renderizarMovimentacoes("todos")
}

deleteData.addEventListener("click", limparDados)

deleteDataMobile.addEventListener("click", function () {
    limparDados()
    navegation.classList.remove("show")
    menu.classList.remove("active")
})

renderizarMovimentacoes()