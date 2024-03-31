//Tests for invoices
const request = require("supertest")
const app = require("../app")
const { createData } = require("../_test-common")
const db = require("../db")

beforeEach(createData)// before each test, clean out data
afterAll(async () =>await db.end())

describe("",()=> {
    test("", async()=> {
        const response = await request(app).get("/invoices")
        expect(response.body).toEqual(
            {
                "invoices": [
                    {id: 1, comp_code: "apple"},
                    {id: 2, comp_code: "apple"},
                    {id: 3, comp_code: "ibm"},
                ]
            }
        )
    })
    test("", async()=> {
        const response = await request(app).get("/invoices/1")
        expect(response.body).toEqual(
            {
                "invoice": {
                    id: 1,
                    amt: 100,
                    add_date: '2018-01-01T08:00:00.000Z',
                    paid: false,
                    paid_date: null,
                    company: {
                        code: 'apple',
                        name: 'Apple',
                        description: 'Maker of OSX.',
                    }
                }
            }
        )
    })
    test("", async()=> {
        const response = await request(app).get("/invoices/999")
        expect(response.status).toEqual(404)//not found
    })
    test("", async()=> {
        const response = await request(app).post("/invoices").send({amt:400,comp_code:'ibm'})//add an invoice
        expect(response.body).toEqual(
            {
                "invoice": {
                    id: 4,
                    comp_code: "ibm",
                    amt: 400,
                    add_date: expect.any(String),
                    paid: false,
                    paid_date: null,
                }
            }
        )
    })
    test("", async()=> {
        const response = await request(app).put("/invoices/1").send({amt: 1000, paid: false})//update an invoice
        expect(response.body).toEqual(
            {
                "invoice": {
                    id: 1,
                    comp_code: 'apple',
                    paid: false,
                    amt: 1000,
                    add_date: expect.any(String),
                    paid_date: null,
                }
            }
        )
    })
    test("", async()=> {
        const response = await request(app).put("/invoices/9999").send({amt: 1000})
        expect(response.status).toEqual(404)//try to update,but not found
    })
    test("", async()=> {
        const response = await request(app).put("/invoices/1").send({})
        expect(response.status).toEqual(500)//try to update,but missing required field
    })
    test("", async()=> {
        const response = await request(app).delete("/invoices/1")
        expect(response.body).toEqual({"status": "deleted"})
    })
    test("", async()=> {
        const response = await request(app).delete("/invoices/999")
        expect(response.status).toEqual(404)//try to delete,but not found
    })
})

