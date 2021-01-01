import React, { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Col,
    Row
} from 'reactstrap';
import logo from '../../Assets/images/logo.png'
import user from '../../Assets/images/user.png'
import cart from '../../Assets/images/cart.png'
import search from '../../Assets/images/search.png'
import { useSelector, useDispatch } from "react-redux";
import { showSnackbar } from '../../Redux/Actions/alertSnackBar'
import './Header.css';

const Header = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [cartToggle, setCartToggle] = useState(false)

    const currentStateOfCart = useSelector(state => state.cartProducts.cartProducts);
    const cartHandler = () => {
        setCartToggle(!cartToggle);
    }
    const alertSnackbarMessage = (message) => {
        dispatch(showSnackbar({
            alertType: 'warning',
            messgage: message
        }))
    }

    return (
        <div>
            <Navbar light expand="md" style={{ height: '70px' }}>
                <NavbarBrand href="/">
                    <img height={38} alt='logo' className="my-2" src={logo} />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto ml-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret className='color-black font-14'> Shop</DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Shop 1
                                    </DropdownItem>
                                <DropdownItem>
                                    Shop 2
                                    </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem>
                            <NavLink href="/" className='color-black font-14'>About Us</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/" className='color-black font-14'>Our Stores</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/" className='color-black font-14'>Contact Us</NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText>
                        <img height={20}
                            alt='search icon'
                            onClick={() => alertSnackbarMessage('Search functionality is not implimented yet!!')}
                            className="my-2 cursor"
                            src={search} />
                    </NavbarText> &nbsp;&nbsp;&nbsp;
                    <NavbarText>
                        <img
                            height={20}
                            alt='profile icon'
                            onClick={() => alertSnackbarMessage('User profile is not developed yet!!')}
                            className="my-2 cursor"
                            src={user} />
                    </NavbarText> &nbsp;&nbsp;&nbsp;
                    <NavbarText>
                        <p
                            className='cart-count cursor'
                            onClick={cartHandler}>
                            {currentStateOfCart.length}
                        </p>
                        <img
                            alt='cart icon'
                            onClick={cartHandler}
                            height={13} className="my-2 cursor"
                            src={cart} />
                    </NavbarText>
                </Collapse>
            </Navbar>
            <div className={`cart-container ${cartToggle ? null : 'd-none'}`}>
                <Col md='12'>
                    {
                        currentStateOfCart.map(cartItem => {
                            return <Cart
                                key={cartItem.id}
                                cartItem={cartItem}
                                dispatch={dispatch} />
                        })
                    }
                </Col>
            </div>
        </div>
    )
}

const Cart = (props) => {
    const [productQty, setProductQty] = useState(1);
    const qtyHandler = (actionType) => {
        if (actionType === 'inc') {
            setProductQty(productQty + 1);
        } else if (actionType === 'dec' && productQty > 1) {
            setProductQty(productQty - 1);
        } else {
            props.dispatch(showSnackbar({
                alertType: 'warning',
                messgage: 'Product Qty should not be less then 1'
            }))
        }
    }
    return (
        <div className={productQty > 0 ? 'display_' : 'd-none'}>
            <Row>
                <Col md='3'>
                    <img alt='item' src={props.cartItem.image} height='70' />
                </Col>
                <Col md='7'>
                    <p className='weight-700'>{props.cartItem.vendor}</p>
                    <p className='color-grey font-12 mb-1'>{props.cartItem.name}</p>
                    <Col md='12'>
                        <Row>
                            <div
                                className='inc-dec-btn'
                                onClick={() => qtyHandler('dec')}>-</div>
                            <div className='count-cont'>{productQty}</div>
                            <div
                                className='inc-dec-btn'
                                onClick={() => qtyHandler('inc')}>+</div>
                            <div className='price-cont'>${parseInt(props.cartItem.price) * productQty}</div>
                        </Row>
                    </Col>
                </Col>
            </Row>
            <hr />
        </div>
    )
}

export default Header;
