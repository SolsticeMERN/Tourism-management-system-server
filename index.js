const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const cors = require('cors');
const port= process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// tourismManagement
// znMlNZaTu8rfuTkL




const uri = "mongodb+srv://tourismManagement:znMlNZaTu8rfuTkL@cluster0.0rmazcr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("ttravolDB");
    const tourismSpotsCollection = database.collection("tourismSpots");
    const usersCollection = database.collection("users");

    // tourismSpots api version
    app.post("/tourismSpots", async (req, res) => {
        const tourismSpot = req.body;
        const result = await tourismSpotsCollection.insertOne(tourismSpot);
        res.send(result);
    })

    app.get("/tourismSpots", async (req, res) => {
        const tourismSpots = await tourismSpotsCollection.find({}).toArray();
        res.send(tourismSpots);
    })

    app.get("/tourismSpots/:id", async (req, res) => {
        const id = req.params.id;
        const tourismSpot = await tourismSpotsCollection.findOne({ _id: new ObjectId(id) });
        res.send(tourismSpot);
    })



    // users api version
    app.post("/users", async (req, res) => {
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        res.send(result);
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send(`Server is listening on port ${port}`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});