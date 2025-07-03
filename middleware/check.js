
const path = require('path');

function cloakBot(req, res, next) {
    const ua = req.headers['user-agent'] || '';
    const secChUa = req.headers['sec-ch-ua'] || '';
    const referer = req.headers['referer'];
    const acceptLang = req.headers['accept-language'];

    const botUa = /bot|crawl|spider|slurp|curl|wget|HeadlessChrome/i.test(ua);
    const botSec = /HeadlessChrome/i.test(secChUa);
    //   const suspiciousHeaders = !referer || !acceptLang;
    const suspiciousHeaders =
        !acceptLang ||                      // completely missing
        acceptLang.trim() === '*/*' ||     // wildcards only
        acceptLang.length < 5;

    if (botUa || botSec || suspiciousHeaders) {
        console.log('🕷️ Detected Bot:', { ua, secChUa, referer, acceptLang });
        return res.sendFile(path.join(__dirname, '../public/home.html'));
    }

    // Optionally inject client-side fingerprinting
    res.locals.shouldFingerprint = true;
    next();
}

module.exports = cloakBot;
