// // components/Calendar.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import searchIcon from "../Assets/search-01.svg"
// import {
//     startOfWeek,
//     addDays,
//     format,
//     addWeeks,
//     subWeeks,
//     isWeekend,
// } from 'date-fns';

// const hours = Array.from({ length: 11 }, (_, i) => 7 + i); // 7AM to 5PM

// const Calendar = ({ events = [] }) => {
//     const navigate = useNavigate()
//     const navigateToUpcomingJob = () => {
//         navigate('/upcoming-jobs-view')
//     }
//     const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 0 }));
//     const todayStr = format(new Date(), 'yyyy-MM-dd');

//     const getWeekDays = () =>
//         Array.from({ length: 7 }).map((_, i) => addDays(currentWeekStart, i));

//     const nextWeek = () => setCurrentWeekStart(addWeeks(currentWeekStart, 1));
//     const prevWeek = () => setCurrentWeekStart(subWeeks(currentWeekStart, 1));

//     const weekDays = getWeekDays();

//     return (
//         <div className="overflow-x-auto">
//             {/* Header with nav */}
//             {/* Header with nav */}
//             {/* Header with nav and centered week label */}
//             <div className="mb-4" 
//             style={{
//                 margin: '0', 
//                 display: 'flex', 
//                 alignItems: 'center',
//                 justifyContent: 'space-between',

//             }}>
//                 {/* Nav Row (left-aligned) */}
//                 <div className="flex items-center justify-start gap-2 mb-2">
//                     <button onClick={prevWeek} className="bg-gray-200 px-3 py-2 rounded">←</button>

//                     {/* Month Selector */}
//                     <select
//                         className="border px-2 py-1 rounded"
//                         value={format(currentWeekStart, 'MM')}
//                         onChange={(e) => {
//                             const newMonth = parseInt(e.target.value) - 1;
//                             const newDate = new Date(currentWeekStart);
//                             newDate.setMonth(newMonth);
//                             setCurrentWeekStart(startOfWeek(newDate, { weekStartsOn: 0 }));
//                         }}
//                     >
//                         {Array.from({ length: 12 }).map((_, idx) => (
//                             <option key={idx} value={String(idx + 1).padStart(2, '0')}>
//                                 {format(new Date(2025, idx, 1), 'MMMM')}
//                             </option>
//                         ))}
//                     </select>

//                     {/* Year Selector */}
//                     <select
//                         className="border px-2 py-1 rounded"
//                         value={format(currentWeekStart, 'yyyy')}
//                         onChange={(e) => {
//                             const newYear = parseInt(e.target.value);
//                             const newDate = new Date(currentWeekStart);
//                             newDate.setFullYear(newYear);
//                             setCurrentWeekStart(startOfWeek(newDate, { weekStartsOn: 0 }));
//                         }}
//                     >
//                         {Array.from({ length: 5 }).map((_, idx) => {
//                             const year = new Date().getFullYear() - 2 + idx;
//                             return <option key={year} value={year}>{year}</option>;
//                         })}
//                     </select>

//                     <button onClick={nextWeek} className="bg-gray-200 px-3 py-2 rounded">→</button>
//                 </div>

//                 {/* Centered Week Label */}
//                 <h2 className="text-lg font-semibold text-center"
//                 >
//                     Week of {format(currentWeekStart, 'MMMM do, yyyy')}
//                 </h2>
//                 <div style={{
//                     position: 'relative'
//                 }}>
//                     <input type="text" placeholder='Search' style={{
//                             outline: 'none',
//                             background: 'rgba(247, 247, 247, 1)',
//                             padding: '5px 5px 5px 40px', 
//                             fontWeight: '400', 
//                             fontSize: '12px', 
//                             color: 'rgba(158, 158, 158, 1)'
//                     }} />
//                     <img src={searchIcon} alt=""  style={{
//                             position: 'absolute',
//                             top: '20%',
//                             left: '7px',
//                             width: '10%',
//                     }} />
//                 </div>
//             </div>



