
import { useState } from "react";
import {Usuario} from "../@types/usuario";
import { ApiService } from "../services/ApiService";

export function useLogin(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem,setTipoMensagem] = useState<'success' | 'error'  | 'warning'>('success');
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    
    function validarDadosLogin(){
        return email.length > 0 && senha.length > 0
    }
    
    function validarDadosCadastro(){
        return  nome.length > 0 && email.length > 0 && senha.length > 0
    }

    function logar(){
        if (validarDadosLogin()){
            ApiService.post('/autentificacao/login', {
                email,
                senha
            }).then((resposta) => {
                setUsuario(resposta.data)
                setMensagem('logado')
                setUsuario(resposta.data)
                setTipoMensagem('success')
                localStorage.setItem('token', usuario?.nome)
            }).catch((error) => {
                setMensagem(error.response?.data.message)
                setTipoMensagem('error')
            })
        }else{
            setMensagem('Preencha todos os campos')
            setTipoMensagem('warning')
        }     
    }

    function cadastrar(){
        if (validarDadosCadastro()){
                ApiService.post('/autentificacao/cadastro', {
                    nome,
                    email,
                    senha
                }).then((resposta) => {
                    setUsuario(resposta.data)
                    setMensagem('Cadastrado')
                    setUsuario(resposta.data)
                    setTipoMensagem('success')
                }).catch((error) => {
                    setMensagem(error.response?.data.message)
                    setTipoMensagem('error')
                })
        } else{
            setMensagem('Preencha todos os campos')
            setTipoMensagem('warning')
        }   
    }

    function token(){

    }



    return{
        email, setEmail,
        senha, setSenha,
        nome, setNome,
        usuario, setUsuario,
        mensagem, setMensagem,
        tipoMensagem,setTipoMensagem,
        logar, cadastrar,
    }
}