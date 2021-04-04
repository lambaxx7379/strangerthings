const BASE_URL = "https://strangers-things.herokuapp.com"
const BASE_COHORT = "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT"
const BASE_POSTS =  "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT/posts"
const userLoggedIn = localStorage.getItem("auth")
userPresent()

// activates the register/login/logout buttons

$('.create-account').on('click', async function(event){
    event.preventDefault()
    const usernameRegister = $('#account-username').val()
    const passwordRegister = $('#account-password').val()
    try {
       if($('#account-password').val() === $('#account-password2').val()) {
        const response = await fetch(`${BASE_COHORT}/users/register`, {
            method:"POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: usernameRegister,
                    password: passwordRegister
                }
            })
        })
        const {data} = await response.json()
        localStorage.setItem('auth', data.token)
        $('.activereg').removeClass('show')
        $('#account-username, #account-password, #account-password2').val('')
      } else {
          throw new Error()
      }
    } catch (e) {
        console.error(e)
        $('.registererror').html("There was an error creating the account")
    }
})

$('.clicklogin').on('click', async function(event){
    event.preventDefault()
    const usernameInfo = $('#login-username').val()
    const passwordInfo = $('#login-password').val()
    try {
        const response = await fetch(`${BASE_COHORT}/users/login`, {
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: usernameInfo,
                    password:passwordInfo
                }
            })
        })
        const {data} = await response.json()
        localStorage.setItem('auth',data.token)

            $('.activelogin').removeClass('open')
            $('#login-username, #login-password').val('')
            location.reload()

    } catch (e) {
        console.error(e)
        $('.loginerror').html('Invalid Username or Password')
    }
})

$('.cancel-login').click(function() {
    $('.activelogin').removeClass('open')
})

$('.login').on('click', function(){
    $('.activelogin').addClass('open')
})

$('.register').on('click', function(){
    $('.activereg').addClass('show')
})

$('.cancel-create-account').click(function() {
    $('.activereg').removeClass('show')
})

$('.logout').click(function(){
    console.log('click')
    localStorage.clear()
    location.reload()
})


  function userPresent(){
      if(userLoggedIn) {
          $('.login').css("display", "none")
      }
  }

