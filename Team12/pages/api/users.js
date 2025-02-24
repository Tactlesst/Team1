import { useState, useEffect } from 'react'; // Import useState and useEffect

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/api/data');
    const users = await res.json();

    return { props: { users } };
}

export default function UsersPage({ users }) {
    const [sortedUsers, setSortedUsers] = useState(users); // State for sorted users
    const [sortKey, setSortKey] = useState(null); // State for the current sort key
    const [sortDirection, setSortDirection] = useState('asc'); // State for sort direction

    // Function to handle sorting
    const handleSort = (key) => {
        if (key === sortKey) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }

        const sorted = [...users].sort((a, b) => {
            const aValue = a[key]?.toString().toLowerCase() || ''; // Handle null/undefined
            const bValue = b[key]?.toString().toLowerCase() || '';
            const order = sortDirection === 'asc' ? 1 : -1;
            return aValue.localeCompare(bValue) * order;
        });
        setSortedUsers(sorted);
    };

    return (
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        {/* Dynamically generate table headers */}
                        {Object.keys(users[0] || {}).map(key => (
                            <th key={key} onClick={() => handleSort(key)} style={{ cursor: 'pointer' }}>
                                {key}
                                {sortKey === key && (sortDirection === 'asc' ? ' ▲' : ' ▼')} {/* Sort indicator */}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map(user => (
                        <tr key={user.id}>
                            {/* Dynamically generate table cells */}
                            {Object.keys(users[0] || {}).map(key => (
                                <td key={key}>{user[key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}