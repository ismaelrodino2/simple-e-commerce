import Link from "next/link";
import Image from "next/image";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

const Avatar = ({ src, alt }: { src: string; alt: string }) => {
  const { logout } = useContext(AuthContext);
  return (
    <Menu
      className={"mr-2"}
      menuButton={
        <MenuButton>
          <Image
            className="h-[30px] w-[30px] border-black300 cursor-pointer rounded-full border hover:border-secondary"
            src={src}
            alt={alt}
            width={100}
            height={100}
          />
        </MenuButton>
      }
      transition
    >
      <MenuItem>
        <Link href={"/profile"}>My Profile</Link>
      </MenuItem>
      <MenuItem>
        <button onClick={logout}>Logout</button>
      </MenuItem>
    </Menu>
  );
};

export default Avatar;
