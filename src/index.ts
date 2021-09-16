import dotenv from "dotenv";
import express from "express";
import path from "path";
import * as sessionAuth from "./middleware/sessionAuth";
import * as routes from "./routes";

dotenv.config();
const app = express();

// Configure Express to parse incoming JSON data
app.use(express.json());

const port = process.env.PORT || 8080;

// configure Express to use EJS as the view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Configure Express to serve static files in the public folder
app.use(express.static(path.join(__dirname, "public")));

// configure session auth
sessionAuth.register(app);

// configure the routes
routes.register(app);

app.listen(port, () => {
  console.log(`our server is available at http:localhost:${port}`);
});
