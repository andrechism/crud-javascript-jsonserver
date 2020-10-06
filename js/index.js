var btnEnviar = document.querySelector('#btnEnviar');
var listaEventos = document.querySelector('#lista-eventos');

function pegarComentario() {
  let imgUrl = document.querySelector('#imgUrl');
  let titulo = document.querySelector('#titulo');
  let conteudo = document.querySelector('#comentario');
  let postar = {
    "imgUrl": imgUrl.value,
    "titulo": titulo.value,
    "conteudo": conteudo.value
  }

  enviarComentario(postar);
}

async function enviarComentario(postagem) {
  

  let request = await fetch('https://projeto-pi-digitalhouse.herokuapp.com/eventos', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postagem)
  });

  receberComentario();

}

async function receberComentario() {
  let response = await fetch('https://projeto-pi-digitalhouse.herokuapp.com/eventos');
  let eventos = await response.json();
  
  listaEventos.innerHTML = '';


  eventos.forEach(evento => {

    eventoCard = `
    <section class="evento">
    <header>
      <h1>${evento.titulo}</h1>
      <button id="btnDelete">X</button>
    </header>
    <picture>
      <img src="${evento.imgUrl}" alt="Imagem" width="200px">
    </picture>
    <footer>
      <p>${evento.conteudo}</p>
    </footer>
  </section>
    `;

    listaEventos.innerHTML += eventoCard;

  });

  addExclusaoEvento(eventos);
}



async function getEventos() {
  let response = await fetch('https://projeto-pi-digitalhouse.herokuapp.com/eventos');
  let eventos = await response.json();

}

function addExclusaoEvento(eventos) {
  let btnDelete = document.querySelectorAll('#btnDelete');
  btnDelete.forEach(function(btn, index) {
    btn.addEventListener('click', async function() {
      let request = await fetch(`https://projeto-pi-digitalhouse.herokuapp.com/eventos/${eventos[index].id}`, {'method': 'DELETE'});
      receberComentario();

    });
  })
}

async function deletarEvento() {
  let request = await fetch('https://projeto-pi-digitalhouse.herokuapp.com/eventos', {'method': 'DELETE'});
}

btnEnviar.addEventListener('click', pegarComentario);

receberComentario();

