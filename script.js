/* ==========================================
   1. LÓGICA DO FORMULÁRIO DE CONTATO
   ========================================== */
const formulario = document.getElementById('form-contato');
if (formulario) {
    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const interesse = document.getElementById('interesse').value;
        const mensagem = document.getElementById('mensagem').value;
        const numeroWhatsApp = '5511916565287'; // <-- SEU NÚMERO AQUI
        const textoMensagem = `Olá! Meu nome é ${nome}.\n\nTenho interesse no empreendimento: *${interesse}*\nMeu e-mail é: ${email}\nMeu telefone é: ${telefone}\n\nMensagem adicional:\n${mensagem}`;
        window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoMensagem)}`, '_blank');
        formulario.reset();
    });
}

/* ==========================================
   2. LÓGICA DOS CARROSSÉIS DE IMAGENS
   ========================================== */
const carrosseis = document.querySelectorAll('.carousel-container');
carrosseis.forEach(carrossel => {
    const slide = carrossel.querySelector('.carousel-slide');
    const imagens = carrossel.querySelectorAll('.carousel-slide img');
    const btnAnt = carrossel.querySelector('.carousel-prev');
    const btnProx = carrossel.querySelector('.carousel-next');
    let contador = 0;
    if (btnProx && btnAnt && slide) {
        btnProx.addEventListener('click', () => {
            contador++; if (contador >= imagens.length) contador = 0; 
            slide.style.transform = `translateX(${-contador * 100}%)`;
        });
        btnAnt.addEventListener('click', () => {
            contador--; if (contador < 0) contador = imagens.length - 1; 
            slide.style.transform = `translateX(${-contador * 100}%)`;
        });
    }
});

/* ==========================================
   3. LÓGICA DA GALERIA EM TELA CHEIA (COM LEGENDA)
   ========================================== */
const modal = document.getElementById('image-modal');
const imgAmpliada = document.getElementById('img-ampliada');
// NOVO: Capturamos a tag da legenda
const legendaAmpliada = document.getElementById('legenda-ampliada');
const btnFechar = document.querySelector('.fechar-modal');
const btnModalProx = document.querySelector('.modal-next');
const btnModalAnt = document.querySelector('.modal-prev');

let imagensAtuaisModal = [];
let indiceAtualModal = 0;

if (modal && imgAmpliada && btnFechar && legendaAmpliada) {
    const todosCarrosseis = document.querySelectorAll('.carousel-container');
    todosCarrosseis.forEach(carrossel => {
        const imagensDesteCarrossel = Array.from(carrossel.querySelectorAll('.carousel-slide img'));
        imagensDesteCarrossel.forEach((img, index) => {
            img.addEventListener('click', function() {
                modal.style.display = 'flex'; 
                imgAmpliada.src = this.src;
                // NOVO: Puxa o texto do 'alt' da foto e joga na legenda
                legendaAmpliada.innerText = this.alt || 'Imagem do Empreendimento';
                
                imagensAtuaisModal = imagensDesteCarrossel; 
                indiceAtualModal = index;
            });
        });
    });

    btnModalProx.addEventListener('click', function(e) {
        e.stopPropagation(); indiceAtualModal++;
        if (indiceAtualModal >= imagensAtuaisModal.length) indiceAtualModal = 0;
        imgAmpliada.src = imagensAtuaisModal[indiceAtualModal].src;
        // Atualiza a legenda ao avançar
        legendaAmpliada.innerText = imagensAtuaisModal[indiceAtualModal].alt || 'Imagem do Empreendimento';
    });

    btnModalAnt.addEventListener('click', function(e) {
        e.stopPropagation(); indiceAtualModal--;
        if (indiceAtualModal < 0) indiceAtualModal = imagensAtuaisModal.length - 1;
        imgAmpliada.src = imagensAtuaisModal[indiceAtualModal].src;
        // Atualiza a legenda ao retroceder
        legendaAmpliada.innerText = imagensAtuaisModal[indiceAtualModal].alt || 'Imagem do Empreendimento';
    });

    btnFechar.addEventListener('click', () => modal.style.display = 'none');
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
}

/* ==========================================
   4. LÓGICA DO MODAL DE FICHA TÉCNICA
   ========================================== */
const bancoDeDadosImoveis = {
    'Cnacional': {
        titulo: 'Casa Nacional EZTec',
        descricao: 'Um projeto arquitetônico moderno pensado para o seu conforto e exclusividade.',
        ficha: ['📐 Plantas de 114m² e 136m²', '🛏️ 2 e 3 suítes', '🚗 2 vagas', '🏊 Lazer completo'],
        mensagemWhats: 'Olá! Gostaria de receber a tabela de valores do Casa Nacional EZ Tec.'
    },
    'Metropolitan': {
        titulo: 'Metropolitan by Lindenberg',
        descricao: 'A forma da sofisticação urbana by Lindenberg com lazer no rooftop a mais de 90 m de altura.',
        ficha: ['📐 Studios a 2 Suítes de 22m² a 74m²', '🛡️ Segurança 24h','Uindades entregues com piso e forro'], 
        mensagemWhats: 'Olá! Gostaria de agendar uma visita ao Metropolitan by Lindenberg.'
         //'🛏️ 4 a 5 suítes', '🌳 Terrenos a partir de 800m²',
    }
};

const modalInfo = document.getElementById('info-modal');
const fecharInfo = document.querySelector('.fechar-info');
const botoesSaberMais = document.querySelectorAll('.btn-saber-mais');
const seuNumeroWhats = '5511916565287';

if (modalInfo) {
    botoesSaberMais.forEach(botao => {
        botao.addEventListener('click', function() {
            const dados = bancoDeDadosImoveis[this.getAttribute('data-id')];
            document.getElementById('info-titulo').innerText = dados.titulo;
            document.getElementById('info-desc').innerText = dados.descricao;
            document.getElementById('info-lista').innerHTML = dados.ficha.map(i => `<li>${i}</li>`).join('');
            document.getElementById('btn-info-whats').href = `https://wa.me/${seuNumeroWhats}?text=${encodeURIComponent(dados.mensagemWhats)}`;
            modalInfo.style.display = 'flex';
        });
    });
    fecharInfo.addEventListener('click', () => modalInfo.style.display = 'none');
    modalInfo.addEventListener('click', (e) => { if (e.target === modalInfo) modalInfo.style.display = 'none'; });
    document.getElementById('btn-info-form').addEventListener('click', () => modalInfo.style.display = 'none');
}