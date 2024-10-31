import styles from './navbar.module.css'
import { CgCircleci, CgProfile, CgMenu  } from "react-icons/cg";
import { Drawer} from '@mui/material'
import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Navbar(){
    const [openMenu, setOpenMenu] = useState(false)

    const handleOpenMenu = () =>{
        setOpenMenu(!openMenu)
    }

    return (
        <nav className={styles.navbarContainer}>
            <div className={styles.navbarItens}>
                <Link to ={'/'}>
                <img className={styles.logo}src="/logo.png" alt="Logo" />

                </Link>
                <div className={styles.navbarLinksContainer}>
                    <Link to={'/'} className={styles.navbarLink}> Home</Link>
                    <Link  to= {'/minhasApostas'} className={styles.navbarLink}> Minhas Apostas</Link>
                    <Link to={'/saldo'}>
                        <CgCircleci className={styles.navbarLink} />
                    </Link>
                    <Link to={'/profile'}> 
                    <CgProfile className={styles.navbarLink} />
                    </Link>

                </div>
            </div>

            <div className={styles.mobileNavbarContainer}>
                <Link to={'/'}>
                    <img className={styles.logo}src="/logo.png" alt="Logo" />
                </Link>

                <div className={styles.mobileNavbarBtns} >
                    <Link to={'/saldo'}>
                        <CgCircleci className={styles.navbarLink} />
                    </Link>                
                    <CgMenu className={styles.navbarLink} onClick={handleOpenMenu}/>

                </div>

            </div>
            <Drawer
            anchor={'right'}
            open={openMenu}
            onClose={handleOpenMenu}

            >
                <div className={styles.drawer}>
                    <Link to={'/'} className={styles.navbarLink}> Home</Link>
                    <Link to={'/minhasApostas'} className={styles.navbarLink}> Minhas Apostas</Link>
                    <Link to={'/profile'} className={styles.navbarLink}> Perfil</Link>
                </div>


            </Drawer>


        </nav>
    )

}