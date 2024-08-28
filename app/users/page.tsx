import Link from "next/link";
import React from "react";

interface User {
  id: Number;
  name: String;
  email: string;
}

const UserPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
   cache: "no-store",
    // next: {
    //   revalidate: 10,// to refesh data in every 10 sec
    // },
  });
  const users: [User] = await res.json();
  return (
    <>
      <div className="pb-3">This is Users Page</div>
      <Link href={"/users/adduser"} className="btn btn-primary btn-sm">Add User</Link>
      <div className="pt-3">{new Date().toLocaleTimeString()}</div>
      <table className="table table-bordered border-black">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user) => (
          <tr key={`${user.id}`}><td>{user.name}</td><td>{user.email}</td></tr>
        ))}
        </tbody>
      
      </table>
    </>
  );
};

export default UserPage;
