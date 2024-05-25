import logoIdp from '../assets/logoIdp.svg'
import styles from './Header.module.css'

export function Header() {
    return (
        <div className={styles.header}>
            <a href="/">
                <img src={logoIdp} alt="Logo IDP" />
            </a>
        </div>
    );
}