import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import caretIcon from '../../Assets/images/caret.svg'
import { showSnackbar } from '../../Redux/Actions/alertSnackBar';
import { product } from '../../Redux/Actions/product';
import { addToCart } from '../../Redux/Actions/cartProducts'
import "./HomeScreen.css";

const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(product());
  }, [])
  const currentStateOfProduct = useSelector(state => state.products);
  const [activeCard, setActiveCard] = useState('none');
  const [activeAddCartButton, setActiveAddCartButton] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [filterState, setFilterState] = useState('all-product');

  const toggle = () => setIsOpen(!isOpen);

  const filterProductHandler = (filterStr) => {
    setFilterState(filterStr)
  }

  const mouseEnter = (id) => {
    setActiveCard(id)
  }

  const setSizeOfProduct = (id, size) => {
    setActiveAddCartButton({ id: id, size: size })
  }

  const AddToCartHandler = (productDetail) => {
    setActiveAddCartButton('');
    let cartProduct = {
      id: productDetail.id,
      size: activeAddCartButton.size,
      image: productDetail.image_src[0],
      price: productDetail.price,
      vendor: productDetail.vendor,
      name: productDetail.name
    }
    dispatch(addToCart(cartProduct));
    dispatch(showSnackbar({
      alertType: 'success',
      messgage: 'Item is added successfully into cart!!'
    }))
  }

  const productSort = (getSort) => {
    dispatch(showSnackbar({
      alertType: 'warning',
      messgage: 'Sorting functionality is not implimented yet!!'
    }))
  }

  return (
    <Container fluid={true}>
      {/* Navigation Path */}
      <Col md={12} sm={12} lg={12}>
        <Row>
          <p className='mt-3 font-13'>Home / Clothing / Mens Clothing / <b>All Mens Clothing</b></p>
        </Row>
      </Col>

      {/* Filter Section */}
      <Col md={12} sm={12} lg={12}>
        <Row>
          <p className='mt-2 font-21'>
            <span className='weight-700'>All Products </span>
            ({currentStateOfProduct.products.length} Products)
          </p>
        </Row>
        <Row className='content-base-align'>
          <p className='mt-4 font-16'>
            <span className='weight-700'>FILTERS:</span>
          </p>
          <FilterButton
            type={filterState === 'all-product' ? 'active' : 'inactive'}
            tag='all-product'
            placeholder='All Products'
            filterProductHandler={filterProductHandler}
          />
          <FilterButton
            type={filterState === 'T-shirt' ? 'active' : 'inactive'}
            placeholder='Tee Shirt'
            tag='T-shirt'
            filterProductHandler={filterProductHandler}
          />
          <FilterButton
            type={filterState === 'Denim' ? 'active' : 'inactive'}
            placeholder='Denim'
            tag='Denim'
            filterProductHandler={filterProductHandler}
          />
          <FilterButton
            type={filterState === 'jacket' ? 'active' : 'inactive'}
            placeholder='Jacket'
            tag='jacket'
            filterProductHandler={filterProductHandler}
          />
          {/* <FilterButton
            type='inactive'
            filterProductHandler={filterProductHandler}
            placeholder='Polo Tee Shirt'
          /> */}
          <FilterButton
            type={filterState === 'shirt' ? 'active' : 'inactive'}
            placeholder='Shirt'
            tag='shirt'
            filterProductHandler={filterProductHandler}
          />

          <div className='ml-auto'>
            <FilterDropdown
              placeholder='Sort By:'
              productSort={productSort}
              isOpen={isOpen} toggle={toggle} />
          </div>
        </Row>
      </Col>
      <hr />
      {/* Products Section   */}
      <Col md={12} sm={12} lg={12}>
        <Row>

          {currentStateOfProduct.products
            && currentStateOfProduct.products.length > 0
            ? currentStateOfProduct.products.map(product => {
              if (filterState === 'all-product') {
                return <
                  ProductCard
                  key={product.id}
                  id={product.id}
                  product={product}
                  activeCard={activeCard}
                  mouseEnter={mouseEnter}
                  activeAddCartButton={activeAddCartButton}
                  setSizeOfProduct={setSizeOfProduct}
                  AddToCartHandler={AddToCartHandler}
                />
              } else if (filterState === product.tag) {
                return <
                  ProductCard
                  key={product.id}
                  id={product.id}
                  product={product}
                  activeCard={activeCard}
                  mouseEnter={mouseEnter}
                  activeAddCartButton={activeAddCartButton}
                  setSizeOfProduct={setSizeOfProduct}
                  AddToCartHandler={AddToCartHandler}
                />
              }
              return null;
            })
            : null
          }
        </Row>
      </Col>
    </Container>
  )
}

