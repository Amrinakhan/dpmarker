const express = require('express');
const SibApiV3Sdk = require('@sendinblue/client');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(express.static('.'));

const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
let apiKey = defaultClient.authentications['api-key'];
// It is recommended to use an environment variable for your API key
// For example: apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
apiKey.apiKey = 'YOUR_API_KEY_HERE'; // PASTE YOUR KEY HERE, BUT DO NOT COMMIT IT

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/send-email', async (req, res) => {
    try {
        const { toEmail, toName, subject, message } = req.body;

        const emailData = {
            sender: {
                name: 'Musaver',
                email: 'musaver@lmsyl.shop',
            },
            to: [
                {
                    email: toEmail,
                    name: toName,
                },
            ],
            subject: subject,
            htmlContent: `<h2>Assalamualaikum ${toName}!</h2><p>${message}</p>`,
        };

        const response = await apiInstance.sendTransacEmail(emailData);
        res.json({ success: true, data: response });
    } catch (error) {
        console.error('Error sending email:', error);
        res.json({ success: false, error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 