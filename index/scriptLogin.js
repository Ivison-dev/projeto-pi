import { getAuth, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
import { save, validar_cadastro, validar_login } from '../scripts.js/funcoes.js'

const auth = getAuth();

var buttom2 = document.getElementById('submit')


buttom2.addEventListener('click', ()=>{
    var validacao = validar_cadastro();
    if (! validacao){
        alert('oi')
        var form = save('cadastro')
        alert(form)
 
        createUserWithEmailAndPassword(auth, form[0], form[1]).then(() => {   
              signInWithEmailAndPassword(auth, form[0], form[1]).then(() => {
                            alert('login realizado')
                            updateProfile(auth.currentUser, {
                                   saldo: 1000
                            })
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
 })

var app = new Vue({
        el: '#app',
        data: {
            login: {
                email: {'value': '', 'status': ''},
                senha: {'value': '', 'status': ''}, 
            },
            paginaAtual: '',
            olhos: [
                {'icone': 'uil-eye-slash', tipo:'password'},
                {'icone': 'uil-eye-slash', tipo:'password'}
            ],
            mensagens: []
        },
        methods: {
            // -------- Funções de interação -------- //
            logar(){
                var validacao = this.validarLogin()
                if(! validacao[0]){
                    signInWithEmailAndPassword(auth, validacao[1], validacao[2]).then(() => {
                        alert('login realizado')
                    })
                }
            },

            alterarPaginaAtual(){
                if(this.paginaAtual == ''){
                    this.paginaAtual = 'active'
                }
                else{
                    this.paginaAtual = ''
                }
            },
            
            replacePasswordText(){
                const pwShowHide = document.querySelectorAll(".showHidePw"),
                pwFields = document.querySelectorAll(".password");

                pwShowHide.forEach(eyeIcon =>{
                    eyeIcon.addEventListener("click", ()=>{
                        pwFields.forEach(pwField =>{
                            if(pwField.type ==="password"){
                                pwField.type = "text";
            
                                pwShowHide.forEach(icon =>{
                                    icon.classList.replace("uil-eye-slash", "uil-eye");
                                })
                            }else{
                                pwField.type = "password";
            
                                pwShowHide.forEach(icon =>{
                                    icon.classList.replace("uil-eye", "uil-eye-slash");
                                })
                            }
                        }) 
                    })
                })
            },
            // -------- Funções secundárias -------- //
            validarLogin(){
                var email = this.login.email
                var senha = this.login.senha
                var num = 0
                
                // Campo email
                if (email.value.length < 5){                   
                    this.login.email.status = 'error'
                    num = +1
                    this.addMensagem('perigo', 'Email: Inválido')
                    alert('erro')
                }
                else{
                    this.login.email.status = 'correct'

                    if( email.value.indexOf('@') == -1){
                        alert('Sem @ ')                   
                        this.login.email.status = 'error'
                        num = +1
                    }
                    else if(email.value.split('@')[1] !== 'gmail.com'){
                        alert('Sem gmail.com')                   
                        this.login.email.status = 'error'
                        num = +1
                    }
                    else{
                        this.login.email.status = 'correct'
                    }
                }                            
                
                // Compo senha
                if (senha.value.length < 6){
                    this.login.senha.status = 'error'
                    this.addMensagem('perigo', 'No mínimo 6 caractéres na senha' )
                    num = +1
                }
                else{                    
                    this.login.senha.status = 'correct'
                }
                // retorno
                if(num == 0){
                    return [num, email.value, senha.value]
                }
                else{
                    return [num]
                }
            },

            addMensagem(tipo, texto){
                var tipos = {
                    'sucesso': ['alert-success', '#check-circle-fill'],
                    'informacao': ['alert-primary', '#info-fill'],
                    'erro': ['alert-danger', '#exclamation-triangle-fill'],
                    'perigo': ['alert-warning', '#exclamation-triangle-fill'],
                }
                this.mensagens.push({
                    'tipo': tipos[tipo][0],
                    'icone': tipos[tipo][1],
                    'status': 'show',
                    'texto': texto
                })
            },
        },

        mounted(){
            this.replacePasswordText()
        }
})