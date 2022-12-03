import { getAuth, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
import { save, validar_cadastro, validar_login } from '../scripts.js/funcoes.js'

const auth = getAuth();

var buttom1 = document.getElementById('logar')
var buttom2 = document.getElementById('submit')

buttom1.addEventListener('click', ()=>{
       var validacao = validar_login()
       if(! validacao[0]){
              signInWithEmailAndPassword(auth, validacao[1], validacao[2]).then(() => {
                     alert('login realizado')
              })
       }
}) 


buttom2.addEventListener('click', ()=>{
    var validacao = validar_cadastro();
    if (! validacao){
        alert('oi')
        var form = save('cadastro')
        alert(form)
 
        createUserWithEmailAndPassword(auth, form[0], form[1]).then(() => {   
              signInWithEmailAndPassword(auth, form[0], form[1]).then(() => {
                            alert('login realizado')
              }) 
        })
        
    }
    else{
           alert('erro')
    }
})

onAuthStateChanged(auth, (user) => {
       if (user){
              if(user.displayName == undefined || user.displayName == null){
                     var form = save('cadastro')
                     updateProfile(auth.currentUser, {
                            displayName: form[2]
                   })
              }
              window.location.href = "../loja/loja.html"

       }
       else{
              alert('Usuário não conectado')
       }
 } )