//             {/* Grid */}
//             <div className="grid grid-cols-8 border-t border-l min-w-[1000px]">
//                 {/* Day Headers */}
//                 <div className="col-span-1 border-r border-b h-12 bg-white"
//                     style={{
//                         padding: '35px'
//                     }} />
//                 {weekDays.map((date, i) => {
//                     const isToday = format(date, 'yyyy-MM-dd') === todayStr;
//                     return (
//                         <div
//                             key={i}
//                             className={`border-r border-b h-12 flex flex-col items-center justify-center font-semibold ${isToday ? 'text-white' : 'text-black'
//                                 }`}
//                             style={{
//                                 backgroundColor: isToday ? 'rgba(5, 77, 150, 1)' : 'white',
//                                 padding: '35px'
//                             }}
//                         >
//                             <div className="text-[12px] font-medium"
//                                 style={{
//                                     position: 'relative',
//                                     right: '55px',
//                                     color: isToday ? 'rgba(107, 184, 236, 1)' : 'rgba(113, 113, 122, 1)'
//                                 }}>
//                                 {format(date, 'EEE')}
//                             </div>
//                             <div className="text-[24px] font-normal"
//                                 style={{
//                                     position: 'relative',
//                                     right: '55px'
//                                 }}>
//                                 {format(date, 'dd')}
//                             </div>
//                         </div>
//                     );
//                 })}

//                 {/* Time slots */}
//                 {hours.map((hour, i) => (
//                     <React.Fragment key={i}>
//                         {/* Time label */}
//                         <div className="border-r border-b h-24 flex items-center justify-center text-sm text-gray-600">
//                             {hour < 12 ? `${hour} AM` : `${hour === 12 ? 12 : hour - 12} PM`}
//                         </div>

//                         {/* Cells for each day */}
//                         {weekDays.map((date, idx) => {
//                             const cellDateStr = format(date, 'yyyy-MM-dd');
//                             const isToday = cellDateStr === todayStr;
//                             const isSatOrSun = isWeekend(date);

//                             const event = events.find(
//                                 (ev) => ev.date === cellDateStr && ev.hour === hour
//                             );

//                             return (
//                                 <div
//                                     key={idx}
//                                     className={`border-r border-b h-24 px-2 py-1 text-sm relative ${isSatOrSun ? 'bg-gray-100' : 'bg-white'
//                                         }`}
//                                 >
//                                     {event && (
//                                         <div onClick={navigateToUpcomingJob} className="p-1 text-xs shadow w-full rounded" style={{
//                                             backgroundColor: 'rgba(228, 242, 251, 1)',
//                                             borderLeft: '4px solid rgba(75, 168, 233, 1)',
//                                             height: '96%',
//                                             display: 'flex',
//                                             gap: '10px',
//                                             fontSize: '15px',
//                                             position: 'absolute',
//                                             top: '0',
//                                             left: '0',
//                                             cursor: 'pointer'
//                                         }}>
//                                             <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-[12px] font-bold"
//                                                 style={{ padding: '15px' }}>
//                                                 {event.name
//                                                     .split(' ')
//                                                     .map((n) => n[0])
//                                                     .join('')
//                                                     .toUpperCase()}
//                                             </div>
//                                             <div>
//                                                 <div className="font-semibold">{event.name}</div>
//                                                 <div className="text-[13px] text-gray-700">{event.location}</div>
//                                             </div>

//                                             {/* <div className='text-[11px]'>{event.hour}</div> */}
//                                         </div>
//                                     )}
//                                 </div>
//                             );
//                         })}
//                     </React.Fragment>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Calendar;

// components/Calendar.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from "../Assets/search-01.svg";
import {
    startOfWeek,
    addDays,
    format,
    addWeeks,
    subWeeks,
    isWeekend,
    endOfWeek,
} from 'date-fns';
import { getCalendarByDateRange } from '../api/quote';

