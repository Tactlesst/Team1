export async function getServerSideProps() {
  try {
    const res = await fetch('http://localhost:3000/api/data');

    if (!res.ok) {
      console.error(`API returned an error: ${res.status} ${res.statusText}`);
      return { props: { users: [] } }; // Return empty array on error
    }

    const users = await res.json();
    return { props: { users } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { users: [] } }; // Return empty array on error
  }
}
import { useState } from 'react';
export default function UsersPage({ users }) {
  const [FirstName, setFname] = useState('');
  const [LastName, setLname] = useState('');
  const [Email, setEmail] = useState('');
  const [password, setPnum] = useState('');
  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('/api/addusers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ FirstName, LastName, Email, password }),
  });}
  return (
    <div>
         <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="First Name" value={FirstName} onChange={(e) => setFname(e.target.value)} required />
        <input type="text" placeholder="Last name" value={LastName} onChange={(e) => setLname(e.target.value)} required />
        <input type="email" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)} required />        
        <input type="text" placeholder="Phone Number" value={password} onChange={(e) => setPnum(e.target.value)} required />
        <button type="submit">Add User</button>
      </form>
      <h1>Users</h1>
      {users.map((user) => (
        <p key={user.UserID}>{user.FirstName} {user.LastName}///////{user.Email}</p> // Use UserID as key, and other properties from the database.
      ))}
    </div>
  );
}