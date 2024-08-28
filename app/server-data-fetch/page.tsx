import React, { use } from "react";
import { fetchUserList } from "../actions";

// fetch

// const fetchUserList = async () => {
//   try {
//     const response = await fetch("https://dummyjson.com/users",{
//         cache: 'force-cache'
//     });
//     const result = await response.json();
//     return result.users;
//   } catch (err) {
//     throw new Error(err)
//   }
// };

const ServerDataFetchPage = async () => {
  const userList = await fetchUserList();
  console.log(userList);
  return (
    <div>
      <div className="text-black text-xl font-bold p-3">
        Server Data fetching: Users List
      </div>
      <ul className="p-3 list-disc list-inside">
        {userList?.map((user) => {
          return <li key={`user ${user.id}`}>{user.firstName}</li>;
        })}
      </ul>
    </div>
  );
};

export default ServerDataFetchPage;
