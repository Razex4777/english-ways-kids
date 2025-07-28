const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Configuration - Only free CallMeBot API
const WHATSAPP_CONFIG = {
    callMeBotPhone: '972529435949',
    callMeBotApiKey: process.env.CALLMEBOT_API_KEY || '6442335'
};

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Main endpoint to send WhatsApp message
app.post('/api/send-whatsapp', async (req, res) => {
    try {
        const { message, formData, timestamp } = req.body;
        
        console.log('Received WhatsApp request:', { formData, timestamp });
        
        // Send via CallMeBot API (Free)
        const success = await sendViaCallMeBot(message);
        
        if (success) {
            res.json({ 
                success: true, 
                message: 'Message sent successfully via CallMeBot'
            });
        } else {
            res.status(500).json({ 
                success: false, 
                message: 'Failed to send message' 
            });
        }
        
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error occurred' 
        });
    }
});

// CallMeBot API (Free)
async function sendViaCallMeBot(message) {
    const { callMeBotPhone, callMeBotApiKey } = WHATSAPP_CONFIG;
    
    if (!callMeBotApiKey || callMeBotApiKey === 'YOUR_API_KEY_HERE') {
        throw new Error('CallMeBot API key not configured');
    }
    
    const url = `https://api.callmebot.com/whatsapp.php`;
    const params = {
        phone: callMeBotPhone,
        text: message,
        apikey: callMeBotApiKey
    };
    
    const response = await axios.get(url, { params });
    
    if (response.status === 200) {
        console.log('CallMeBot: Message sent successfully');
        return true;
    }
    
    throw new Error(`CallMeBot API error: ${response.status}`);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 WhatsApp Bot API ready! (FREE CallMeBot only)`);
    console.log(`🔗 Open: http://localhost:${PORT}`);
});

module.exports = app; 