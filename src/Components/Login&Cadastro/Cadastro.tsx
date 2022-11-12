import { TextField, Grid, Button, Snackbar } from "@mui/material"
import { 
    CentralizadorBox, CentralizadorElemento, LoginStyled, Titulo, TextCenter, propsButtonLogin
} from "./Login.style"
import { useLogin } from "../../hooks/useLogin"

const Cadastro = () => {
    
    const {
        nome, setNome,
        email, setEmail,
        senha, setSenha,
        mensagem, setMensagem,
        usuario,
        cadastrar
    } = useLogin()

    return(
        <CentralizadorBox>
            <LoginStyled> 
                <Titulo>Cadastro</Titulo>
                <Grid container spacing={2} sx={{p: 2}}>
                    <Grid item xs={12}>
                        <TextField 
                            label='Digite o nome'
                            type='text'
                            value={nome}
                            onChange={(e) => {setNome(e.target.value)}}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label='Digite o email'
                            type='email'
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label='Digite a senha'
                            type='password'
                            value={senha}
                            onChange={(e) => {setSenha(e.target.value)}}
                            fullWidth
                        />
                    </Grid>
                    
                    <Grid item xs={12} >
                        <CentralizadorElemento>
                            <Button style={propsButtonLogin}
                            onClick= {() => cadastrar()}
                            size="medium"
                            >Login</Button>
                        </CentralizadorElemento>
                    </Grid>

                    <Grid item xs={12}>
                        <TextCenter>
                            Já sou cadastrado! <a href='http://localhost:3000/login'>Login</a>
                        </TextCenter>
                    </Grid>                    
                </Grid>
               
            </LoginStyled>
            <Snackbar
                message={mensagem}
                open={mensagem.length > 0} 
                autoHideDuration={2500}
                onClose={() => setMensagem('')}
            />
        </CentralizadorBox>
    )
}

export default Cadastro