const timestamp = Date.now()
const url = `https://dummyjson.com/users?timestamp=${timestamp}`
let contatos = []

function smoothScroll(letra) {
    const listaContato = document.getElementById('listaContatos')
    const letraContato = listaContato.querySelector(`li[data-letra="${letra}"]`);
        
    if (letraContato) {
        letraContato.scrollIntoView({ behavior: 'smooth' })
    }
}
    
function pesquisaContatos(query) {
    const contatosFiltrados = contatos.filter(
        (contato) =>
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
    
    infoContatos.forEach((contato) => {
        const contatoItem = document.createElement('li')
        const primeiraLetra = contato.firstName.charAt(0).toUpperCase()

        contatoItem.setAttribute('data-letra', primeiraLetra)
        
        contatoItem.innerHTML = `<figure><img src="${contato.image}" class="img-contato"><figcaption>${contato.firstName} ${contato.lastName}<br><small>(${contato.email})</small></figcaption></figure>`
        
        contatoItem.addEventListener('click', () => {
            popupContato(contato)
        });
        
        listaContatos.appendChild(contatoItem)
        
        const letraInicial = contato.firstName.charAt(0).toUpperCase()
        
        if (!alfabeto[letraInicial]) {
            alfabeto[letraInicial] = true
            
            const linkLetra = document.createElement('a')
            linkLetra.textContent = letraInicial
            
            linkLetra.addEventListener('click', () => {
                smoothScroll(letraInicial)
            });
            
            document.getElementById('alfabeto').appendChild(linkLetra)
        }
    });
}
        
function popupContato(contato) {
    const modal = document.getElementById('modal')
    const conteudo = document.getElementById('conteudo')
    const btnFechar = document.getElementById('fecharPopup')
    const detalheFoto = document.getElementById('detalheFoto')
    const detalheNome = document.getElementById('detalheNome')
    const detalheEmail = document.getElementById('detalheEmail')
    const detalheTelefone = document.getElementById('detalheTelefone')
    const detalheEndereco = document.getElementById('detalheEndereco')
    
    detalheFoto.innerHTML = `<img src="${contato.image}" alt="${contato.firstName} ${contato.lastName}">`
    detalheNome.textContent = `${contato.firstName} ${contato.lastName}`
    detalheEmail.innerHTML = `<a href="mailto:${contato.email}" target="_blank"><i class="fas fa-envelope"></i><span>${contato.email}</span></a>`
    detalheTelefone.innerHTML = `<a href="tel:${contato.phone}" target="_blank"><i class="fas fa-phone"></i><span>${contato.phone}</span></a>`
    detalheEndereco.innerHTML = `<a href="https://www.google.com.br/maps/place/${contato.address.address}+${contato.address.city}+${contato.address.state}+${contato.address.postalCode}" target="_blank"><i class="fas fa-map-marker-alt"></i><span>${contato.address.address}<br>${contato.address.city}, ${contato.address.state}, ${contato.address.postalCode}</span></a>`
    
    modal.classList.add('fade')
    conteudo.classList.add('modal-open')
    
    btnFechar.addEventListener('click', () => {
        modal.classList.remove('fade')
        conteudo.classList.remove('modal-open')
    });
}
        
fetch(url)
.then((response) => {
    if (!response.ok) {
        throw new Error('Erro ao ler a API')
    }
    return response.json()
})
.then((data) => {
    contatos = data.users
    
    exibeContatos(contatos)
    
    const searchInput = document.getElementById('searchInput')
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value
        pesquisaContatos(query)
    });
    
    const form = document.querySelector('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
    });
})
.catch((error) => console.log('Erro ao obter os contatos: ', error))