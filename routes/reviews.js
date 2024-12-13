const express = require("express");
const database = require("../database.js");

const review = express();

//* - - - </> [GET] </> - - - *//
review.get("/api/v1/reviews", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`SELECT * FROM tb_reviews ORDER BY review_id`);
        console.log(data);

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Reviews successfully found", results: data.rows.length, data: { reviews: data.rows } });
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

//* - - - </> [GET] </> - - - *//
review.get("/api/v1/reviews/:id", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`SELECT * FROM tb_reviews WHERE review_id = $1`, [req.params.id]);
        console.log(data);

        //* - - - </> [ERROR] </> - - - *//
        if(!data.rows.length)
        {
            return res.status(404).json({ status: "The review doesn't exist" });
        }

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Review successfully found", data: { review: data.rows[0] }});
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

//* - - - </> [POST] </> - - - *//
review.post("/api/v1/reviews", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`INSERT INTO tb_reviews (review_desc, review_score, place_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *`, [req.body.review_desc, req.body.review_score, req.body.place_id, req.body.user_id]);
        console.log(data);

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Review successfully created", data: { review: data.rows[0]} });
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

//* - - - </> [POST] </> - - - *//
review.put("/api/v1/reviews/:id", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`UPDATE tb_reviews SET review_desc = $1, review_score = $2, place_id = $3, user_id = $4 WHERE review_id = $5 RETURNING *`, [req.body.review_desc, req.body.review_score, req.body.place_id, req.body.user_id, req.params.id]);
        console.log(data);

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Review successfully updated", data: { review: data.rows[0]} });
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

//* - - - </> [GET] </> - - - *//
review.delete("/api/v1/reviews/:id", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`UPDATE tb_reviews SET review_status = NOT review_status WHERE review_id = $1`, [req.params.id]);
        console.log(data);

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Review successfully deleted" });
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

module.exports = review;