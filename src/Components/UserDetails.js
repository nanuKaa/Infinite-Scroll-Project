import React from "react";
import classes from "./UserDetails.module.css";

function UserDetails(props) {
  const data = props.item;
  if (Object.keys(data).length === 0 && data.constructor === Object) return;

  const company = data.company;
  const address = data.address;

  return (
    <div className={classes.info}>
      <img src={data.imageUrl} alt={data.name} />
      <div className={classes.mainInfo}>
        <p>Info</p>
        <div className={classes.user}>
          <div
            className={classes.fullName}
          >{`${data.prefix} ${data.name} ${data.lastName} `}</div>
          <div className={classes.title}>{data.title}</div>
        </div>
        <div>
          <span>Email: </span>
          {data.email}
        </div>
        <div>
          <span>Ip Adress: </span>
          {data.ip}
        </div>
        <div>
          <span>Job Area: </span>
          {data.jobArea}
        </div>
        <div>
          <span>Job Type: </span>
          {data.jobType}
        </div>
      </div>
      <div className={classes.secondary}>
        <p>Address</p>
        <div className="company">{`${company.name} ${company.suffix}`}</div>
        <div>
          <span>City: </span>
          {address.city}
        </div>
        <div>
          <span>Country: </span>
          {address.country}
        </div>
        <div>
          <span>State: </span>
          {address.state}
        </div>
        <div>
          <span>Street Address: </span>
          {address.streetAddress}
        </div>
        <div>
          <span>ZIP: </span>
          {address.zipCode}
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
