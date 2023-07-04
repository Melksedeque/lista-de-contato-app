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

// Realizar a requisição para obter a lista de contatos da API
fetch(url)
    .then(resposta => {
        if(!resposta.ok) {
            console.log("Erro ao ler a API")
        }
        resposta.json()
    })
    .then(dados => {
        // Armazenar a lista de contatos
        const contacts = dados

    // Exibir os contatos iniciais
    displayContacts(contacts)

    // Adicionar listener para a barra de busca
    const searchInput = document.getElementById('searchInput')
        searchInput.addEventListener('input', (event) => {
        const query = event.target.value
        searchContacts(query)
    })
})
.catch(error => console.log('Erro ao obter os contatos:', error));