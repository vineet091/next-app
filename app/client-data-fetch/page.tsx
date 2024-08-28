"use client";
import useSWR from "swr";
import React, { Suspense, useEffect, useState } from "react";
import Loading from "../loading";
import { addUserAction, fetchUserList, fetchUsersAction, signinUser } from "../actions";

// useEffect hook
//swr, useSwr hooks

const fetcher = (...args: any) => fetch(args).then((res) => res.json());

const ClientDataFetchPage = () => {
  const [userList, setUserList] = useState([]);
  // const [loading, setLoading] = useState(true);

  // USE CUSTOM HOOKS
  // const { data, error, isLoading } = useSWR(
  //   "https://dummyjson.com/users",
  //   fetcher
  // );

  const getUserList = async () => {
    const users = await fetchUserList();
    setUserList(users);
  };

  const addNewUser = async () => {
    const payload = {
      firstName: "Vineet3",
      lastName: "Gupta3",
      email: "vineet3@gupta3.com",
      password: 'hello'
    };
    try {
      const user = await addUserAction(payload);
      console.log(user);
    } catch (err) {
      console.log(err.message);
    }
  };

  const signInUser = async () => {
    const payload = {
      email: "vineet3@gupta3.com",
      password: 'hello'
    };
    try {
      const user = await signinUser(payload, '/client-data-fetch');
      console.log(user);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  // if (error) {
  //   return <div>{error.message}</div>;
  // }

  //  const { users: userList } = data || {};
  return (
    <div>
      <div className="p-3">
        <button
          type="button"
          className="btn btn-primary bg-blue-600 p-2 text-white"
          onClick={addNewUser}
        >
          Add New User
        </button>
      </div>
      <div className="p-3">
        <button
          type="button"
          className="btn btn-primary bg-blue-600 p-2 text-white"
          onClick={signInUser}
        >
          Sign in User
        </button>
      </div>
      <div className="text-black text-xl font-bold p-3">
        Client Data fetching: Users List
      </div>
      {/* {isLoading ? (
        <Loading />
      ) : ( */}
      <ul className="p-3 list-disc list-inside">
        {userList?.map((user: any) => {
          return <li key={`user ${user.id}`}>{user.firstName}</li>;
        })}
      </ul>
      {/* )} */}
    </div>
  );
};

export default ClientDataFetchPage;
