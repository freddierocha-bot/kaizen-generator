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

    // ===== SLIDE ÚNICO - TEMPLATE KAIZEN =====
    let slide = pptx.addSlide();
    
    // Background branco
    slide.background = { color: 'FFFFFF' };
    
    // CABEÇALHO - Título principal
    slide.addText(titulo, {
      x: 0.5,
      y: 0.3,
      w: 12,
      h: 0.8,
      fontSize: 28,
      bold: true,
      color: '1F4E79',
      align: 'center',
      fontFace: 'Calibri'
    });
    
    // Setor
    slide.addText(`(${setor})`, {
      x: 0.5,
      y: 1.0,
      w: 12,
      h: 0.5,
      fontSize: 16,
      color: '1F4E79',
      align: 'center',
      fontFace: 'Calibri'
    });
    
    // Linha separadora azul
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: 1.6,
      w: 12,
      h: 0.1,
      fill: { color: '4472C4' }
    });

    // ===== SEÇÃO ANTES E DEPOIS =====
    
    // Título "COMO ERA?"
    slide.addText('COMO ERA?', {
      x: 0.8,
      y: 2.0,
      w: 5,
      h: 0.5,
      fontSize: 14,
      bold: true,
      color: '1F4E79',
      align: 'center',
      fontFace: 'Calibri'
    });
    
    // Caixa de imagem ANTES
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.8,
      y: 2.5,
      w: 5,
      h: 3,
      fill: { color: 'F2F2F2' },
      line: { color: '4472C4', width: 2 }
    });
    
    // Adicionar imagem ANTES se existir
    if (req.files && req.files.fotoAntes) {
      const imageAntes = req.files.fotoAntes[0];
      slide.addImage({
        data: `data:${imageAntes.mimetype};base64,${imageAntes.buffer.toString('base64')}`,
        x: 1.0,
        y: 2.7,
        w: 4.6,
        h: 2.6,
        sizing: { type: 'contain' }
      });
    }
    
    // Texto "antes" abaixo da imagem
    slide.addText('antes', {
      x: 0.8,
      y: 5.7,
      w: 5,
      h: 0.4,
      fontSize: 12,
      italic: true,
      color: '666666',
      align: 'center',
      fontFace: 'Calibri'
    });
    
    // Título "O QUE FOI FEITO?"
    slide.addText('O QUE FOI FEITO?', {
      x: 7.2,
      y: 2.0,
      w: 5,
      h: 0.5,
      fontSize: 14,
      bold: true,
      color: '1F4E79',
      align: 'center',
      fontFace: 'Calibri'
    });
    
    // Caixa de imagem DEPOIS
    slide.addShape(pptx.ShapeType.rect, {
      x: 7.2,
      y: 2.5,
      w: 5,
      h: 3,
      fill: { color: 'F2F2F2' },
      line: { color: '4472C4', width: 2 }
    });
    
    // Adicionar imagem DEPOIS se existir
    if (req.files && req.files.fotoDepois) {
      const imageDepois = req.files.fotoDepois[0];
      slide.addImage({
        data: `data:${imageDepois.mimetype};base64,${imageDepois.buffer.toString('base64')}`,
        x: 7.4,
        y: 2.7,
        w: 4.6,
        h: 2.6,
        sizing: { type: 'contain' }
      });
    }
    
    // Texto "depois" abaixo da imagem
    slide.addText('depois', {
      x: 7.2,
      y: 5.7,
      w: 5,
      h: 0.4,
      fontSize: 12,
      italic: true,
      color: '666666',
      align: 'center',
      fontFace: 'Calibri'
    });

    // ===== SEÇÃO DESCRIÇÕES =====
    
    // Descrição do ANTES (lado esquerdo)
    slide.addText(situacaoAntes, {
      x: 0.8,
      y: 6.3,
      w: 5,
      h: 1.5,
      fontSize: 10,
      color: '333333',
      align: 'left',
      valign: 'top',
      fontFace: 'Calibri',
      wrap: true
    });
    
    // Descrição do DEPOIS (lado direito)
    slide.addText(situacaoDepois, {
      x: 7.2,
      y: 6.3,
      w: 5,
      h: 1.5,
      fontSize: 10,
      color: '333333',
      align: 'left',
      valign: 'top',
      fontFace: 'Calibri',
      wrap: true
    });

    // ===== SIDEBAR DIREITA - GANHOS E INFORMAÇÕES =====
    
    // Título "CITE GANHOS / MELHORIAS"
    slide.addText('CITE GANHOS / MELHORIAS', {
      x: 13.0,
      y: 2.0,
      w: 3.5,
      h: 0.5,
      fontSize: 12,
      bold: true,
      color: '1F4E79',
      align: 'left',
      fontFace: 'Calibri'
    });
    
    // Lista de ganhos
    const ganhosLines = ganhos.split('\n').slice(0, 5); // Máximo 5 linhas
    ganhosLines.forEach((linha, index) => {
      slide.addText(`▶ ${linha}`, {
        x: 13.0,
        y: 2.6 + (index * 0.3),
        w: 3.5,
        h: 0.3,
        fontSize: 9,
        color: '333333',
        align: 'left',
        fontFace: 'Calibri'
      });
    });
    
    // Investimento
    slide.addText('INVESTIMENTOS', {
      x: 13.0,
      y: 4.3,
      w: 3.5,
      h: 0.4,
      fontSize: 11,
      bold: true,
      color: '1F4E79',
      align: 'center',
      fontFace: 'Calibri'
    });
    
    slide.addText(investimento, {
      x: 13.0,
      y: 4.8,
      w: 3.5,
      h: 0.6,
      fontSize: 10,
      color: '333333',
      align: 'center',
      fontFace: 'Calibri'
    });
    
    // Sugestão/Execução
    slide.addText('SUGESTÃO / EXECUÇÃO:', {
      x: 13.0,
      y: 5.6,
      w: 3.5,
      h: 0.4,
      fontSize: 11,
      bold: true,
      color: '1F4E79',
      align: 'center',
      fontFace: 'Calibri'
    });
    
    slide.addText(`Idealizador - ${idealizador}`, {
      x: 13.0,
      y: 6.1,
      w: 3.5,
      h: 0.4,
      fontSize: 9,
      color: '333333',
      align: 'left',
      fontFace: 'Calibri'
    });
    
    slide.addText(`Executante - ${executante}`, {
      x: 13.0,
      y: 6.5,
      w: 3.5,
      h: 0.4,
      fontSize: 9,
      color: '333333',
      align: 'left',
      fontFace: 'Calibri'
    });

    // ===== SEÇÃO INFERIOR - FOCO DO KAIZEN =====
    
    // Caixa azul "Foco do Kaizen"
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: 8.0,
      w: 2,
      h: 0.8,
      fill: { color: '4472C4' }
    });
    
    slide.addText('Foco do\nKaizen', {
      x: 0.5,
      y: 8.0,
      w: 2,
      h: 0.8,
      fontSize: 11,
      bold: true,
      color: 'FFFFFF',
      align: 'center',
      valign: 'middle',
      fontFace: 'Calibri'
    });
    
    // Lista de melhorias (lado esquerdo)
    const melhorias1 = [
      'Aumentar a produtividade em rotinas de maior valor agregado.',
      'Elevar o grau no que no fim do processo',
      'Aumentar a eficácia dos ativos operacionais.',
      'Aumentar a produtividade dos ativos operacionais'
    ];
    
    melhorias1.forEach((item, index) => {
      slide.addText(`• ${item}`, {
        x: 3.0,
        y: 8.2 + (index * 0.25),
        w: 4.5,
        h: 0.25,
        fontSize: 8,
        color: '333333',
        align: 'left',
        fontFace: 'Calibri'
      });
    });
    
    // Lista de melhorias (lado direito)
    const melhorias2 = [
      'Reduzir a necessidade de capital de giro via operações',
      'Reduzir financiamento via capital de terceiros',
      'Fortalecer as práticas de perdas sustentáveis.',
      'Aumentar o engajamento da força de trabalho'
    ];
    
    melhorias2.forEach((item, index) => {
      slide.addText(`• ${item}`, {
        x: 8.0,
        y: 8.2 + (index * 0.25),
        w: 4.5,
        h: 0.25,
        fontSize: 8,
        color: '333333',
        align: 'left',
        fontFace: 'Calibri'
      });
    });

    // Gerar o arquivo PPTX
    const pptxBuffer = await pptx.write('nodebuffer');
    
    // Configurar headers para download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
    res.setHeader('Content-Disposition', `attachment; filename="kaizen_${titulo.replace(/\s+/g, '_')}.pptx"`);
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
