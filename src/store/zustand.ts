import { create } from 'zustand';


type FechaStore = {
    fechaSeleccionada: Date
    setFechaSeleccionada: (fecha: Date) => void
}


export const useFechaStore = create<FechaStore>((set) => ({
    fechaSeleccionada: new Date(),
    setFechaSeleccionada: (fecha: Date) => set({ fechaSeleccionada: fecha }),
}));




// TODO: ENVIAR EL CURSO PARA FILTRAR ALUMNOS POR CURSO

type CursoStore = {
    cursoSeleccionado: string | undefined
    setCursoSeleccionado: (curso: string | undefined) => void
}

export const useCursoStore = create<CursoStore>((set) => ({
    cursoSeleccionado: "",
    setCursoSeleccionado: (curso: string | undefined) => set({ cursoSeleccionado: curso })

}))


