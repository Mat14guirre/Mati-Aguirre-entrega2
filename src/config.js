import * as url from 'url';

const config = {
    PORT: 8080,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/uploads` },
    // MONGODB_URI: 'mongodb://localhost:27017/Coder70275',
    MONGODB_URI: 'mongodb+srv://matiasaguirre269:9zr9zfTpYSgjOIsA@cluster0.nlvme.mongodb.net/Coder70275'
};

export default config;