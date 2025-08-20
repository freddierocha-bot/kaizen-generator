// Utilitários para o projeto

/**
 * Valida se todos os campos obrigatórios foram preenchidos
 */
export const validateRequiredFields = (data, requiredFields) => {
  const missingFields = [];
  
  requiredFields.forEach(field => {
    if (!data[field] || data[field].trim() === '') {
      missingFields.push(field);
    }
  });
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  };
};

/**
 * Sanitiza nome de arquivo removendo caracteres especiais
 */
export const sanitizeFilename = (filename) => {
  return filename
    .replace(/[^a-zA-Z0-9\s-_]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '_') // Substitui espaços por underscore
    .toLowerCase(); // Converte para minúsculo
};

/**
 * Formata data para string legível
 */
export const formatDate = (date = new Date()) => {
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Valida se o arquivo é uma imagem válida
 */
export const isValidImage = (file) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  return {
    isValid: allowedTypes.includes(file.mimetype) && file.size <= maxSize,
    error: !allowedTypes.includes(file.mimetype) 
      ? 'Tipo de arquivo não suportado. Use apenas JPEG, PNG ou GIF.'
      : file.size > maxSize 
        ? 'Arquivo muito grande. Máximo 5MB.'
        : null
  };
};