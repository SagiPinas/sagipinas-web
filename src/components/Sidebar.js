import React, { useState } from 'react';
import FeedCard from './sidebar-components/feedCard'
import History from './sidebar-components/history'
import Settings from './sidebar-components/settings'


import '../styles/sidebar.scss';


const Sidebar = () => {

  const [tab, setTab] = useState("feed")

  const switchTab = (newTab) => {
    if (newTab !== tab) {
      setTab(newTab);
    }
  }

  return (
    <div id="sidebar">
      <div id="gradient-loader">
      </div>
      <div className="sidebar-title">
        <div id="sidebar-logo">
          <div></div>
        </div>
        <strong>SagiPinas</strong>
      </div>
      <div className="tab-menu">
        <ul>
          <li
            className={tab === "feed" ? "active" : ""}
            onClick={() => { switchTab('feed') }}
          >
            FEED
          </li>
          <li
            className={tab === "history" ? "active" : ""}
            onClick={() => { switchTab('history') }}
          >
            HISTORY
          </li>
          <li
            className={tab === "settings" ? "active" : ""}
            onClick={() => { switchTab('settings') }}
          >
            SETTINGS
          </li>
        </ul>
      </div>
      <div className="tab p-2">
        {(tab === "feed" ? <FeedCard /> : "")}
        {(tab === "history" ? <History /> : "")}
        {(tab === "settings" ? <Settings /> : "")}
      </div>
    </div>
  )
}

export default Sidebar;