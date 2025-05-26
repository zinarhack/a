import axios from 'axios';

const WEBHOOK = 'https://discord.com/api/webhooks/ваш_вебхук';

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Only POST allowed' });
    }

    const content = req.body.message
        ?.replace(/@everyone/g, '@\u200Beveryone')
        ?.replace(/@here/g, '@\u200Bhere');

    if (!content) {
        return res.status(400).json({ error: 'No message provided' });
    }

    try {
        await axios.post(WEBHOOK, { content });
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Discord API error' });
    }
};
