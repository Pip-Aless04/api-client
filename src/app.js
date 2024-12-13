import express from "express";
import cookieParser from "cookie-parser";
import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import process from "node:process";
import path from "path";
import { Worker } from "worker_threads";
import compression from 'compression';
import helmet from 'helmet';
import { corsMiddleware } from "./middlewares/cors.middleware.js";
import { rateLimiter } from "./middlewares/rateLimiter.middleware.js";
import { appRoutes } from "./routes/index.routes.js";


const numCPUs = (availableParallelism()/2);

export const createApp = ({AuthModel, ReportesModel, EvaluacionModel}) => {

    if (cluster.isPrimary) {
        console.log(`Master ${process.pid} is running`);
    
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
    
        cluster.on("exit", (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
            cluster.fork();
        });
    
    }else{
    
        const app = express();
        const __dirname = path.resolve();

        app.disable("x-powered-by");
        
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cookieParser());
        app.use(corsMiddleware());
        app.use(compression());
        //app.use(helmet());
        /*
        app.use(
            helmet({
                contentSecurityPolicy: {
                    directives: {
                    "script-src": ["'self'", "localhost", "'sha256-<hash_generado>'"],
                    "style-src": ["'self'", "localhost", "'sha256-+5gngJFeHzaHdBT/sZ+QeQrbT9yuCliU/bQpvalnrXs='", "'unsafe-hashes'"],
                    },
                },
            })
        );
        */
        app.use(rateLimiter);

        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, 'views'))
        app.use(express.static('public'));
        app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

        
        app.get("/", (req,res,next) => {
            res.redirect("/dhcoapp");
            next();
        });

        app.use("/dhcoapp", appRoutes({ AuthModel, ReportesModel, EvaluacionModel }));

        /*
        app.get("/prueba", (req, res) => {
            
            const worker = new Worker(path.resolve("src/workers/prueba.worker.js"));
        
            worker.on("message", (total) => {
                return res.send(`Resultado: ${total}`);
            });
        
            worker.on("error", (error) => {
                console.error("Error en el worker:", error);
                return res.status(500).send("Error en el procesamiento.");
            });
        
            worker.on("exit", (code) => {
                if (code !== 0) {
                    console.error(`Worker finalizó con código ${code}`);
                    return res.status(500).send("Worker finalizó con un error.");
                }
            });
        });
        */
        
        app.listen(3000, () => {
            console.log("Server started on port 3000");
        });
        
    }
} 

