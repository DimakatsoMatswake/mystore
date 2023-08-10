var updateBtns = document.getElementsByClassName('update-cart')

for(var i = 0; i < updateBtns.length; i++)
{
    updateBtns[i].addEventListener('click', function()
    {

        var productId = this.dataset.product
        var action = this.dataset.action
        console.log('productId:', productId, 'action:', action)

        if(user == 'AnonymousUser')
        {
            addCookieItem(productId,action)
        }else 
        {
            console.log('USER:', user)
            updateUserOrder(productId,action)
        }

    })

}

function addCookieItem(productId, action)
{
    console.log('USER:', user)
    console.log('User is not logged in')

    if(action == 'add')
    {
        if(cart[productId] == undefined)
        {
            cart[productId] = {'quantity':1}

        }else
        {
            cart[productId]['quantity'] += 1
        }
    }

    if(action == 'remove')
    {
        cart[productId]['quantity'] -= 1

        if(cart[productId]['quantity'] <= 0)
        {
            console.log('Remove items')
            delete cart[productId]
        }
    }

    console.log('Cart:',cart)

    //Updatating the cookie cart to the updated cart above, and also for the user to see what items they had before leaving the page
    document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
    location.reload()
    
}

function  updateUserOrder(productId, action)
{
    console.log('User is logged in, Sending data')
    var url = '/update_item/'

    fetch(url, 
        {
            method:'POST',
            headers:{'Content-Type':'application/json','X-CSRFToken':csrftoken},
            body:JSON.stringify({'productId': productId,'action':action}) //Sending this object to back-end to the view as json, needs to be a string
        }
        )

        //Returning a promise after the data has been sent -- basically a response from sending the data to view

        .then((response) =>
        {
            return response.json()  //converting the response into a json data
        })

        .then((data) =>
        {
             console.log('data', data); // consoling the data or the response 
             location.reload()  //Data to be passed on refresh
        })
}