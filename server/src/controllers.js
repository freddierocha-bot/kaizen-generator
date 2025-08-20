import PptxGenJS from 'pptxgenjs';

export const generatePPTX = async (req, res) => {
  try {
    const {
      titulo,
      setor,
      situacaoAntes,
      situacaoDepois,
      ganhos,
      investimento,
      idealizador,
      executante
    } = req.body;

    // Validação dos campos obrigatórios
    if (!titulo || !setor || !situacaoAntes || !situacaoDepois || !ganhos || !investimento || !idealizador || !executante) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Criar nova apresentação
    let pptx = new PptxGenJS();
    
    // Configurações globais
    pptx.layout = 'LAYOUT_16x9';

    // ===== SLIDE ÚNICO - TEMPLATE KAIZEN EXATO =====
    let slide = pptx.addSlide();
    
    // Background branco
    slide.background = { color: 'FFFFFF' };
    
    // ===== CABEÇALHO COM BORDAS AZUIS =====
    // Borda azul superior
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: 0.3,
      w: 9.0,
      h: 0.08,
      fill: { color: '4472C4' }
    });
    
    // Bordas azuis laterais
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: 0.3,
      w: 0.08,
      h: 1.0,
      fill: { color: '4472C4' }
    });
    
    slide.addShape(pptx.ShapeType.rect, {
      x: 9.42,
      y: 0.3,
      w: 0.08,
      h: 1.0,
      fill: { color: '4472C4' }
    });
    
    // Título principal
    slide.addText(titulo.toUpperCase(), {
      x: 0.6,
      y: 0.45,
      w: 8.8,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: '000000',
      align: 'center',
      fontFace: 'Calibri'
    });
    
    // Setor
    slide.addText(setor.toUpperCase(), {
      x: 0.6,
      y: 0.85,
      w: 8.8,
      h: 0.3,
      fontSize: 11,
      color: '000000',
      align: 'left',
      fontFace: 'Calibri'
    });
    
    // Linha separadora azul principal
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: 1.3,
      w: 9.0,
      h: 0.08,
      fill: { color: '4472C4' }
    });

    // ===== SEÇÃO ANTES E DEPOIS COM CAIXAS AZUIS =====
    
    // Caixa ANTES com borda azul
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.8,
      y: 1.6,
      w: 2.8,
      h: 2.2,
      fill: { color: 'FFFFFF' },
      line: { color: '4472C4', width: 2 }
    });
    
    // Adicionar imagem ANTES se existir, senão mostrar placeholder
    if (req.files && req.files.fotoAntes) {
      const imageAntes = req.files.fotoAntes[0];
      slide.addImage({
        data: `data:${imageAntes.mimetype};base64,${imageAntes.buffer.toString('base64')}`,
        x: 0.85,
        y: 1.65,
        w: 2.7,
        h: 2.1,
        sizing: { type: 'contain' }
      });
    } else {
      slide.addText('Não é possível exibir esta imagem.', {
        x: 0.9,
        y: 2.6,
        w: 2.6,
        h: 0.4,
        fontSize: 10,
        color: '666666',
        align: 'center',
        valign: 'middle',
        fontFace: 'Calibri'
      });
    }
    
    // Título "COMO ERA?"
    slide.addText('COMO ERA?', {
      x: 0.8,
      y: 3.9,
      w: 2.8,
      h: 0.3,
      fontSize: 11,
      bold: true,
      color: '000000',
      align: 'center',
      fontFace: 'Calibri'
    });
    
    // Caixa DEPOIS com borda azul
    slide.addShape(pptx.ShapeType.rect, {
      x: 4.0,
      y: 1.6,
      w: 2.8,
      h: 2.2,
      fill: { color: 'FFFFFF' },
      line: { color: '4472C4', width: 2 }
    });
    
    // Adicionar imagem DEPOIS se existir, senão mostrar placeholder
    if (req.files && req.files.fotoDepois) {
      const imageDepois = req.files.fotoDepois[0];
      slide.addImage({
        data: `data:${imageDepois.mimetype};base64,${imageDepois.buffer.toString('base64')}`,
        x: 4.05,
        y: 1.65,
        w: 2.7,
        h: 2.1,
        sizing: { type: 'contain' }
      });
    } else {
      slide.addText('Não é possível exibir esta imagem.', {
        x: 4.1,
        y: 2.6,
        w: 2.6,
        h: 0.4,
        fontSize: 10,
        color: '666666',
        align: 'center',
        valign: 'middle',
        fontFace: 'Calibri'
      });
    }
    
    // Título "O QUE FOI FEITO?"
    slide.addText('O QUE FOI FEITO?', {
      x: 4.0,
      y: 3.9,
      w: 2.8,
      h: 0.3,
      fontSize: 11,
      bold: true,
      color: '000000',
      align: 'center',
      fontFace: 'Calibri'
    });

    // ===== DESCRIÇÕES EMBAIXO DAS CAIXAS =====
    
    // Descrição do ANTES
    slide.addText(situacaoAntes, {
      x: 0.8,
      y: 4.3,
      w: 2.8,
      h: 1.2,
      fontSize: 8,
      color: '000000',
      align: 'left',
      valign: 'top',
      fontFace: 'Calibri',
      wrap: true
    });
    
    // Descrição do DEPOIS
    slide.addText(situacaoDepois, {
      x: 4.0,
      y: 4.3,
      w: 2.8,
      h: 1.2,
      fontSize: 8,
      color: '000000',
      align: 'left',
      valign: 'top',
      fontFace: 'Calibri',
      wrap: true
    });

    // ===== SIDEBAR DIREITA - GANHOS E INFORMAÇÕES =====
    
    // Título "CITE GANHOS / MELHORIAS"
    slide.addText('CITE GANHOS / MELHORIAS', {
      x: 7.2,
      y: 1.6,
      w: 2.8,
      h: 0.3,
      fontSize: 10,
      bold: true,
      color: '000000',
      align: 'left',
      fontFace: 'Calibri'
    });
    
    // Lista de ganhos com setas
    const ganhosLines = ganhos.split('\n').slice(0, 6);
    ganhosLines.forEach((linha, index) => {
      if (linha.trim()) {
        slide.addText(`▶ ${linha.trim()}`, {
          x: 7.3,
          y: 2.0 + (index * 0.25),
          w: 2.6,
          h: 0.23,
          fontSize: 8,
          color: '000000',
          align: 'left',
          fontFace: 'Calibri'
        });
      }
    });
    
    // Investimentos
    slide.addText('INVESTIMENTOS', {
      x: 7.2,
      y: 3.8,
      w: 2.8,
      h: 0.3,
      fontSize: 10,
      bold: true,
      color: '000000',
      align: 'center',
      fontFace: 'Calibri'
    });
    
    slide.addText(investimento, {
      x: 7.2,
      y: 4.1,
      w: 2.8,
      h: 0.4,
      fontSize: 9,
      color: '000000',
      align: 'center',
      fontFace: 'Calibri'
    });
    
    // Sugestão/Execução
    slide.addText('SUGESTÃO / EXECUÇÃO:', {
      x: 7.2,
      y: 4.7,
      w: 2.8,
      h: 0.3,
      fontSize: 10,
      bold: true,
      color: '000000',
      align: 'left',
      fontFace: 'Calibri'
    });
    
    slide.addText(`Idealizador - ${idealizador}`, {
      x: 7.2,
      y: 5.0,
      w: 2.8,
      h: 0.25,
      fontSize: 8,
      color: '000000',
      align: 'left',
      fontFace: 'Calibri'
    });
    
    slide.addText(`Executante - ${executante}`, {
      x: 7.2,
      y: 5.3,
      w: 2.8,
      h: 0.25,
      fontSize: 8,
      color: '000000',
      align: 'left',
      fontFace: 'Calibri'
    });

    // ===== SEÇÃO INFERIOR - FOCO DO KAIZEN =====
    
    // Caixa azul "Foco do Kaizen"
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: 5.8,
      w: 1.2,
      h: 0.8,
      fill: { color: '4472C4' }
    });
    
    slide.addText('Foco do\nKaizen', {
      x: 0.5,
      y: 5.8,
      w: 1.2,
      h: 0.8,
      fontSize: 9,
      bold: true,
      color: 'FFFFFF',
      align: 'center',
      valign: 'middle',
      fontFace: 'Calibri'
    });
    
    // Lista de melhorias (lado esquerdo)
    const melhorias1 = [
      'Aumentar a participação em nichos de maior valor agregado;',
      'Elevar o ganho operacional de mix de produtos;',
      'Aumentar a eficácia dos ativos operacionais;',
      'Aumentar a produtividade dos ativos operacionais'
    ];
    
    melhorias1.forEach((item, index) => {
      slide.addText(`• ${item}`, {
        x: 1.8,
        y: 5.9 + (index * 0.18),
        w: 3.8,
        h: 0.16,
        fontSize: 7,
        color: '000000',
        align: 'left',
        fontFace: 'Calibri'
      });
    });
    
    // Lista de melhorias (lado direito)
    const melhorias2 = [
      'Reduzir a necessidade de capital de giro na operação;',
      'Reduzir financiamento via capital de terceiros;',
      'Fortalecer as práticas de gestão sustentáveis;',
      'Aumentar o engajamento da força de trabalho'
    ];
    
    melhorias2.forEach((item, index) => {
      slide.addText(`• ${item}`, {
        x: 5.8,
        y: 5.9 + (index * 0.18),
        w: 3.8,
        h: 0.16,
        fontSize: 7,
        color: '000000',
        align: 'left',
        fontFace: 'Calibri'
      });
    });

    // Gerar o arquivo PPTX
    const pptxBuffer = await pptx.write('nodebuffer');
    
    // Configurar headers para download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
    res.setHeader('Content-Disposition', `attachment; filename="${titulo.replace(/[^a-zA-Z0-9]/g, '_')}.pptx"`);
    res.setHeader('Content-Length', pptxBuffer.length);
    
    // Enviar o arquivo
    res.send(pptxBuffer);
    
  } catch (error) {
    console.error('Erro ao gerar PPTX:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor ao gerar PPTX',
      details: error.message 
    });
  }
};
