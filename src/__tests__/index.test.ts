// Import app also here.
import { app } from "../app";
import supertest from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AccommodationModel from "../models/accommodation/model";
import CityModel from "../models/destinations/model";

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
      // Add one new city
        let newCity = new CityModel({
          name: "Milan"
        });
        await newCity.save();
      // Add one new accommodation
        let newAccommodation = new AccommodationModel({
          name: "MilanHotel",
          description: "Beautiful place.",
          maxGuests: 4,
          city: newCity._id
        })
        await newAccommodation.save();
      
      done();
    })
  });

  // Tests here for /accommodation
  it("GET /accommodation - return full list of accommodations", async() => {
    let response = await request.get("/accommodation")

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].name).toBe("MilanHotel");
  })

  let id: null | string = null
  let cityId: null | string = null

  it("POST /accommodation - it should add a new accomodation", async()=> {

    let newCity = new CityModel({
        name: "London"
      });
    await newCity.save();

    const response = await request.post("/accommodation").send({
      name: "MilanHotel",
      description: "Beautiful place.",
      maxGuests: 5,
      city: newCity._id
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
    
    id = response.body._id
    cityId = newCity._id;
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
    //expect(response.body.city).toBe(cityId);
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


  it("DELETE /accommodation/:id - Should delete accommodation by id", async() => {
    const response = await request.delete(`/accommodation/${id}`);
    expect(response.status).toBe(204);
  })


  it("DELETE /accommodation/:id - Should return 404 if invalid id", async () => {
    const response = await request.delete("/accommodation/600");
    expect(response.status).toBe(404);
  })



  afterAll(done => {
    /* mongoose.connection.close().then(() => {
      done();
    }) */
    mongoose.connection.dropDatabase()
    .then(() => {
      return mongoose.connection.close()
    })
    .then(() => {
      done();
    })
  })

});

describe("Test destination endpoints", () => {

  let cityId:string | null = null;

  beforeAll(done => {
    mongoose.connect(process.env.MONGO_URL_TEST!).then(async () => {
      console.log("Connected to the test database");
      // Add two new city
        let newCityMilan = new CityModel({
          name: "Milan"
        });
        await newCityMilan.save();

        let newCityHelsinki = new CityModel({
          name: "Helsinki"
        })
        await newCityHelsinki.save();

      // Add two accommodations
        let newAccommodationMilan = new AccommodationModel({
          name: "MilanHotel",
          description: "Beautiful place.",
          maxGuests: 4,
          city: newCityMilan._id
        })
        await newAccommodationMilan.save();

        await CityModel.findByIdAndUpdate(
          {_id: newCityMilan._id},
          {$push: {accommodations: newAccommodationMilan._id}})

        let newAccommodationHelsinki = new AccommodationModel({
          name: "HelsinkiHotel",
          description: "By the Sea",
          maxGuests: 4,
          city: newCityHelsinki._id
        })
        await newAccommodationHelsinki.save();

        await CityModel.findByIdAndUpdate(
          {_id: newCityHelsinki._id},
          {$push: {accommodations: newAccommodationHelsinki._id}})

        cityId = newCityHelsinki._id.toString()
        console.log(cityId);

      done();
    })
  });


  it("Should list cities with accommodations", async() => {
    let response = await request.get("/destinations")
    expect(response.status).toBe(200);
    expect(response.body[0].accommodations.length).toBe(1)
    expect(response.body[0].accommodations[0].name).toBe("MilanHotel")
    expect(response.body[1].accommodations.length).toBe(1)
    expect(response.body[1].accommodations[0].name).toBe("HelsinkiHotel")
    console.log(response.body);
    console.log(response.body[0].accommodations[0]);
  })

  it("Should give city by id and accommodations", async() => {
    console.log(cityId);
    let response = await request.get(`/destinations/${cityId}`);

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Helsinki");
  })

  it("POST /destination - should add new destination", async() => {
    let response = await request.post("/destinations").send({
      name: "Dublin"
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Dublin");
  })


  afterAll(done => {
    /* mongoose.connection.close().then(() => {
      done();
    }) */
    mongoose.connection.dropDatabase()
    .then(() => {
      return mongoose.connection.close()
    })
    .then(() => {
      done();
    })
  })
})