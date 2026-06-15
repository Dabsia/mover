import React from "react";
// import FullCalendar from "@fullcalendar/react";
// import { DayGridView } from "@fullcalendar/daygrid/internal.js";
import SideBar from "../components/SideBar";
import Calendar from "../components/Calendar";
// import Calendar from "@toast-ui/react-calendar";
// import Calendar from "@toast-ui/react-calendar"
// import "@toast-ui/calendar/dist/toastui-calendar.min.css";
// import "tui-calendar/dist/tui-calendar.css";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import { ScheduleComponent, Day, Week, Month, Inject } from "@syncfusion/ej2-react-schedule";
import "./calendarPage.css"
// import { momentLocalizer, Calendar } from "react-big-calendar";

const CalendarPage = () => {

    const events = [
        {
          name: 'Anna van Dijk',
          location: 'Keizersgracht 321, 1015 CJ Amsterdam',
          date: '2025-03-24',
          hour: 8,
        },
        {
          name: 'Eva Jansen',
          location: 'Herengracht 142, 1016 BW Amsterdam',
          date: '2025-03-25',
          hour: 10,
        },
        {
          name: 'Demi Wilkinson',
          location: 'Damrak 56, 1012 LL Amsterdam',
          date: '2025-03-26',
          hour: 12,
        },
        {
          name: 'Lars de Vries',
          location: 'Keizersgracht 101, 1015 CJ Amsterdam',
          date: '2025-03-27',
          hour: 8,
        },
        {
          name: 'Bram Bakker',
          location: 'Stationsstraat 22, 1211 EX Hilversum',
          date: '2025-03-27',
          hour: 9,
        },
        {
          name: 'Orlando Diggs',
          location: 'Leidsegracht 88, 1016 CR Amsterdam',
          date: '2025-03-27',
          hour: 11,
        },
        {
          name: 'Drew Cano',
          location: 'Singel 421, 1012 WP Amsterdam',
          date: '2025-03-28',
          hour: 10,
        },
        {
          name: 'Clara Müller',
          location: 'Gijsbrecht van Amstelstraat 134, 1214 BG Hilversum',
          date: '2025-03-27',
          hour: 12,
        },
        {
          name: 'Andi Lane',
          location: 'Koninginneweg 99, 1211 AS Hilversum',
          date: '2025-03-27',
          hour: 13,
        },
        {
          name: 'Manny Due',
          location: 'Keizersgracht 123, 1015 CJ Amsterdam',
          date: '2025-04-14',
          hour: 7,
        },
        {
          name: 'Declan Rice',
          location: 'Keizersgracht 123, 1015 CJ Amsterdam',
          date: '2025-04-17',
          hour: 10,
        },
        {
          name: 'Manny Due',
          location: 'Vijzelstraat 65, 1017 HG Amsterdam',
          date: '2025-04-14',
          hour: 7,
        },
        {
          name: 'Sarah Koenig',
          location: 'Coolsingel 105, 3012 AG Rotterdam',
          date: '2025-04-15',
          hour: 9,
        },
        {
          name: 'James Okafor',
          location: 'Vredenburg 40, 3511 BD Utrecht',
          date: '2025-04-16',
          hour: 11,
        },
        {
          name: 'Lina Müller',
          location: 'Lange Voorhout 74, 2514 EH Den Haag',
          date: '2025-04-17',
          hour: 8,
        },
        {
          name: 'Carlos Garcia',
          location: 'Kruisstraat 201, 5612 CG Eindhoven',
          date: '2025-04-18',
          hour: 14,
        },
        {
          name: 'Emily Zhang',
          location: 'Stationsstraat 10, 6221 BT Maastricht',
          date: '2025-04-18',
          hour: 12,
        },
        {
          name: 'Thomas Dubois',
          location: 'Breestraat 122, 2311 CX Leiden',
          date: '2025-04-20',
          hour: 12,
        },
        {
          name: 'Aisha Bello',
          location: 'Utrechtsestraat 35, 3811 LH Amersfoort',
          date: '2025-04-20',
          hour: 16,
        },
        {
          name: 'Tomiwa Adeyemi',
          location: 'Weena 505, 3013 AL Rotterdam',
          date: '2025-04-21',
          hour: 10,
        },
        {
          name: 'Chidera Okeke',
          location: 'Oudegracht 92, 3511 AV Utrecht',
          date: '2025-04-22',
          hour: 14,
        },
        {
          name: 'Fatima Yusuf',
          location: 'Prinsessegracht 23, 2514 AP Den Haag',
          date: '2025-04-20',
          hour: 9,
        },
        {
          name: 'Emeka Nwosu',
          location: 'Stratumsedijk 14, 5611 ND Eindhoven',
          date: '2025-04-23',
          hour: 17,
        },
        {
          name: 'Zainab Balogun',
          location: 'Nieuwezijds Voorburgwal 276, 1012 RS Amsterdam',
          date: '2025-04-24',
          hour: 11,
        },
        {
          name: 'Ibrahim Musa',
          location: 'Oude Ebbingestraat 23, 9712 HC Groningen',
          date: '2025-04-25',
          hour: 15,
        },
        {
          name: 'Ngozi Chukwu',
          location: 'Nieuwe Rijn 27, 2312 JB Leiden',
          date: '2025-04-26',
          hour: 13,
        },
      ];
      
    // const localizer = momentLocalizer(moment);
    // const localizer = momentLocalizer(moment)
    // const events = [
    //     {
    //         title: "Interview",
    //         start: new Date(2024, 2, 28, 10, 0),
    //         end: new Date(2024, 2, 28, 11, 0),
    //     },
    // ];

    // const eventData = [
    //     {
    //         Id: 1,
    //         Subject: "Meeting",
    //         StartTime: new Date(2024, 2, 28, 10, 0),
    //         EndTime: new Date(2024, 2, 28, 12, 0),
    //         IsAllDay: false
    //     }
    // ];
    return (
        <div className="sidebar_calendar">
            <div>
                <SideBar />
            </div>
            <div className="calendar_page">
                <div className="p-6">
                    <Calendar events={events} />
                </div>
                {/* <ScheduleComponent height="550px" eventSettings={{ dataSource: eventData }}>
                    <Inject services={[Day, Week, Month]} />
                </ScheduleComponent> */}
                {/* <FullCalendar
                    plugins={[DayGridView]}
                    initialView="dayGridMonth"
                    events={[
                        { title: "Meeting", date: "2024-03-28" },
                        { title: "Event", date: "2024-03-30" },
                    ]}
                    height="100vh" // Full height
                /> */}
                {/* <div style={{ height: "80vh", background: "#f4f4f4", padding: "20px" }}>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ backgroundColor: "white", borderRadius: "10px", padding: "10px" }}
                    />
                </div> */}
                {/* <Calendar
                    height="100%"
                    view="month"
                    schedules={[
                        { id: "1", title: "Lunch", category: "time", start: "2024-03-28T12:00:00", end: "2024-03-28T13:00:00" },
                    ]}
                /> */}



            </div>

        </div>
    )
}

export default CalendarPage