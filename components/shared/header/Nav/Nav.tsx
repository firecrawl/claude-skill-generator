import HeaderNavItem from "./Item/Item";

export default function HeaderNav() {
  return (
    <div className="flex gap-8 relative lg-max:hidden select-none">
      {NAV_ITEMS.map((item) => (
        <HeaderNavItem key={item.label} {...item} />
      ))}
    </div>
  );
}

export const NAV_ITEMS: { label: string; href: string }[] = [];
