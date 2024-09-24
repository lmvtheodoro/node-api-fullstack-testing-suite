const express = require('express');
const { swaggerUi, specs } = require('./swaggerConfig')
const app = express();
const userRoutes = require('./_routes/UserRoutes');
const morgan = require('morgan'); // Importando o morgan

app.use(morgan('dev'));
app.use(express.json());
app.use('/users', userRoutes);

// Rota para servir a documentação Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});