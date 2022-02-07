import IClass from "./IClass";

interface ICalendar {
  title: string;
  start: Date;
  end: Date;
  // endTime: string;
  classes: IClass;
  daysOfWeek: string;
  allDay: boolean;
}

export default ICalendar;
