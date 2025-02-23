import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import predict_routers from './routes/predict_routers';

const app = express();
const port = process.env.PORT;

// Phục vụ file tĩnh từ thư mục public
if(process.env.BE_URL == 'http://localhost:8080') {
    app.use(express.static("public"));
}

// CORS configuration - Add this BEFORE all routes and other middlewares
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Add middlewares BEFORE routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//swagger config
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation for my Express app',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};

//app routers
app.use(predict_routers);

app.get('/', (req, res) => {
    res.send('BE is running');
});

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Initialize database connection
// AppDataSource.initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!")

//         // Start express server after DB connection is established
//         app.listen(port, () => {
//             return console.log(`Express is listening at http://localhost:${port}`);
//         });
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization:", err)
//     })

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});