import axios from 'axios';

export const obtenerMateriasPorIdUniversidad = async (idUniversidad) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/api/universidad/${idUniversidad}/materias`
        );
        return response.data;
    } catch (error) {
        console.error(
            `Error al obtener materias para la universidad con ID ${idUniversidad}:`,
            error
        );
        return null;
    }
};

export const obtenerMateriasPorIdCarrera = async (idCarrera) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/api/carrera/${idCarrera}/materias`
        );
        return response.data;
    } catch (error) {
        console.error(
            `Error al obtener materias para la carrera con ID ${idCarrera}:`,
            error
        );
        return null;
    }
};
