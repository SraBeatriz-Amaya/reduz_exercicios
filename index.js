const Redux = require('redux');
const { combineReducers, createStore } = Redux;

const transacao = (store) => {
    const nomes = [
        "Bruna",
        "Beatriz",
        "Bianca",
        "Barbara"
    ];

    sorteioFuncao = Math.floor(Math.random() * 3);
    sorteioNome =  Math.floor(Math.random() * 4);

    const funcoes = {
        0: () => store.dispatch(criarContrato(nomes[sorteioNome], Math.floor(Math.random() * 101))),
        1: () => store.dispatch(cancelarContrato(nomes[sorteioNome])),
        2: () => store.dispatch(solicitarCashback(nomes[sorteioNome], Math.floor(Math.random() * 21 + 10)))
    }

    funcoes[sorteioFuncao]();
    console.log(store.getState());
}

const criarContrato = (nome, valor) => {
    return {
        type: 'CRIAR_CONTRATO',
        payload: {
            nome,
            valor
        }
    }
}

function cancelarContrato(nome) {
    return {
        type: 'CANCELAR_CONTRATO',
        payload: {
            nome
        }
    }
}

const solicitarCashback = (nome, valor) => {
    return {
        type: 'SOLICITAR_CASHBACK',
        payload: {
            nome,
            valor
        }
    }
}

const historicoDePedidosCashbackReducer = (historicoDePedidosCashback = [], acao) => {
    if(acao.type === 'SOLICITAR_CASHBACK') {
        return [...historicoDePedidosCashback, acao.payload];
    }

    return historicoDePedidosCashback;
}

const caixaReducer = (valorEmCaixa = 0, acao) => {
    if(acao.type === 'CRIAR_CONTRATO') {
        return valorEmCaixa + acao.payload.valor;
    } else if(acao.type === 'SOLICITAR_CASHBACK') {
        return valorEmCaixa - acao.payload.valor;
    }

    return valorEmCaixa;
}

const contratosReducer = (contratos = [], acao) => {
    if(acao.type === 'CRIAR_CONTRATO') {
        return [...contratos, acao.payload];
    } else if(acao.type === 'CANCELAR_CONTRATO') {
        return contratos.filter(contrato => contrato.nome !== acao.payload.nome);
    }

    return contratos;
}

const todosOsReducers = combineReducers({
    historicoDePedidosCashbackReducer,
    caixaReducer,
    contratosReducer
});

const store = createStore(todosOsReducers);

setInterval(() => transacao(store), 5000)

