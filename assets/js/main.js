const timestamp = Date.now()
const url = `https://dummyjson.com/users?timestamp=${timestamp}`

function pesquisaContatos(query) {
    const contatosFiltrados = contatos.filter(contato =>
        contato.name.toLowerCase().includes(query.toLowerCase()) ||
        contato.email.toLowerCase().includes(query.toLowerCase())
    )

    exibeContatos(contatosFiltrados)
}

function exibeContatos(infos) {
    const listaContatos = document.getElementById('listaContatos')
    listaContatos.innerHTML = ''

    infos.forEach(contato => {
        const contatoItem = document.createElement('li')
        contatoItem.textContent = `${contato.name} (${contato.email})`

        contatoItem.addEventListener('click', () => {
            popupContato(contato)
        })

      listaContatos.appendChild(contatoItem)
    })
}

function showContactModal(contato) {
    const modal = document.getElementById('modal')
    const detalheNome = document.getElementById('detalheNome')
    const detalheEmail = document.getElementById('detalheEmail')
    const detalheTelefone = document.getElementById('detalheTelefone')
    const detalheEndereco = document.getElementById('detalheEndereco')

    detalheNome.textContent = contato.name
    detalheEmail.textContent = `E-mail: ${contato.email}`
    detalheTelefone.textContent = `Telefone: ${contato.phone}`
    detalheEndereco.textContent = `Endereço: ${contato.address.street}, ${contato.address.city}, ${contato.address.zipcode}`

    modal.style.display = 'block'
}

fetch(url)
    .then(resposta => {
        if(!resposta.ok) {
            throw new Error("Erro ao ler a API")
        }
        return response.json()
    })
    .then(dados => {
        const contatos = dados

        displayContacts(contatos)

        const searchInput = document.getElementById('searchInput')
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value
            pesquisaContatos(query)
        })
    })
    .catch(erro => console.log('Erro ao obter os contatos: ', erro))