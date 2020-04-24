import React, { useState, useEffect } from 'react'
import '../styles/profile.scss'
import '../styles/details.scss'
import moment from 'moment';
// import axios from 'axios';
// import { coreURL } from './Utilities';
// import moment from 'moment';



const Details = (props) => {
  const [profile, setProfile] = useState(false)


  return (
    <div className="profile-page d-block mx-0">
      <div className="container-fluid profile-header">
        <div className="row">
          <div className="col-lg-7 col-md-10 py-5">
          </div>
        </div>
      </div>
      <div className="container-fluid mt--7 px-0 mx-0">
        <div className="container mx-0">
          <div className="info-card full-page">
            <div className="card-body">
              <div className={`status-bar ${props.data.status}`}></div>
              <div className="px-3 pt-1 pb-1 type-title">
                <h2 className="type pt-2">
                  <i className="fa fa-bullseye text-danger"></i> {props.data.type}
                </h2>
                <span>
                  {moment(props.data.timestamp).format('MMMM D, YYYY')} ({moment(props.data.timestamp).fromNow()})
                </span>
              </div>



              <div className="info-body">

                <center>
                  <div className="mt-1">
                    {
                      profile ? (
                        <span>
                          <img src={""} alt="reportee-avatar" className="reportee-img" />
                          {"Bryce Mercines"}
                          <br />
                        </span>
                      ) : (
                          <div className="event-flow">

                            <div>
                              <p className="text-left"><small>Reportee:</small></p>
                              <div className="event-block">
                                <div className="reportee-profile">
                                  <div className="skeleton-cards">
                                    <div className="skeleton-card info-card-loader">
                                      <div className="dot"><div /></div>
                                      <div className="line"><div /></div>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <p className="m-3"><i className="fa fa-arrow-right text-primary" /></p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <p className="text-left"><small>Responder:</small></p>
                              <div className="event-block">
                                <div className="reportee-profile">
                                  <div className="skeleton-cards">
                                    <div className="skeleton-card info-card-loader">
                                      <div className="dot"><div /></div>
                                      <div className="line"><div /></div>
                                    </div>
                                  </div>
                                </div>
                                {/* <div>
                                  <p className="my-3 ml-3"><i className="fa fa-arrow-right text-primary" /></p>
                                </div> */}
                              </div>
                            </div>





                          </div>
                        )
                    }
                  </div>
                </center>

                <hr className="my-3" />

                <div className="mb-3">

                  <p className="detail-title">
                    <i className="fa fa-circle mr-1"></i>Report Location
                  </p>
                  <div className="report-div">
                    {props.data.details}
                  </div>

                  <p className="detail-title">
                    <i className="fa fa-circle mr-1"></i>Report Details
                  </p>
                  <div className="report-div">
                    {props.data.details}
                  </div>


                </div>

              </div>
              <hr />
              <button className="btn btn-dark float-right mb-4"
                onClick={() => { props.setDetails(false) }}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Details;