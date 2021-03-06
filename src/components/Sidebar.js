import React, { useState } from "react";
import FeedCard from "./sidebar-components/feedCard";
import History from "./sidebar-components/history";
import Settings from "./sidebar-components/settings";
import zigzag from "../assets/osc.svg";
import "../styles/sidebar.scss";
import sound from "../assets/deduction.mp3";
import io from "socket.io-client";
import { coreURL, toast, notifySound, openSidebarMobile } from "./Utilities";
import InfoCard from "../components/sidebar-components/InfoCard";
import Details from "./Details";
import Profile from "./Profile";
import Widgets from "./Widgets";

const socket = io(coreURL);
const processedReports = [];
const cancelledReports = [];
const verified_reports = [];

const Sidebar = (props) => {
  const [currentCard, setCurrentCard] = useState("");
  const [currentIncident, setCurrentIncident] = useState({});
  const [profile, setProfile] = useState(false);
  const [viewDetails, setDetails] = useState(false);

  const toggleProfile = () => {
    if (profile) {
      setProfile(false);
      openSidebarMobile();
    } else {
      document.getElementById("settings-tab").click();
      setProfile(true);
      setDetails(false);
    }
  };

  const [tab, setTab] = useState("feed");

  const switchTab = (newTab) => {
    if (newTab !== tab) {
      if (newTab === "feed") {
        setProfile(false);
        setDetails(false);
      } else {
        setCurrentCard("");
      }
      setTab(newTab);
    }
  };

  const refreshFeed = () => {
    if (document.contains(document.getElementById("update-feed"))) {
      document.getElementById("update-feed").click();
    }
  };

  const cancelReport = (report_id) => {
    if (!cancelledReports.includes(report_id)) {
      try {
        let cardActive = document.contains(
          document.getElementById(`infocard-${report_id}`)
        );
        let cancelBtn = document.querySelector(".btn-cancel");
        let incident = JSON.parse(localStorage.currentIncident);

        if (incident.uid === report_id && cardActive && cancelBtn !== null) {
          console.log("Report cancelled!");
          cancelBtn.click();
        } else {
          document.getElementById(`feed-card-${report_id}`).style.display =
            "none";
        }
      } catch {
        console.log("cancel: report cancellation failed");
      } finally {
        console.log("cancel: report resolved");
      }
      toast("The user has cancelled the report!", "error");
      notifySound();
      cancelledReports.push(report_id);
    }
  };

  const verifyReport = (report_id, responder_id) => {
    if (!verified_reports.includes(report_id)) {
      try {
        let cardActive = document.contains(
          document.getElementById(`infocard-${report_id}`)
        );
        let incident = JSON.parse(localStorage.currentIncident);
        let user = JSON.parse(localStorage.user);

        if (
          incident.uid === report_id &&
          cardActive &&
          responder_id !== user.id
        ) {
          console.log("Report verfied");
          toast("Report has been verified by another user", "success");
          // setTimeout(() => {
          document.getElementById("deselectCard").click();
          // }, 1500)
        }
      } catch {
        console.log("veify: report not currently viewed");
      } finally {
        console.log("verification: report resolved");
      }
      notifySound();
      verified_reports.push(report_id);
    }
  };

  socket.on("report", (data) => {
    if (!processedReports.includes(data.uid)) {
      notifySound();
      if (localStorage.toast === "true") {
        toast("New incident report!", "alert");
      }
      processedReports.push(data.uid);
      refreshFeed();
    }
  });

  socket.on("cancel_report", (data) => {
    cancelReport(data["report_id"]);
  });

  socket.on("activity", () => {
    document.getElementById("inactive-line").style.display = "none";
    document.getElementById("active-line").style.display = "block";

    setTimeout(() => {
      document.getElementById("inactive-line").style.display = "block";
      document.getElementById("active-line").style.display = "none";
    }, 3000);
  });

  socket.on("verified_report", (data) => {
    verifyReport(data.uid, data.responder);
  });

  return (
    <>
      <div id="sidebar">
        <div id="gradient-loader"></div>
        <audio className="d-none" id="tone" controls>
          <source src={sound} type="audio/mpeg" />
        </audio>
        <div className="sidebar-title">
          <div className="brand">
            <div id="sidebar-logo">
              <div></div>
            </div>
            <strong>SagiPinas | v1</strong>
          </div>

          <div className="side-buttons">
            <span className="menu">
              <img src={zigzag} alt="zag" id="active-line" />
              <div id="inactive-line">--</div>
            </span>
          </div>
        </div>
        <div className="tab-menu">
          <ul>
            <li
              className={tab === "feed" ? "active" : ""}
              onClick={() => {
                switchTab("feed");
              }}
            >
              FEED
            </li>
            <li
              className={tab === "history" ? "active" : ""}
              onClick={() => {
                switchTab("history");
              }}
            >
              HISTORY
            </li>
            <li
              className={tab === "settings" ? "active" : ""}
              onClick={() => {
                switchTab("settings");
              }}
              id="settings-tab"
            >
              SETTINGS
            </li>
          </ul>
        </div>
        <div className="tab">
          {tab === "feed" && (
            <FeedCard
              setCurrentIncident={setCurrentIncident}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          )}

          {tab === "history" && (
            <History
              setDetails={setDetails}
              currentIncident={currentIncident}
              setCurrentIncident={setCurrentIncident}
              viewDetails={viewDetails}
              setProfile={setProfile}
            />
          )}
          {tab === "settings" && <Settings />}
        </div>
      </div>

      <div
        onClick={() => {
          toggleProfile();
        }}
      >
        <Widgets />
      </div>

      {currentCard !== "" ? <InfoCard data={currentIncident} /> : ""}

      {profile && <Profile />}
      {viewDetails && (
        <Details data={currentIncident} setDetails={setDetails} />
      )}
    </>
  );
};

export default Sidebar;
