const { Categoria } = require('../models');

// Crear una nueva categoría
exports.crearCategoria = async (req, res) => {
    const id_usuario = req.user.id; // Extraído del token
    const { nombre_categoria } = req.body;

    try {
        const nuevaCategoria = await Categoria.create({
            id_usuario,
            nombre_categoria,
        });

        res.status(201).json({
            message: 'Categoría creada exitosamente',
            data: nuevaCategoria,
        });
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        res.status(500).json({ error: 'Error en el servidor al crear la categoría' });
    }
};

// Obtener todas las categorías del usuario
exports.obtenerCategorias = async (req, res) => {
    const id_usuario = req.user.id; // Extraído del token

    try {
        const categorias = await Categoria.findAll({
            where: { id_usuario },
            order: [['id_categoria', 'ASC']],
        });

        res.status(200).json({
            message: 'Categorías obtenidas exitosamente',
            data: categorias,
        });
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(500).json({ error: 'Error en el servidor al obtener las categorías' });
    }
};

// Actualizar una categoría
exports.actualizarCategoria = async (req, res) => {
    const id_usuario = req.user.id; // Extraído del token
    const { id_categoria } = req.params;
    const { nombre_categoria } = req.body;

    try {
        const categoria = await Categoria.findOne({
            where: { id_categoria, id_usuario },
        });

        if (!categoria) {
            return res.status(404).json({ error: 'Categoría no encontrada o no pertenece al usuario' });
        }

        categoria.nombre_categoria = nombre_categoria;
        await categoria.save();

        res.status(200).json({
            message: 'Categoría actualizada exitosamente',
            data: categoria,
        });
    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
        res.status(500).json({ error: 'Error en el servidor al actualizar la categoría' });
    }
};

// Eliminar una categoría
exports.eliminarCategoria = async (req, res) => {
    const id_usuario = req.user.id; // Extraído del token
    const { id_categoria } = req.params;

    try {
        const categoria = await Categoria.findOne({
            where: { id_categoria, id_usuario },
        });

        if (!categoria) {
            return res.status(404).json({ error: 'Categoría no encontrada o no pertenece al usuario' });
        }

        await categoria.destroy();

        res.status(200).json({ message: 'Categoría eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
        res.status(500).json({ error: 'Error en el servidor al eliminar la categoría' });
    }
};
