const chai = require("chai");
const uploadController = require("../controllers/uploadController")

var request = require("request");

const { expect } = chai;


describe("Validate type", () => {
  it("should return false for non image mimetype", function(done) {
        let result = uploadController.validateType({mimetype:"test/type"})
        expect(result).to.equal(false) 
        done()
    })
  it("should return true for  image mimetype", function(done) {
    let result = uploadController.validateType({mimetype:"image/gif"})
    expect(result).to.equal(true) 
    done()
  })
 });