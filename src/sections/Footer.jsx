const Footer = () => {
  return (
    <footer className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
      <div className="flex gap-3">
        <a
          href="https://github.com/HermenySantos"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="social-icon"
        >
          <img src="/assets/github.svg" alt="GitHub" className="w-1/2 h-1/2" />
        </a>
        <a
          href="https://www.linkedin.com/in/hermenegildosantos"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="social-icon"
        >
          <img src="/assets/linkedin.svg" alt="LinkedIn" className="w-1/2 h-1/2" />
        </a>
      </div>

      <p className="text-white-500">
        © {new Date().getFullYear()} Hermenegildo Santos. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
