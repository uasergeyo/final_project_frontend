export default function d([skip,path],obj){
    path = path.split('.')
    path[0] || path.shift()
    for (let i of path){
        if(obj[i]){
            if(path[path.length-1]===i){
                return obj[i]
            }
            obj=obj[i]
        }else{
            return null
        }
    }
}

// export default function d([skip,path],obj){
//         path = path.split('.')
//         path[0] || path.shift()
//         for (let i of path){
//             if(obj[i]){
//                 console.log(i," exists", 'path = ',obj[i],path[path.length-1])
//                 if(path[path.length-1]===i){
//                     console.log("все в порядке")
//                     return obj[i]
//                 }
//                 obj=obj[i]
//             }else{
//                 console.log(i, " где-то чего-то нет ",obj[i])
//                 return null
//             }
//         }
//     }
