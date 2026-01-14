// const express = require('express'); -->syntax for CommonJS
import express from 'express'; // --> syntax for ES6 modules
import { ENV } from './lib/env.js';

const app = express();
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Api is running suceessfully' });
});
app.listen(ENV.PORT, () => console.log(`Server is running on port ${ENV.PORT}`));