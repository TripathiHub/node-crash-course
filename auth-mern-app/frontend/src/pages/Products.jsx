import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Products({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  async function fetchProducts() {
    try {
      setIsLoading(true);
      const url = "http://localhost:9000/products";
      const headers = {
        headers: {
          "Authorization": localStorage.getItem("jwtToken")
        }
      }
      const response = await fetch(url, headers);
      const result = await response.json();
      setProducts(result);
    } catch {
      toast.error("Get request failed");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser")
    setLoggedInUser(user);
  }, [])
  useEffect(() => {
    fetchProducts();
  }, [])
  function handleLogout() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("loggedInUser");
    setIsAuthenticated(false);
    toast.success(`${loggedInUser} logout successfully`);
    setTimeout(() => {
      navigate("/login");
    }, 500)
  }
  function handleAddToCart(product) {
    toast.success(`${product.name} added to cart`);
    setCart([...cart, product]);
  }
  return (
    <>
      <div className='product-page'>
        <div className='product-container'>
          <h1 className="user-heading">Welcome {loggedInUser}</h1>

          {isloading ? (
            <p className="loading-text">Loading products...</p>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <div className="product-card" key={product.id}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-img"
                  />
                  <div className="product-info">
                    <h2 className="product-name">{product.name}</h2>
                    {product.description && (
                      <p className="product-desc">{product.description}</p>
                    )}
                    <h3 className="product-price">
                      ₹{Number(product.price).toLocaleString()}
                    </h3>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="cart-products">
        {cart.map((product) => (
          <ul key={product.id} className="cart-table">
            <li className="cart-product-name">{`${product.name}`}</li>
            <li className="cart-product-price">{`${product.price}`}</li>
          </ul>
        ))
        }
      </div>
      <div className='product-footer'>
        <div className="footer-cart-summary">
          <span className="cart-count">🛒 {cart.length} item{cart.length !== 1 ? "s" : ""}</span>
          <span className="cart-total">
            ₹{cart.reduce((sum, p) => sum + Number(p.price), 0).toLocaleString()}
          </span>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  )
}

export default Products