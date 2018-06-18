$(function(){
   
$("#search1").focus(function(){
    $(this).addClass("largeInput")
})

    $("#search1").focusout(function () {
        $(this).removeClass("largeInput")
    })

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

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    $(document).on("click",".searchPress", function(){
       var search = $(this).attr("imagesearch")
      

        $.ajax({
            'url': "http://api.giphy.com/v1/gifs/search?q=" + search +"&api_key=nOUQQSqUzlClU2q2HkVzVCYIH3KwVhsc",
            'method': "GET"
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
                    src: items[i].images.fixed_height.url,
                    class: "card-img-top"
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