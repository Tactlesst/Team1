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
  
  export default function UsersPage({ users }) {
    if (!users || users.length === 0) {
      return <div>No users found.</div>; // Handle empty data
    }
  
    return (
      <div>
        <h1>Users</h1>
        {users.map((user) => (
          <p key={user.UserID}>{user.FirstName} {user.LastName}</p> // Use UserID as key, and other properties from the database.
        ))}
      </div>
    );
  }