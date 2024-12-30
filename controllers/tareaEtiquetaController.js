const { TareaEtiqueta, Etiqueta, Tarea } = require('../models');

// Asignar una etiqueta a una tarea
exports.asignarEtiquetaATarea = async (req, res) => {
    const id_usuario = req.user.id; // Extraído del token
    const { id_tarea, id_etiqueta } = req.body;

    try {
        // Verificar si la tarea pertenece al usuario
        const tarea = await Tarea.findOne({
            where: { id_tarea, id_usuario },
        });

        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada o no pertenece al usuario' });
        }

        // Verificar si la etiqueta pertenece al usuario
        const etiqueta = await Etiqueta.findOne({
            where: { id_etiqueta, id_usuario },
        });

        if (!etiqueta) {
            return res.status(404).json({ error: 'Etiqueta no encontrada o no pertenece al usuario' });
        }

        // Crear la relación entre tarea y etiqueta
        const relacion = await TareaEtiqueta.create({
            id_tarea,
            id_etiqueta,
        });

        res.status(201).json({
            message: 'Etiqueta asignada a la tarea exitosamente',
            data: relacion,
        });
    } catch (error) {
        console.error('Error al asignar la etiqueta a la tarea:', error);
        res.status(500).json({ error: 'Error en el servidor al asignar la etiqueta a la tarea' });
    }
};

// Obtener etiquetas asociadas a una tarea
exports.obtenerEtiquetasDeTarea = async (req, res) => {
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

        // Obtener las etiquetas asociadas a la tarea
        const etiquetas = await TareaEtiqueta.findAll({
            where: { id_tarea },
            include: [
                {
                    model: Etiqueta,
                    attributes: ['id_etiqueta', 'nombre_etiqueta'],
                },
            ],
        });

        res.status(200).json({
            message: 'Etiquetas de la tarea obtenidas exitosamente',
            data: etiquetas,
        });
    } catch (error) {
        console.error('Error al obtener las etiquetas de la tarea:', error);
        res.status(500).json({ error: 'Error en el servidor al obtener las etiquetas de la tarea' });
    }
};

// Eliminar una etiqueta de una tarea
exports.eliminarEtiquetaDeTarea = async (req, res) => {
    const id_usuario = req.user.id; // Extraído del token
    const { id_tarea, id_etiqueta } = req.body;

    try {
        // Verificar si la tarea pertenece al usuario
        const tarea = await Tarea.findOne({
            where: { id_tarea, id_usuario },
        });

        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada o no pertenece al usuario' });
        }

        // Eliminar la relación entre la tarea y la etiqueta
        const relacion = await TareaEtiqueta.destroy({
            where: { id_tarea, id_etiqueta },
        });

        if (!relacion) {
            return res.status(404).json({ error: 'Relación entre tarea y etiqueta no encontrada' });
        }

        res.status(200).json({ message: 'Etiqueta eliminada de la tarea exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la etiqueta de la tarea:', error);
        res.status(500).json({ error: 'Error en el servidor al eliminar la etiqueta de la tarea' });
    }
};
