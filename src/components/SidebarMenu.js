// Sidebar.js
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import booksImg from '../app/images/booksicon.png';

const SidebarMenu = () => {
    return (
        <Sidebar>
            <div style={{ textAlign: 'center', padding: '20px', background: '#333', color: '#fff' }}>
                <h2>My Library</h2>
            </div>
            <Menu
                menuItemStyles={{
                    button: {
                        // the active class will be added automatically by react router
                        // so we can use it to style the active menu item
                        [`&.active`]: {
                            backgroundColor: '#13395e',
                            color: '#b6c8d9',
                        },
                    },
                }}
            >
                <MenuItem component={<Link to="/addbooks" />}> Add Books</MenuItem>
                <MenuItem component={<Link to="/deletebooks" />}> Remove Books</MenuItem>
                <MenuItem component={<Link to="/updatebooks" />}> Update Books</MenuItem>
                <SubMenu label="Books Requests">
                    <MenuItem component={<Link to="/borrow" />}> Borrow </MenuItem>
                    <MenuItem> Return </MenuItem>
                    <MenuItem> by Category </MenuItem>
                </SubMenu>
            </Menu>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingBottom: '20px',
                }}
            >
                <img src={booksImg} alt="books" style={{ width: '70%', height: 'auto' }}/>
            </div>
        </Sidebar>
    );
};

export default SidebarMenu;
