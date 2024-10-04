import nodemailer from "nodemailer"



const sendVerificationEmail = async (recieverEmail, fullName, verificationLink) => {

    const transport = nodemailer.createTransport(
        {
            service: 'gmail',  // Use 'gmail', 'outlook', or any email service
            auth: {
                user: `${process.env.GMAIL}`, // Your email
                pass:  `${process.env.GMAIL_PASSWORD}` // Your email password or App password
            }
        }
    )

    console.log(process.env.GMAIL)
    console.log(process.env.GMAIL_PASSWORD)

    transport.sendMail(
        {
            from: process.env.GMAIL,
            to: recieverEmail,
            subject: 'Welcome to CodeTogether',
            html: `
             <h1 style="color: #333333;">Welcome, ${fullName}!</h1>
                <p style="color: #555555;">Thank you for signing up for CodeTogether. Please verify your email address to complete your registration.</p>
                <a href="${verificationLink}" style="display: inline-block; background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px;">Verify Email</a>
                <p style="color: #555555;">You need to verify this within 24 hours, otherwise, you will have to register again.</p>
                <p style="color: #555555;">Best Regards,<br>The CodeTogether Team</p>
                <p style="font-size: 12px; color: #888888; margin-top: 20px;">If you did not request this email, please ignore it.</p>
            `
        }, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
}

export { sendVerificationEmail }