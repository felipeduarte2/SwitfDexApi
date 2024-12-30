const { Tarea } = require('../models');

// Crear una tarea
exports.crearTarea = async (req, res) => {
    const { titulo, descripcion, fecha_vencimiento, estado, prioridad, id_categoria } = req.body;
    const id_usuario = req.user.id; // Extraído del token

    try {
        const nuevaTarea = await Tarea.create({
            id_usuario,
            id_categoria,
            titulo,
            descripcion,
            fecha_vencimiento,
            estado,
            prioridad,
        });

        res.status(201).json({
            message: 'Tarea creada exitosamente',
            data: nuevaTarea,
        });
    } catch (error) {
        console.error('Error al crear la tarea:', error);
        res.status(500).json({ error: 'Error en el servidor al crear la tarea' });
    }
};

// Obtener todas las tareas de un usuario
exports.obtenerTareasPorUsuario = async (req, res) => {
    const id_usuario = req.user.id; // Extraído del token

    try {
        const tareas = await Tarea.findAll({
            where: { id_usuario },
        });

        res.status(200).json({
            message: 'Tareas obtenidas exitosamente',
            data: tareas,
        });
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
        res.status(500).json({ error: 'Error en el servidor al obtener las tareas' });
    }
};

// Actualizar una tarea
exports.actualizarTarea = async (req, res) => {
    const id_usuario = req.user.id; // Extraído del token
    const { id_tarea } = req.params;
    const { titulo, descripcion, fecha_vencimiento, estado, prioridad, id_categoria } = req.body;

    try {
        const tarea = await Tarea.findOne({
            where: { id_tarea, id_usuario },
        });

        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada o no pertenece al usuario' });
        }

        tarea.titulo = titulo || tarea.titulo;
        tarea.descripcion = descripcion || tarea.descripcion;
        tarea.fecha_vencimiento = fecha_vencimiento || tarea.fecha_vencimiento;
        tarea.estado = estado || tarea.estado;
        tarea.prioridad = prioridad || tarea.prioridad;
        tarea.id_categoria = id_categoria || tarea.id_categoria;

        await tarea.save();

        res.status(200).json({
            message: 'Tarea actualizada exitosamente',
            data: tarea,
        });
    } catch (error) {
        console.error('Error al actualizar la tarea:', error);
        res.status(500).json({ error: 'Error en el servidor al actualizar la tarea' });
    }
};

// Eliminar una tarea
exports.eliminarTarea = async (req, res) => {
    const id_usuario = req.user.id; // Extraído del token
    const { id_tarea } = req.params;

    try {
        const tarea = await Tarea.findOne({
            where: { id_tarea, id_usuario },
        });

        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada o no pertenece al usuario' });
        }

        await tarea.destroy();

        res.status(200).json({ message: 'Tarea eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        res.status(500).json({ error: 'Error en el servidor al eliminar la tarea' });
    }
};
