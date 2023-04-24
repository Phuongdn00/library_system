const nodemailer= require("nodemailer")

// create nodemailer transporter object with gmail service and authentication
const transporter= nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "thuvienfudn@gmail.com",
        pass: "wyxiaiqdiyzgxlfg"
    }
})


// define function to send verification email
const verifyMail= async (email, code)=> {
    try {
        // send email with specified content to specified email address
        const result= await transporter.sendMail({from: "thuvienfudn@gmail.com", to: email, subject: "Verify your email", text: "Your code is: "+ code})
        return result
        
    } catch (error) {
        return error
    }
}

module.exports= verifyMail
