const express = require('express');

const app = express();

app.use(express.json());

app.get("/courses", (request, response) => {
});

app.listen(3333);
