

async function listarLocalidades() {
  let response = await fetch('https://projeto-pi-digitalhouse.herokuapp.com/posts');
  let posts = await response.json();
  console.log(posts);
}

 listarLocalidades();