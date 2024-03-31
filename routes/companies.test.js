const request = require("supertest")
const app = require("../app")
const { createData } = require("../_test-common")
const db = require("../db")

beforeEach(createData)//before each test, clean out data

afterAll(async () =>await db.end())

describe("", ()=> {
    test("", async ()=> {
        const response = await request(app).get("/companies")
        expect(response.body).toEqual(
            {
                "companies": [
                    {code: "apple", name: "Apple"},
                    {code: "ibm", name: "IBM"},
                ]
            })
    })
    test("", async ()=> {
        const response = await request(app).get("/companies/apple")
        expect(response.body).toEqual(
            {
                "company": {
                    code: "apple",
                    name: "Apple",
                    description: "Maker of OSX.",
                    invoices: [1, 2],
                }
            }
        )
    })
    test("", async ()=> {
        const response = await request(app).get("/companies/BLAHBLAH")
        expect(response.status).toEqual(404)//not found
    })
    test("", async ()=> {
        const response = await request(app).post("/companies").send({name:"TacoTime",description:"Yum!"})
        expect(response.body).toEqual(
            {
                "company": {
                    code: "tacotime",
                    name: "TacoTime",
                    description: "Yum!",
                }
            }
        )
    })
    test("", async ()=> {
        const response = await request(app).post("/companies").send({name:"Apple",description:"Huh?"})
        expect(response.status).toEqual(500)//try to add, but conflict
    })
    test("", async ()=> {
        const response = await request(app).put("/companies/apple").send({name: "AppleEdit", description: "NewDescrip"})
        expect(response.body).toEqual(
            {
                "company": {
                    code: "apple",
                    name: "AppleEdit",
                    description: "NewDescrip",
                }
            }
        )
    })
    test("It should return 404 for no-such-comp", async ()=> {
        const response = await request(app).put("/companies/blargh").send({name: "Blargh"})
        expect(response.status).toEqual(404)//try to update,but not found
    })
    test("", async ()=> {
        const response = await request(app).put("/companies/apple").send({})
        expect(response.status).toEqual(500)//try to update, but missing required field
    })
    test("", async ()=> {
        const response = await request(app).delete("/companies/apple")
        expect(response.body).toEqual({"status": "deleted"})//matched exactly
    })
    test("", async ()=> {
        const response = await request(app).delete("/companies/blargh")
        expect(response.status).toEqual(404)//try to delete,but not found
    })
})

