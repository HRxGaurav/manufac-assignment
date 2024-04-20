import React from 'react';
import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <nav className={styles.navbar}>
            <h1 className={styles.companyName} onClick={() => navigate('/')}>Manufac</h1>
            <ul className={styles.navbarList}>
                <li className={styles.navbarItem} onClick={() => navigate('/')}>Flavanoids Statistics </li>
                <li className={styles.navbarItem} onClick={() => navigate('/gama_stats')}>Gama Statistics</li>
            </ul>
        </nav>
    );
};

export default Navbar;
