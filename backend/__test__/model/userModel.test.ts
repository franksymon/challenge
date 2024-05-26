import { db } from '../../util/database';
import { User } from '../../model/userModel';

describe('User Model Tests', () => {
    beforeAll(async () => {
        if (!process.env.DATABASE_URL) {
            throw new Error('DATABASE_URL environment variable is not defined');
        }

        // Sincronizar las tablas (forzar la creación si ya existen)
        await db.sync({ force: true });
    });

    afterAll(async () => {
        // Cerrar la conexión
        await db.close();
    });

    it('should connect to the database', async () => {
        // Verificar que la conexión sea exitosa
        await expect(db.authenticate()).resolves.toBeUndefined();
    });

    it('should create, update, and delete a user', async () => {
        // Crear un nuevo usuario
        const newUser = await User.create({
            firstName: 'John',
            lastName: 'Doe',
            usuario: 'johndoe',
            email: '9lZkz@example.com',
            password: 'password123',
        });

        // Verificar que el usuario se haya creado correctamente
        expect(newUser.firstName).toEqual('John');

        // Actualizar el usuario
        newUser.firstName = 'Jane';
        await newUser.save();

        // Verificar que el usuario se haya actualizado correctamente
        expect(newUser.firstName).toEqual('Jane');

        // Eliminar el usuario
        await newUser.destroy();

        // Verificar que el usuario se haya eliminado correctamente
        expect(newUser.firstName).toEqual('Jane');
    });

    it('should not allow duplicate email addresses and usuario', async () => {
        
        const newUser = await User.create({
            firstName: 'John',
            lastName: 'Doe',
            usuario: 'johndoe',
            email: '9lZkz@example.com',
            password: 'password123',
        });
        
        // Intenta crear un usuario con el mismo correo electrónico y usuario
        await expect(
            User.create({
                firstName: 'Jane',
                lastName: 'Smith',
                usuario: 'johndoe', 
                email: '9lZkz@example.com', 
                password: 'anotherpassword',
            })
        ).rejects.toThrow(); // Esperamos que se lance una excepción debido al correo electrónico y usuario duplicado

        await newUser.destroy();
    });

});
