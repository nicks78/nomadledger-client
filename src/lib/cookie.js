import React, { Component } from 'react'
import {Typography, Button} from '@material-ui/core'

const text = {
    fr: "En poursuivant votre navigation sur ce site, vous en acceptez les conditions générales d'utilisation, et notamment l'utilisation des cookies afin de réaliser des statistiques d'audiences, vous proposer des services éditoriaux, une offre publicitaire adaptée à vos centres d'intérêts et la possibilité de partager des contenus sur les réseaux sociaux.",
    en: "By continuing your visit to this site, you accept the terms and conditions of use, including the use of cookies to achieve audience statistics, offer editorial services, an advertising offer tailored to your interests and the ability to share content on social networks."
}

export default class Cookie extends Component {

    state = {
        cookie: false
    }

    acceptCookie = () => {
        this.setState({ cookie: true })
        localStorage.setItem("cookie", "1")
    }


    render() {
        if(this.state.cookie){
            return null 
        }
        return (
            <div style={{position: "fixed", bottom: 0, padding: 20, backgroundColor: "rgba(0,0,0,0.54)"}}>
                <div style={{display: "flex", alignItems: 'center', justifyContent: 'space-around'}}>
                <Typography style={{color:"white"}} variant="caption">{text[localStorage.getItem("locale")]} 
                   
                </Typography>
                <Button variant="contained" onClick={() => this.acceptCookie()}>Agreed</Button>
                </div>

            </div>
        )
    }
}
