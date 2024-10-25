const express = require("express");
const database = require("../../database.js");

const place_type = express();

//* - - - </> [GET] </> - - - *//
place_type.get("/api/v1/place-types", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`SELECT * FROM tb_place_types ORDER BY place_type_id`);
        console.log(data);

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Place types successfully found", results: data.rows.length, data: { place_types: data.rows } });
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

//* - - - </> [GET] </> - - - *//
place_type.get("/api/v1/place-types/:id", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`SELECT * FROM tb_place_types WHERE place_type_id = $1`, [req.params.id]);
        console.log(data);

        //* - - - </> [ERROR] </> - - - *//
        if(!data.rows.length)
        {
            return res.status(404).json({ status: "The place type doesn't exist" });
        }

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Place type successfully found", data: { place_type: data.rows[0] }});
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

//* - - - </> [POST] </> - - - *//
place_type.post("/api/v1/place-types", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`INSERT INTO tb_place_types (place_type_desc) VALUES ($1) RETURNING *`, [req.body.place_type_desc]);
        console.log(data);

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Place type successfully created", data: { place_type: data.rows[0]} });
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

//* - - - </> [POST] </> - - - *//
place_type.put("/api/v1/place-types/:id", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`UPDATE tb_place_types SET place_type_desc = $1 WHERE place_type_id = $2 RETURNING *`, [req.body.place_type_desc, req.params.id]);
        console.log(data);

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Place type successfully updated", data: { place_type: data.rows[0]} });
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

//* - - - </> [GET] </> - - - *//
place_type.delete("/api/v1/place-types/:id", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`UPDATE tb_place_types SET place_type_status = NOT place_type_status WHERE place_type_id = $1`, [req.params.id]);
        console.log(data);

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Place type successfully deleted" });
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

module.exports = place_type;