var addOnCartButton=document.getElementsByClassName("AddButton");
for(var i=0 ; i<addOnCartButton.length; i++){
    var button=addOnCartButton[i]
    button.addEventListener('click', function(){
        console.log("CLICK")
    })
}