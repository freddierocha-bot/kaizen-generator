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
      x: 0.2,
      y: 0.2,
      w: 12.6,
      h: 0.1,
      fill: { color: '4472C4' }
    });
    
    // Bordas azuis laterais
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.2,
      y: 0.2,
      w: 0.1,
      h: 1.3,
      fill: { color: '4472C4' }
    });
    
    slide.addShape(pptx.ShapeType.rect, {
      x: 12.7,
      y: 0.2,
      w: 0.1,
      h: 1.3,
      fill: { color: '4472C4' }
    });
    
    // Título principal
    slide.addText(`(TÍTULO KAIZEN ${titulo.toUpperCase()})`, {
      x: 0.4,
      y: 0.4,
      w: 12.2,
      h: 0.6,
      fontSize: 18,
      bold: true,
      color: '000000',
      align: 'center',
      fontFace: 'Calibri'
    });
    
    // Setor
    slide.addText(`(SETOR ${setor.toUpperCase()})`, {
      x: 0.4,
      y: 0.9,
      w: 12.2,
      h: 0.4,
      fontSize: 12,
      color: '000000',
      align: 'left',
      fontFace: 'Calibri'
    });
    
    // Linha separadora azul principal
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.2,
      y: 1.4,
      w: 12.6,
      h: 0.1,
      fill: { color: '4472C4' }
    });

    // ===== SEÇÃO ANTES E DEPOIS COM CAIXAS AZUIS =====
    
    // Caixa ANTES com borda azul
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.7,
      y: 1.8,
      w: 3.6,
      h: 2.8,
      fill: { color: 'FFFFFF' },
      line: { color: '4472C4', width: 3 }
    });
    
    // Texto dentro da caixa ANTES
    slide.addText('Aqui vem a\nfoto o antes\n— dentro do\nquadrado\nazul.', {
      x: 0.9,
      y: 2.5,
      w: 3.2,
      h: 1.5,
      fontSize: 14,
      color: '000000',
      align: 'center',
      valign: 'middle',
      fontFace: 'Calibri'
    });
    
    // Adicionar imagem ANTES se existir
    if (req.files && req.files.fotoAntes) {
      const imageAntes = req.files.fotoAntes[0];
      slide.addImage({
        data: `data:${imageAntes.mimetype};base64,${imageAntes.buffer.toString('base64')}`,
        x: 0.8,
        y: 1.9,
        w: 3.4,
        h: 2.6,
        sizing: { type: 'contain' }
      });
    }
    
    // Título "COMO ERA?"
    slide.addText('COMO ERA?', {
      x: 0.7,
      y: 4.7,
      w: 3.6,
      h: 0.4,
      fontSize: 12,
      bold: true,
      color: '000000',
      align: 'center',
      fontFace: 'Calibri'
    });
    
    // Caixa DEPOIS com borda azul
    slide.addShape(pptx.ShapeType.rect, {
      x: 4.8,
      y: 1.8,
      w: 3.6,
      h: 2.8,
      fill: { color: 'FFFFFF' },
      line: { color: '4472C4', width: 3 }
    });
    
    // Texto dentro da caixa DEPOIS
    slide.addText('Aqui vem a foto\ndo depois —\ndentro do\nquadrado azul', {
      x: 5.0,
      y: 2.5,
      w: 3.2,
      h: 1.5,
      fontSize: 14,
      color: '000000',
      align: 'center',
      valign: 'middle',
      fontFace: 'Calibri'
    });
    
    // Adicionar imagem DEPOIS se existir
    if (req.files && req.files.fotoDepois) {
      const imageDepois = req.files.fotoDepois[0];
      slide.addImage({
        data: `data:${imageDepois.mimetype};base64,${imageDepois.buffer.toString('base64')}`,
        x: 4.9,
        y: 1.9,
        w: 3.4,
        h: 2.6,
        sizing: { type: 'contain' }
      });
    }
    
    // Título "O QUE FOI FEITO?"
    slide.addText('O QUE FOI FEITO?', {
      x: 4.8,
      y: 4.7,
      w: 3.6,
      h: 0.4,
      fontSize: 12,
      bold: true,
      color: '000000',
      align: 'center',
      fontFace: 'Calibri'
    });

    // ===== DESCRIÇÕES EMBAIXO DAS CAIXAS =====
    
    // Descrição do ANTES
    slide.addText(`(Descrição do antes\n${situacaoAntes})`, {
      x: 0.7,
      y: 5.2,
      w: 3.6,
      h: 1.5,
      fontSize: 9,
      color: '000000',
      align: 'left',
      valign: 'top',
      fontFace: 'Calibri',
      wrap: true
    });
    
    // Descrição do DEPOIS
    slide.addText(`(Descrição do depois\n${situacaoDepois})`, {
      x: 4.8,
      y: 5.2,
      w: 3.6,
      h: 1.5,
      fontSize: 9,
      color: '000000',
      align: 'left',
      valign: 'top',
      fontFace: 'Calibri',
      wrap: true
    });

    // ===== SIDEBAR DIREITA - GANHOS E INFORMAÇÕES =====
    
    // Título "CITE GANHOS / MELHORIAS"
    slide.addText('CITE GANHOS / MELHORIAS', {
      x: 9.0,
      y: 1.8,
      w: 3.8,
      h: 0.4,
      fontSize: 11,
      bold: true,
      color: '000000',
      align: 'left',
      fontFace: 'Calibri'
    });
    
    // Lista de ganhos com setas
    const ganhosLines = ganhos.split('\n').slice(0, 4);
    ganhosLines.forEach((linha, index) => {
      slide.addText(`▶ Ganhoossss`, {
        x: 9.1,
        y: 2.3 + (index * 0.25),
        w: 3.6,
        h: 0.23,
        fontSize: 8,
        color: '000000',
        align: 'left',
        fontFace: 'Calibri'
      });
    });
    
    // Texto adicional de ganhos
    slide.addText(`▶ ${ganhos.substring(0, 100)}...`, {
      x: 9.1,
      y: 3.3,
      w: 3.6,
      h: 0.8,
      fontSize: 8,
      color: '000000',
      align: 'left',
      fontFace: 'Calibri',
      wrap: true
    });
    
    // Investimentos
    slide.addText('INVESTIMENTOS', {
      x: 9.0,
      y: 4.3,
      w: 3.8,
      h: 0.3,
      fontSize: 10,
      bold: true,
      color: '000000',
      align: 'center',
      fontFace: 'Calibri'
    });
    
    slide.addText(investimento, {
      x: 9.0,
      y: 4.7,
      w: 3.8,
      h: 0.5,
      fontSize: 9,
      color: '000000',
      align: 'center',
      fontFace: 'Calibri'
    });
    
    // Sugestão/Execução
    slide.addText('SUGESTÃO / EXECUÇÃO:', {
      x: 9.0,
      y: 5.4,
      w: 3.8,
      h: 0.3,
      fontSize: 10,
      bold: true,
      color: '000000',
      align: 'left',
      fontFace: 'Calibri'
    });
    
    slide.addText(`Idealizador - ${idealizador}`, {
      x: 9.0,
      y: 5.8,
      w: 3.8,
      h: 0.3,
      fontSize: 9,
      color: '000000',
      align: 'left',
      fontFace: 'Calibri'
    });
    
    slide.addText(`Executante - ${executante}`, {
      x: 9.0,
      y: 6.1,
      w: 3.8,
      h: 0.3,
      fontSize: 9,
      color: '000000',
      align: 'left',
      fontFace: 'Calibri'
    });

    // ===== SEÇÃO INFERIOR - FOCO DO KAIZEN =====
    
    // Caixa azul "Foco do Kaizen"
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.2,
      y: 7.0,
      w: 1.5,
      h: 1.0,
      fill: { color: '4472C4' }
    });
    
    slide.addText('Foco do\nKaizen', {
      x: 0.2,
      y: 7.0,
      w: 1.5,
      h: 1.0,
      fontSize: 10,
      bold: true,
      color: 'FFFFFF',
      align: 'center',
      valign: 'middle',
      fontFace: 'Calibri'
    });
    
    // Lista de melhorias (lado esquerdo)
    const melhorias1 = [
      'Aumentar a participação em nichos de maior valor agregado;',
      'Elevar o ganho operacional de mix de produtos',
      'Aumentar a eficácia dos ativos operacionais;',
      'Aumentar a produtividade dos ativos operacionais'
    ];
    
    melhorias1.forEach((item, index) => {
      slide.addText(`• ${item}`, {
        x: 1.9,
        y: 7.1 + (index * 0.22),
        w: 4.5,
        h: 0.2,
        fontSize: 8,
        color: '000000',
        align: 'left',
        fontFace: 'Calibri'
      });
    });
    
    // Lista de melhorias (lado direito)
    const melhorias2 = [
      'Reduzir a necessidade de capital de giro na operação;',
      'Reduzir financiamento via capital de terceiros',
      'Fortalecer as práticas de gestão sustentáveis;',
      'Aumentar o engajamento da força de trabalho'
    ];
    
    melhorias2.forEach((item, index) => {
      slide.addText(`• ${item}`, {
        x: 6.8,
        y: 7.1 + (index * 0.22),
        w: 4.5,
        h: 0.2,
        fontSize: 8,
        color: '000000',
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
