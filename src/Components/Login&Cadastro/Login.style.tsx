import { keyframes, styled } from "@mui/material";

const animate = keyframes`
   0% {background-image: url('images/background.svg')}
   100% {background-image: url('images/background2.svg')}
`

export const CentralizadorBox = styled('div')`
   width: 100%;
   height: 100vh;
   background-repeat: no-repeat;
   background-size: cover;
   animation: ${animate} 8s alternate infinite linear;
   display: flex;
   align-items: center;
   justify-content: center;
`

export const LoginStyled = styled('div')`
    width: 90%;
    background-color: #ffffff;
    max-width: 500px;
    border-radius: 2em;
`


export const Titulo = styled('h1')`
   font-size: 3em;
   text-align: center;
`
export const TextEnd = styled('p')`
   text-align: end;
`

export const TextCenter = styled('p')`
   text-align: center;
`

export const CentralizadorElemento = styled('div')`   
   display: flex;
   width: 100%;
   align-items: center;
   justify-content: center;
`

// Propriedades

export const propsButtonLogin = {
   width: '90%',
   borderRadius: 5,
}