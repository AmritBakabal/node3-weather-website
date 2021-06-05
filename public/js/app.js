console.log('This is a client side javascript');

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })

//weather for boston
// fetch('http://localhost:3000/weather?address=!').then((response)=>{
    
//     response.json().then((data)=>{
//         if(data.error){
//             return console.log(data.error)
//         }
//         console.log({
//             location:data.location,
//             forecast:data.forecast
//         })
//     })
// })

//form index.hbs
const weatherForm= document.querySelector('form');
const searchElement= document.querySelector('input');
const messageOne= document.querySelector('#message-1'); //for class-> .classname and for id-> #idname
const messageTwo =document.querySelector('#message-2'); //selecting html to javascript.
// messageOne.textContent='javascript';

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();   //it actually prevents the rendering or reloading the page or giving complete control to us. 
    const location= searchElement.value;  //this extracts the inputed value in form. 
    messageOne.textContent ='Loading message...';
    messageTwo.textContent =''; 
    fetch(`http://localhost:3000/weather?address=` + location ).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                return messageOne.textContent = data.error;
            }
            {
                messageOne.textContent = data.location,
                messageTwo.textContent = data.forecast
            }

        })

    })
    console.log(location);
})