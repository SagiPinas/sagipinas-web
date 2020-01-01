import React, { useState, useEffect } from 'react'
import { coreURL } from '../Utilities';
import axios from 'axios';
import CardSkeleton from './card-skeleton'
import moment from 'moment'

const History = () => {

  const [tabState, setTabState] = useState('loading');
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    axios.get(`${coreURL}/public/responder/?responderId=1`)
      .then(res => {
        setHistoryData(res.data.history)
        setTabState('render')
      })
  }, [])


  return (
    <div className="history">
      <input placeholder="Search History" id="sidebar-history-search" />
      <hr className="mb-3" />

      {

        tabState === "render" ? (
          historyData.map(history => {
            return (
              <div className="card fade-in-bottom"
                onClick={(e) => {
                }}>
                <span className="date">
                  {moment(history.timestamp).format('l')}
                </span>
                <span className="status">
                  <i className="fa fa-circle mr-1" />{history.status}
                </span>
                <span className="tag">
                  <i className="fa fa-bars text-primary mr-1"></i>
                  {history.type}
                </span>
                <hr />
                <div className="body">
                  {history.details}
                </div>
              </div>
            )
          })


        ) : (
            <CardSkeleton count={[1, 2, 3, 4, 5, 6, 7, 8]} />
          )

      }




    </div>
  )
}

export default History;