import actionPromise from '../actionPromise'

export default function actionPromiseAddPhoto(data) {
//   const auth = {
//     'Authorization': 'Bearer ' + data.token
//   }
  let promise = fetch('http://localhost:4000/upload', {
            method: "POST",
            headers: {
               // 'Accept': 'application/json',
                'Content-Type': 'application/json',
                // ...headers  
              },
            body: data
        }).then(d=>console.log("'''________________'''''",d))

// let promise = async () => {
//     await fetch('http://localhost:4000/upload', {
//         method: "POST",
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             // ...headers  
//           },
//         body: data
//     }).text()
// }
  return actionPromise('addPhoto', promise)

}