import { create } from 'zustand';


type FechaStore = {
    fechaSeleccionada: Date
    setFechaSeleccionada: (fecha: Date) => void
}


const setToStartOfDay = (date: Date): Date => {
    const newDate = new Date(date)
    newDate.setHours(0, 0, 0, 0)
    return newDate
};



export const useFechaStore = create<FechaStore>((set) => ({
    fechaSeleccionada: setToStartOfDay(new Date()),
    setFechaSeleccionada: (fecha: Date) => set({ fechaSeleccionada: fecha }),
}))



// TODO: ENVIAR EL CURSO PARA FILTRAR ALUMNOS POR CURSO

type CursoStore = {
    cursoSeleccionado: string
    setCursoSeleccionado: (curso: string) => void
}

export const useCursoStore = create<CursoStore>((set) => ({
    cursoSeleccionado: "",
    setCursoSeleccionado: (curso: string) => set({ cursoSeleccionado: curso })

}))


