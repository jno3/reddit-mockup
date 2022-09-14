export default function CommentComponent({ item }) {
    console.log(item)
    if(item.length !== undefined){
        item.forEach((obj) => {
            return <CommentComponent item={obj}/>
        })
    }else{
        return (
            <div>
                {item[0].body}
            </div>
        )
    }
}

// if (item.length > 1) {
//     item.forEach((obj) => {
//         if (!Array.isArray(obj)) {
//             return (
//                 <div>
//                     {obj.body}
//                 </div>
//             )
//         }
//         return <CommentComponent item={obj}/>;
//     })
// } else {
//     console.log(item[0].body)
//     return (
//         <div>
//             {item[0].body}
//         </div>
//     )
// }