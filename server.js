const express = require("express");
const cors = require("cors")

//* - - - </> [DATA] </> - - - *//
const users = require("./routes/users");
const places = require("./routes/places");
const regions = require("./routes/regions");
const reviews = require("./routes/reviews");
const categories = require("./routes/categories");
const place_types = require("./routes/others/place_types");

const app = express();

app.use(cors());
app.use(express.json());

//* - - - </> [HTTP] </> - - - *//
app.use(users);
app.use(places);
app.use(regions);
app.use(reviews);
app.use(categories);
app.use(place_types);

//* - - - </> [PORT] </> - - - *//
app.listen(4000, () => { console.log("Server running on port: 4000") });