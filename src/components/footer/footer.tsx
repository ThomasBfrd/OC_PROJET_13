import {FC} from 'react'
import './footer.scss';

const Footer: FC = () => {

    const copyrightDate = new Date().getFullYear();

    return (
        <footer className="footer">
            <p className="footer-text">Copyright {copyrightDate} Argent Bank</p>
        </footer>
    )
}

export default Footer;