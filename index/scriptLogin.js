import { getAuth, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
import { save, validar_cadastro, validar_login } from '../scripts.js/funcoes.js'

const auth = getAuth();

let pass = true

onAuthStateChanged(auth, (user) => {
       if (user && pass){
              if(user.displayName == undefined || user.displayName == null){
                     var form = save('cadastro')
                     updateProfile(auth.currentUser, {
                            displayName: form[2]
                   })
              }
              window.location.href = "../loja/cards/loja.html"
       }
 })

var app = new Vue({
        el: '#app',
        data: {
            login: {
                email: {'value': '', 'status': ''},
                senha: {'value': '', 'status': ''}, 
            },
            cadastro: {
                nome: {'value': '', 'status': ''}, 
                email: {'value': '', 'status': ''},
                senha: {'value': '', 'status': ''},
                confirmarSenha: {'value': '', 'status': ''},
            },
            paginaAtual: '',
            mensagens: [],
            baseURL: 'https://FastApi.ivisondev.repl.co',
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

            cadastrar(){
                var validacao = this.validar_cadastro();
                if (! validacao){
                    alert('oi')
                    alert(this.cadastro + 'oi')
                    var email = this.cadastro.email.value,
                    senha = this.cadastro.confirmarSenha.value;

                    pass = false;

                    
            
                    createUserWithEmailAndPassword(auth, email, senha).then(() => {   
                            alert('login no cadastro')                            
                            alert(this.cadastro.nome.value, this.cadastro.email.value)
                            axios.post(this.baseURL + '/user/cadastrar', {
                                'nome': this.cadastro.nome.value,
                                'email': this.cadastro.email.value,
                                'titulo': 'null',
                                'pontos_conhecimento': 1000
                            }).then(response => {
                                alert(response.data.mensagem)
                                window.location.href = "../loja/loja.html"
                            }).catch(error => {
                                alert('Erro: '+ error)
                            });
                            
                            
                        }).catch(error => {
                            alert("Error: " + error)
                            pass = true
                        })                   
                }
                else{
                    alert('erro')
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
                        this.login.email.status = 'error'
                        num = +
                        this.addMensagem('perigo', 'Email: Sem @')
                    }
                    else if(email.value.split('@')[1] !== 'gmail.com'){
                        alert('Sem gmail.com')                   
                        this.login.email.status = 'error'
                        num = +1
                        this.addMensagem('perigo', 'Email: Inválido')
                    }
                    else{
                        this.login.email.status = 'correct'
                    }
                }                            
                
                // Compo senha
                if (senha.value.length < 6){
                    this.login.senha.status = 'error'
                    this.addMensagem('perigo', 'Senha: No mínimo 6 caractéres' )
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

            validar_cadastro(){
                var nome = this.cadastro.nome
                var email = this.cadastro.email
                var senha = this.cadastro.senha
                var confirmarSenha = this.cadastro.confirmarSenha
                var num = 0
            
                if (nome.value.length < 5){
                    this.cadastro.nome.status = 'error'
                    this.addMensagem('perigo', 'Nome: No mínimo 6 caractéres')
                    num = +1
                }
                else{
                    this.cadastro.nome.status = 'correct'
                }
            
                // Campo Email
                if (email.value.length < 5){
                    this.cadastro.email.status = 'error'
                    this.addMensagem('perigo', 'Email: Inválido')
                    num = +1                    
                }
                else{

                    if( email.value.indexOf('@') == -1){
                        alert('Sem @ ')
                        this.addMensagem('perigo', 'Email: Sem @')
                        num = +1
                    }
                    else if(email.value.split('@')[1] !== 'gmail.com'){
                        alert('Sem gmail.com')
                        this.cadastro.email.status = 'error'
                        this.addMensagem('perigo', 'Email: Inválido')
                        num = +1
                    }
                    else{
                        this.cadastro.email.status = 'correct'
                    }
                }                            
                                            
                // Compo senha
                if (senha.value.length < 6){
                    this.cadastro.senha.status = 'error'                    
                    this.cadastro.confirmarSenha.status = 'error'
                    this.addMensagem('perigo', 'Senha: No mínimo 6 caractéres')
                    num = +1

                }
                else{
                    this.cadastro.senha.status = 'correct' 
                    
                    //confirmar senha
                    if (senha.value !== confirmarSenha.value) {            
                        this.cadastro.confirmarSenha.status = 'error'
                        this.addMensagem('perigo', 'Confirmação: Incorreta')
                        num = +1
                    }
                    else{
                        this.cadastro.confirmarSenha.status = 'correct'
                    }
                }                            
            
                return num
            
            },

            addMensagem(tipo, texto){
                var tipos = {
                    'sucessco': ['alert-success', '#check-circle-fill'],
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
        },

})