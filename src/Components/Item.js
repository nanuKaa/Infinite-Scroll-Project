import React from "react";
import classes from "./Item.module.css";
import { Link } from "react-router-dom";

function Item(props) {
  return (
    <div className={classes.itemSection}>
      <Link to={`/user/${props.id}`}>
        <div className={classes.item}>
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

export default Item;
