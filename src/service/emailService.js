require('dotenv').config();
import { reject } from 'lodash';
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"NMT" <nguyentuongtnct2001@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh ✔", // Subject line
        html: getBodyHTMLEmail(dataSend) // html body
    });
}

let getBodyHTMLEmail = (dataSend) => {

    let result = ''

    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}</h3>
        <p>Bạn nhận được email vì đã đặt lịch khám bệnh online trên NMT</p>
        <p>Thông tin đặt lịch khám bệnh :</p>
        <div><b>Thời gian : ${dataSend.time}</b></div>
        <div><b>Bác sĩ : ${dataSend.doctorName}</b></div>

        <p>
            Vui lòng click vào đường link bên dưới để xác nhận và hoàn tất
        thủ tục đặt lịch khám bệnh.
        </p>

        <div> 
        <a href='${dataSend.redirectLink} target="_blank"'>Xác nhận đặt lịch hoàn tất</a>
        
        </div>
        <div>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</>
        `
    }

    if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}</h3>
        <p>You received an email because you booked an online medical appointment on NMT</p>
        <p>Information to schedule a medical appointment :</p>
        <div><b>Time : ${dataSend.time}</b></div>
        <div><b>Doctor : ${dataSend.doctorName}</b></div>

        <p>
            Please click on the link below to confirm and complete
        schedule a medical appointment..
        </p>

        <div> 
        <a href='${dataSend.redirectLink} target="_blank"'>Confirmed booking completed</a>
        
        </div>
        <div>Thank you for using our service!</div>
        `
    }
    return result;
}

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = ''

    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}</h3>
        <p>Bạn nhận được email vì đã đặt lịch khám bệnh online trên NMT thành công</p>
        <p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm.</p>

        <div>Xin chân thành cảm ơn!</>
        `
    }

    if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}</h3>
        <p>You received an email because you booked an online medical appointment on NMT succees!</p>

        <p>
            Prescription/bill information is sent in the attachment..
        </p>
        <div>Sincerely thank!</div>
       `
    }
    return result;
}

let sendAttachment = async (dataSend) => {

    return new Promise(async (resolve, reject) => {
        // create reusable transporter object using the default SMTP transport
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_APP, // generated ethereal user
                    pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"NMT" <nguyentuongtnct2001@gmail.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "Kết quả đặt lịch khám bệnh ✔", // Subject line
                html: getBodyHTMLEmailRemedy(dataSend), // html body
                attachments: [
                    {
                        filename: `remedy-${dataSend.patientId} - ${new Date().getTime()}.png`,
                        content: dataSend.imgBase64.split('base64,')[1],
                        encoding: 'base64'
                    }
                ]
            });
            console.log('check infor send email')
            console.log(info)
            resolve();
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    sendSimpleEmail, sendAttachment
}