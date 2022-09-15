export default function CommentComponent({ item }) {
    if (Array.isArray(item)) {
        item.forEach((obj) => {
            if (obj.length === undefined) {
                console.log(obj);
                return (
                    <div>
                        {obj.body}
                    </div>
                )
            } else {
                return <CommentComponent item={obj}/>;
            }
        })
    }
}




// if(Array.isArray(item)){
//     item.forEach((obj) => {
//         if(obj.length === undefined){
//             console.log(obj);
//             return(
//                 <div>
//                     {obj.body}
//                 </div>
//             )
//         }else{
//             arrangeComments(obj);
//         }
//     })
// }

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