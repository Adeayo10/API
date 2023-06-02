require("should");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app.js");
const { describe, afterEach } = require("mocha");
const Book = mongoose.model("Book");
const agent = request.agent(app);
process.env.ENV = "Test"

describe("Book CRUD test", () => {
  it("should allow a book to be posted and return read and id", (done) => {   
    const bookPost = {
      title: "my book",
      author: "Favour",
      genre: "History",
    };
    agent
      .post("/api/books")
      .send(bookPost)
      .expect(200)
      .end((err, result) => {
        result.body.read.should.not.equal(true);
        result.body.should.have.property("_id");
        done();
      });
    // deleting mock data from the db  
    afterEach((done)=>{
        Book.deleteMany({}).exec()
        done();
    })  
    // close mongoose connection and server port
    after((done)=>{
        mongoose.connection.close();
        app.server.close(done())
    })
  });
});
