import React from "react";
import ListItem from "./ListItem";
import classes from "./UserList.module.css";

function UserList(props) {
  window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (!props.noData) {
        props.onScroll();
      }
    }
  };

  return (
    <div className={classes.list}>
      {props.items.map((user) => {
        return (
          <ListItem
            key={user.id}
            id={user.id}
            img={`${user.imageUrl}?v=${user.id}`}
            lastName={user.lastName}
            name={user.name}
            prefix={user.prefix}
            title={user.title}
          />
        );
      })}
    </div>
  );
}

export default UserList;
