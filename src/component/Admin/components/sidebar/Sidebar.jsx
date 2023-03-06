import "./sidebar.css";
import {
  LineStyle,
  PermIdentity,
  // eslint-disable-next-line
  DynamicFeed,
  // eslint-disable-next-line
  Report,
} from "@material-ui/icons";
import { NavLink as Link } from "react-router-dom";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import AddIcon from '@mui/icons-material/Add';
import BookIcon from '@mui/icons-material/Book';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CategoryIcon from '@mui/icons-material/Category';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/admin/" className="link">
              {
                (({isActive}) => <li className={`sidebarListItem ${isActive=== true ? "active" : ""}`}>
                  <LineStyle className="sidebarIcon" />
                    Home
                </li>)
              }
            
            </Link>
            <li className="sidebarListItem">
              {/* <LoyaltyIcon className="sidebarIcon" />
                Khuyến mãi */}
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Thống kê</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <EqualizerIcon className="sidebarIcon" />
                Doanh thu
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quản lý người dùng</h3>
          <ul className="sidebarList">
            <Link to="/admin/users" className="link">
              {
                (({isActive}) => <li className={`sidebarListItem ${isActive=== true ? "active" : ""}`}>
                  <PermIdentity className="sidebarIcon" />
                    Người dùng
                </li>)
              }
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Thông báo</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
                Nhận xét
            </li>
            <li className="sidebarListItem">
              <ChatBubbleIcon className="sidebarIcon" />
                Tin nhắn
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quản lý sách</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <BookIcon className="sidebarIcon" />
                Sách
            </li>
            <li className="sidebarListItem">
              <AddIcon className="sidebarIcon" />
                Thêm sách
            </li>
            <li className="sidebarListItem">
              <Link to="/admin/category" className="link">
                {
                  (({isActive}) => <li className={`sidebarListItem ${isActive=== true ? "active" : ""}`}>
                  <CategoryIcon className="sidebarIcon" />
                    Danh mục
                  </li>)
                }
              </Link>
              
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quản lý nhân viên</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <LocalLibraryIcon className="sidebarIcon" />
                Thủ thư
            </li>
            <li className="sidebarListItem">
              <AddIcon className="sidebarIcon" />
                Thêm
            </li>
            {/* <li className="sidebarListItem">
              <Report className="sidebarIcon" />
                Báo cáo
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
