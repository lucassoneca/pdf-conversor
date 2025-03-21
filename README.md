# DOCX to PDF Converter

Este projeto permite a conversão de arquivos **DOCX** para **PDF** de forma simples e eficiente, usando **Node.js** no back-end. Ele oferece uma interface de upload de arquivos, onde os usuários podem facilmente converter seus documentos DOCX para PDF.

## Funcionalidades

- **Upload de arquivos DOCX**: Os usuários podem fazer o upload de arquivos DOCX para conversão.
- **Conversão automática para PDF**: Assim que o arquivo é enviado, o processo de conversão para PDF é realizado automaticamente.
- **Download imediato**: O PDF gerado estará disponível para download assim que a conversão for concluída.

## Tecnologias Usadas

- **Node.js**: Plataforma JavaScript para o back-end.
- **Express.js**: Framework web para Node.js.
- **Multer**: Middleware para upload de arquivos.
- **Mammoth.js**: Para conversão de arquivos DOCX para texto.
- **PDFKit**: Para gerar PDFs.
- **HTML/CSS**: Para a interface de usuário simples.

## Como Executar Localmente

### Requisitos

- **Node.js**: Certifique-se de ter o Node.js instalado em sua máquina. A versão recomendada é a 16 ou superior.
- **NPM**: Usado para instalar as dependências do projeto.

### Passos para Configuração

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/docx-to-pdf-saas.git
   cd docx-to-pdf-saas

2. **Instale as dependências:**
    no diretório do projeto, execute:  
        npm install   

3. **Inicie o servidor:**   
    npm start  
    Isso iniciará o servidor na porta 3000. Acesse a aplicação no navegador em http://localhost:3000.  

# Como usar:  
1. **Acesse a Interface Web:**
    Vá para http://localhost:3000 em seu navegador.  

2. **Carregue o Arquivo DOCX:**  
    Clique no botão Escolher Arquivo e selecione o arquivo .docx que você deseja converter.  

3. **Converta o Arquivo:**    

Após o upload, o arquivo será automaticamente convertido para PDF.  

3. **Baixe o Arquivo PDF:**  

Após a conversão, um link será exibido para que você possa baixar o arquivo PDF gerado.  

# Contato  
 **Autor: Lucas Bezerra da Cruz**
 **Email: lucasbezerracrz@gmail.com**