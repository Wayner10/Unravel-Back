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
        const data = await database.query(`INSERT INTO tb_places (place_name, place_desc_short, place_desc_large, place_score, place_email, place_phone, place_price_adult, place_price_child, place_lat, place_lng, place_waze_url, place_page_url, place_opening, place_closing, place_opening_time, place_closing_time, place_feature, place_icon, place_status, place_type_id, region_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) RETURNING *`, [req.body.place_name, req.body.place_desc_short, req.body.place_desc_large, req.body.place_score, req.body.place_email, req.body.place_phone, req.body.place_price_adult, req.body.place_price_child, req.body.place_lat, req.body.place_lng, req.body.place_waze_url, req.body.place_page_url, req.body.place_opening, req.body.place_closing, req.body.place_opening_time, req.body.place_closing_time, req.body.place_feature, req.body.place_icon, req.body.place_status, req.body.place_type_id, req.body.region_id, req.body.user_id]);
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

//* - - - </> [PUT] </> - - - *//
place.put("/api/v1/places/:id", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`UPDATE tb_places SET place_name = $1, place_desc_short = $2, place_desc_large = $3, place_score = $4, place_email = $5, place_phone = $6, place_price_adult = $7, place_price_child = $8, place_lat = $9, place_lng = $10, place_waze_url = $11, place_page_url = $12, place_opening = $13, place_closing = $14, place_opening_time = $15, place_closing_time = $16, place_feature = $17, place_icon = $18, place_status = $19, place_type_id = $20, region_id = $21, user_id = $22 WHERE place_id = $23 RETURNING *`, [req.body.place_name, req.body.place_desc_short, req.body.place_desc_large, req.body.place_score, req.body.place_email, req.body.place_phone, req.body.place_price_adult, req.body.place_price_child, req.body.place_lat, req.body.place_lng, req.body.place_waze_url, req.body.place_page_url, req.body.place_opening, req.body.place_closing, req.body.place_opening_time, req.body.place_closing_time, req.body.place_feature, req.body.place_icon, req.body.place_status, req.body.place_type_id, req.body.region_id, req.body.user_id, req.params.id]);
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
