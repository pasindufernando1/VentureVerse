import Navbar from "../webcomponent/NavbarAll";
import {Button } from "../webcomponent";
import Sidebar from "../webcomponent/CustomSideBar";

const AdminTestHome = () => {

    return (
        <>
        <Sidebar active="Dashboard">
            <div>        
                <h1>Admin Test Home</h1>
                <Button>
                    <a href="/admin/add-co-admin">Add New Co Admin</a>
                </Button>
                <br></br>
                <Button>
                    <a href="/signup/enterprise-investor">Add New Enterprice Investor</a>
                </Button>
                <br></br>
                <Button>
                    <a href="/admin/view-requests">View Requests</a>
                </Button>        
            </div>    
        </Sidebar>
        
        </>

    )

}

export default AdminTestHome;