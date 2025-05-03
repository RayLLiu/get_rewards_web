// import React, { useState, useEffect } from 'react';
// import { useApi } from './authenticated/api';

// const UserProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const api = useApi();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const data = await api.get('/user/profile');
//         setProfile(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [api]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!profile) return <div>No profile data</div>;

//   return (
//     <div className="profile-container">
//       <h2>User Profile</h2>
//       <div className="profile-info">
//         <p>Name: {profile.name}</p>
//         <p>Email: {profile.email}</p>
//         <p>Phone: {profile.phone}</p>
//         <p>Member Since: {new Date(profile.createdAt).toLocaleDateString()}</p>
//       </div>
//     </div>
//   );
// };

// export default UserProfile; 