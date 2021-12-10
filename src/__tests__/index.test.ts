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