const request = require("supertest");
const app = require("../app");

describe("POST /api/usuarios/add", () => {
  it("Debería devolver un estado 201 y un mensaje de registro exitoso cuando se crea un usuario", async () => {
    const res = await request(app)
    .post("/api/usuarios/add")
    .send({
      nombre: "Juan",
      apellido: "Perez",
      genero: "M",
      correo: "JuanPerez@gmail.com",
      contraseña: "contraseña123",
      fecha_nacimiento: "1990-01-01",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty(
      "message",
      "Usuario creado satisfactoriamente"   
    );
    expect(res.body).toHaveProperty("status", true);
  });
});
