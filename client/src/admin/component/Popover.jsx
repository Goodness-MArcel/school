import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUserCircle as faUserCircleRegular,
  faBuilding as faBuildingRegular
} from "@fortawesome/free-regular-svg-icons";
import { NavLink } from "react-router-dom";
import './popover.css'

function AdminPopover({ user }) {
  const popover = (
    <Popover id="popover-positioned-bottom">
      <Popover.Body>
        <div className="">
         <ul className="nav flex-column">
          <li>
            <NavLink to="admin_profile" className='nav-link' style={{color: 'black',fontWeight: 500,textTransform:'capitalize'}}>
              <FontAwesomeIcon icon={faUserCircleRegular} size="1.5x" className="me-1"/>
              admin profile
            </NavLink>
          </li>
          <li>
            <NavLink to="school_profile" className='nav-link' style={{color: 'black',fontWeight: 500,textTransform:'capitalize'}}>
              <FontAwesomeIcon icon={faBuildingRegular} className="me-1"/>
              school profile
            </NavLink>
          </li>
         </ul>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose>
      <img
        src=""
        alt="admin"
        className="admin_pic"
        style={{ cursor: "pointer" }}
      />
    </OverlayTrigger>
  );
}

export default AdminPopover;