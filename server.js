import express from 'express';
import multer from 'multer';
import mammoth from 'mammoth';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

// Configurar uploads
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

// Rota para upload e conversão
app.post('/convert', upload.single('file'), async (req, res) => {
  const docxPath = req.file.path;

  try {
    // Converter DOCX → HTML
    const { value: html } = await mammoth.convertToHtml({ path: docxPath });

    // Gerar PDF com Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    // Enviar PDF como resposta
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=arquivo.pdf',
    });
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao converter o arquivo.');
  } finally {
    // Apagar o arquivo temporário
    fs.unlinkSync(docxPath);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});