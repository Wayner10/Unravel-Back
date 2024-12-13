const express = require("express");
const database = require("../database.js");

const user = express();

//* - - - </> [GET] </> - - - *//
user.get("/api/v1/users", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`SELECT * FROM tb_users ORDER BY user_id`);
        console.log(data);

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "Users successfully found", results: data.rows.length, data: { users: data.rows } });
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

//* - - - </> [GET] </> - - - *//
user.get("/api/v1/users/:id", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`SELECT * FROM tb_users WHERE user_id = $1`, [req.params.id]);
        console.log(data);

        //* - - - </> [ERROR] </> - - - *//
        if(!data.rows.length)
        {
            return res.status(404).json({ status: "The user doesn't exist" });
        }

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "User successfully found", data: { user: data.rows[0] }});
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

//* - - - </> [POST] </> - - - *//
user.post("/api/v1/users", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`INSERT INTO tb_users (user_name, user_lastname, user_email, user_password, user_phone, user_birthdate, user_status, user_type_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [req.body.user_name, req.body.user_lastname, req.body.user_email, req.body.user_password, req.body.user_phone, req.body.user_birthdate, req.body.user_status, req.body.user_type_id]);
        console.log(data);

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "User successfully created", data: { user: data.rows[0]} });
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

//* - - - </> [PUT] </> - - - *//
user.put("/api/v1/users/:id", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`UPDATE tb_users SET user_name = $1, user_lastname = $2, user_email = $3, user_password=$4, user_phone = $5, user_birthdate = $6, user_status=$7, user_type_id = $8 WHERE user_id = $9 RETURNING *`, [req.body.user_name, req.body.user_lastname, req.body.user_email, req.body.user_password, req.body.user_phone, req.body.user_birthdate, req.body.user_status, req.body.user_type_id, req.params.id]);
        console.log(data);

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "User successfully updated", data: { user: data.rows[0]} });
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

//* - - - </> [GET] </> - - - *//
user.delete("/api/v1/users/:id", async (req, res) => {

    try
    {
        //* - - - </> [QUERY] </> - - - *//
        const data = await database.query(`UPDATE tb_users SET user_status = NOT user_status WHERE user_id = $1`, [req.params.id]);
        console.log(data);

        //* - - - </> [DATA] </> - - - *//
        res.status(200).json({ status: "User successfully deleted" });
    }
    catch (error)
    {
        //* - - - </> [ERROR] </> - - - *//
        res.status(500).json({ status: "Error connecting to database" });
        console.log(error);
    }

});

module.exports = user;