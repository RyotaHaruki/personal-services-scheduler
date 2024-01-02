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
  dayRangeHeaderFormat:({ start, end }, culture, localizer) =>
    localizer.format(start, 'YYYY年M月D日', culture) +
    ' - ' +
    localizer.format(end, 'YYYY年M月D日', culture),
};

const messages = {
  week: '週',
  day: '日',
  month: '月',
  previous: '＜',
  next: '＞',
  today: '今日',
  showMore: (total) => `+${total} 他`,
}

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
    ({ start, end, resourceId }) => {
      console.log(start)
      console.log(end)
      console.log(resourceId)
      const title = window.prompt('New Event Name')
      //console.log(title)
      if (title) {
        //console.log(true)
        setEvents((prev) => [...prev,
          {
            start: start,
            end: end,
            title: title,
            resourceId: resourceId
          }
        ])
        //console.log(myEvents)
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
          //defaultDate={new Date()}
          defaultView="month"
          events={myEvents}
          style={{ height: "100vh" }}
          showMultiDayTimes
          step={5}
          timeslots={12}
          resourceIdAccessor="resourceId"
          resources={resourceMap}
          resourceTitleAccessor="resourceTitle"
          formats={formats}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          views={['month', 'week', 'day']}
          popup
          dayLayoutAlgorithm="overlap"
          messages={messages}
          min={new Date(1972, 0, 1, 7, 0, 0)}
          max={new Date(1972, 0, 1, 22, 0, 0)}
        />
      </div>
  );
}

export default App;
