const express = require('express');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');

app.use(cors());
app.use(express.json());



const uri = process.env.DB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


// name= abhamid3311
// pass= GNIceevnmjl5f43s

const run = async () => {
  try {
    const flightDealsCollection = client.db('BanAir').collection('deals');
    const testimonialCollection = client.db('BanAir').collection('testimonials');
    const usersCollection = client.db('BanAir').collection('users');
    const bookingCollection = client.db('BanAir').collection('bookings');

    console.log("DB Connected")



    //deal APIs
    app.get("/deal", async (req, res) => {
      const data = await flightDealsCollection.find({}).toArray();
      res.send(data);
    });


    app.get('/deal/:id', async (req, res) => {
      const id = req.params.id;
      const result = await flightDealsCollection.findOne({ _id: ObjectId(id) });
      res.send(result);
    });

    app.post('/deal', async (req, res) => {
      const title = req.body.title;
      const author = req.body.author;
      const genre = req.body.genre;
      const publicationDate = req.body.publicationDate;
      const reviews = [];
      const createdAt = new Date();
      const product = { title, author, genre, publicationDate, createdAt, reviews }

      const result = await flightDealsCollection.insertOne(book);
      res.send(result);
    });

    app.delete('/deal/:id', async (req, res) => {
      const id = req.params.id;
      const result = await flightDealsCollection.deleteOne({ _id: ObjectId(id) });
      res.send(result);
    });

    app.put('/deal/:id', async (req, res) => {
      const id = req.params.id;
      const product = req.body;
      console.log(book)

      const options = { upsert: true };
      const updateDoc = {
        $set: product,
      };

      const result = await flightDealsCollection.updateOne({ _id: ObjectId(id) }, updateDoc, options);


      if (result.modifiedCount !== 1) {
        console.error('product not Updated');
        return res.status(404).json({ error: 'product not found' });
      }

      console.log('product Updated successfully');
      return res.status(200).json({ message: 'product Updated successfully', result });
    });


    //Testimonial

    app.get("/testimonial", async (req, res) => {
      const data = await testimonialCollection.find({}).toArray();
      res.send(data);
    });
    app.get('/testimonial/:id', async (req, res) => {
      const id = req.params.id;
      const result = await testimonialCollection.findOne({ _id: ObjectId(id) });
      res.send(result);
    });

    app.post("/testimonial", async (req, res) => {
      const newTestimonial = req.body;
      const result = await testimonialCollection.insertOne(newTestimonial);
      res.send(result);
    });

    app.delete('/testimonial/:id', async (req, res) => {
      const id = req.params.id;
      const result = await testimonialCollection.deleteOne({ _id: ObjectId(id) });
      res.send(result);
    });


    //Users

    app.post('/users', async (req, res) => {
      const name = req.body.name;
      const email = req.body.email;
      const phoneNumber = req.body.phoneNumber;
      const role = "user"
      const myReviews = [];
      const myBookings = [];
      const myCart = [];

      const createdAt = new Date();
      const newUser = { name, email, phoneNumber, role, createdAt, myReviews, myBookings, myCart }

      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const data = await usersCollection.find({}).toArray();
      res.send(data);
    });

    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const result = await usersCollection.findOne({ email: email });
      res.send(result);
    });

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id)
      const result = await usersCollection.findOne({ _id: ObjectId(id) });
      // console.log(result)
      res.send(result);
    });

    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      const result = await usersCollection.deleteOne({ _id: ObjectId(id) });
      res.send(result);
    });






    //Bookings

    app.get("/bookings", async (req, res) => {
      const data = await bookingCollection.find({}).toArray();
      res.send(data);
    });

    app.get("/bookings/:id", async (req, res) => {
      const id = req.params.id;
      const result = await bookingCollection.findOne({ _id: ObjectId(id) });
      res.send(result);
    });

    app.get("/bookings/:email", async (req, res) => {
      const id = req.params.email;
      const data = await bookingCollection.findOne({ email: email });
      res.send(data);
    });

    app.post("/bookings", async (req, res) => {
      const newBooking = req.body;
      const result = await bookingCollection.insertOne(newBooking);
      res.send(result);
    });

    app.delete('/bookings/:id', async (req, res) => {
      const id = req.params.id;
      const result = await bookingCollection.deleteOne({ _id: ObjectId(id) });
      res.send(result);
    });
















    /*  //Comments
     app.post('/comment/:id', async (req, res) => {
       const productId = req.params.id;
       const comment = req.body;
 
       console.log(productId);
       console.log(comment);
 
       const result = await productsCollection.updateOne(
         { _id: ObjectId(productId) },
         { $push: { reviews: comment } }
       );
 
       console.log(result);
 
       if (result.modifiedCount !== 1) {
         console.error('Product not found or comment not added');
         res.status(404).json({ error: 'Product not found or comment not added' });
         return;
       }
 
       const updatedBook = await productsCollection.findOne({ _id: ObjectId(productId) });
       console.log('Comment added successfully');
       res.status(200).json({ message: 'Comment added successfully', updatedBook });
 
 
     });
 
 
     app.get('/comment/:id', async (req, res) => {
       const productId = req.params.id;
 
       try {
         const result = await productsCollection.findOne(
           { _id: ObjectId(productId) },
           { projection: { _id: 0, reviews: 1 } }
         );
 
         if (result) {
           res.json(result.reviews.reverse()); // Send the reviews array
         } else {
           res.status(404).json({ error: 'Product not found' });
         }
       } catch (error) {
         console.error('Error retrieving comments', error);
         res.status(500).json({ error: 'Server error' });
       }
     }); */







  } finally {
  }
};

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello From BanAir !');
});

app.listen(port, () => {
  console.log(`BanAir listening on port ${port}`);
});
