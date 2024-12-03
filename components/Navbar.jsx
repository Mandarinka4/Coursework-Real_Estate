import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav style={styles.navbar}>
            <div style={styles.logo}>
                <Link href="/">Real Estate</Link>
            </div>
            <div style={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>
            <ul style={{ ...styles.menu, ...(menuOpen ? styles.menuOpen : {}) }}>
                <li style={styles.menuItem}>
                    <Link href="/">Home</Link>
                </li>
                <li style={styles.menuItem}>
                    <Link href="/search">Search</Link>
                </li>
                <li style={styles.menuItem}>
                    <Link href="/search?purpose=for-sale">Buy Property</Link>
                </li>
                <li style={styles.menuItem}>
                    <Link href="/search?purpose=for-rent">Rent Property</Link>
                </li>
            </ul>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        backgroundColor: '#2b6cb0',
        color: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 10,
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    menuToggle: {
        fontSize: '1.5rem',
        cursor: 'pointer',
        display: 'none',
    },
    menu: {
        display: 'flex',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        transition: 'all 0.3s ease',
    },

    menuOpen: {
        display: 'block',
        flexDirection: 'column',
        position: 'absolute',
        top: '100%',
        left: 0,
        width: '100%',
        backgroundColor: '#2b6cb0',
    },
    menuItem: {
        margin: '0 1rem',
        cursor: 'pointer',
    },
    '@media (max-width: 768px)': {
        menu: {
            display: 'none',
        },
        menuToggle: {
            display: 'block',
        },
    },
};

export default Navbar;
