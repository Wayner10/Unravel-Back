const express = require("express");
const database = require("../database.js");

const region = express();

//* - - - </> [GET] </> - - - *//
region.get("/api/v1/regions", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`SELECT * FROM tb_regions`);
        console.log(data);

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Regions successfully found", results: data.rows.length, data: { regions: data.rows } });
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

//* - - - </> [GET] </> - - - *//
region.get("/api/v1/regions/:id", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`SELECT * FROM tb_regions WHERE region_id = $1`, [req.params.id]);
        console.log(data);

        //* - - - </> [ERROR] </> - - - *//
        if(!data.rows.length)
        {
            return res.status(404).json({ status: "The region doesn't exist" });
        }

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Region successfully found", data: { region: data.rows[0] }});
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

//* - - - </> [POST] </> - - - *//
region.post("/api/v1/regions", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`INSERT INTO tb_regions (region_name, region_desc, region_lat, region_lng) VALUES ($1, $2, $3, $4) RETURNING *`, [req.body.region_name, req.body.region_desc, req.body.region_lat, req.body.region_lng]);

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Region successfully created", data: { region: data.rows[0]} });
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

//* - - - </> [POST] </> - - - *//
region.put("/api/v1/regions/:id", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`UPDATE tb_regions SET region_name = $1, region_desc = $2, region_lat = $3, region_lng = $4 WHERE region_id = $5 RETURNING *`, [req.body.region_name, req.body.region_desc, req.body.region_lat, req.body.region_lng, req.params.id]);

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Region successfully updated", data: { region: data.rows[0]} });
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

//* - - - </> [GET] </> - - - *//
region.delete("/api/v1/regions/:id", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`DELETE FROM tb_regions WHERE region_id = $1`, [req.params.id]);
        console.log(data);

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Region successfully deleted" });
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

module.exports = region;