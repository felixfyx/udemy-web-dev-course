const currYear = new Date().getFullYear();

function Footer() {
    return <footer className="footer">
        <p>Copyright© {currYear}</p>
    </footer>
}

export default Footer;