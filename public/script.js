// Função para mostrar o nome do arquivo escolhido
function updateFileName(event) {
    const fileName = event.target.files[0] ? event.target.files[0].name : 'Nenhum arquivo escolhido';
    document.getElementById('file-name').textContent = `Arquivo escolhido: ${fileName}`;
  }  