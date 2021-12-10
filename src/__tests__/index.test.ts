// Import app also here.
import { app } from "../app";
import supertest from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AccommodationModel from "../models/accommodation/model";

dotenv.config();

const request = supertest(app);

// Include here the tests.

describe("Testing the testing environment", () => {
    it("should check that true is true", () => {
        expect(true).toBe(true);
    });
});

describe("Test accommodation endpoints", () => {

  beforeAll(done => {
    mongoose.connect(process.env.MONGO_URL_TEST!).then(async () => {
      console.log("Connected to the test database");
        let newAccommodation = new AccommodationModel({
          name: "MilanHotel",
          description: "Beautiful place.",
          maxGuests: 4,
          city: "Milan"
        })
        await newAccommodation.save();
      
      done();
    })
  });

  // Tests here for /accommodation
  it("GET /accommodation - return full list of accommodations", async() => {
    let response = await request.get("/accommodation")

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  })

  let id: null | string = null

  it("POST /accommodation - it should add a new accomodation", async()=> {

    const response = await request.post("/accommodation").send({
      name: "MilanHotel",
      description: "Beautiful place.",
      maxGuests: 5,
      city: "London"
    })
    console.log(response.body)
    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();
    expect(response.body.name).toBeDefined()
    expect(response.body.name).toBe("MilanHotel");
    expect(response.body.description).toBeDefined();
    expect(response.body.description).toBe("Beautiful place.");
    expect(response.body.maxGuests).toBeDefined();
    expect(response.body.maxGuests).toBe(5);
    expect(response.body.city).toBeDefined();
    expect(response.body.city).toBe("London");
    
    id = response.body._id

  })
 
  it("POST /accommodation - it should send 400 for invalid data", async() => {

    const response = await request.post("/accommodation").send({
      name: 7
    })

    expect(response.status).toBe(400)
  })

  it("GET by Id /accommodation - it should return object with this Id", async () => {
    const response = await request.get(`/accommodation/${id}`)

    console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body._id).toBeDefined();
    expect(response.body.name).toBeDefined()
    expect(response.body.name).toBe("MilanHotel");
    expect(response.body.description).toBeDefined();
    expect(response.body.description).toBe("Beautiful place.");
    expect(response.body.maxGuests).toBeDefined();
    expect(response.body.maxGuests).toBe(5);
    expect(response.body.city).toBeDefined();
    expect(response.body.city).toBe("London");
  })

  it("GET by Id /accommodation - Should return 404 if Id not found", async () => {
    const response = await request.get(`/accommodation/87213409237`)
    expect(response.status).toBe(404)

  })

  it("PUT /accommodation - Should check that the put works", async () => {
    const response = await request.put(`/accommodation/${id}`).send({
      name:"LondonHotel"
    })  

    expect(response.body.name).toBeDefined()
    expect(response.body.name).toBe("LondonHotel");

  })

  it("PUT /accommodation - Should return 404 if Id not found", async () => {
    const response = await request.get(`/accommodation/87213409237`)
    expect(response.status).toBe(404)

  })



  afterAll(done => {
    mongoose.connection.dropDatabase()
    .then(() => {
      return mongoose.connection.close()
    })
    .then(() => {
      done();
    })
  })


});