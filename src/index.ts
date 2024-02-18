import fs from 'fs'
import crypto from 'crypto'

import express, { Express } from 'express';

import { CS571Initializer } from '@cs571/s24-api-framework'
import { CS571ChiliRoute } from './routes/chili-route';
import { CS571PizzaRoute } from './routes/pizza-route';
import { CS571PastaRoute } from './routes/pasta-route';
import { CS571HurricanesRoute } from './routes/hurricanes-route';


console.log("Welcome to ICE API!");

const app: Express = express();

const appBundle = CS571Initializer.init(app, {
  allowNoAuth: [],
  skipAuth: false
});

const chili = JSON.parse(fs.readFileSync('includes/chili.json').toString())
const pasta = JSON.parse(fs.readFileSync('includes/pasta.json').toString())
const pizza = JSON.parse(fs.readFileSync('includes/pizza.json').toString())
const hurr = JSON.parse(fs.readFileSync('includes/hurr.json').toString())

appBundle.router.addRoutes([
  new CS571ChiliRoute(chili),
  new CS571PastaRoute(pasta),
  new CS571PizzaRoute(pizza),
  new CS571HurricanesRoute(hurr),
])

app.listen(appBundle.config.PORT, () => {
  console.log(`Running at :${appBundle.config.PORT}`);
});