//renders posts 
const myToken = localStorage.getItem("auth")
  async function fetchPosts() {
      try {
        const response = await fetch(`${BASE_POSTS}`, myToken ? {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("auth")}`
            },
        }: {}
        )
        const {data} = await response.json()
        const postInfo = data.posts
        console.log(postInfo)
        return postInfo
      } catch (error) {
          console.error(error)
      }
  }


function createPosts(post) {
// if (post.isAuthor)
//     {return  $(`
//     <div class="post-card">
//     <h5 class="post-title">${post.title}</h5>
//     <div class="post-description">${post.description}</div>
//     <br>
//     <div class="post-price"><span>Price: </span><span>${post.price}</span></div>
//     <div class="post-location"><span>Location: </span><span>${post.location}</span></div>
//     <div class="post-deliver"><span>Will Deliver: </span><span>${post.willDeliver}</span></div>
//     <br>
//     <div class="post-deliver"><span>Author: </span><span>${post.author.username}</span></div>
//     <div class="post-buttons">
//         <button type="button" class="btn btn-outline-warning post-edit-button">Edit</button>
//         <button type="button" class="btn btn-outline-danger post-delete-button">Delete</button>
//     </div>
//     </div>
//     `).data('post', post)} else {
//     return $(`
//     <div class="post-card">
//     <h5 class="post-title">${post.title}</h5>
//     <div class="post-description">${post.description}</div>
//     <br>
//     <div class="post-price"><span>Price: </span><span>${post.price}</span></div>
//     <div class="post-location"><span>Location: </span><span>${post.location}</span></div>
//     <div class="post-deliver"><span>Will Deliver: </span><span>${post.willDeliver}</span></div>
//     <br>
//     <div class="post-deliver"><span>Author: </span><span>${post.author.username}</span></div>
//     <div class="post-buttons">
//         <button type="button" class="btn btn-outline-success post-message-button">Message</button>
//     </div>
//     </div>
//     `
//     ).data('post', post)}

if (post.isAuthor)
{return  $(`
<div class="post-card">
<div class="card" style="width: 18rem;">

<div class="card-body">
  <h5 class="card-title">${post.title}</h5>
  <p class="card-text">${post.description}</p>
</div>
<ul class="list-group list-group-flush">
  <li class="list-group-item"><span>Price: </span><span>${post.price}</span></li>
  <li class="list-group-item"><span>Location: </span><span>${post.location}</span></li>
  <li class="list-group-item"><span>Will Deliver: </span><span>${post.willDeliver}</span></li>
  <li class="list-group-item"><span>Author: </span><span>${post.author.username}</span></li>
</ul>
<div class="card-body">
    <button type="button" class="btn btn-outline-warning post-edit-button">Edit</button>
    <button type="button" class="btn btn-outline-danger post-delete-button">Delete</button>
</div>
</div>
</div>
`).data('post', post)} else {
    return  $(`
    <div class="post-card">
    <div class="card" style="width: 18rem;">

    <div class="card-body">
      <h5 class="card-title">${post.title}</h5>
      <p class="card-text">${post.description}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><span>Price: </span><span>${post.price}</span></li>
      <li class="list-group-item"><span>Location: </span><span>${post.location}</span></li>
      <li class="list-group-item"><span>Will Deliver: </span><span>${post.willDeliver}</span></li>
      <li class="list-group-item"><span>Author: </span><span>${post.author.username}</span></li>
    </ul>
    <div class="card-body">
       <button type="button" class="btn btn-outline-success post-message-button">Message</button>
    </div>
  </div>
  </div>
    `).data('post', post)
}
}

async function renderPosts() {
    const posts = await fetchPosts()
    posts.sort((a,b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
    })
    posts.forEach(function (postStuff) {
        const postElement = createPosts(postStuff)
        $('.posts').append(postElement)
    })
    addClickListeners()
}

// creates the new post form 
function clearNewForm() {
    $('#create-title').val('')
    $('#create-description').val('')
    $('#create-price').val('')
    $('#create-location').val('')
    $('#create-deliver').val('')
}

$('.new-cancel').click(function() {
    clearNewForm()
})

$('.new-create').on('click', async function (event) {
    event.preventDefault()
    const newTitle = $('#create-title').val()
    const newDescription = $('#create-description').val()
    const newPrice = $('#create-price').val()
    const newLocation = $('#create-location').val()
    const newDeliver = $('#create-deliver').val()


    try {
        const response = await fetch(`${BASE_POSTS}`, {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("auth")}`
            },
            body: JSON.stringify({
                post: {
                    title: newTitle,
                    description: newDescription,
                    price: newPrice,
                    location: newLocation,
                    willDeliver: newDeliver
                }
            })
        })
        const data = await response.json()
        return data
    } 
    catch(error){
        console.error(error)
    } finally {
    renderPosts()
    clearNewForm()
    location.reload()
}
})

// adds click listener for post buttons

function addClickListeners() {
    //deletes signed in users posts
    $('.post-delete-button').on('click',  async function(){
        const postElement = $(this).closest('.post-card')
        const post = postElement.data('post')
        const postId = post._id
        console.log(postId)
    
        try  {
            const response = await fetch(`${BASE_POSTS}/${postId}`, {
                method:"DELETE",
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("auth")}`
                }
            })
            const data = await response.json()
            console.log(data)
            postElement.slideUp()
            return data
            
        } catch (error) {
            console.error(error)
        }
    })

    //sends message
    $('.post-message-button').on('click', function(){
        const postElement = $(this).closest('.post-card')
        const post = postElement.data('post')
        const postId = post._id
        $('.messageform').addClass('appear')

        $('.send-message-button').on('click', async function(event){
            event.preventDefault()
            const messageContent = $('#message-input-area').val()
        
            try {
                const response = await fetch(`${BASE_POSTS}/${postId}/messages`, {
                    method: "POST",
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${localStorage.getItem("auth")}`
                    },
                    body: JSON.stringify({
                      message: {
                        content: messageContent
                      }
                    }) 
                })
                const data = await response.json()
                console.log(data)
                $('.messageform').removeClass('appear')
                $('#message-input-area').val('')
                return data
            }catch(error) {
                console.error(error)
            }
        })

    })

    // edits signed in user's posts 
    $('.post-edit-button').on('click', async function (){
        const postElement = $(this).closest('.post-card')
        const post = postElement.data('post')
        const postId = post._id
        $('.editform').addClass('visible')

        $('.edit-create').on('click', async function(event){
            event.preventDefault()
            const editTitle =$('#edit-title').val()
            const editDescription = $('#edit-description').val()
            const editPrice = $('#edit-price').val()
            const editLocation = $('#edit-location').val()
            const editDeliver = $('#edit-deliver').val()

            try {
                const response = await fetch(`${BASE_POSTS}/${postId}`,{
                    method: "PATCH",
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${localStorage.getItem("auth")}`
                    },
                    body: JSON.stringify({
                      post: {
                        title: editTitle,
                        description: editDescription,
                        price: editPrice,
                        location: editLocation,
                        willDeliver: editDeliver
                      }
                    })
                })
                const data = await response.json()
                console.log(data)
                $('.editform').removeClass('visible')
                $('#edit-title').val('')
                $('#edit-description').val('')
                $('#edit-price').val('')
                $('#edit-location').val('')
                $('#edit-deliver').val('')
                return data
            }catch(error) {
                console.error(error)
            } finally {
                location.reload()
            }
        })
    })
}

//cancels message form  
$('.cancel-send-message').on('click', function(){
    $('.messageform').removeClass('appear')
})

//cancels edit form
$('.edit-cancel').on('click',function(){
    $('.editform').removeClass('visible')
})



// renders the posts 
renderPosts()
