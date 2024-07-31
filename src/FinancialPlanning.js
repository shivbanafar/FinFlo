import Sidebar from "./Sidebar";
const FinancialPlanning = () => {
    return (
        <div className="container">
          <Sidebar currentPage="planning" />
          <div className="header">
            <div>User Info</div>
          </div>
          <div className="main-content">
            <h2>Financial Planning</h2>
            {/* Add content specific to Investment Advisory here */}
          </div>
        </div>)
}
 
export default FinancialPlanning;