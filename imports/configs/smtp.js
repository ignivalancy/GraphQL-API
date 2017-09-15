export default {

    dev: {
        smtpUser: 'e.life096@gmail.com',
        smtpPass: 'unitedcollege',
        smtpPort: 25,
        smtpServer: 'smtp.gmail.com',
        mailFrom: "GraphQL"
    },
    staging: {
        smtpUser: "",
        smtpPass: "", //'',
        smtpPort: 587, //25,
        smtpServer: 'smtp.mandrillapp.com',
        mailFrom: "GraphQL"
    },
    live: {
        smtpUser: "",
        smtpPass: "",
        smtpPort: 587, //25,
        smtpServer: "",
        mailFrom: "GraphQL"
    }

};