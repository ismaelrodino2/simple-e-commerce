"use client";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineSetting, AiOutlineShopping } from "react-icons/ai";
import { Navigation } from "react-minimal-side-navigation/lib";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

export const ProfilePage = () => {
  const router = useRouter();
  return (
    <div>
      <Navigation
        activeItemId={usePathname()}
        onSelect={({ itemId }) => {
          router.push(itemId);
        }}
        items={[
          {
            title: "Order History",
            itemId: "/profile",
            elemBefore: () => <AiOutlineShopping />,
          },
          {
            title: "Settings",
            itemId: "/profile/settings",
            elemBefore: () => <AiOutlineSetting />,
          },
        ]}
      />
    </div>
  );
};
