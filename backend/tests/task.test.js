const request = require("supertest");
const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API working",
  });
});

app.post("/tasks", (req, res) => {

  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  res.status(201).json({
    message: "Task created successfully",
  });
});

describe("API Tests", () => {

  // Test 1
  test("GET / should return API working message", async () => {

    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);

    expect(response.body.message).toBe("API working");

  });

  // Test 2
  test("POST /tasks should create task", async () => {

    const response = await request(app)
      .post("/tasks")
      .send({
        title: "Complete assignment",
      });

    expect(response.statusCode).toBe(201);

    expect(response.body.message)
      .toBe("Task created successfully");

  });

  // Test 3
  test("POST /tasks should fail without title", async () => {

    const response = await request(app)
      .post("/tasks")
      .send({});

    expect(response.statusCode).toBe(400);

  });

  // Test 4
  test("Invalid route should return 404", async () => {

    const response = await request(app)
      .get("/invalid");

    expect(response.statusCode).toBe(404);

  });

  // Test 5
  test("POST /tasks accepts valid data", async () => {

    const response = await request(app)
      .post("/tasks")
      .send({
        title: "Testing task",
      });

    expect(response.body.message)
      .toBe("Task created successfully");

  });

});