// Import app also here.
import { app } from "../app";
import supertest from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const request = supertest(app);

// Include here the tests.

describe("Testing the testing environment", () => {
    it("should check that true is true", () => {
        expect(true).toBe(true);
    });
})

describe("Test app endpoints", () => {

  /* beforeAll(done => {
    mongoose.connect(process.env.MONGO_URL_TEST).then(() => {
      console.log("Connected to the test database");
      done();
    })
  }) */

  // Tests here for /accommodation




 /*  afterAll(done => {
    mongoose.connection.dropDatabase()
    .then(() => {
      return mongoose.connection.close()
      console.log.("Test database dropped and connection closed.")
    })
    .then(() => {
      done();
    })
  }) */


});