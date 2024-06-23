const app = require("../app");
const request = require("supertest");


describe("POST /api/comentarios", () => {
    it("Debería devolver un estado 201 y un mensaje de comentario agregado exitosamente", async () => {
        const res = await request(app)
            .post("/api/comentarios/add")
            .send({
                usuarios_id_usuario: 1,
                peliculas_id_peliculas: 3,
                comentario: "Me encantó la película, la recomiendo"
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("message", "Comentario creado satisfactoriamente");
    });

});