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

    // ===== SLIDE 1: TÍTULO =====
    let slide1 = pptx.addSlide();
    
    // Background azul
    slide1.background = { color: '0052D4' };
    
    // Título principal
    slide1.addText('GERADOR DE KAIZEN', {
      x: 0.5,
      y: 2,
      w: 12,
      h: 1.5,
      fontSize: 48,
      bold: true,
      color: 'FFFFFF',
      align: 'center',
      fontFace: 'Arial'
    });
    
    // Subtítulo
    slide1.addText(titulo, {
      x: 0.5,
      y: 4,
      w: 12,
      h: 1,
      fontSize: 36,
      bold: true,
      color: 'FFFFFF',
      align: 'center',
      fontFace: 'Arial'
    });
    
    // Setor
    slide1.addText(`SETOR: ${setor}`, {
      x: 0.5,
      y: 5.5,
      w: 12,
      h: 0.8,
      fontSize: 24,
      color: 'FFFFFF',
      align: 'center',
      fontFace: 'Arial'
    });

    // ===== SLIDE 2: ANTES E DEPOIS =====
    let slide2 = pptx.addSlide();
    
    // Título do slide
    slide2.addText('SITUAÇÃO ANTES E DEPOIS', {
      x: 0.5,
      y: 0.5,
      w: 12,
      h: 1,
      fontSize: 32,
      bold: true,
      color: '0052D4',
      align: 'center',
      fontFace: 'Arial'
    });
    
    // Coluna ANTES
    slide2.addText('ANTES', {
      x: 0.5,
      y: 1.8,
      w: 5.5,
      h: 0.8,
      fontSize: 24,
      bold: true,
      color: 'FFFFFF',
      backgroundColor: 'D32F2F',
      align: 'center',
      fontFace: 'Arial'
    });
    
    slide2.addText(situacaoAntes, {
      x: 0.5,
      y: 2.8,
      w: 5.5,
      h: 2.5,
      fontSize: 14,
      color: '333333',
      align: 'left',
      valign: 'top',
      fontFace: 'Arial',
      margin: 0.2
    });
    
    // Adicionar imagem ANTES se existir
    if (req.files && req.files.fotoAntes) {
      const imageAntes = req.files.fotoAntes[0];
      slide2.addImage({
        data: `data:${imageAntes.mimetype};base64,${imageAntes.buffer.toString('base64')}`,
        x: 0.5,
        y: 5.5,
        w: 5.5,
        h: 2
      });
    }
    
    // Coluna DEPOIS
    slide2.addText('DEPOIS', {
      x: 7,
      y: 1.8,
      w: 5.5,
      h: 0.8,
      fontSize: 24,
      bold: true,
      color: 'FFFFFF',
      backgroundColor: '388E3C',
      align: 'center',
      fontFace: 'Arial'
    });
    
    slide2.addText(situacaoDepois, {
      x: 7,
      y: 2.8,
      w: 5.5,
      h: 2.5,
      fontSize: 14,
      color: '333333',
      align: 'left',
      valign: 'top',
      fontFace: 'Arial',
      margin: 0.2
    });
    
    // Adicionar imagem DEPOIS se existir
    if (req.files && req.files.fotoDepois) {
      const imageDepois = req.files.fotoDepois[0];
      slide2.addImage({
        data: `data:${imageDepois.mimetype};base64,${imageDepois.buffer.toString('base64')}`,
        x: 7,
        y: 5.5,
        w: 5.5,
        h: 2
      });
    }

    // ===== SLIDE 3: GANHOS E INVESTIMENTO =====
    let slide3 = pptx.addSlide();
    
    // Título do slide
    slide3.addText('RESULTADOS E INVESTIMENTO', {
      x: 0.5,
      y: 0.5,
      w: 12,
      h: 1,
      fontSize: 32,
      bold: true,
      color: '0052D4',
      align: 'center',
      fontFace: 'Arial'
    });
    
    // Ganhos
    slide3.addText('GANHOS OBTIDOS', {
      x: 0.5,
      y: 2,
      w: 12,
      h: 0.8,
      fontSize: 24,
      bold: true,
      color: 'FFFFFF',
      backgroundColor: '388E3C',
      align: 'center',
      fontFace: 'Arial'
    });
    
    slide3.addText(ganhos, {
      x: 0.5,
      y: 3,
      w: 12,
      h: 2.5,
      fontSize: 16,
      color: '333333',
      align: 'left',
      valign: 'top',
      fontFace: 'Arial',
      margin: 0.3
    });
    
    // Investimento
    slide3.addText('INVESTIMENTO', {
      x: 0.5,
      y: 5.8,
      w: 12,
      h: 0.8,
      fontSize: 24,
      bold: true,
      color: 'FFFFFF',
      backgroundColor: '0052D4',
      align: 'center',
      fontFace: 'Arial'
    });
    
    slide3.addText(investimento, {
      x: 0.5,
      y: 6.8,
      w: 12,
      h: 0.8,
      fontSize: 20,
      bold: true,
      color: '0052D4',
      align: 'center',
      fontFace: 'Arial'
    });

    // ===== SLIDE 4: EQUIPE =====
    let slide4 = pptx.addSlide();
    
    // Título do slide
    slide4.addText('EQUIPE RESPONSÁVEL', {
      x: 0.5,
      y: 0.5,
      w: 12,
      h: 1,
      fontSize: 32,
      bold: true,
      color: '0052D4',
      align: 'center',
      fontFace: 'Arial'
    });
    
    // Idealizador
    slide4.addText('IDEALIZADOR', {
      x: 1,
      y: 3,
      w: 5,
      h: 0.8,
      fontSize: 20,
      bold: true,
      color: '0052D4',
      align: 'center',
      fontFace: 'Arial'
    });
    
    slide4.addText(idealizador, {
      x: 1,
      y: 4,
      w: 5,
      h: 1,
      fontSize: 18,
      color: '333333',
      align: 'center',
      fontFace: 'Arial'
    });
    
    // Executante
    slide4.addText('EXECUTANTE', {
      x: 7,
      y: 3,
      w: 5,
      h: 0.8,
      fontSize: 20,
      bold: true,
      color: '0052D4',
      align: 'center',
      fontFace: 'Arial'
    });
    
    slide4.addText(executante, {
      x: 7,
      y: 4,
      w: 5,
      h: 1,
      fontSize: 18,
      color: '333333',
      align: 'center',
      fontFace: 'Arial'
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