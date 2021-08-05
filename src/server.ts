import express from "express";
import path from 'path';
import bodyParser from 'body-parser';

import { adminRoutes } from "./routes/admin";
import { shopRoutes } from "./routes/shop";
import { ErrorController } from "./controllers/errorController";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

const errorController = new ErrorController();
app.use(errorController.get404);


app.listen(3333, () => console.log("Server is running on Port 3333"));
