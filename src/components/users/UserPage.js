import React, { useEffect, useCallback } from "react";
import Layout from "../../layout/Layout";
import { useSelector, useDispatch } from "react-redux";

import PacmanLoader from "../common/PacmanLoader";

import { userActions } from "./userActions";

import "./user.scss";

function UserRow({ user }) {
  const dispatch = useDispatch();
  const { id, username } = user;
  const deleteUser = useCallback(() => {
    dispatch(userActions.deleteUser(id));
  }, [id, dispatch]);
  return <div onClick={deleteUser} className="user-row-label">{username}</div>;
}

function UserList({ userList }) {
  return userList.length > 0 ? (
    userList.map(user => <UserRow user={user} key={user.id} />)
  ) : (
    <div>No users</div>
  );
}

export default function UserPage() {
  const { userList, loadingUsers } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getUsers());
  }, [dispatch]);

  return (
    <Layout page="users">
      <div className="user-page">
        {loadingUsers ? (
          <div className="loader-overlay">
            <PacmanLoader />
          </div>
        ) : (
          <UserList userList={userList} />
        )}
      </div>
    </Layout>
  );
}
