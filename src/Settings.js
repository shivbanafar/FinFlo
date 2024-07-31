import Sidebar from "./Sidebar";
const Settings = () => {
    return (
        <div className="container">
          <Sidebar currentPage="settings" />
          <div className="header">
            <div>User Info</div>
          </div>
          <div className="main-content">
            <h2>Settings</h2>
            {/* Add content specific to Investment Advisory here */}
          </div>
        </div>)

}
 
export default Settings;