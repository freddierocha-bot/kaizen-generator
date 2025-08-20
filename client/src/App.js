import React, { useState } from 'react';
import './styles/global.css';

export default function App() {
  const [formData, setFormData] = useState({
    titulo: '',
    setor: '',
    situacaoAntes: '',
    fotoAntes: null,
    situacaoDepois: '',
    fotoDepois: null,
    ganhos: '',
    investimento: '',
    idealizador: '',
    executante: '',
  });

  const [previewAntes, setPreviewAntes] = useState(null);
  const [previewDepois, setPreviewDepois] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });

      if (name === 'fotoAntes') {
        setPreviewAntes(URL.createObjectURL(file));
      } else if (name === 'fotoDepois') {
        setPreviewDepois(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('titulo', formData.titulo);
    data.append('setor', formData.setor);
    data.append('situacaoAntes', formData.situacaoAntes);
    if (formData.fotoAntes) data.append('fotoAntes', formData.fotoAntes);
    data.append('situacaoDepois', formData.situacaoDepois);
    if (formData.fotoDepois) data.append('fotoDepois', formData.fotoDepois);
    data.append('ganhos', formData.ganhos);
    data.append('investimento', formData.investimento);
    data.append('idealizador', formData.idealizador);
    data.append('executante', formData.executante);

    try {
      const response = await fetch('https://kaizen-generator-sweg.onrender.com/api/generate-pptx', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar o arquivo PPTX');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'apresentacao.pptx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="app-container">
      <div className="main-card">
        <div className="header-section">
          <h1 className="main-title">GERADOR DE KAIZEN</h1>
          <p className="subtitle">Crie a apresentação da sua melhoria realizada</p>
        </div>
        
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form-grid">
            {/* Título e Setor */}
            <div className="grid-row">
              <div className="input-group">
                <label className="input-label">Título do Kaizen</label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Digite o título do seu projeto Kaizen"
                />
              </div>
              
              <div className="input-group">
                <label className="input-label">Setor</label>
                <input
                  type="text"
                  name="setor"
                  value={formData.setor}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Ex: Produção, Qualidade, Logística"
                />
              </div>
            </div>

            {/* Situação Antes e Foto */}
            <div className="grid-section">
              <div className="input-group">
                <label className="input-label">Situação Antes</label>
                <textarea
                  name="situacaoAntes"
                  value={formData.situacaoAntes}
                  onChange={handleChange}
                  required
                  className="textarea-field"
                  placeholder="Descreva detalhadamente como era a situação antes da melhoria..."
                />
              </div>
              
              <div className="photo-input-group">
                <label className="input-label">Foto Antes</label>
                <div className="file-input-container">
                  <input
                    type="file"
                    name="fotoAntes"
                    accept="image/*"
                    onChange={handleChange}
                    className="file-input-hidden"
                    id="fotoAntes"
                  />
                  <label htmlFor="fotoAntes" className="file-input-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" fill="currentColor"/>
                    </svg>
                    {formData.fotoAntes ? 'Foto selecionada' : 'Selecionar foto'}
                  </label>
                </div>
                {previewAntes && (
                  <div className="image-preview">
                    <img src={previewAntes} alt="Preview Antes" className="preview-image" />
                  </div>
                )}
              </div>
            </div>

            {/* Situação Depois e Foto */}
            <div className="grid-section">
              <div className="input-group">
                <label className="input-label">Situação Depois</label>
                <textarea
                  name="situacaoDepois"
                  value={formData.situacaoDepois}
                  onChange={handleChange}
                  required
                  className="textarea-field"
                  placeholder="Descreva como ficou a situação após a implementação da melhoria..."
                />
              </div>
              
              <div className="photo-input-group">
                <label className="input-label">Foto Depois</label>
                <div className="file-input-container">
                  <input
                    type="file"
                    name="fotoDepois"
                    accept="image/*"
                    onChange={handleChange}
                    className="file-input-hidden"
                    id="fotoDepois"
                  />
                  <label htmlFor="fotoDepois" className="file-input-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" fill="currentColor"/>
                    </svg>
                    {formData.fotoDepois ? 'Foto selecionada' : 'Selecionar foto'}
                  </label>
                </div>
                {previewDepois && (
                  <div className="image-preview">
                    <img src={previewDepois} alt="Preview Depois" className="preview-image" />
                  </div>
                )}
              </div>
            </div>

            {/* Ganhos */}
            <div className="input-group">
              <label className="input-label">Ganhos Obtidos</label>
              <textarea
                name="ganhos"
                value={formData.ganhos}
                onChange={handleChange}
                required
                className="textarea-field"
                placeholder="Descreva os benefícios, economias, melhorias de qualidade, redução de tempo, etc..."
              />
            </div>

            {/* Investimento */}
            <div className="input-group">
              <label className="input-label">Investimento Realizado</label>
              <input
                type="text"
                name="investimento"
                value={formData.investimento}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Ex: R$ 5.000,00 ou Sem investimento"
              />
            </div>

            {/* Equipe */}
            <div className="grid-row">
              <div className="input-group">
                <label className="input-label">Idealizador</label>
                <input
                  type="text"
                  name="idealizador"
                  value={formData.idealizador}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Nome de quem teve a ideia"
                />
              </div>
              
              <div className="input-group">
                <label className="input-label">Executante</label>
                <input
                  type="text"
                  name="executante"
                  value={formData.executante}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Nome de quem executou"
                />
              </div>
            </div>

            <button type="submit" className="submit-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '12px'}}>
                <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="currentColor"/>
                <path d="M8 15.01L8.01 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Gerar Apresentação
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
