const express = require('express');
const multer = require('multer');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const sharp = require('sharp');
const mammoth = require('mammoth');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Função para criar PDF de um arquivo de texto
const convertTextToPDF = (text, fileName) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(fileName));
  doc.text(text);
  doc.end();
};

// Função para criar PDF de uma imagem
const convertImageToPDF = async (imagePath, fileName) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(fileName));
  const imageBuffer = await sharp(imagePath).toBuffer();
  doc.image(imageBuffer);
  doc.end();
};

// Função para criar PDF de DOCX
const convertDocxToPDF = async (docxPath, fileName) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(fileName));

  const docxContent = await mammoth.extractRawText({ path: docxPath });
  doc.text(docxContent.value);
  doc.end();
};

// Função para criar PDF de HTML
const convertHTMLToPDF = async (htmlContent, fileName) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  await page.pdf({ path: fileName });
  await browser.close();
};

// Rota para upload de arquivo
app.post('/convert', upload.single('file'), async (req, res) => {
  const file = req.file;
  const ext = path.extname(file.originalname).toLowerCase();
  const outputFile = `output-${Date.now()}.pdf`;

  try {
    if (ext === '.txt') {
      const text = fs.readFileSync(file.path, 'utf8');
      convertTextToPDF(text, outputFile);
    } else if (ext === '.jpg' || ext === '.png') {
      convertImageToPDF(file.path, outputFile);
    } else if (ext === '.docx') {
      convertDocxToPDF(file.path, outputFile);
    } else if (ext === '.html') {
      const htmlContent = fs.readFileSync(file.path, 'utf8');
      convertHTMLToPDF(htmlContent, outputFile);
    } else {
      res.status(400).send('Formato de arquivo não suportado!');
      return;
    }

    res.download(outputFile, (err) => {
      if (err) {
        res.status(500).send('Erro ao enviar o arquivo PDF');
      }
      fs.unlinkSync(file.path); // Apaga o arquivo temporário
      fs.unlinkSync(outputFile); // Apaga o PDF gerado
    });
  } catch (error) {
    res.status(500).send('Erro ao processar o arquivo.');
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
