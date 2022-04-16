import https from 'node:https';
import promisify from 'https://tomashubelbauer.github.io/esm-github-api/promisify.js';
import buffer from 'https://tomashubelbauer.github.io/esm-github-api/buffer.js';

const response = await promisify(https.get)('https://example.com');
const text = await buffer(response);

console.log(text);
