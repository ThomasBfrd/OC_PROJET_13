import {FC} from 'react'
import './home-page.scss';
import HeroSubtitle from "../../components/hero-subtitle/hero-subtitle.tsx";
import {HeroCardInformation} from "../../shared/interfaces/hero-card-interface.ts";
import HeroCard from "../../components/hero-card/hero-card.tsx";
import {subtitles} from "../../shared/constants/subtitles.ts";
import {heroCards} from "../../shared/constants/hero-cards.ts";

const HomePage: FC = () => {
    return (
        <>
            <main className="main home">
                <div className="hero">
                    <section className="hero-content">
                        <h2 className="sr-only">Promoted Content</h2>
                        {subtitles.length > 0 && subtitles.map((subtitle: string, id: number) => (
                            <HeroSubtitle subtitle={subtitle} key={id}/>
                        ))}
                        <p className="text">Open a savings account with Argent Bank today!</p>
                    </section>
                </div>
                <section className="features">
                    <h2 className="sr-only">Features</h2>
                    {heroCards.length > 0 && heroCards.map((heroCard: HeroCardInformation, id: number) => (
                        <HeroCard
                            key={id}
                            src={heroCard.src}
                            alt={heroCard.alt}
                            title={heroCard.title}
                            description={heroCard.description}
                        />
                    ))}
                </section>
            </main>
        </>
    )
}

export default HomePage;
