import nodemailer from "nodemailer";

const emailSender = async (datos) => {
  console.log("Datos: ", datos);

  const { email, name } = datos;
  console.log(datos);

  const transport = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
      user: "rmttck@outlook.com",
      pass: "mati156489",
    },
  });
  
    await transport.sendMail({
      from: '"CESFAM" <rmttck@outlook.com>',
      to: datos,
      subject: "Medicamentos Listos para su entrega",
      text: "¡Es hora de retirar tus medicamentos!",
      html: `<p>Hola! Tus medicamentos estan listos para su retiro.</p>
          <p>¡Te esperamos!</p>
          <p>CESFAM</p>
          `,
    });
  
  
};

export default emailSender;
