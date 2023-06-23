/* eslint-disable no-unused-vars */
import { footerLinks } from "../assets/constants";

const Footer = () => {
  const renderedLinks = footerLinks.map((link) => {
    return (
      <li
        key={link.value}
        className="text-white text-sm md:text-lg cursor-pointer hover:text-sky-500"
      >
        {link.name}
      </li>
    );
  });

  return (
    <div className="bg-slate-950 h-[300px] px-6 py-8 flex jus items-center">
      <div className="max-w-[768px] mx-auto">
        <ul className="flex justify-between ">{renderedLinks}</ul>
        <p className="text-gray-400 text-sm text-center mt-8">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit nisi,
          temporibus reiciendis, at suscipit, distinctio blanditiis esse
          eligendi natus placeat quasi consequatur ut earum hic mollitia modi
          deleniti necessitatibus itaque officiis ipsam vitae obcaecati possimus
          corporis voluptas? Quo adipisci nisi hic maiores mollitia, aliquam
          praesentium consectetur, autem nulla atque ad, labore deleniti
          sapiente corporis. Corporis, voluptate alias. Ullam, eius atque.
        </p>
      </div>
    </div>
  );
};

export default Footer;