const FilterButton = (props) => {
  return (
    props.type === 'active'
      ? <button
        className='filter-btn ml-3'
        onClick={() => props.filterProductHandler(props.tag)}
      >
        <p className='font-12'>
          {props.placeholder}
        </p>
      </button>
      : <button
        className='filter-btn-inactive ml-3'
        onClick={() => props.filterProductHandler(props.tag)}
      >
        <p className='font-12 color-C4C4C4'>{props.placeholder}</p>
      </button>
  )
}

const FilterDropdown = (props) => {
  return (
    <>
      <button className='filter-btn ml-3' onClick={props.toggle}>
        <p className='font-12'>
          <span className='color-C4C4C4'>{props.placeholder} &nbsp;</span>
          <span>Price Low to High</span>
          <img alt='icon' className='ml-3' src={caretIcon} />
        </p>
      </button>
      {
        props.isOpen
          ? <div className='option-container'>
            <div
              onClick={() => [props.productSort('Low to High'), props.toggle()]} className='custom-options'> Low to High</div>
            <div
              onClick={() => [props.productSort('High to Low'), props.toggle()]}
              className='custom-options'> High to Low</div>
          </div>
          : null
      }
    </>
  )
}

const ProductCard = (props) => {
  let product = props.product;
  return (
    <div className='product-card'
      onMouseEnter={() => props.mouseEnter(props.id)}
    >
      <div
        style={
          props.id === props.activeCard
            ? { height: '325px', backgroundImage: `url(${product.image_src[0]})` }
            : { backgroundImage: `url(${product.image_src[0]})` }
        }
        className='card-background'>
      </div>
      {
        props.id === props.activeCard
          ? <div className='product-card-detail'>
            {
              props.activeAddCartButton.id === props.id
                ? <div
                  className='font-12 add-to-cart weight-700 mt-2 mb-2'
                  onClick={() => props.AddToCartHandler(product)}
                >
                  ADD TO CART
                  </div>
                : <p className='font-16 weight-500'>Select Size</p>
            }
            <Col md='12'>
              <Row className='space-aro'>
                {
                  product.options.map(option => {
                    return <p
                      className='size-tag font-11'
                      onClick={() => props.setSizeOfProduct(props.id, option.value)}
                    >{option.value}</p>
                  })
                }
              </Row>
            </Col>
            <p className='font-14'>
              <span className='weight-700'>${product.price}</span> &nbsp;
          <span className='color-878787 text-broken'>${product.compare_at_price}</span> &nbsp;
          <span className='color-eb6464'>({((product.price / product.compare_at_price) * 100).toFixed(0)}%)</span>
            </p>
          </div>
          : <div className='product-card-detail'>
            <p className='font-16 weight-700'>{product.vendor}</p>
            <p className='color-878787 font-14 text-ellipsis'>{product.name}</p>
            <p className='font-14'>
              <span className='weight-700'>${product.price}</span> &nbsp;
      <span className='color-878787 text-broken'>${product.compare_at_price}</span> &nbsp;
          <span className='color-eb6464'>({((product.price / product.compare_at_price) * 100).toFixed(0)}%)</span>
            </p>
          </div>
      }
    </div>
  )
}



export default HomeScreen;
