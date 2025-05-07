import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __moduleName = fileURLToPath(new URL(import.meta.url));
const __dirName = dirname(__moduleName);

const app = express();
const port = process.env.SERVER_PORT || 8080;

app.use(express.static(join(__dirName, 'dist')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirName, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});