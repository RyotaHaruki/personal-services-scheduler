import React, { useCallback, useState, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

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
    title: "60分全身痩せ",
    resourceId: 1
  },
  {
    start: new Date(2024, 0, 1, 12, 0, 0),
    end: new Date(2024, 0, 1, 12, 45, 0),
    title: "45分腹痩せ",
    resourceId: 2
  },
]

function App() {
  const [show, setShow] = useState(false);
  const [pic, setPic] = useState(1);
  const [course, setCourse] = useState(60);
  const [myEvents, setEvents] = useState(events)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const startTime = useRef('00:00')

  const handleSelectCourse = useCallback(
    (event) => {
    console.log(event.target.value);
    console.log(course);

    setCourse(event.target.value);
    console.log(course);

    },[course]
  )

  const handleSelectSlot = useCallback(
    ({ start, end, resourceId }) => {
      if (start.getHours() < 7 ) {
        startTime.current = moment(start).hour(7).format().substring(0, 16);
      } else {
        startTime.current = moment(start).format().substring(0, 16);
      }

      //console.log(startTime.current)
      setPic(resourceId)
      setShow(true)
      /*
      const title = window.prompt('New Event Name')
      if (title) {
        setEvents((prev) => [...prev,
          {
            start: start,
            end: end,
            title: title,
            resourceId: resourceId
          }
        ])
      }*/
    },
    []
  )

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  )

  const handleReservation = useCallback(
    () => {
      console.log(pic);
      console.log(course);
      setShow(false);
    },
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
          step={15}
          timeslots={4}
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
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>スケジュール予約</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="ControlPic">
              <Form.Label>担当</Form.Label>
              <Form.Select aria-label="select" defaultValue={pic} onChange={setPic}>
                <option value="1">トレーナーA</option>
                <option value="2">トレーナーB</option>
                <option value="3">トレーナーC</option>
                <option value="4">トレーナーD</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="ControlTime">
              <Form.Label>開始日時</Form.Label>
              <Form.Control
                type="datetime-local"
                readOnly
                value={startTime.current}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="ControlCourse">
              <Form.Label>コース</Form.Label>
              <Form.Select aria-label="select" onChange={handleSelectCourse} defaultValue={course}>
                <option value="60">60分 全身痩せ</option>
                <option value="45">45分 腹痩せ</option>
                <option value="30">30分 足痩せ</option>
              </Form.Select>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            キャンセル
          </Button>
          <Button variant="primary" onClick={handleReservation}>
            予約
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
  );
}

export default App;
