"use client"

import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { FaRegCalendar } from "react-icons/fa6"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useState } from "react"


export const CalendarAsistencia = () => {

    const [startDate, setStartDate] = useState<Date>(new Date())
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="md:w-[150px] justify-start text-left font-normal" variant="outline">
                    <FaRegCalendar className="mr-2 h-4 w-4 opacity-50" />
                    {format(startDate, "P", { locale: es })}

                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    locale={es}
                    captionLayout="dropdown-buttons" fromYear={2020} toDate={new Date()}
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => date && setStartDate(date)}
                    disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
