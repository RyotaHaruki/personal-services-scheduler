import React, { useCallback, useState } from "react";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'moment/locale/ja';

import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const resourceMap = [
  { resourceId: 1, resourceTitle: 'トレーナーA' },
  { resourceId: 2, resourceTitle: 'トレーナーB' },
  { resourceId: 3, resourceTitle: 'トレーナーC' },
  { resourceId: 4, resourceTitle: 'トレーナーD' },
]

const formats = {
  dateFormat: 'D',
  dayFormat: 'D(ddd)',
  monthHeaderFormat: 'YYYY年M月',
  dayHeaderFormat: 'M月D日(ddd)',
  dayRangeHeaderFormat: 'YYYY年M月',
};

const events = [
  {
    start: new Date(2023, 11, 31, 9, 0, 0),
    end: new Date(2023, 11, 31, 10, 0, 0),
    title: "60分腹痩せ",
    resourceId: 1
  },
  {
    start: new Date(2024, 0, 1, 12, 0, 0),
    end: new Date(2024, 0, 1, 12, 45, 0),
    title: "45分足痩せ",
    resourceId: 2
  },
]


function App() {
  const [myEvents, setEvents] = useState(events)

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event Name')
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }])
      }
    },
    [setEvents]
  )

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  )
  return (
      <div className="App">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={myEvents}
          style={{ height: "100vh" }}
          showMultiDayTimes
          step={10}
          resourceIdAccessor="resourceId"
          resources={resourceMap}
          resourceTitleAccessor="resourceTitle"
          formats={formats}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          views={['month', 'week', 'day']}
        />
      </div>
  );
}

export default App;
