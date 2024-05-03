import { create } from 'zustand';


type FechaStore = {
    fechaSeleccionada: Date
    setFechaSeleccionada: (fecha: Date) => void
}


export const useFechaStore = create<FechaStore>((set) => ({
    fechaSeleccionada: new Date(),
    setFechaSeleccionada: (fecha: Date) => set({ fechaSeleccionada: fecha }),
}));
