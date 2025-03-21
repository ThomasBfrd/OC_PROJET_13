const HeroCard = ({src, alt, title, description}: {src: string, alt: string, title: string, description: string}) => {
    return (
        <div className="feature-item">
            <img src={`/img/${src}.png`} alt={alt} loading="lazy" className="feature-icon"/>
            <h3 className="feature-item-title">{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default HeroCard;