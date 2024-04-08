import { useEffect, useState } from "react";
import Logo from "../spinning-dots.svg"
const typecolor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    fairy: "#FF0069",
    fire: "#f0932b",
    fighting: "#30336b",
    psychic: "#26de81",
    grass: "#00b894",
    poison: "#6c5ce7",
    rock: "#2d3436",
    water: "#0190FF",
    ground: "#EFB549",
    ice: "#74b9ff",
    ghost: "#a55eea",
    electric: "#fed330",
    normal: "#95afc0",
    steel: "#fed330"





}
export default function Pokemon() {
    const [card, setProduct] = useState({});



    useEffect(() => {

        getPoke();

    }, [])
    useEffect(() => {
        if (card.types && card.types[0]) {
            const themeColor = typecolor[card.types[0].type.name];
            document.getElementById("card").style.background = `radial-gradient(circle at 50% 0%, ${themeColor} 40%, #ffffff 32%)`;
        }
    }, [card]);
    function getPoke() {

        let id = Math.floor(Math.random() * 150) + 1;
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => res.json())
            .then((card) => setProduct(card))
    }
    let appendType = () => {
        let span = card.types;
        if (card.types && card.types[0]) {
            const themeColor = typecolor[card.types[0].type.name];
            return span.map((value, index) => (
                <span id="ssss" style={{ background: themeColor }} key={index}>{value.type.name}</span>
            ));
        } else {
            return null;
        }
    };
    return (
        <div className="container">
            <div id="card">
                <p className="hp">
                    <span>Hp</span>
                    {card.stats && card.stats[0].base_stat}
                </p>
                <img src={card.sprites && card.sprites.other.dream_world.front_default || Logo} alt="photo" loading="lazy" />

                <h2 className="NamePoke">{card.name || ""}</h2>
                <div className="type">
                    {appendType()}

                </div>
                <div className="states">
                    <div>
                        <span>{card.stats && card.stats[1].base_stat}</span>

                        <p>Attack</p>
                    </div>
                    <div>
                        <span>{card.stats && card.stats[2].base_stat}</span>
                        <p>Defense</p>
                    </div>
                    <div>
                        <span>{card.stats && card.stats[5].base_stat}</span>
                        <p>Speed</p>
                    </div>


                </div>
            </div>
            <button id="btn" onClick={getPoke}>Generate</button>

        </div>
    )
    window.addEventListener('load', getPoke)
}
