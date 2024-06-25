const request = require("supertest");
const app = require("../app");

describe("POST /api/auth/login", () => {
  it("debería devolver un estado 201 y el id_usuario cuando las credenciales son correctas", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ correo: "juan.perez@example.com", contraseña: "contraseña123" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Inicio de sesión exitoso");
    expect(res.body).toHaveProperty("id_usuario", 1);
    expect(res.body).toHaveProperty("state", true);
  });
});
