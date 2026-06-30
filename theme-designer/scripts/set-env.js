const fs = require('fs');
const targetPath = './src/environments/environment.ts';
const apiKey = process.env.PRIME_NG_KEY || '';
const envConfigFile = `
    export const environment = {
        production: true,
        apiUrl: 'https://cswilson.site',
        primeNgKey: '${apiKey}'
    };
`;
fs.writeFileSync(targetPath, envConfigFile);