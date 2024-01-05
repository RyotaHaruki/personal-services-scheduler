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
  const [myEvents, setEvents] = useState(events)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const startTime = useRef('00:00')
  const pic = useRef(1);
  const course = useRef(60);
  const startVal = useRef(new Date());

  const handleSelectCourse = useCallback(
    (event) => {
      course.current = event.target.value;
    },[]
  )
  const handleSelectPic = useCallback(
    (event) => {
      pic.current = event.target.value;
    },[]
  )
  const handleSelectSlot = useCallback(
    ({ start, resourceId }) => {
      if (start.getHours() < 7) {
        startTime.current = moment(start).hour(7).format().substring(0, 16);
        startVal.current = moment(start).hour(7).toDate();
      } else if (start.getHours() >= 22) {
        return;
      } else {
        startTime.current = moment(start).format().substring(0, 16);
        startVal.current = moment(start).toDate();
      }
      pic.current = resourceId;
      setShow(true)
    },
    []
  )

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  )

  const handleReservation = useCallback(
    () => {
      const endVal = moment(startVal.current).clone().add(course.current, 'minutes').toDate();
      if (endVal.getHours() >= 22 && endVal.getMinutes() > 0) {
        return;
      }
      const getTitle = (selected) => {

          if (selected == 60) {
            return '60分 全身痩せ';
          } else if (selected == 45) {
            return '45分 腹痩せ';
          } else {
            return '30分 足痩せ';
          }
      };

      setEvents((prev) => [...prev,
        {
          start: startVal.current,
          end: endVal,
          title: getTitle(course.current),
          resourceId: pic.current
        }
      ])
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
              <Form.Select aria-label="select" defaultValue={pic.current} onChange={handleSelectPic}>
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
              <Form.Select aria-label="select" defaultValue={course.current} onChange={handleSelectCourse}>
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
