$(function(){
    var topics = ["Charlie Bit Me","Grumpy Cat","Doge","SpongeBob","Success Kid","Pepe The Frog"]

    for(i = 0; i < topics.length; i++)
    {
        var button = $("<button>")
        button.attr({
            "class": "btn btn-primary m-2 searchPress",
            "imagesearch": topics[i]
        })
        button.append(topics[i])
        $("#buttonsDiv").append(button)
    }
   
// $("#search1").focus(function(){
//     $(this).addClass("largeInput")
// })

    // $("#search1").focusout(function () {
    //     $(this).removeClass("largeInput")
    // })

$("#newButton").on("click",function(){
    event.preventDefault();
    
    if ($("#search1").val() != "")
    {
        var button = $("<button>")
        button.attr({
            "class": "btn btn-primary m-2 searchPress",
            "imagesearch": $("#search1").val()
        })
        button.append(capitalize($("#search1").val()).trim())
        $("#search1").val("")
        $("#buttonsDiv").append(button)
    }
   

})

$(document).on("click", ".image", function(){
    state = $(this).attr("state")

    if(state === "still"){
        $(this).attr({
        src: $(this).attr("data-animated")
        
    })
        $(this).attr("state", "animated")
    }
    else{
        $(this).attr({
            src: $(this).attr("data-still")
        })
        $(this).attr("state", "still")
    }
})

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    $(document).on("click",".searchPress", function(){
       var search = $(this).attr("imagesearch")
      

        $.ajax({
            'url': "https://api.giphy.com/v1/gifs/search?",
            'method': "GET",
            data:{
                q: search,
                api_key: "nOUQQSqUzlClU2q2HkVzVCYIH3KwVhsc",
                limit: "10"
            }
        }).then(function (response) {
            
            var items = response.data
            console.log(items)
            for(i = 0; i < items.length; i++)
            {

                var card = $("<div>")
                card.attr({
                    class: "card d-inline-block m-2",
                    style: "width: 250px;"
                  
                })

                var image = $("<img>")
                image.attr({
                    src: items[i].images.fixed_height_still.url,
                    class: "card-img-top image",
                    "data-still": items[i].images.fixed_height_still.url,
                    "data-animated": items[i].images.fixed_height.url,
                    state: "still"
                })

                var cardBody = $("<div>")
                    cardBody.attr("class","card-body")

                var rating = $("<h5>")
                    rating.attr("class", "card-title")
                    rating.append("Rating: "+items[i].rating.toUpperCase())
                cardBody.append(rating)
               
                card.append(image)
                card.append(cardBody)



                $("#images").prepend(card)

            }   
            
        })
    
        
    })  

   
})