export function save(id){
    var form = document.getElementById(id)
    var nome = form.nome.value
    var email = form.elements['email'].value
    var senha = form.elements['confirmarsenha'].value
    return [email,senha,nome]
}

export function validar_cadastro(){
    var nome = cadastro.nome
    var email = cadastro.email
    var senha = cadastro.senha
    var confirmarSenha = cadastro.confirmarsenha
    var num = 0

    if (nome.value.length < 5){

        var i = document.getElementById('iconNomeCadastro')
        i.style.color = '#d3153e'
        nome.style.borderBottomColor= '#d3153e'
        num = +1
    }
    else{
        var i = document.getElementById('iconNomeCadastro')
        i.style.color = '#4070f4'
        nome.style.borderBottomColor= '#4070f4'
    }

    // Campo Email
    if (email.value.length < 5){
        var i = document.getElementById('iconEmailCadastro')
        i.style.color = '#d3153e'
        email.style.borderBottomColor= '#d3153e'
        num = +1
        
    }
    else{
        var i = document.getElementById('iconEmailCadastro')
        i.style.color = '#4070f4'
        email.style.borderBottomColor= '#4070f4'
    }

    if( email.value.indexOf('@') == -1){
        alert('Sem @ ')
        var i = document.getElementById('iconEmailCadastro')
        i.style.color = '#d3153e'
        email.style.borderBottomColor= '#d3153e'
        num = +1
    }
    else if(email.value.split('@')[1] !== 'gmail.com'){
        alert('Sem gmail.com')
        var i = document.getElementById('iconEmailCadastro')
        i.style.color = '#d3153e'
        email.style.borderBottomColor= '#d3153e'
        num = +1
    }
    else{
        var i = document.getElementById('iconEmailCadastro')
        i.style.color = '#4070f4'
        email.style.borderBottomColor= '#4070f4'
    }
    
    

    // Compo senha
    if (senha.value.length < 6){

        var i = document.getElementById('iconSenhaCadastro')
        i.style.color = '#d3153e'
        senha.style.borderBottomColor= '#d3153e'
        num = +1
    }
    else{
        
        var i = document.getElementById('iconSenhaCadastro')
        i.style.color = '#4070f4'
        senha.style.borderBottomColor= '#4070f4'
 
    }
    
    //confirmar senha
    if (confirmarSenha.value.length < 6 || senha.value !== confirmarSenha.value) {

        var i = document.getElementById('iconConfirmarSenhaCadastro')
        i.style.color = '#d3153e'
        confirmarSenha.style.borderBottomColor= '#d3153e'
        confirmarSenha.focus()
        num = +1
    }
    else{
        var i = document.getElementById('iconConfirmarSenhaCadastro')
        i.style.color = '#4070f4'
        confirmarSenha.style.borderBottomColor= '#4070f4'
      
    }

    return num

}

export function validar_login(){
    var email = entrar.loginEmail
    var senha = entrar.loginSenha 
    var num = 0
    
    // Campo email
    if (email.value.length < 5){
       
        var i = document.getElementById('iconEmailLogin')
        i.style.color = '#d3153e'
        email.style.borderBottomColor= '#d3153e'
        num = +1
        alert('erro')
    }
    else{
        var i = document.getElementById('iconEmailLogin')
        i.style.color = '#4070f4'
        email.style.borderBottomColor= '#4070f4'
    }

    if( email.value.indexOf('@') == -1){
        alert('Sem @ ')
        var i = document.getElementById('iconEmailLogin')
        i.style.color = '#d3153e'
        email.style.borderBottomColor= '#d3153e'
        num = +1
    }
    else if(email.value.split('@')[1] !== 'gmail.com'){
        alert('Sem gmail.com')
        var i = document.getElementById('iconEmailLogin')
        i.style.color = '#d3153e'
        email.style.borderBottomColor= '#d3153e'
        num = +1
    }
    else{
        var i = document.getElementById('iconEmailLogin')
        i.style.color = '#4070f4'
        email.style.borderBottomColor= '#4070f4'
    }
    
    // Compo senha
    if (senha.value.length < 6){
        var i = document.getElementById('iconSenhaLogin')
        i.style.color = '#d3153e'
        senha.style.borderBottomColor= '#d3153e'
        num = +1
    }
    else{
        var i = document.getElementById('iconSenhaLogin')
        i.style.color = '#4070f4'
        senha.style.borderBottomColor= '#4070f4'
 
    }

    // retorno
    if(num == 0){
        return [num, email.value, senha.value]
    }
    else{
        return [num]
    }

}

