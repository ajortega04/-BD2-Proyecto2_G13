const app = require("../app");

const request = require("supertest");


describe("POST /api/alquileres/add", () => {
    it("Debería devolver un estado 201 y un mensaje de alquiler creado exitosamente", async () => {
        const res = await request(app)
            .post("/api/alquileres/add")
            .send({
                usuarios_id_usuario: 1,
                peliculas_id_peliculas: 3,
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("message", "Alquiler creado satisfactoriamente");
    });

}
);