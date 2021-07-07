import React from 'react';
import styleFreesbank from "../../Images/Style.png";
import styles from "./Home.module.css";

function Home() {
    return (
        <>
            <section>
                Lotrac BV
                <h2>Welkom bij Lotrac BV.</h2>
                <p>Lotrac BV is een machinefabriek, opgericht in 1989.
                    Wij kunnen de meest uitdagende projecten, aarzel niet om met ons contact op te nemen!!

                </p>

                <h4 className={styles.infoText}>
                    <div>Lotrac BV,</div>
                    <div> Jan Jansen straat 1</div>
                    <div> 2021 TK Ergenshuizen</div>
                    <div>tel: kies maar wat.</div>
                    <div> email: Lotrac@gmail.com</div>


                </h4>

            </section>
            <div className={styles.imagePosition}>
                <img
                    className={styles.image}
                    src={styleFreesbank}
                    alt="Freesbank"/>
            </div>
        </>

    );
}

export default Home;
