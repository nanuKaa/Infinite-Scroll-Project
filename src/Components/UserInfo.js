import React, { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { getUserInfo } from "../service/UserService";
import UserList from "./UserList";
import Spinner from "../Utils/Spinner";
import UserDetails from "./UserDetails";
import classes from "./UserInfo.module.css";

const initialState = { user: {}, friends: [], page: 1 };

function reducer(state, action) {
  if (action.type === "UPDATE_USER_FRIENDS") {
    return { user: action.user, friends: action.friends, page: action.page };
  }
  if (action.type === "UPDATE_FRIENDS") {
    return { user: state.user, friends: action.friends, page: action.page };
  }

  return initialState;
}

function UserInfo() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [error, setError] = useState(false);

  const params = useParams();

  function loadUserInfo(page, onscroll = false) {
    setIsLoading(true);
    if (!onscroll) {
      getUserInfo(page, params.id)
        .then((res) => {
          const newPage = page + 1;
          const newList = res.friends;

          dispatch({
            type: "UPDATE_USER_FRIENDS",
            user: res.user,
            friends: newList,
            page: newPage,
          });
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      getUserInfo(page, params.id, onscroll)
        .then((res) => {
          const newPage = page + 1;
          const newList = state.friends.concat(res);

          dispatch({ type: "UPDATE_FRIENDS", friends: newList, page: newPage });
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
  }

  window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (!noData) {
        loadUserInfo(state.page, true);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadUserInfo(state.page);
  }, [params.id]);

  return (
    <div className={classes.container}>
      <div className={classes.wraper}>
        {!isLoading && <UserDetails item={state.user} />}
        <div className={classes.friends}>Friends: </div>
        <div>
          <UserList
            items={state.friends}
            onScroll={loadUserInfo.bind(null, state.page, true)}
            noData={noData}
          ></UserList>

          {isLoading && <Spinner />}
          {!isLoading && error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
