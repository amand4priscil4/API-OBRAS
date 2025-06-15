const nodemailer = require('nodemailer');

// Configurar transportador de email
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Função para enviar detalhes da obra por email
const enviarDetalhesObra = async (obra, emailDestino) => {
  try {
    const transporter = createTransporter();

    // Formatear datas para exibição
    const dataInicioFormatada = new Date(obra.dataInicio).toLocaleDateString('pt-BR');
    const dataFimFormatada = new Date(obra.dataFim).toLocaleDateString('pt-BR');

    // Template do email em HTML
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
          Detalhes da Obra
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2c3e50; margin-top: 0;">${obra.nome}</h3>
          
          <div style="margin: 15px 0;">
            <strong>Responsável:</strong> ${obra.responsavel}
          </div>
          
          <div style="margin: 15px 0;">
            <strong>Data de Início:</strong> ${dataInicioFormatada}
          </div>
          
          <div style="margin: 15px 0;">
            <strong>Data de Fim:</strong> ${dataFimFormatada}
          </div>
          
          <div style="margin: 15px 0;">
            <strong>Localização:</strong> 
            <br>Latitude: ${obra.localizacao.lat}
            <br>Longitude: ${obra.localizacao.long}
          </div>
          
          <div style="margin: 15px 0;">
            <strong>Descrição:</strong>
            <p style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #3498db;">
              ${obra.descricao}
            </p>
          </div>
        </div>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #e8f4fd; border-radius: 5px;">
          <p style="margin: 0; color: #2c3e50; font-size: 14px;">
            <strong>Sistema de Gestão de Obras</strong><br>
            Email enviado automaticamente em ${new Date().toLocaleString('pt-BR')}
          </p>
        </div>
      </div>
    `;

    // Configuração do email
    const mailOptions = {
      from: `"Sistema de Obras" <${process.env.EMAIL_USER}>`,
      to: emailDestino,
      subject: `Detalhes da Obra: ${obra.nome}`,
      html: htmlTemplate,
      text: `
        DETALHES DA OBRA
        
        Nome: ${obra.nome}
        Responsável: ${obra.responsavel}
        Data de Início: ${dataInicioFormatada}
        Data de Fim: ${dataFimFormatada}
        Localização: Lat ${obra.localizacao.lat}, Long ${obra.localizacao.long}
        
        Descrição:
        ${obra.descricao}
        
        ---
        Sistema de Gestão de Obras
        ${new Date().toLocaleString('pt-BR')}
      `
    };

    // Enviar email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email enviado:', info.messageId);
    return {
      success: true,
      messageId: info.messageId,
      message: 'Email enviado com sucesso'
    };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return {
      success: false,
      error: error.message,
      message: 'Erro ao enviar email'
    };
  }
};

// Função para testar a configuração de email
const testarConfiguracaoEmail = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('Configuração de email está funcionando!');
    return true;
  } catch (error) {
    console.error('Erro na configuração de email:', error.message);
    return false;
  }
};

module.exports = {
  enviarDetalhesObra,
  testarConfiguracaoEmail
};
