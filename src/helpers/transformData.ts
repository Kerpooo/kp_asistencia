import { DIAS } from "@prisma/client";

export function stringToDIAS(dia: string): DIAS {
    switch (dia) {
        case "DOMINGO": return DIAS.DOMINGO;
        case "LUNES": return DIAS.LUNES;
        case "MARTES": return DIAS.MARTES;
        case "MIERCOLES": return DIAS.MIERCOLES;
        case "JUEVES": return DIAS.JUEVES;
        case "VIERNES": return DIAS.VIERNES;
        case "SABADO": return DIAS.SABADO;
        default: throw new Error(`El día ${dia} no es un valor válido de DIAS`);
    }
}