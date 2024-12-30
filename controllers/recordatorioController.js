const { Recordatorio, Tarea } = require('../models');

// Crear un nuevo recordatorio
exports.crearRecordatorio = async (req, res) => {
    const id_usuario = req.user.id; // Extraído del token
    const { id_tarea, fecha_recordatorio } = req.body;

    try {
        // Verificar si la tarea pertenece al usuario
        const tarea = await Tarea.findOne({
            where: { id_tarea, id_usuario },
        });

        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada o no pertenece al usuario' });
        }

        // Crear el recordatorio
        const recordatorio = await Recordatorio.create({
            id_tarea,
            fecha_recordatorio,
        });

        res.status(201).json({
            message: 'Recordatorio creado exitosamente',
            data: recordatorio,
        });
    } catch (error) {
        console.error('Error al crear el recordatorio:', error);
        res.status(500).json({ error: 'Error en el servidor al crear el recordatorio' });
    }
};

// Obtener todos los recordatorios de una tarea
exports.obtenerRecordatoriosDeTarea = async (req, res) => {
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

        // Obtener los recordatorios asociados a la tarea
        const recordatorios = await Recordatorio.findAll({
            where: { id_tarea },
        });

        res.status(200).json({
            message: 'Recordatorios obtenidos exitosamente',
            data: recordatorios,
        });
    } catch (error) {
        console.error('Error al obtener los recordatorios de la tarea:', error);
        res.status(500).json({ error: 'Error en el servidor al obtener los recordatorios' });
    }
};

// Actualizar un recordatorio
exports.actualizarRecordatorio = async (req, res) => {
    const id_usuario = req.user.id; // Extraído del token
    const { id_recordatorio, fecha_recordatorio, activo } = req.body;

    try {
        // Verificar si el recordatorio pertenece a una tarea del usuario
        const recordatorio = await Recordatorio.findOne({
            where: { id_recordatorio },
            include: {
                model: Tarea,
                where: { id_usuario },
            },
        });

        if (!recordatorio) {
            return res.status(404).json({ error: 'Recordatorio no encontrado o no pertenece al usuario' });
        }

        // Actualizar el recordatorio
        recordatorio.fecha_recordatorio = fecha_recordatorio || recordatorio.fecha_recordatorio;
        recordatorio.activo = activo !== undefined ? activo : recordatorio.activo;

        await recordatorio.save();

        res.status(200).json({
            message: 'Recordatorio actualizado exitosamente',
            data: recordatorio,
        });
    } catch (error) {
        console.error('Error al actualizar el recordatorio:', error);
        res.status(500).json({ error: 'Error en el servidor al actualizar el recordatorio' });
    }
};

// Eliminar un recordatorio
exports.eliminarRecordatorio = async (req, res) => {
    const id_usuario = req.user.id; // Extraído del token
    const { id_recordatorio } = req.params;

    try {
        // Verificar si el recordatorio pertenece a una tarea del usuario
        const recordatorio = await Recordatorio.findOne({
            where: { id_recordatorio },
            include: {
                model: Tarea,
                where: { id_usuario },
            },
        });

        if (!recordatorio) {
            return res.status(404).json({ error: 'Recordatorio no encontrado o no pertenece al usuario' });
        }

        // Eliminar el recordatorio
        await recordatorio.destroy();

        res.status(200).json({ message: 'Recordatorio eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el recordatorio:', error);
        res.status(500).json({ error: 'Error en el servidor al eliminar el recordatorio' });
    }
};
