const express = require('express');
const app = express();
const Mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT;
const DB = process.env.MONGODB_URL;

const router = require('./routes/router');
app.use(cors());

//Configure Database
Mongoose.connect(DB, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
});
app.use(express.json());



app.get('/',(req,res) => {
	res.send('Group Nine Media: Take Home Assessment');
});

app.use('/api', router);


app.listen(PORT, () => {
	console.log(`server is listening on port ${PORT}`);
});
