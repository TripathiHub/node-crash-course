import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Products({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  const [isloading, setIsLoading] = useState(true);
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
      <div className='product-footer'>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  )
}

export default Products