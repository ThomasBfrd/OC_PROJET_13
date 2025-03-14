import {FC} from 'react'
import './home-page.scss';
import HeroSubtitle from "../../components/hero-subtitle/hero-subtitle.tsx";
import HeroCard from "../../components/hero-card/hero-card.tsx";

export interface HeroCard {
    src: string;
    alt: string;
    title: string;
    description: string;
}

const HomePage: FC = () => {
    const subtitles: Array<string> = ['No fees.', 'No minimum deposit.', 'High interest rates.']
    const heroCards: Array<HeroCard> = [
        {
            src: 'icon-chat',
            alt: 'Chat Icon',
            title: 'You are our #1 priority',
            description: 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.'
        },
        {
            src: 'icon-money',
            alt: 'Money Icon',
            title: 'More savings means higher rates',
            description: 'The more you save with us, the higher your interest rate will be!'
        },
        {
            src: 'icon-security',
            alt: 'Security Icon',
            title: 'Security you can trust',
            description: 'We use top of the line encryption to make sure your data and money is always safe.'
        },

    ]

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
                    {heroCards.length > 0 && heroCards.map((heroCard: HeroCard, id: number) => (
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
