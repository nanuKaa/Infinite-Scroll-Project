import React, { useState, useEffect } from "react";
import { getUsers } from "./service/UserService";
import UserList from "./Components/UserList";
import { Route, Switch } from "react-router-dom";
import UserInfo from "./Components/UserInfo";
import Spinner from "./Utils/Spinner";

import classes from "./App.module.css";

function App() {
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [error, setError] = useState(false);

  function loadUsersList(page) {
    setIsLoading(true);
    getUsers(page)
      .then((res) => {
        const newPage = page + 1;
        const newList = userList.concat(res);

        setUserList(newList);
        setPage(newPage);
        if (res.length === 0) setNoData(true);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    loadUsersList(page);
  }, []);

  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/user/:id">
          <UserInfo />
        </Route>

        <Route exact path="/">
          <div className={classes.container}>
            <UserList
              items={userList}
              onScroll={loadUsersList.bind(null, page)}
              noData={noData}
            ></UserList>
            {isLoading && <Spinner />}
            {!isLoading && error && <p>{error}</p>}
          </div>
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;


