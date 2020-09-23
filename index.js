const express = require("express");
const cors = require("cors");
const { response } = require('express');
const stripe = require("stripe")(
	"sk_test_51HQ8sSK3NONn8GuVZztSDxZFIdeLLnBLhh8599gUC9GXyU7Z9y0mEnYkHzxHDEf2FjOYFERY5GJT27a9cdJtC3eG00VdIrgqK6"
  );
// API

// App config
const app = express();

// middlewares
app.use(cors({origin: true}));
app.use(cors())
app.use(express.json());

// API routes
app.get("/", (request, response) => response.status(200).send("hello world"))

app.post("/payments/create",(request, response) => {
    const total = request.query.total;

    console.log("Payment Request Recieved BOOM!! for this amount ", total);

    stripe.paymentIntents.create({
        amount: total, // in subunits of currency
        currency:"usd"
    })
	.then((paymentIntent) => {
		response.status(201).send({
        		clientSecret: paymentIntent.client_secret
		    })

	} )
	.catch((err) => console.log(err))


})

// listen command
app.listen( process.env.PORT || 7000, () => {
	console.log("server ON PORT >>" + process.env.PORT);
})


