const timestamp = Date.now()
const url = `https://dummyjson.com/users?timestamp=${timestamp}`

function smoothScroll(letra) {
    const listaContato = document.getElementById('listaContato')
    const letraContato = listaContato.querySelector(`li:first-child:nth-of-type(n+${letra})`)
  
    if (letraContato) {
        letraContato.scrollIntoView({ behavior: 'smooth' })
    }
}

function pesquisaContatos(query) {
    const contatosFiltrados = contatos.filter(contato =>
        contato.firstName.toLowerCase().includes(query.toLowerCase()) ||
        contato.email.toLowerCase().includes(query.toLowerCase())
    )

    exibeContatos(contatosFiltrados)
}

function exibeContatos(infoContatos) {
    const listaContatos = document.getElementById('listaContatos')
    listaContatos.innerHTML = ''

    const alfabeto = {}

    infoContatos.sort((a, b) => a.firstName.localeCompare(b.firstName))

    infoContatos.forEach(contato => {
        const contatoItem = document.createElement('li')
        contatoItem.textContent = `${contato.firstName} ${contato.lastName} (${contato.email})`

        contatoItem.addEventListener('click', () => {
            popupContato(contato)
        })

        listaContatos.appendChild(contatoItem)

        const letraInicial = contato.firstName.charAt(0).toUpperCase()

        if (!alfabeto[letraInicial]) {
            alfabeto[letraInicial] = true

            const linkLetra = document.createElement('a')
            linkLetra.textContent = letraInicial

            linkLetra.addEventListener('click', () => {
                smoothScroll(letraInicial)
            })

            document.getElementById('alfabeto').appendChild(linkLetra)
        }
    })
}

function popupContato(contato) {
    const modal = document.getElementById('modal')
    const detalheNome = document.getElementById('detalheNome')
    const detalheEmail = document.getElementById('detalheEmail')
    const detalheTelefone = document.getElementById('detalheTelefone')
    const detalheEndereco = document.getElementById('detalheEndereco')

    detalheNome.textContent = `${contato.firstName} ${contato.lastName}`
    detalheEmail.textContent = `E-mail: ${contato.email}`
    detalheTelefone.textContent = `Telefone: ${contato.phone}`
    detalheEndereco.textContent = `Endereço: ${contato.address.street}, ${contato.address.city}, ${contato.address.zipcode}`

    modal.style.display = 'block'
}

fetch(url)
    .then(response => {
        if(!response.ok) {
            throw new Error("Erro ao ler a API")
        }
        return response.json()
    })
    .then(data => {
        const contatos = data

        exibeContatos(contatos.users)

        const searchInput = document.getElementById('searchInput')
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value
            pesquisaContatos(query)
        })
    })
    .catch(error => console.log('Erro ao obter os contatos: ', error))