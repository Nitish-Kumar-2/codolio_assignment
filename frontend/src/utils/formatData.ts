import { format, parseISO } from 'date-fns';

export const FormatDate=(data:string)=>{
    const date = parseISO(data);
    const dayOfWeek: string = format(date, 'EE');
    const dayAndMonth: string = format(date, 'dd');
    return {day:dayOfWeek,date:dayAndMonth};
}