const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    getUser,
    signup,
    addMove,
    logOut
}

function getUser (){
    let loggedInUser = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
    return loggedInUser
}

 function signup(name){
    const user ={
            name,
            coins: 100,
            moves: []
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user)) 
 }

function addMove(contact, amount,userNmae){
    contact.coins -= amount;
        const move = {
          to:userNmae,
          at: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          amount: amount,
        };
    contact.moves.push(move);
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(contact)) 
}

function logOut (){
    sessionStorage.clear()
}