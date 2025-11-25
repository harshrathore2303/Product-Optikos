const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/product');



app.listen(PORT, () => {
    console.log(`Server has started in ${PORT}`);
});
