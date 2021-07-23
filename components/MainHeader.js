import Image from 'next/image'
import Link from 'next/link'
import style from '../styles/Navbar.module.css'
import logo from '../public/logo.svg'
export default function Navbar(){
    return(
    <header className = {style.header}>
    <Image src = {logo} alt = "Logo, A picture of eagle" width="100px" height ="100px"/>
    <ul className = {style.ul}>
        <li className = {style.li}>
            <Link href = "/signup">
            <button className = {style.signup}>Sign up</button>
            </Link>
        </li>

        <li className = {style.li}>
            <Link href = "/login">
            <button className = {style.login}>Login</button>
            </Link>
        </li>
    </ul>
    </header>
    )
}