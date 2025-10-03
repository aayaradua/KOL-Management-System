import { ENV } from './config/index.js';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import kolRoute from './routes/kolRoute.js'
import managerRoute from './routes/managerRoute.js'


connectDB();

const app = express();
const PORT = ENV.PORT;

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/token', tokenRoute);
app.use('/api/kol', kolRoute);
app.use('/api/manager', managerRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});