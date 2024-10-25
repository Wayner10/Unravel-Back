const express = require("express");
const database = require("../database.js");

const place = express();

//* - - - </> [GET] </> - - - *//
place.get("/api/v1/places", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`SELECT * FROM tb_places ORDER BY place_id`);
        console.log(data);

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Places successfully found", results: data.rows.length, data: { places: data.rows } });
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

//* - - - </> [GET] </> - - - *//
place.get("/api/v1/places/:id", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`SELECT * FROM tb_places WHERE place_id = $1`, [req.params.id]);
        console.log(data);

        //* - - - </> [ERROR] </> - - - *//
        if(!data.rows.length)
        {
            return res.status(404).json({ status: "The place doesn't exist" });
        }

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Place successfully found", data: { place: data.rows[0] }});
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

//* - - - </> [POST] </> - - - *//
place.post("/api/v1/places", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`INSERT INTO tb_places (place_name, place_desc, place_score, place_email, place_phone, place_price_adult, place_price_children, place_lat, place_lng, place_canton, place_nearest_city, place_waze_url, place_google_url, place_website_url, place_open_time, place_close_time, place_type_id, region_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *`, [req.body.place_name, req.body.place_desc, req.body.place_score, req.body.place_email, req.body.place_phone, req.body.place_price_adult, req.body.place_price_children, req.body.place_lat, req.body.place_lng, req.body.place_canton, req.body.place_nearest_city, req.body.place_waze_url, req.body.place_google_url, req.body.place_website_url, req.body.place_open_time, req.body.place_close_time, req.body.place_type_id, req.body.region_id, req.body.user_id]);
        console.log(data);

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Place successfully created", data: { place: data.rows[0]} });
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

//* - - - </> [POST] </> - - - *//
place.put("/api/v1/places/:id", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`UPDATE tb_places SET place_name = $1, place_desc = $2, place_score = $3, place_email = $4, place_phone = $5, place_price_adult = $6, place_price_children = $7, place_lat = $8, place_lng = $9, place_canton = $10, place_nearest_city = $11, place_waze_url = $12, place_google_url = $13, place_website_url = $14, place_open_time = $15, place_close_time = $16, place_type_id = $17, region_id = $18, user_id = $19 WHERE place_id = $20 RETURNING *`, [req.body.place_name, req.body.place_desc, req.body.place_score, req.body.place_email, req.body.place_phone, req.body.place_price_adult, req.body.place_price_children, req.body.place_lat, req.body.place_lng, req.body.place_canton, req.body.place_nearest_city, req.body.place_waze_url, req.body.place_google_url, req.body.place_website_url, req.body.place_open_time, req.body.place_close_time, req.body.place_type_id, req.body.region_id, req.body.user_id, req.params.id]);
        console.log(data);

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Place successfully updated", data: { place: data.rows[0]} });
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

//* - - - </> [DELETE] </> - - - *//
place.delete("/api/v1/places/:id", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`UPDATE tb_places SET place_status = NOT place_status WHERE place_id = $1`, [req.params.id]);
        console.log(data);

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Place successfully deleted" });
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

module.exports = place;