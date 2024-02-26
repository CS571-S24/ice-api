import fs from 'fs'
import crypto from 'crypto'

import express, { Express } from 'express';
import cookies from "cookie-parser";

import { CS571Initializer } from '@cs571/s24-api-framework'
import { CS571ChiliRoute } from './routes/chili-route';
import { CS571PizzaRoute } from './routes/pizza-route';
import { CS571PastaRoute } from './routes/pasta-route';
import { CS571HurricanesRoute } from './routes/hurricanes-route';
import { CS571TicketsRoute } from './routes/tickets-route';
import { Ticket } from './model/ticket';

console.log("Welcome to ICE API!");

const app: Express = express();
app.use(cookies());


const appBundle = CS571Initializer.init(app, {
  allowNoAuth: [],
  skipAuth: false
});

const chili = JSON.parse(fs.readFileSync('includes/chili.json').toString())
const pasta = JSON.parse(fs.readFileSync('includes/pasta.json').toString())
const pizza = JSON.parse(fs.readFileSync('includes/pizza.json').toString())
const hurr = JSON.parse(fs.readFileSync('includes/hurr.json').toString()).map((h: any) => {
  return {
    ...h,
    start_date: h.start_date + Math.floor(Math.random()* 500000),
    end_date: h.end_date + Math.floor(Math.random()* 500000) ,
    id: crypto.createHash('sha256').update(h.name + String(h.start_date) + String(h.end_date) + String(h.category) + String(h.wind_speed)).digest('hex').substring(0, 28)
  }
})
const tix = JSON.parse(fs.readFileSync('includes/tickets.json').toString()).map((t: any) => new Ticket(
  t.name,
  t.description,
  t.author,
  t.daysOld,
  t.priority
));


appBundle.router.addRoutes([
  new CS571ChiliRoute(chili),
  new CS571PastaRoute(pasta),
  new CS571PizzaRoute(pizza),
  new CS571HurricanesRoute(hurr),
  new CS571TicketsRoute(tix)
])

app.listen(appBundle.config.PORT, () => {
  console.log(`Running at :${appBundle.config.PORT}`);
});
