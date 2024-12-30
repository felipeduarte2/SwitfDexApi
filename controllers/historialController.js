const { Historial, Tarea } = require('../models');

// Crear una entrada en el historial
exports.crearEntradaHistorial = async (req, res) => {
    const id_usuario = req.user.id; // Extraído del token
    const { id_tarea, cambio_descripcion } = req.body;

    try {
        // Verificar si la tarea pertenece al usuario
        const tarea = await Tarea.findOne({
            where: { id_tarea, id_usuario },
        });

        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada o no pertenece al usuario' });
        }

        // Crear la entrada en el historial
        const historial = await Historial.create({
            id_tarea,
            cambio_descripcion,
        });

        res.status(201).json({
            message: 'Entrada de historial creada exitosamente',
            data: historial,
        });
    } catch (error) {
        console.error('Error al crear la entrada de historial:', error);
        res.status(500).json({ error: 'Error en el servidor al crear la entrada de historial' });
    }
};

// Obtener el historial de una tarea
exports.obtenerHistorialDeTarea = async (req, res) => {
    const id_usuario = req.user.id; // Extraído del token
    const { id_tarea } = req.params;

    try {
        // Verificar si la tarea pertenece al usuario
        const tarea = await Tarea.findOne({
            where: { id_tarea, id_usuario },
        });

        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada o no pertenece al usuario' });
        }

        // Obtener el historial de la tarea
        const historial = await Historial.findAll({
            where: { id_tarea },
            order: [['fecha_cambio', 'DESC']],
        });

        res.status(200).json({
            message: 'Historial obtenido exitosamente',
            data: historial,
        });
    } catch (error) {
        console.error('Error al obtener el historial de la tarea:', error);
        res.status(500).json({ error: 'Error en el servidor al obtener el historial' });
    }
};

// Eliminar una entrada del historial
exports.eliminarEntradaHistorial = async (req, res) => {
    const id_usuario = req.user.id; // Extraído del token
    const { id_historial } = req.params;

    try {
        // Verificar si la entrada del historial pertenece a una tarea del usuario
        const historial = await Historial.findOne({
            where: { id_historial },
            include: {
                model: Tarea,
                where: { id_usuario },
            },
        });

        if (!historial) {
            return res.status(404).json({ error: 'Entrada de historial no encontrada o no pertenece al usuario' });
        }

        // Eliminar la entrada del historial
        await historial.destroy();

        res.status(200).json({ message: 'Entrada de historial eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la entrada de historial:', error);
        res.status(500).json({ error: 'Error en el servidor al eliminar la entrada de historial' });
    }
};
