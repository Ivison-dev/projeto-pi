import { TextField, Grid, Button, Snackbar, Alert} from "@mui/material"
import { 
    CentralizadorBox, CentralizadorElemento, LoginStyled, Titulo, TextEnd, TextCenter, propsButtonLogin
} from "./Login.style"
import { useLogin } from "../../hooks/useLogin"

const Login = () => {
    const {
        email, setEmail,
        senha, setSenha,
        tipoMensagem, setTipoMensagem,
        usuario,
        mensagem, setMensagem,
        logar
    } = useLogin()


    return(
        <CentralizadorBox>
            <LoginStyled> 
                <Titulo>Login</Titulo>
                <Grid container spacing={2} sx={{p: 2}}>
                    <Grid item xs={12}>
                        <TextField 
                        label='Digite o email'
                        type='email'
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField sx={{b: 'none'}}
                        label='Digite a senha'
                        type='password'
                        fullWidth
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12}>
                        <TextEnd><a href='#'>Esqueci a senha!</a></TextEnd>
                    </Grid>

                    <Grid item xs={12} alignItems="center">
                        <CentralizadorElemento>
                            <Button 
                            style={propsButtonLogin}
                            size="medium"
                            onClick={() => logar()}
                            >Login</Button>
                        </CentralizadorElemento>
                    </Grid>

                    <Grid item xs={12}>
                        <TextCenter>
                            Você é cadastrado? <a href='http://localhost:3000/cadastro'>Cadastre-se</a>
                        </TextCenter>
                    </Grid>                    
                </Grid>
               

            </LoginStyled>

            <Snackbar
                message={mensagem}
                open={mensagem.length > 0} 
                autoHideDuration={2500}
                onClose={() => setMensagem('')}
            >
                <Alert severity={tipoMensagem} sx={{ width: '100%' }}>
                    {mensagem}
               </Alert>

            </Snackbar>
        </CentralizadorBox>
    )
}

export default Login