const app = require("../app");
const request = require("supertest");

describe("POST /api/peliculas/add", () => {

    it("Debería devolver un estado 201 y un mensaje de película agregada exitosamente", async () => {
        const res = await request(app)
            .post("/api/peliculas/add")
            .send({
                titulo: "Titanic",
                sinopsis: "Historia de amor entre Jack y Rose",
                precioAlquiler: 1000,
                director: "James Cameron",
                añoEstreno: 1997,
                duracion: 195,
                genero: "Romance",
                imagen: "https://www.titanic.com"
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("message", "Película agregada exitosamente");
    });

});