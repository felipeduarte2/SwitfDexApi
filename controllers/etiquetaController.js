const { Etiqueta } = require('../models');

// Crear una etiqueta
exports.crearEtiqueta = async (req, res) => {
    const { nombre_etiqueta } = req.body;
    const id_usuario = req.user.id; // Extraído del token

    try {
        const nuevaEtiqueta = await Etiqueta.create({
            nombre_etiqueta,
            id_usuario,
        });

        res.status(201).json({
            message: 'Etiqueta creada exitosamente',
            data: nuevaEtiqueta,
        });
    } catch (error) {
        console.error('Error al crear la etiqueta:', error);
        res.status(500).json({ error: 'Error en el servidor al crear la etiqueta' });
    }
};

// Obtener todas las etiquetas del usuario autenticado
exports.obtenerEtiquetasPorUsuario = async (req, res) => {
    const id_usuario = req.user.id; // Extraído del token

    try {
        const etiquetas = await Etiqueta.findAll({
            where: { id_usuario },
        });

        res.status(200).json({
            message: 'Etiquetas obtenidas exitosamente',
            data: etiquetas,
        });
    } catch (error) {
        console.error('Error al obtener las etiquetas:', error);
        res.status(500).json({ error: 'Error en el servidor al obtener las etiquetas' });
    }
};

// Actualizar una etiqueta
exports.actualizarEtiqueta = async (req, res) => {
    const id_usuario = req.user.id; // Extraído del token
    const { id_etiqueta } = req.params;
    const { nombre_etiqueta } = req.body;

    try {
        const etiqueta = await Etiqueta.findOne({
            where: { id_etiqueta, id_usuario },
        });

        if (!etiqueta) {
            return res.status(404).json({ error: 'Etiqueta no encontrada o no pertenece al usuario' });
        }

        etiqueta.nombre_etiqueta = nombre_etiqueta || etiqueta.nombre_etiqueta;
        await etiqueta.save();

        res.status(200).json({
            message: 'Etiqueta actualizada exitosamente',
            data: etiqueta,
        });
    } catch (error) {
        console.error('Error al actualizar la etiqueta:', error);
        res.status(500).json({ error: 'Error en el servidor al actualizar la etiqueta' });
    }
};

// Eliminar una etiqueta
exports.eliminarEtiqueta = async (req, res) => {
    const id_usuario = req.user.id; // Extraído del token
    const { id_etiqueta } = req.params;

    try {
        const etiqueta = await Etiqueta.findOne({
            where: { id_etiqueta, id_usuario },
        });

        if (!etiqueta) {
            return res.status(404).json({ error: 'Etiqueta no encontrada o no pertenece al usuario' });
        }

        await etiqueta.destroy();

        res.status(200).json({ message: 'Etiqueta eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la etiqueta:', error);
        res.status(500).json({ error: 'Error en el servidor al eliminar la etiqueta' });
    }
};
