// Array para armazenar os nomes dos amigos
let amigos = [];

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    // Obtém o elemento input pelo ID
    const inputAmigo = document.getElementById('amigo');

    // Verifica se o elemento foi encontrado
    if (!inputAmigo) {
        console.error("Elemento 'amigo' não encontrado.");
        return;
    }

    // Obtém o valor do input e remove espaços em branco no início e no fim
    const nome = inputAmigo.value.trim();

    // Verifica se o nome não está vazio
    if (nome) {
        amigos.push(nome); // Adiciona o nome ao array
        inputAmigo.value = ''; // Limpa o campo de input
        atualizarListaAmigos(); // Atualiza a lista na tela
    } else {
        alert("Por favor, insira um nome válido.");
    }
}

// Função para atualizar a lista de amigos na tela
function atualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');

    // Limpa a lista antes de atualizar
    listaAmigos.innerHTML = '';

    // Adiciona cada amigo à lista
    amigos.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });
}

// Função para sortear os amigos
function sortearAmigo() {
    // Verifica se há pelo menos 2 amigos para sortear
    if (amigos.length < 2) {
        alert("Precisa de pelo menos 2 amigos para sortear.");
        return;
    }

    // Embaralha a lista de amigos
    let embaralhados = [...amigos].sort(() => Math.random() - 0.5);

    // Cria um mapa para armazenar os pares
    let pares = new Map();

    // Cria os pares de amigos secretos
    for (let i = 0; i < embaralhados.length; i++) {
        let atual = embaralhados[i];
        let proximo = embaralhados[(i + 1) % embaralhados.length];

        // Verifica se alguém tirou a si mesmo
        if (atual === proximo) {
            return sortearAmigo(); // Recursão para tentar novamente
        }

        pares.set(atual, proximo);
    }

    // Exibe o resultado na tela
    exibirResultado(pares);
}

// Função para exibir o resultado do sorteio
function exibirResultado(pares) {
    const resultadoDiv = document.getElementById('resultado');

    // Limpa o conteúdo anterior
    resultadoDiv.innerHTML = '';

    // Adiciona cada par ao resultado
    pares.forEach((valor, chave) => {
        const p = document.createElement('p');
        p.textContent = `${chave} tirou ${valor}`;
        resultadoDiv.appendChild(p);
    });
}