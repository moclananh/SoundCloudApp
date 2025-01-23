import { Outlet, Link } from "react-router-dom";
import { TeamOutlined, HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { login } from "../services/auth.service";

const items: MenuProps["items"] = [
  {
    label: <Link to={"/"}>Home</Link>,
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="/users">Manage Users</Link>,
    key: "users",
    icon: <TeamOutlined />,
  },
];
const Header = () => {
  const [current, setCurrent] = useState("home");
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

const AdminLayout = () => {
  useEffect(() => {
    login();
  }, []);
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
export default AdminLayout;
