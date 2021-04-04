const BASE_URL = "https://strangers-things.herokuapp.com"
const BASE_COHORT = "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT"
const BASE_POSTS =  "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT/posts"


//logout button 
$('.logout').click(function(){
    localStorage.clear()
})

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
    //     `).data('post', post)} 

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
        `).data('post', post)}
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

//activates post buttons
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

//cancels edit form
$('.edit-cancel').on('click',function(){
    $('.editform').removeClass('visible')
})


//fetches signed in user's id
let myId
async function fetchMyId(){
    try {
        const response = await fetch(`${BASE_COHORT}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("auth")}`
              }
        })
        const {data} = await response.json()
        myId = data._id
    }catch(error){
        console.error(error)
    }
}

//fetch and render messages on user profile
async function fetchMessages(){
    try {
        const response = await fetch(`${BASE_COHORT}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("auth")}`
              }
        })
        const {data} = await response.json()
        const messageInfo = data.messages 
        console.log(messageInfo)
        return messageInfo
    }catch(error){
        console.error(error)
    }
}

function createSentMessages(message) {
    if (myId===message.fromUser._id){
    return $(`
    <div class="message-card">
    <div class="card" style="width: 18rem;">
        <ul class="list-group list-group-flush">
        <li class="list-group-item"><span>Post Title: </span><span>${message.post.title}</span></li>
        <li class="list-group-item"><span>Message: </span><span>${message.content}</span></li>
        </ul>
    </div>
    </div>
    `).data('message', message)}
}

function createReceivedMessages(message){
    if (myId!==message.fromUser._id){
        return $(`
        <div class="message-card">
        <div class="card" style="width: 18rem;">
            <ul class="list-group list-group-flush">
            <li class="list-group-item"><span>Post Title: </span><span>${message.post.title}</span></li>
            <li class="list-group-item"><span>Message: </span><span>${message.content}</span></li>
            <li class="list-group-item"><span>Username: </span><span>${message.fromUser.username}</span></li>
            </ul>
        </div>
        </div>
        `).data('message', message)}
}


async function renderSentMessages() {
    const messages = await fetchMessages()
    messages.forEach(function (messageStuff) {
        const messageElement = createSentMessages(messageStuff)
        $('.sent-messages').append(messageElement)
    })
}

async function renderReceivedMessages() {
    const messages = await fetchMessages()
    messages.forEach(function (messageThings) {
        const messageElement = createReceivedMessages(messageThings)
        $('.received-messages').append(messageElement)
    })
}

//renders the post
fetchMyId()
renderSentMessages()
renderReceivedMessages()
renderPosts()