import Sidebar from "./Sidebar";
const CustomerSupport = () => {
    return (
        <div className="container">
          <Sidebar currentPage="support" />
          <div className="header">
            <div>User Info</div>
          </div>
          <div className="main-content">
            <h2>Customer Support</h2>
            {/* Add content specific to Investment Advisory here */}
          </div>
        </div>)
}
 
export default CustomerSupport;