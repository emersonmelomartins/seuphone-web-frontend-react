// import React, { useEffect, useState } from 'react'
// import { Redirect, Route } from 'react-router-dom'
// import { useAuth } from '../hooks/useAuth'
// import { GetUser } from '../services/userService';

// export function PrivateRouteAdmin({ component: Component, ...rest }) {
  
//   const { signed, user } = useAuth();
//    const  [users, setUsers]  = useState([]);
//   let userId = user.decodedToken.nameid;

//   useEffect(() => {
//     _getUser();
//   }, []);

//   const _getUser = () => {
//     GetUser(userId).then(
//       (resp) => {
//         const updatedData = resp.data.map((item) => {
//           let hasAdmin = false;
//           item.userRoles.forEach(data => {
//             if (data.role.roleName === "ROLE_ADMIN") {
//               hasAdmin = true;
//             }
//           });

//           return { ...item, hasAdmin };

//         });
//         setUsers(updatedData);

//         console.log(updatedData);

//       },
//       (error) => {

//       }
//     );
//   };

//   return (
//     <Route
//       {...rest}
//       render={props =>
//         signed ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//         )
//       }
//     />
//   )
// }