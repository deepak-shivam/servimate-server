const nodemailer = require('nodemailer');


const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    }
})



console.log("",process.env.GMAIL_USERNAME)
console.log("",process.env.GMAIL_PASSWORD)
const sendMail = async (email, secretToken, mode) => {
    try {
        if (mode == 'OTP') {
            
            return await transport.sendMail({
                from: process.env.GMAIL_USERNAME,
                to: email,
                subject: "OTP Submission",
                html: `
        <h1>Reset Password</h1>
        <p> Here is your otp to change the password ${secretToken} </p>
      `
            },(err, info)=>{
                if(err){
                    console.log("Error in nodemailer", err)
                    throw err
                }
                else{
                    console.log("message sent", info.response)
                }

            })
        }
    } catch (err) {
        console.log("Error in sending mail",err.message);
        throw err;
    }
};

module.exports = sendMail  