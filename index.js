const express = require('express');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Halo! Backend Express JS kamu sudah berjalan.');
});

app.listen(PORT, () => {
    console.log(`Server sedang berjalan di http://localhost:${PORT}`);
});