const hours = Array.from({ length: 11 }, (_, i) => 7 + i);



const Calendar = () => {
    const navigate = useNavigate();
    // const navigateToUpcomingJob = () => {
    //     navigate('/upcoming-jobs-view');
    // };
    const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 0 }));
    const todayStr = format(new Date(), 'yyyy-MM-dd');

    const getWeekDays = () =>
        Array.from({ length: 7 }).map((_, i) => addDays(currentWeekStart, i));

    const nextWeek = () => setCurrentWeekStart(addWeeks(currentWeekStart, 1));
    const prevWeek = () => setCurrentWeekStart(subWeeks(currentWeekStart, 1));

    const weekDays = getWeekDays();
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const fetchCalendar = async () => {
            const startDate = format(
                startOfWeek(currentWeekStart, { weekStartsOn: 0 }),
                "yyyy-MM-dd"
            );
            const endDate = format(
                endOfWeek(currentWeekStart, { weekStartsOn: 0 }),
                "yyyy-MM-dd"
            );

            const data = await getCalendarByDateRange(startDate, endDate);

            if (data?.result) {
                const mappedEvents = data.result.map(ev => {
                    const evDate = new Date(ev.date);
                    return {
                        date: format(evDate, "yyyy-MM-dd"),   
                        hour: evDate.getHours(),              
                        name: ev.name,
                        location: ev.address,
                        moveId: ev.moveId,
                        moveCode: ev.moveCode
                    };
                });
                setEvents(mappedEvents);
            }
        };

        fetchCalendar();
    }, [currentWeekStart]);
    const handleViewMore = (moveCode, moveId) => {
        // debugger
        sessionStorage.setItem('moveCodeSub', moveCode)
        sessionStorage.setItem('moveIdSub', moveId)
        navigate("/upcoming-jobs-view");
    };


    return (
        <div className="overflow-x-auto">
            {/* Header with navigation and search */}
            <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Navigation Controls */}
                <div className="flex flex-wrap items-center justify-start gap-2">
                    <button onClick={() => {
                        const newDate = new Date(currentWeekStart);
                        newDate.setDate(newDate.getDate() - 7);
                        setCurrentWeekStart(newDate);
                    }}
                        className="bg-gray-200 px-3 py-2 rounded">←</button>

                    {/* Month Selector */}
                    <select
                        className="border px-2 py-1 rounded"
                        value={format(currentWeekStart, 'MM')}
                        onChange={(e) => {
                            const newMonth = parseInt(e.target.value) - 1;
                            const newDate = new Date(currentWeekStart);
                            newDate.setMonth(newMonth);
                            setCurrentWeekStart(startOfWeek(newDate, { weekStartsOn: 0 }));
                        }}
                    >
                        {Array.from({ length: 12 }).map((_, idx) => (
                            <option key={idx} value={String(idx + 1).padStart(2, '0')}>
                                {format(new Date(2025, idx, 1), 'MMMM')}
                            </option>
                        ))}
                    </select>

                    {/* Year Selector */}
                    <select
                        className="border px-2 py-1 rounded"
                        value={format(currentWeekStart, 'yyyy')}
                        onChange={(e) => {
                            const newYear = parseInt(e.target.value);
                            const newDate = new Date(currentWeekStart);
                            newDate.setFullYear(newYear);
                            setCurrentWeekStart(startOfWeek(newDate, { weekStartsOn: 0 }));
                        }}
                    >
                        {Array.from({ length: 5 }).map((_, idx) => {
                            const year = new Date().getFullYear() - 2 + idx;
                            return <option key={year} value={year}>{year}</option>;
                        })}
                    </select>

                    <button onClick={() => {
                        const newDate = new Date(currentWeekStart);
                        newDate.setDate(newDate.getDate() + 7);
                        setCurrentWeekStart(newDate);
                    }} className="bg-gray-200 px-3 py-2 rounded">→</button>
                </div>

                {/* Week Label */}
                <h2 className="text-base sm:text-lg font-semibold text-center">
                    Week of {format(currentWeekStart, 'MMMM do, yyyy')}
                </h2>

                {/* Search Input */}
                <div className="relative w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full sm:w-auto pl-10 pr-3 py-2 rounded text-sm border border-gray-300 bg-gray-100"
                    />
                    <img
                        src={searchIcon}
                        alt="Search Icon"
                        className="absolute top-1/2 left-3 transform -translate-y-1/2 w-4 h-4"
                    />
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="w-full overflow-x-auto">
                <div className="grid grid-cols-8 border-t border-l min-w-[1000px]">
                    {/* Day Headers */}
                    <div className="col-span-1 border-r border-b h-12 bg-white p-4" />
                    {weekDays.map((date, i) => {
                        const isToday = format(date, 'yyyy-MM-dd') === todayStr;
                        return (
                            <div
                                key={i}
                                className={`border-r border-b h-12 flex flex-col items-center justify-center font-semibold ${isToday ? 'text-white' : 'text-black'}`}
                                style={{
                                    backgroundColor: isToday ? 'rgba(5, 77, 150, 1)' : 'white',
                                }}
                            >
                                <div className="text-xs font-medium text-gray-500">
                                    {format(date, 'EEE')}
                                </div>
                                <div className="text-lg font-normal">
                                    {format(date, 'dd')}
                                </div>
                            </div>
                        );
                    })}

                    {/* Time Slots */}
                    {hours.map((hour, i) => (
                        <React.Fragment key={i}>
                            {/* Time Label */}
                            <div className="border-r border-b h-24 flex items-center justify-center text-sm text-gray-600">
                                {hour < 12 ? `${hour} AM` : `${hour === 12 ? 12 : hour - 12} PM`}
                            </div>

                            {/* Day Cells */}
                            {weekDays.map((date, idx) => {
                                const cellDateStr = format(date, 'yyyy-MM-dd');
                                const isSatOrSun = isWeekend(date);

                                const event = events.find(
                                    (ev) => ev.date === cellDateStr && ev.hour === hour
                                );

                                return (
                                    <div
                                        key={idx}

                                        className={`border-r border-b h-24 px-2 py-1 text-sm relative ${isSatOrSun ? 'bg-gray-100' : 'bg-white'}`}
                                    >
                                        {event && (
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: '0',
                                                    left: '0',
                                                    height: '100%',
                                                    width: '100%',
                                                    cursor: 'pointer',
                                                    paddingTop: '10px',
                                                    paddingLeft: '10px',
                                                    backgroundColor: 'rgba(228, 242, 251, 1)',
                                                    borderLeft: '4px solid rgba(75, 168, 233, 1)'
                                                }}
                                                onClick={() => handleViewMore(event.moveCode, event.moveId)}
                                                className="p-::contentReference[oaicite:9]{index=9}"
                                            // className="p-1 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition text-xs"
                                            >
                                                <div style={{
                                                    padding: '15px',

                                                }} className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-[12px] font-bold">
                                                    {event.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
                                                </div>
                                                <div>
                                                    <div style={{
                                                        maxWidth: '70%',
                                                        whiteSpace: 'nowrap',
                                                        textOverflow: 'ellipsis',
                                                        overflow: 'auto',
                                                        scrollbarWidth: 'none',
                                                        msOverflowStyle: 'none'
                                                    }} className="font-semibold">{event.name}</div>
                                                    <div style={{
                                                        maxWidth: '90%',
                                                        whiteSpace: 'nowrap',
                                                        textOverflow: 'ellipsis',
                                                        overflow: 'auto',
                                                        scrollbarWidth: 'none',
                                                        msOverflowStyle: 'none'

                                                    }} className="text-[13px] text-gray-700">{event.location}</div>
                                                </div>

                                            </div>

                                        )}
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
