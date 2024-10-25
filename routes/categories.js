const express = require("express");
const database = require("../database.js");

const category = express();

//* - - - </> [GET] </> - - - *//
category.get("/api/v1/categories", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`SELECT * FROM tb_categories ORDER BY category_id`);
        console.log(data);

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Categories successfully found", results: data.rows.length, data: { categories: data.rows } });
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

//* - - - </> [GET] </> - - - *//
category.get("/api/v1/categories/:id", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`SELECT * FROM tb_categories WHERE category_id = $1`, [req.params.id]);
        console.log(data);

        //* - - - </> [ERROR] </> - - - *//
        if(!data.rows.length)
        {
            return res.status(404).json({ status: "The category doesn't exist" });
        }

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Category successfully found", data: { category: data.rows[0] }});
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

//* - - - </> [POST] </> - - - *//
category.post("/api/v1/categories", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`INSERT INTO tb_categories (category_desc) VALUES ($1) RETURNING *`, [req.body.category_desc]);
        console.log(data);

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Category successfully created", data: { category: data.rows[0]} });
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

//* - - - </> [POST] </> - - - *//
category.put("/api/v1/categories/:id", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`UPDATE tb_categories SET category_desc = $1 WHERE category_id = $2 RETURNING *`, [req.body.category_desc, req.params.id]);
        console.log(data);

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Category successfully updated", data: { category: data.rows[0]} });
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

//* - - - </> [GET] </> - - - *//
category.delete("/api/v1/categories/:id", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`UPDATE tb_categories SET category_status = NOT category_status WHERE category_id = $1`, [req.params.id]);
        console.log(data);

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Category successfully deleted" });
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

module.exports = category;