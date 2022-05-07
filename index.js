const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Shoe Hub apps')
})

app.listen(port, () => {
    console.log('listening shoe hub from ', port);
})