import nodemailer from 'nodemailer';

const email = async (datos) => {
    console.log("Datos: ",datos);

        const {email, name, token} = datos;

            const transport = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                user: "e439f541e18d61",
                pass: "bad0f1f634ffaa"
                }
            });
    // Informacion de email
    const info = await transport.sendMail({
        from: '"UpTask - administrador de proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "Uptask - comprueba tu cuenta",
        text: "Comprueba tu cuenta en uptask",
        html: `<p>Hola: ${datos.name} comprueba tu cuenta en uptask</p>
        <p>tu cuenta blablabla</p>
        <a href="dominio.com/confirmar/${token}">Comprobar cuenta</a>
        <p>Si tu no creaste esta cuenta por favor ignorar el mensaje</p>
        `,
              
    })
};

export default email;