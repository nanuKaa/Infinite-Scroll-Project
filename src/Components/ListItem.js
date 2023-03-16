import React from "react";
import classes from "./ListItem.module.css";
import { Link } from "react-router-dom";

function ListItem(props) {
  return (
    <div className={classes.listItemSection}>
      <Link to={`/user/${props.id}`}>
        <div className={classes.listItem}>
          <img src={props.img} alt={props.name} />
          <div className={classes.info}>
            <div className={classes.fullName}>
              {props.prefix} {props.name} {props.lastName}
            </div>

            <div>{props.title}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListItem;
