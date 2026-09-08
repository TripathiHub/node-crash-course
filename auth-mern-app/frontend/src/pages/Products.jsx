import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  async function fetchProducts() {
    try {
      const url = "http://localhost:9000/products";
      const headers = {
        headers: {
          "Authorization": localStorage.getItem("jwtToken")
        }
      }
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch {
      toast.error("Get request failed");
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
    toast.success(`${loggedInUser} logout successfully`);
    setTimeout(() => {
      navigate("/login");
    }, 500)
  }
  return (
    <>
      <div className='product-page'>
        <div className='product-container'>
          <h1 className="user-heading">Welcome {loggedInUser}</h1>
          {
            products.map((product) => (
              <div key={product.id}>
                <h2>{product.name}</h2>
                <h3>{product.price}</h3>
                <button>Add to cart</button>
              </div>
            ))
          }
        </div>
      </div>
      <div className='product-footer'>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  )
}

export default Products