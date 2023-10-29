const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// CONEXÃO AO MONGODB
mongoose.connect('mongodb://localhost:27017/offensiveWordsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// INDICANDO A COLEÇÃO ATRAVÉS DO MONGOOSE
const Word = mongoose.model('offensivewords', {
    word: String
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// ROTA QUE REALIZE O ENVIO DO DADO AO MONGODB
app.post('/add-word', async (req, res) => {
    try {
        const word = new Word({
            word: req.body.word
        });
        await word.save();
        res.json({ word: word.word, message: 'Word saved successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving the word.' });
    }
});

// RETORNO DE SERVIDOR
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
